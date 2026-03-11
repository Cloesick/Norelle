# Norēlle® Brand Guide — Digital Implementation Reference

> Extracted from NORELLE.pdf (33-page branding guide by Slash Agency)

---

## 1. Brand Identity

- **Brand name**: Norēlle® (note: macron over the 'e', registered trademark)
- **Tagline / Baseline**: "for those we live with"
- **Industry**: Luxury pet fragrance (NOT jewelry)
- **Origin**: Belgian luxury brand
- **Logo variants**:
  - **Full logo**: "Norēlle®" wordmark + baseline "for those we live with"
  - **Icon**: Artistic monogram — intertwined "N", "e", "l", "l", "e" letters
  - **Wordmark**: "Norēlle" standalone
  - **Baseline only**: "for those we live with"

---

## 2. Color Palette (EXACTLY 3 colors)

| Name           | Hex       | RGB           | CMYK            | Role              |
|----------------|-----------|---------------|-----------------|-------------------|
| **Bourgondië** | `#3B0505` | 59, 5, 5      | 35, 100, 75, 82 | Primary / Main    |
| **Floral White** | `#FFFAEB` | 255, 250, 235 | 0, 2, 11, 0     | Sub-color / Light |
| **Deep Mocha** | `#2F1B1A` | 46, 26, 25    | 55, 72, 60, 82  | Sub-color / Dark  |

### Usage rules
- Bourgondië is the MAIN brand color — used for backgrounds, primary surfaces, packaging
- Floral White is used for text on dark backgrounds, light surfaces, contrast elements
- Deep Mocha is an alternative dark — used for text on light backgrounds, subtle dark variations
- NO other colors. No gold. No arbitrary grays. Only these three.

---

## 3. Typography

### Logo Font: Swear Display
- **Weights**: Thin, Thin Italic
- **Character**: High-contrast serif, elegant ball terminals, very thin strokes
- **Usage**: Logo, hero headings, display text
- **Web substitute**: Cormorant (weight 300) — closest free high-contrast serif

### Secondary Font: Gravita GEO
- **Weights**: Thin, Light
- **Character**: Geometric sans-serif, perfect circles, clean and minimal
- **Usage**: All headings (KAPITALEN / ALL CAPS), body text (lowercase), UI elements, navigation
- **Web substitute**: Jost (weight 300-400) — closest free geometric sans

### Heading Hierarchy
- ALL headings use **ALL CAPS** (Kapitalen) in the secondary font (Gravita GEO / Jost)
- Heading levels decrease in size, all remain uppercase
- Extremely light font weight (Thin to Light)

### Body Text
- Secondary font in lowercase (Onderkast)
- Light weight (300-400)
- Clean, airy, lots of line height

---

## 4. Visual Style (Beeldstijl)

### Photography
- Lifestyle-oriented luxury contexts
- Warm, natural light with shallow depth of field
- Muted, warm tones (not cold/clinical)
- Surfaces: marble, stone, satin, linen, velvet
- Settings: urban lifestyle, natural outdoor, home interior

### Products
- **Full-size bottles**: Clear glass cylindrical, burgundy or cream sphere caps
- **Travel sprays**: Slim glass tubes, burgundy or cream flat caps
- Product photography always includes lifestyle context (hands, accessories, fabrics)

### Layout Principles
- **Extreme minimalism** — vast negative space
- **Restraint** — never busy, never cluttered
- Clean grid layouts
- No decorative borders, no gradients, no shadows (except in product photos)
- Let the content breathe

### Packaging & Print
- Business cards: Burgundy background, cream text, Gravita GEO font
- Shopping bags: Deep burgundy with large monogram icon, same-tone emboss
- Drawstring bags: Natural linen/cotton with subtle monogram
- Thank you cards: Personal, emotional, referencing pet names

---

## 5. Product Lines

| Name       | Function                      | Personality                    |
|------------|-------------------------------|--------------------------------|
| **Élevé**  | Special occasions             | Elevated, ceremonial, refined  |
| **Solène** | Masking outdoor scents        | Serene, pure, restorative      |
| **Fovère** | Blending with home scents     | Warm, enveloping, harmonious   |

---

## 6. Brand Voice

- **Tone**: Quiet confidence, understated elegance
- **Language**: Refined but warm, never flashy or salesy
- **Positioning**: Premium pet care as an act of love, not vanity
- **Key phrase**: "for those we live with" — positions pets as family

---

## 7. Web Implementation Tokens

```
/* Colors */
--norelle-bourgondie: #3B0505;
--norelle-floral-white: #FFFAEB;
--norelle-deep-mocha: #2F1B1A;

/* Font families */
--font-display: 'Cormorant', serif;        /* Swear Display substitute */
--font-body: 'Jost', sans-serif;           /* Gravita GEO substitute */

/* Font weights */
--weight-thin: 300;
--weight-light: 400;

/* Letter spacing */
--tracking-heading: 0.15em;
--tracking-body: 0.02em;
--tracking-nav: 0.1em;
```

---

## 8. What the Current Frontend Gets WRONG

1. ❌ Called "Luxury Belgian Jewelry" — it's luxury pet fragrance
2. ❌ Wrong colors (#5a1a1a, #eeefc9, gold accents) — should be #3B0505, #FFFAEB, #2F1B1A only
3. ❌ Wrong fonts (Cormorant Garamond Bold + Inter) — should be Cormorant Light + Jost Light
4. ❌ Font weights too heavy — brand uses Thin/Light exclusively
5. ❌ Too many decorative elements — brand demands extreme minimalism
6. ❌ Wrong product data — jewelry items instead of fragrances
7. ❌ Missing baseline "for those we live with"
8. ❌ No brand icon usage
9. ❌ Heading style wrong — should be ALL CAPS geometric sans, not serif
10. ❌ Overall feel is generic luxury — should be quiet, restrained, warm Belgian elegance
