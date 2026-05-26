from __future__ import annotations

import datetime as _dt
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors


ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / "Offer" / "OFFERTE_SASPIRE_AAN_SLASH_NORELLE_WEBSHOP_NL_V2_5000_PLUS_200PM.pdf"


def _money(amount: str) -> str:
    return f"€ {amount}"


def build_pdf(out_path: Path) -> None:
    styles = getSampleStyleSheet()

    title = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontSize=22,
        leading=26,
        spaceAfter=10,
    )

    h1 = ParagraphStyle(
        "H1",
        parent=styles["Heading1"],
        fontSize=14,
        leading=18,
        spaceBefore=10,
        spaceAfter=6,
    )

    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontSize=10.5,
        leading=14,
        spaceAfter=6,
    )

    small = ParagraphStyle(
        "Small",
        parent=styles["BodyText"],
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#444444"),
        spaceAfter=4,
    )

    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Offerte — Norēlle Webshop (V2)",
        author="Saspire BV",
    )

    story = []

    story.append(Paragraph("Offerte (V2)", title))
    story.append(Paragraph("Norēlle Webshop — Headless WooCommerce + Next.js (App Router)", body))
    story.append(Paragraph("Scherpe pricing: <b>€ 5.000 excl. btw</b> (eenmalig) + <b>€ 200/maand excl. btw</b> (onderhoud)", body))
    story.append(Spacer(1, 6))

    # Parties table
    story.append(Paragraph("VAN (LEVERANCIER) / AAN (KLANT)", h1))
    parties = [
        ["VAN (LEVERANCIER)", "AAN (KLANT)"],
        [
            "Bedrijf: Saspire BV\nAdres: Hoogstraat 7, 2000 Antwerpen\nBTW/KBO: BE 1032.952.802\nContact: nicolas@saspire.org",
            "Bedrijf: Slash Agency (BV)\nAdres: Jules Missinnelaan 15, 8810 Lichtervelde\nBTW/KBO: BE 0799.321.768\nContact: lise-marie@slashagency.be / lennert@slashagency.be",
        ],
    ]
    t = Table(parties, colWidths=[85 * mm, 85 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 10),
                ("ALIGN", (0, 0), (-1, 0), "LEFT"),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D5DB")),
                ("FONTSIZE", (0, 1), (-1, 1), 9),
                ("LEADING", (0, 1), (-1, 1), 12),
                ("TOPPADDING", (0, 1), (-1, 1), 8),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 8),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 10))

    story.append(Paragraph("1. CONTEXT & DOEL", h1))
    story.append(
        Paragraph(
            "Slash Agency wenst een demo/launch-ready e-commerce platform voor Norēlle® (luxury pet fragrance), gebaseerd op Headless WooCommerce (WordPress/WooCommerce als backoffice/catalogus) en Next.js (snelle, merkgetrouwe storefront). Doel: een performante, SEO-sterke webshop die merkconsistent is en uitbreidbaar blijft.",
            body,
        )
    )

    story.append(Paragraph("2. PAKKET & PRIJS (LAUNCH MVP)", h1))
    story.append(
        Paragraph(
            "Onderstaande prijs is een vaste projectprijs (fixed price) met een budgetcap. Binnen dit budget leveren we een <b>productieklare Launch MVP</b> op met werkende checkout en betalingen.",
            body,
        )
    )

    package_rows = [
        ["PAKKET", "DOEL", "DOORLOOPTIJD", "PRIJS (EXCL. BTW)"],
        [
            "Launch MVP (All-in binnen cap)",
            "Productieklare webshop met headless WooCommerce, Next.js storefront, meertaligheid (EN/NL/FR) baseline, SEO basis, consent-aware tags basis, en werkende checkout + Stripe betalingen.",
            "10 werkdagen",
            _money("5.000"),
        ],
    ]
    pt = Table(package_rows, colWidths=[42 * mm, 78 * mm, 28 * mm, 32 * mm])
    pt.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 9),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D5DB")),
                ("FONTSIZE", (0, 1), (-1, 1), 8.8),
                ("LEADING", (0, 1), (-1, 1), 12),
                ("TOPPADDING", (0, 1), (-1, 1), 8),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 8),
            ]
        )
    )
    story.append(pt)

    story.append(Spacer(1, 8))
    story.append(Paragraph("Inbegrepen (samenvatting)", body))
    story.append(
        Paragraph(
            "- Shop/PLP, PDP, Cart, Checkout, order success/failure<br/>"
            "- Stripe (success/failure) + basis webhooks<br/>"
            "- Basis transactionele e-mails (WooCommerce standaard, 1 template set)<br/>"
            "- Klantaccount + order history (basis)<br/>"
            "- Wishlist (light)<br/>"
            "- Meertaligheid EN/NL/FR (technische baseline; content door klant/agency)<br/>"
            "- SEO basis (metadata + robots/sitemap aanwezig)<br/>"
            "- Consent-aware tags basis (essentiële tags)",
            small,
        )
    )

    story.append(Paragraph("3. SCOPE-AFBAKENING", h1))
    story.append(
        Paragraph(
            "Wat inbegrepen is, staat expliciet onder dit pakket. Niet inbegrepen tenzij expliciet vermeld: copywriting/vertalingen, productfotografie, juridisch advies, hosting/licenties/provider-kosten en integraties buiten scope. Wijzigingen buiten scope worden behandeld als change request (T&M of schriftelijke scope/prijsbevestiging).",
            body,
        )
    )

    story.append(Paragraph("4. HOSTING & TERUGKERENDE KOSTEN", h1))
    story.append(
        Paragraph(
            "Frontend hosting (Vercel): € 20–50/maand<br/>"
            "WooCommerce hosting (managed WordPress): € 35–90/maand<br/>"
            "Domein/DNS (Cloudflare): € 10–25/jaar<br/>"
            "Transactionele e-mail provider (Resend/SendGrid): € 0–20/maand<br/>"
            "Opmerking: bedragen zijn indicatief en exclusief variabele kosten zoals payment fees (Stripe/PayPal) en eventuele marketing/analytics tooling.",
            small,
        )
    )

    story.append(Paragraph("5. ONDERHOUD & SUPPORT (RETAINER)", h1))
    story.append(
        Paragraph(
            f"Vanaf go-live/oplevering in productie start een onderhoudsretainer van <b>{_money('200')}/maand excl. btw</b>.",
            body,
        )
    )
    story.append(
        Paragraph(
            "Inbegrepen: basis technisch onderhoud (updates), security updates + basis checks, incident triage, en kleine fixes/aanpassingen tot 1 uur/maand. Meerwerk buiten inbegrepen tijd gebeurt als T&M na akkoord.",
            body,
        )
    )

    story.append(PageBreak())

    story.append(Paragraph("6. ASSUMPTIES & VERANTWOORDELIJKHEDEN", h1))
    story.append(
        Paragraph(
            "Slash Agency levert tijdig: definitieve copy/teksten (NL/FR/EN), productfoto’s en merkassets, en juridische teksten (privacy/terms) of finale goedkeuring. Saspire BV implementeert: frontend, integraties, deploy, basis QA. Externe accounts (Vercel, Stripe, e-mail provider) worden opgezet zodra akkoord over de offerte is bereikt; toegang/ownership wordt in overleg geregeld.",
            body,
        )
    )

    story.append(Paragraph("7. BETALINGSVOORWAARDEN", h1))
    story.append(
        Paragraph(
            f"Eenmalige projectkost: <b>{_money('5.000')} excl. btw</b> wordt <b>100% gefactureerd bij akkoord</b> (voor start van de werkzaamheden). Start na ondertekende offerte en ontvangst betaling.",
            body,
        )
    )
    story.append(
        Paragraph(
            f"Onderhoudsretainer: <b>{_money('200')}/maand excl. btw</b> start vanaf go-live/oplevering in productie en wordt maandelijks vooraf gefactureerd. Maandelijks opzegbaar met 1 maand opzegtermijn (minimum 3 maanden aanbevolen).",
            body,
        )
    )

    story.append(Paragraph("8. ACCEPTATIE & OPLEVERING", h1))
    story.append(
        Paragraph(
            "Oplevering gebeurt wanneer: de afgesproken scope in productie/preview draait; kritieke flows (shop → PDP → cart → checkout → payment) werken volgens Launch MVP scope; SEO assets (sitemap/robots/metadata basis) aanwezig zijn.",
            body,
        )
    )

    story.append(Paragraph("9. ONDERTEKENING", h1))
    today = _dt.date.today().strftime("%d/%m/%Y")
    story.append(Paragraph(f"Datum: {today}", body))

    sign_rows = [
        ["Saspire BV", "Slash Agency (BV)"],
        ["Naam:\nDatum:\nHandtekening:", "Naam:\nDatum:\nHandtekening:"],
    ]
    st = Table(sign_rows, colWidths=[85 * mm, 85 * mm], rowHeights=[10 * mm, 35 * mm])
    st.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F3F4F6")),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D5DB")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
            ]
        )
    )
    story.append(Spacer(1, 6))
    story.append(st)

    doc.build(story)


def main() -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(OUT_PATH)
    print(str(OUT_PATH))


if __name__ == "__main__":
    main()
