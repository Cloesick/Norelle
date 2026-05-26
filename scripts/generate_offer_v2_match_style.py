from __future__ import annotations

from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "Offer" / "OFFERTE_SASPIRE_AAN_SLASH_NORELLE_WEBSHOP_NL.pdf"
OUT = ROOT / "Offer" / "OFFERTE_SASPIRE_AAN_SLASH_NORELLE_WEBSHOP_NL_V2_MATCHSTYLE_5000_PLUS_200PM_HOSTINGNEUTRAL_ASSUMPTIONSNEUTRAL_SINGLEPACKAGE_V3.pdf"

SEGOE_UI = Path(r"C:\Windows\Fonts\segoeui.ttf")
SEGOE_UI_BOLD = Path(r"C:\Windows\Fonts\segoeuib.ttf")


def _cover(page: fitz.Page, rect: fitz.Rect, pad: float = 1.5) -> fitz.Rect:
    r = fitz.Rect(rect)
    r.x0 -= pad
    r.y0 -= pad
    r.x1 += pad
    r.y1 += pad
    page.draw_rect(r, color=None, fill=(1, 1, 1), overlay=True)
    return r


def _write(page: fitz.Page, rect: fitz.Rect, text: str, fontsize: float = 11, align: int = 0) -> None:
    # Fonts are overridden by passing fontname from registered fonts.
    page.insert_textbox(
        rect,
        text,
        fontname="helv",
        fontsize=fontsize,
        color=(0, 0, 0),
        align=align,
    )


def _ensure_fonts(page: fitz.Page) -> tuple[str, str]:
    """Register Segoe UI regular + bold on the page and return their font names."""
    regular_name = "norelle-segoeui"
    bold_name = "norelle-segoeui-bold"

    if SEGOE_UI.exists():
        try:
            page.insert_font(fontname=regular_name, fontfile=str(SEGOE_UI))
        except Exception:
            pass

    if SEGOE_UI_BOLD.exists():
        try:
            page.insert_font(fontname=bold_name, fontfile=str(SEGOE_UI_BOLD))
        except Exception:
            pass

    return regular_name, bold_name


