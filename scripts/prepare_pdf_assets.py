import argparse
import datetime as _dt
import hashlib
import json
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image


def _sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def _pil_from_extracted(doc: fitz.Document, xref: int) -> tuple[Image.Image, bytes]:
    extracted = doc.extract_image(xref)
    original_bytes: bytes = extracted["image"]

    try:
        from io import BytesIO

        img = Image.open(BytesIO(original_bytes))
        img.load()
        return img, original_bytes
    except Exception:
        pix = fitz.Pixmap(doc, xref)
        try:
            if pix.n >= 5:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            mode = "RGBA" if pix.alpha else "RGB"
            img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
            return img, original_bytes
        finally:
            pix = None


def extract_images_from_pdf(pdf_path: Path, out_dir: Path, *, min_pixels: int = 40_000) -> list[Path]:
    _ensure_dir(out_dir)

    out_files: list[Path] = []
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
                    img, original_bytes = _pil_from_extracted(doc, xref)
                except Exception:
                    continue

                width, height = img.size
                if width * height < min_pixels:
                    continue

                img_hash = hashlib.sha256(original_bytes).hexdigest()
                if img_hash in seen_hashes:
                    continue
                seen_hashes.add(img_hash)

                if img.mode not in ("RGB", "RGBA"):
                    img = img.convert("RGBA" if "A" in img.mode else "RGB")

                out_name = f"pdf_p{page_index+1:03d}_xref{xref}_{width}x{height}_{img_hash[:10]}.webp"
                out_path = out_dir / out_name
                img.save(out_path, format="WEBP", quality=86, method=6)
                out_files.append(out_path)

    return out_files


def classify_role(width: int, height: int) -> str:
    ar = width / height if height else 1.0
    pixels = width * height

    if pixels >= 9_000_000 and ar >= 1.2:
        return "background"

    if 2.0 <= ar <= 6.0 and height <= 900:
        return "logo_wordmark"

    if 0.85 <= ar <= 1.18:
        return "product_square"

    if 1.19 < ar <= 2.2:
        return "hero_landscape"

    if ar < 0.85:
        return "editorial_portrait"

    return "misc"


def _center_crop_to_aspect(img: Image.Image, target_ar: float) -> Image.Image:
    w, h = img.size
    if h == 0:
        return img

    cur_ar = w / h
    if abs(cur_ar - target_ar) < 1e-3:
        return img

    if cur_ar > target_ar:
        new_w = int(h * target_ar)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))

    new_h = int(w / target_ar)
    top = (h - new_h) // 2
    return img.crop((0, top, w, top + new_h))


def _resize(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    return img.resize((target_w, target_h), resample=Image.LANCZOS)


def _save_webp(img: Image.Image, out_path: Path, *, quality: int = 86, lossless: bool = False) -> None:
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.mode else "RGB")

    kwargs = {"format": "WEBP", "method": 6}
    if lossless:
        kwargs["lossless"] = True
    else:
        kwargs["quality"] = int(quality)

    img.save(out_path, **kwargs)


def build_variants(src_path: Path, out_dir: Path, role: str) -> dict:
    _ensure_dir(out_dir)

    img = Image.open(src_path)
    img.load()

    variants: dict[str, str] = {}

    if role in ("logo_wordmark",):
        for h in (60, 120):
            scale = h / img.size[1]
            w = max(1, int(img.size[0] * scale))
            resized = img.resize((w, h), resample=Image.LANCZOS)
            out_name = f"{src_path.stem}__h{h}.webp"
            out_path = out_dir / out_name
            _save_webp(resized, out_path, lossless=True)
            variants[f"h{h}"] = str(out_path.relative_to(out_dir.parent))
        return variants

    if role == "hero_landscape":
        sizes = [(1920, 1080), (1440, 810), (768, 432)]
        target_ar = 16 / 9
    elif role == "product_square":
        sizes = [(1200, 1200), (600, 600)]
        target_ar = 1.0
    elif role == "editorial_portrait":
        sizes = [(1200, 1600), (600, 800)]
        target_ar = 3 / 4
    elif role == "background":
        sizes = [(2400, 1350), (1600, 900)]
        target_ar = 16 / 9
    else:
        sizes = [(1200, 1200)]
        target_ar = img.size[0] / img.size[1] if img.size[1] else 1.0

    cropped = _center_crop_to_aspect(img, target_ar)

    for w, h in sizes:
        resized = _resize(cropped, w, h)
        out_name = f"{src_path.stem}__{w}x{h}.webp"
        out_path = out_dir / out_name
        _save_webp(resized, out_path, quality=86)
        variants[f"{w}x{h}"] = str(out_path.relative_to(out_dir.parent))

    return variants


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract images from PDFs and build website-ready asset variants + manifest")
    parser.add_argument("--pdf", action="append", default=[], help="Path to a source PDF (repeatable)")
    parser.add_argument("--in-dir", default="", help="Use an existing extracted image dir instead of extracting (e.g. uploads/extracted-webp)")
    parser.add_argument("--out", default="uploads/structured-assets", help="Output root (default: uploads/structured-assets)")
    parser.add_argument("--min-pixels", type=int, default=40_000, help="Skip tiny images below this pixel count")
    args = parser.parse_args()

    out_root = Path(args.out)
    extracted_dir = out_root / "_extracted"
    variants_dir = out_root / "variants"
    _ensure_dir(out_root)

    source_images: list[Path] = []

    if args.in_dir:
        in_dir = Path(args.in_dir)
        if not in_dir.exists():
            raise SystemExit(f"Input dir not found: {in_dir}")
        source_images = sorted([p for p in in_dir.glob("*.webp") if p.is_file()])
    else:
        if not args.pdf:
            raise SystemExit("Provide --pdf (one or more) or --in-dir")
        for pdf in args.pdf:
            pdf_path = Path(pdf)
            pdf_out = extracted_dir / pdf_path.stem
            imgs = extract_images_from_pdf(pdf_path, pdf_out, min_pixels=int(args.min_pixels))
            source_images.extend(imgs)

    items: list[dict] = []
    role_buckets: dict[str, list[str]] = {}

    for src in source_images:
        try:
            img = Image.open(src)
            img.load()
        except Exception:
            continue

        w, h = img.size
        role = classify_role(w, h)

        src_hash = _sha256_file(src)
        item_id = f"{role}_{src_hash[:12]}"

        item_out_dir = variants_dir / role
        item_variants = build_variants(src, item_out_dir, role)

        rel_src = str(src)
        try:
            rel_src = str(src.relative_to(out_root))
        except Exception:
            pass

        record = {
            "id": item_id,
            "role": role,
            "source": rel_src.replace("\\", "/"),
            "source_width": w,
            "source_height": h,
            "sha256": src_hash,
            "variants": item_variants,
        }
        items.append(record)
        role_buckets.setdefault(role, []).append(item_id)

    manifest = {
        "generated_at": _dt.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
        "out_root": str(out_root).replace("\\", "/"),
        "counts": {k: len(v) for k, v in sorted(role_buckets.items())},
        "roles": role_buckets,
        "items": items,
    }

    (out_root / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
