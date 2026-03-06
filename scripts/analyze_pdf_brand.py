import argparse
import json
from collections import Counter, defaultdict
from pathlib import Path

import fitz  # PyMuPDF


def int_rgb_to_hex(color_int: int) -> str:
    # PyMuPDF uses 0xRRGGBB for span["color"]
    r = (color_int >> 16) & 0xFF
    g = (color_int >> 8) & 0xFF
    b = color_int & 0xFF
    return f"#{r:02x}{g:02x}{b:02x}"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--max-pages", type=int, default=0, help="0 = all pages")
    args = parser.parse_args()

    pdf_path = Path(args.pdf)
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    fonts = Counter()
    font_sizes = Counter()
    colors = Counter()

    page_summaries = []
    full_text_parts = []

    with fitz.open(pdf_path) as doc:
        meta = doc.metadata or {}
        page_count = doc.page_count
        max_pages = args.max_pages if args.max_pages and args.max_pages > 0 else page_count
        max_pages = min(max_pages, page_count)

        for i in range(max_pages):
            page = doc.load_page(i)
            d = page.get_text("dict")

            page_text = []
            for block in d.get("blocks", []):
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        text = (span.get("text") or "").strip()
                        if not text:
                            continue
                        page_text.append(text)

                        font = span.get("font")
                        if font:
                            fonts[font] += 1

                        size = span.get("size")
                        if size is not None:
                            # bucket sizes to 0.5pt increments to reduce noise
                            rounded = round(float(size) * 2) / 2
                            font_sizes[f"{rounded:g}"] += 1

                        color = span.get("color")
                        if color is not None:
                            colors[int_rgb_to_hex(int(color))] += 1

            joined = " ".join(page_text)
            if joined:
                full_text_parts.append(joined)

            page_summaries.append(
                {
                    "page": i + 1,
                    "text_sample": joined[:500],
                }
            )

        report = {
            "pdf": str(pdf_path),
            "metadata": meta,
            "pages_analyzed": max_pages,
            "page_count": page_count,
            "top_fonts": fonts.most_common(30),
            "top_font_sizes": font_sizes.most_common(30),
            "top_colors": colors.most_common(30),
            "page_summaries": page_summaries,
            "text": "\n\n".join(full_text_parts),
        }

    (out_dir / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    (out_dir / "text.txt").write_text(report["text"], encoding="utf-8")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