def _write_with_font(
    page: fitz.Page,
    rect: fitz.Rect,
    text: str,
    *,
    fontname: str,
    fontsize: float,
    align: int = 0,
) -> None:
    page.insert_textbox(
        rect,
        text,
        fontname=fontname,
        fontsize=fontsize,
        color=(0, 0, 0),
        align=align,
    )


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Source PDF not found: {SRC}")

    doc = fitz.open(str(SRC))

    # --- Page 3: pricing table amounts ---
    # Replace the multi-package table with a single all-in package priced at € 5.000.
    page3 = doc[2]
    reg_font, bold_font = _ensure_fonts(page3)

    # Determine the table area by anchoring between the first package row and the scope header.
    a_rects = page3.search_for("A — Demo")
    scope_rects = page3.search_for("SCOPE-AFBAKENING")
    if a_rects and scope_rects:
        y0 = a_rects[0].y0 - 20
        y1 = scope_rects[0].y0 - 6
        table_area = fitz.Rect(45.75, y0, 550, y1)
        _cover(page3, table_area, pad=0)

        # Headline
        head_rect = fitz.Rect(51.41, y0 + 6, 360, y0 + 26)
        _write_with_font(page3, head_rect, "PAKKET", fontname=bold_font, fontsize=10.5, align=0)

        # Single package line (keep it short and clear)
        line1 = fitz.Rect(51.41, y0 + 34, 470, y0 + 54)
        price = fitz.Rect(470, y0 + 34, 545, y0 + 54)
        _write_with_font(page3, line1, "All-in Launch MVP (vaste prijs)", fontname=reg_font, fontsize=11.5, align=0)
        _write_with_font(page3, price, "€ 5.000", fontname=bold_font, fontsize=10.5, align=2)

        # Small clarifier below
        line2 = fitz.Rect(51.41, y0 + 56, 545, y0 + 86)
        _write_with_font(
            page3,
            line2,
            "Inclusief implementatie, basis QA en oplevering binnen afgesproken scope.",
            fontname=reg_font,
            fontsize=10.0,
            align=0,
        )
    else:
        # Fallback: at least replace the three amounts.
        for q in ["€ 10.500", "€ 17.500", "€ 29.500"]:
            rects = page3.search_for(q)
            for r in rects:
                rr = _cover(page3, r, pad=2)
                _write_with_font(page3, rr, "€ 5.000", fontname=bold_font, fontsize=10.5, align=1)

    # Add a short note under the pricing table to clarify V2 pricing.
    note_anchor = page3.search_for("SCOPE-AFBAKENING")
    if note_anchor:
        a = note_anchor[0]
        note_rect = fitz.Rect(59, a.y0 - 28, 540, a.y0 - 6)
        _cover(page3, note_rect, pad=0)
        _write_with_font(
            page3,
            note_rect,
            "V2: Launch MVP all-in vaste prijs: € 5.000 (excl. btw).",
            fontname=reg_font,
            fontsize=9.5,
            align=0,
        )

    # --- Page 5: add maintenance line under recurring costs ---
    page5 = doc[4]
    reg_font_5, bold_font_5 = _ensure_fonts(page5)
    # Put maintenance fee right under the existing recurring costs paragraph.
    # We anchor to the hosting section header.
    hosting_hdr = page5.search_for("4. HOSTING & TERUGKERENDE KOSTEN")
    if hosting_hdr:
        hdr = hosting_hdr[0]
        # Replace provider/technology-specific cost lines with generic wording.
        tech_lines = [
            "Frontend hosting (Vercel)",
            "WooCommerce hosting",
            "Domein/DNS (Cloudflare)",
            "Transactionele e-mail provider",
            "Opmerking: bedragen zijn indicatief",
        ]

        rects = []
        for q in tech_lines:
            rects.extend(page5.search_for(q))

        if rects:
            y0 = min(r.y0 for r in rects) - 2
            # Give extra vertical room so the last line never gets clipped.
            y1 = max(r.y1 for r in rects) + 40
            area = fitz.Rect(45.75, y0, 550, y1)
            _cover(page5, area, pad=0)

            generic = (
                "Hosting & operationele kosten (indicatief): € 55–160/maand\n"
                "Domein & DNS: € 10–25/jaar\n"
                "Transactionele e-mail: € 0–20/maand\n"
                ""
            )
            _write_with_font(page5, area, generic, fontname=reg_font_5, fontsize=10.5, align=0)

        # Place near bottom of the bullet paragraph area (safe position).
        maint_rect = fitz.Rect(45.75, hdr.y1 + 160, 550, hdr.y1 + 178)
        _cover(page5, maint_rect, pad=0)
        _write_with_font(
            page5,
            maint_rect,
            "Onderhoud (retainer): € 200/maand (excl. btw) — start na go-live.",
            fontname=reg_font_5,
            fontsize=10,
            align=0,
        )

    # --- Page 7: betalingsvoorwaarden rewrite ---
    page7 = doc[6]
    reg_font_7, bold_font_7 = _ensure_fonts(page7)
    # Cover old milestone terms
    old_lines = [
        "40% bij start",
        "40% bij feature complete",
        "20% bij oplevering",
    ]

    new_lines = [
        "100% bij akkoord (voor start van de werkzaamheden)",
        "Onderhoud: € 200/maand vanaf go-live (maandelijks vooraf)",
        "Opzeg: maandelijks met 1 maand opzegtermijn",
    ]

    # Use the x-position of the first old line as baseline.
    first_rects = page7.search_for(old_lines[0])
    if first_rects:
        base = first_rects[0]
        x0 = base.x0
        x1 = 520
        y = base.y0
        line_h = 22

        # Cover area that contains the three old lines
        area = fitz.Rect(x0 - 5, y - 2, x1, y + line_h * 3)
        _cover(page7, area, pad=0)

        for i, line in enumerate(new_lines):
            r = fitz.Rect(x0, y + i * line_h, x1, y + (i + 1) * line_h)
            # Original payment terms use SegoeUI around 11.5
            _write_with_font(page7, r, line, fontname=reg_font_7, fontsize=11.5, align=0)

    # --- Page 6: assumptions & responsibilities (neutralize tech/provider mentions) ---
    page6 = doc[5]
    reg_font_6, bold_font_6 = _ensure_fonts(page6)

    # Replace the implementation line that mentions frontend/integrations/deploy.
    impl_anchor = page6.search_for("Frontend")
    if impl_anchor:
        # Cover the whole line region where "Frontend, integraties, deploy, basis QA" appears.
        r = impl_anchor[0]
        area = fitz.Rect(59.92, r.y0 - 2, 550, r.y1 + 2)
        _cover(page6, area, pad=0)
        _write_with_font(
            page6,
            area,
            "Saspire BV implementeert: webshop, koppelingen, oplevering en basis QA",
            fontname=reg_font_6,
            fontsize=11.5,
            align=0,
        )

    # Replace the external accounts line that mentions specific providers.
    ext_anchor = page6.search_for("Vercel")
    if ext_anchor:
        r = ext_anchor[0]
        area = fitz.Rect(45.75, r.y0 - 2, 550, r.y1 + 2)
        _cover(page6, area, pad=0)
        _write_with_font(
            page6,
            area,
            "Externe accounts (hosting, payments en e-mail) worden door Saspire BV opgezet zodra akkoord bereikt is; toegang/ownership wordt in overleg geregeld.",
            fontname=reg_font_6,
            fontsize=11.5,
            align=0,
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(OUT))
    doc.close()

    print(str(OUT))


if __name__ == "__main__":
    main()
