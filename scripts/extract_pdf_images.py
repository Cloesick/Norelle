import argparse
import hashlib
import json
import os
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image


def _sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def _pil_from_extracted(doc: fitz.Document, xref: int) -> tuple[Image.Image, str, bytes]:
    """Return (PIL image, original_ext, original_bytes)."""
    extracted = doc.extract_image(xref)
    original_bytes: bytes = extracted["image"]
    original_ext: str = extracted.get("ext", "bin").lower()

    # Some PDFs store images in formats PIL can read directly, some not.
    # If PIL fails, fallback to pixmap rendering.
    try:
        from io import BytesIO

        img = Image.open(BytesIO(original_bytes))
        img.load()
        return img, original_ext, original_bytes
    except Exception:
        pix = fitz.Pixmap(doc, xref)
        try:
            # If CMYK or with alpha, convert to RGB/RGBA
            if pix.n >= 5:  # CMYK
                pix = fitz.Pixmap(fitz.csRGB, pix)
            mode = "RGBA" if pix.alpha else "RGB"
            img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
            return img, original_ext, original_bytes
        finally:
            pix = None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", required=True, help="Path to source PDF")
    parser.add_argument("--out", required=True, help="Output directory for .webp files")
    parser.add_argument("--quality", type=int, default=86, help="WebP quality (0-100), lossy")
    parser.add_argument(
        "--lossless",
        action="store_true",
        help="Force lossless WebP (larger files; good for logos).",
    )
    parser.add_argument(
        "--min-pixels",
        type=int,
        default=40_000,
        help="Skip tiny images below this pixel count (e.g. UI icons).",
    )
    args = parser.parse_args()

    pdf_path = Path(args.pdf)
    out_dir = Path(args.out)
    _ensure_dir(out_dir)

    manifest: list[dict] = []

    seen_xrefs: set[int] = set()
    seen_hashes: set[str] = set()

    with fitz.open(pdf_path) as doc:
        for page_index in range(doc.page_count):
            page = doc.load_page(page_index)
            for img_info in page.get_images(full=True):
                xref = int(img_info[0])
                if xref in seen_xrefs:
                    continue
                seen_xrefs.add(xref)

                try:
                    pil_img, original_ext, original_bytes = _pil_from_extracted(doc, xref)
                except Exception as e:
                    manifest.append(
                        {
                            "page": page_index + 1,
                            "xref": xref,
                            "status": "error",
                            "error": str(e),
                        }
                    )
                    continue

                width, height = pil_img.size
                pixels = width * height
                if pixels < args.min_pixels:
                    manifest.append(
                        {
                            "page": page_index + 1,
                            "xref": xref,
                            "status": "skipped_small",
                            "width": width,
                            "height": height,
                            "pixels": pixels,
                            "original_ext": original_ext,
                        }
                    )
                    continue

                img_hash = _sha256(original_bytes)
                if img_hash in seen_hashes:
                    manifest.append(
                        {
                            "page": page_index + 1,
                            "xref": xref,
                            "status": "skipped_duplicate",
                            "width": width,
                            "height": height,
                            "pixels": pixels,
                            "original_ext": original_ext,
                            "sha256": img_hash,
                        }
                    )
                    continue
                seen_hashes.add(img_hash)

                out_name = f"pdf_p{page_index+1:03d}_xref{xref}_{width}x{height}_{img_hash[:10]}.webp"
                out_path = out_dir / out_name

                save_kwargs = {
                    "format": "WEBP",
                    "quality": int(args.quality),
                    "method": 6,
                }
                if args.lossless:
                    save_kwargs["lossless"] = True
                    save_kwargs.pop("quality", None)

                # Ensure a sane mode for WebP
                if pil_img.mode not in ("RGB", "RGBA"):
                    pil_img = pil_img.convert("RGBA" if "A" in pil_img.mode else "RGB")

                pil_img.save(out_path, **save_kwargs)
                file_size = out_path.stat().st_size

                manifest.append(
                    {
                        "page": page_index + 1,
                        "xref": xref,
                        "status": "exported",
                        "file": out_name,
                        "width": width,
                        "height": height,
                        "pixels": pixels,
                        "filesize_bytes": file_size,
                        "original_ext": original_ext,
                        "sha256": img_hash,
                    }
                )

    (out_dir / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
