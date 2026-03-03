# Norelle — WooCommerce Webshop

A premium WooCommerce webshop for the Norelle jewellery brand, built as a custom Storefront child theme on WordPress + XAMPP.

> **Gebruikersdocumentatie (Nederlands):** zie [`docs/HANDLEIDING.md`](docs/HANDLEIDING.md)

---

## Tech Stack

| Component | Version | Role |
|-----------|---------|------|
| **WordPress** | 6.9.1 | CMS |
| **WooCommerce** | latest | E-commerce engine |
| **Storefront** | latest | Parent theme |
| **Norelle** | 1.0.0 | Custom child theme (mobile-first) |
| **PHP** | 8.2.12 | Runtime (XAMPP) |
| **MySQL** | MariaDB (XAMPP) | Database |
| **Apache** | 2.4.58 | Web server (XAMPP) |

## Brand Design System

```css
:root {
  --norelle-burgundy:       #3b0505;   /* Primary — deep burgundy bg */
  --norelle-cream:          #eeefc9;   /* Text & accents on dark */
  --norelle-light-cream:    #fffaea;   /* Light backgrounds */
  --norelle-burgundy-light: #5a1a1a;   /* Hover / alternating rows */
  --norelle-burgundy-dark:  #2a0303;   /* Active / pipeline bg */
  --norelle-text:           #eeefc9;   /* Alias for cream */
  --norelle-text-muted:     rgba(238,239,201,0.6);
  --norelle-border:         rgba(238,239,201,0.2);
  --norelle-shadow:         rgba(0,0,0,0.2);
  --norelle-radius:         2px;
  --norelle-transition:     0.3s cubic-bezier(0.4,0,0.2,1);
}
/* Typography: Cormorant Garamond (Google Fonts) — serif, elegant */
```

---

## Local Development Setup (XAMPP)

### Prerequisites
- [XAMPP](https://www.apachefriends.org/) installed at `C:\xampp`
- Apache + MySQL running

### Installation

The WordPress installation lives at `C:\xampp\htdocs\norelle\`.

```
http://localhost/norelle/          → Store
http://localhost/norelle/wp-admin/ → Admin
http://localhost/norelle/shop/     → Shop
```

### Admin Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `norelle_admin_2024` |
| Email | `admin@norelle.com` |

> ⚠️ **Change these before going live.**

### Database

| Setting | Value |
|---------|-------|
| DB Name | `norelle_wp` |
| DB User | `root` |
| DB Pass | *(empty)* |
| DB Host | `localhost` |
| Prefix | `wp_` |

---

## Project Structure

```
Norelle/
├── docs/
│   └── HANDLEIDING.md              # User guide (Dutch)
├── Logo/
│   ├── SVG/                        # Logo vector files
│   ├── AI/                         # Adobe Illustrator source
│   ├── EPS/                        # EPS format
│   ├── PDF/                        # PDF format
│   └── ICON/
│       ├── SVG/                    # Icon vector files
│       └── PNG/                    # Icon raster files
├── tests/
│   └── norelle-tests.html          # Automated browser test suite (50+ tests)
├── theme/
│   └── norelle/                    # Custom WooCommerce child theme
│       ├── style.css               # Mobile-first CSS (2500+ lines)
│       ├── functions.php           # Theme logic, hooks, 40+ functions
│       └── screenshot.png          # Theme thumbnail (1200×900)
├── scripts/
│   └── setup.sh                    # Docker WP-CLI setup (alternative)
├── plugins/                        # Custom plugins (reserved)
├── uploads/                        # WordPress uploads (reserved)
├── docker-compose.yml              # Docker setup (alternative to XAMPP)
├── .env                            # Environment variables
├── .gitignore
├── NORELLE.pdf                     # Brand guidelines
└── README.md                       # This file
```

---

## Theme Architecture

### `theme/norelle/style.css` — Mobile-First Architecture

CSS-only child theme inheriting from Storefront, rebuilt with a **mobile-first** approach. All base styles target mobile; `min-width` media queries progressively enhance for larger screens. **Zero `max-width` media queries remain.**

#### CSS Section Map (~2500 lines)

| Section | Purpose |
|---------|---------|
| **Storefront Customizer Overrides** | Counters Storefront's inline `<style>` block (~40 rules) that inject white/gray colors |
| **WooCommerce Block Overrides** | Dark-themes all `wc-block-*` components (buttons, inputs, totals, checkout steps) |
| **Global Reset & Base** | Burgundy bg, cream text, Cormorant Garamond font, tap highlights |
| **Typography** | Mobile base 15px/1.6rem → tablet 16px/2rem → desktop 17px/3rem |
| **Header** | CSS Grid: logo / hamburger / actions; hamburger visible on mobile, inline nav on desktop |
| **Hamburger Menu** | `display: flex` by default, `display: none` at `min-width: 769px` |
| **Navigation** | Hidden on mobile (`display: none`), shown with `.norelle-nav-open` toggle |
| **Footer** | 4-column grid: 1-col mobile → 2-col tablet → 4-col desktop |
| **Buttons & Forms** | Cream fill → outline hover; dark-themed inputs with cream text |
| **Product Grid** | 1-col mobile → 2-col tablet → 3-col desktop |
| **Single Product** | Stacked gallery/summary on mobile, side-by-side on desktop |
| **Cart & Checkout** | Stacked mobile layout, touch-friendly 48px inputs |
| **My Account** | Stacked nav on mobile, sidebar on desktop |
| **Trust Bar** | Wrapped 2×2 on mobile, inline row on desktop |
| **Newsletter** | Stacked column on mobile, inline row on tablet+ |
| **Sales Pipeline** | 5-stage animated progress (32px icons mobile, 40px desktop) |
| **Sticky Add-to-Cart** | Mobile-only fixed bar on single product pages |
| **Select2 / Star Ratings** | Dark-themed WooCommerce dropdowns and reviews |

#### Responsive Breakpoints

| Breakpoint | What scales up |
|---|---|
| **Base (0px+)** | 15px body, hamburger visible, stacked layouts, 1-col grids |
| **≥ 481px** | 2-col product grid, inline newsletter, row checkout trust |
| **≥ 601px** | 2-col contact form, larger pipeline icons |
| **≥ 769px** | 17px body, hamburger hidden, inline nav, 3-col grid, side-by-side product |

### `theme/norelle/functions.php` — 40+ Functions

All PHP logic for the child theme, organized by concern:

#### Core & Assets

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_enqueue_styles()` | `wp_enqueue_scripts` | Loads Google Fonts → Storefront → Norelle CSS |
| `norelle_theme_setup()` | `after_setup_theme` | Logo, WooCommerce features, nav menus |
| `norelle_widgets_init()` | `widgets_init` | 3 footer widget areas |
| `norelle_body_class()` | `body_class` | Adds `.norelle-theme` class |
| `norelle_preload_fonts()` | `wp_head` @ 1 | Google Fonts preconnect |

#### Mobile & Navigation

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_mobile_menu_button()` | `storefront_header` @ 69 | Injects hamburger `<button>` into header |
| `norelle_mobile_menu_script()` | `wp_footer` @ 99 | JS toggle: aria-expanded, icon swap ☰/✕, nav open/close |

#### Header & Footer

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_restructure_header()` | `init` | Removes search, social, secondary nav |
| `norelle_header_account_link()` | `storefront_header` @ 70 | Account + cart quick links |
| `norelle_restructure_footer()` | `init` | Removes default footer + credit |
| `norelle_custom_footer()` | `storefront_footer` @ 10 | 4-column grid (brand, shop, help, social) |

#### Homepage Sections

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_remove_storefront_defaults()` | `init` | Removes default homepage sections |
| `norelle_homepage_hero()` | `homepage` @ 10 | Hero banner with CTA |
| `norelle_homepage_featured()` | `homepage` @ 20 | Featured products shortcode |
| `norelle_homepage_new_arrivals()` | `homepage` @ 30 | Recent products shortcode |
| `norelle_homepage_on_sale()` | `homepage` @ 35 | On Sale products section |
| `norelle_homepage_trust_bar()` | `homepage` @ 5 | 4 USP icons (shipping, returns, secure, support) |
| `norelle_homepage_newsletter()` | `homepage` @ 60 | Email capture form |

#### WooCommerce — Shop & Products

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_wc_products_per_row()` | `loop_shop_columns` | 3 columns |
| `norelle_wc_products_per_page()` | `loop_shop_per_page` | 12 per page |
| `norelle_add_to_cart_text()` | `woocommerce_product_*_add_to_cart_text` | "Add to Bag" |
| `norelle_ensure_product_tags()` | `init` | Creates New Collection + Outlet tags |
| `norelle_custom_sorting_options()` | `woocommerce_catalog_orderby` | Adds "New Collection" and "Outlet" sort |
| `norelle_custom_sorting_query()` | `woocommerce_get_catalog_ordering_args` | Filters products by tag |
| `norelle_sale_percentage_badge()` | `woocommerce_sale_flash` | Shows "-20%" badge on sale products |

#### WooCommerce — Sales & UX

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_product_urgency()` | `woocommerce_single_product_summary` @ 25 | "Limited stock" urgency message |
| `norelle_social_proof()` | `woocommerce_single_product_summary` @ 26 | "X people viewed this today" |
| `norelle_free_shipping_notice()` | `woocommerce_before_cart` | "Free shipping from €75" bar |
| `norelle_cross_sell_heading()` | `filter` | Custom cross-sell heading |
| `norelle_checkout_trust()` | `woocommerce_review_order_after_submit` | Trust icons below checkout button |
| `norelle_thankyou_share()` | `woocommerce_thankyou` | Social share buttons on confirmation |
| `norelle_empty_cart_message()` | `woocommerce_cart_is_empty` | Branded empty-cart message |
| `norelle_sticky_add_to_cart()` | `woocommerce_after_single_product` | Mobile-only sticky bar |

#### Sales Pipeline

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_get_pipeline_stage()` | — | Returns 0–5 based on current page |
| `norelle_sales_pipeline()` | `storefront_before_content` @ 5 | 5-stage animated progress indicator |

#### Other

| Function | Hook | Purpose |
|----------|------|---------|
| `norelle_login_styles()` | `login_enqueue_scripts` | Branded login page |
| `norelle_login_url()` | `login_headerurl` | Logo links to homepage |
| `norelle_contact_form_shortcode()` | `[norelle_contact_form]` | Custom contact form shortcode |

---

## WooCommerce Configuration

### Currency & Locale

| Setting | Value |
|---------|-------|
| Currency | EUR (€) |
| Position | Left with space (`€ 189,00`) |
| Decimal separator | `,` |
| Thousand separator | `.` |
| Default country | Belgium (BE) |
| Weight unit | kg |
| Dimension unit | cm |
| Timezone | Europe/Brussels |

### Tax

| Rate | Country | Name | Shipping |
|------|---------|------|----------|
| 21% | BE | BTW | Yes |
| 21% | * (fallback) | VAT | Yes |

Prices are displayed **including tax**. Tax is calculated based on shipping address.

### Shipping Zones

| Zone | Countries | Flat Rate | Free Shipping |
|------|-----------|-----------|---------------|
| Belgium | BE | €5,95 | Orders ≥ €75 |
| European Union | 26 EU countries | €9,95 | Orders ≥ €150 |
| Rest of World | All others | €19,95 | — |

### Payment Gateways

| Gateway | Plugin | Status |
|---------|--------|--------|
| Bank Transfer (BACS) | Built-in | ✅ Enabled |
| Stripe (Credit Card) | `woocommerce-gateway-stripe` | ⚠️ Needs API keys |
| PayPal | `woocommerce-paypal-payments` | ⚠️ Needs credentials |

### Pages

| Page | Slug | WooCommerce Role |
|------|------|-----------------|
| Home | `/` | Front page |
| Shop | `/shop/` | Product archive |
| Cart | `/cart/` | Cart |
| Checkout | `/checkout/` | Checkout |
| My Account | `/my-account/` | Customer account |
| Privacy Policy | `/privacy-policy/` | GDPR privacy page |
| Terms & Conditions | `/terms-and-conditions/` | Checkout T&C |
| Returns & Refunds | `/returns-refunds/` | Return policy |
| Shipping | `/shipping-policy/` | Shipping info |
| About Norelle | `/about/` | Brand story |
| Contact | `/contact/` | Contact info |

---

## Installed Plugins

| Plugin | Slug | Purpose |
|--------|------|---------|
| WooCommerce | `woocommerce` | E-commerce engine |
| Stripe Gateway | `woocommerce-gateway-stripe` | Credit/debit card payments |
| PayPal Payments | `woocommerce-paypal-payments` | PayPal checkout |
| Yoast SEO | `wordpress-seo` | Search engine optimization |
| Wordfence Security | `wordfence` | Firewall & malware scanner |
| Cookie Notice | `cookie-notice` | GDPR cookie consent banner |
| WP Mail SMTP | `wp-mail-smtp` | Email delivery |
| MonsterInsights | `google-analytics-for-wordpress` | Google Analytics |

---

## Products

12 sample products across 5 categories:

| SKU | Product | Category | Price | Sale |
|-----|---------|----------|-------|------|
| NOR-NK-001 | Aurelia Gold Necklace | Necklaces | €189 | — |
| NOR-ER-001 | Luna Pearl Earrings | Earrings | €129 | €109 |
| NOR-BR-001 | Celeste Chain Bracelet | Bracelets | €149 | — |
| NOR-RG-001 | Soleil Signet Ring | Rings | €169 | — |
| NOR-ER-002 | Étoile Diamond Studs | Earrings | €249 | — |
| NOR-NK-002 | Rivière Layering Necklace Set | Necklaces | €259 | €229 |
| NOR-BR-002 | Belle Époque Cuff | Bracelets | €199 | — |
| NOR-CL-001 | Première Collection Box | Collections | €449 | €399 |
| NOR-NK-003 | Noir Onyx Pendant | Necklaces | €159 | — |
| NOR-RG-002 | Fleur Twisted Ring | Rings | €139 | €119 |
| NOR-ER-003 | Lumière Hoop Earrings | Earrings | €159 | — |
| NOR-BR-003 | Jardin Charm Bracelet | Bracelets | €179 | — |

---

## Navigation Menus

### Primary Menu (header)
Home → Shop → Necklaces → Earrings → Bracelets → Rings → Collections → About → Contact

### Footer (hardcoded in `functions.php`)
4-column grid: Brand info | Shop links | Help links | Social links

---

## Test Suite

The project includes an automated browser test suite at `tests/norelle-tests.html` with **50+ tests** covering:

| Category | Tests |
|----------|-------|
| Homepage & Layout | Hero, trust bar, featured sections, newsletter |
| Header & Navigation | Logo, nav, dropdowns, account link, cart icon |
| Footer | Grid, 4 columns, copyright, social links |
| Shop & Products | Product grid, "Add to Bag", sale badges, EUR prices |
| Single Product | Page load, CTA, social proof, tabs |
| Cart & Checkout | Pipeline visibility, page loads, login form |
| Legal & GDPR | Privacy, T&C, returns, shipping, cookie banner |
| SEO & Performance | Title, meta, fonts, canonical, sitemap |
| Category Pages | Necklaces, earrings, bracelets, rings |
| **Cross-Page Consistency** | Header/footer/hamburger/nav/actions/footer-grid on all 5 pages, pipeline visibility rules, CSS load order |

**To run:** Open `tests/norelle-tests.html` in a browser, set the base URL, and click "Run All Tests".

---

## Deploying to Production

### Option A: Managed WordPress Hosting (recommended)
1. Install [Duplicator](https://wordpress.org/plugins/duplicator/) plugin
2. Create a package (full site backup)
3. Upload to production host and run the installer
4. Update `siteurl` and `home` in `wp_options`
5. Configure SSL, SMTP, payment gateways

### Option B: Manual Migration
```bash
# Export database
C:\xampp\mysql\bin\mysqldump.exe -u root norelle_wp > backup.sql

# Upload to production:
# 1. wp-content/themes/norelle/     → theme files
# 2. wp-content/uploads/            → media files
# 3. wp-content/plugins/            → all plugins
# 4. backup.sql                     → import into production DB
# 5. Update wp-config.php           → production DB credentials
# 6. UPDATE wp_options SET option_value='https://norelle.com' WHERE option_name IN ('siteurl','home');
```

### Option C: Docker (alternative)
```bash
docker-compose up -d
# See docker-compose.yml for service definitions
```

---

## Security Checklist (Pre-Launch)

- [ ] Change admin password (`admin` / `norelle_admin_2024`)
- [ ] Set `WP_DEBUG` to `false` in `wp-config.php`
- [ ] Configure SSL/HTTPS
- [ ] Add Stripe API keys (live mode)
- [ ] Connect PayPal Business account
- [ ] Add IBAN to bank transfer settings
- [ ] Configure SMTP for email delivery
- [ ] Set up Wordfence firewall rules
- [ ] Test full checkout flow end-to-end
- [ ] Test mobile checkout flow (hamburger menu, sticky ATC, pipeline)
- [ ] Verify GDPR cookie banner works
- [ ] Submit sitemap to Google Search Console
- [ ] Set up automated backups
- [ ] Remove any setup/debug PHP files
- [ ] Run `tests/norelle-tests.html` — all tests green

---

## Email Configuration

| Setting | Value |
|---------|-------|
| From Name | Norelle |
| From Address | hello@norelle.com |
| Header Color | `#3b0505` (burgundy) |
| Background | `#fffaea` (light cream) |
| Text Color | `#3b0505` (burgundy) |
| Footer Text | Norelle — Timeless Elegance |

SMTP must be configured via **WP Mail SMTP** plugin before emails will be delivered reliably.

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Mobile-first CSS** | Base styles = mobile; `min-width` queries scale up. Better performance on mobile devices. |
| **Storefront child theme** | Inherits WooCommerce integration, updates safely. No core files modified. |
| **Storefront inline overrides** | Storefront Customizer injects ~40 inline `<style>` rules with white/gray colors. Our CSS loads after and uses `!important` to enforce the dark theme. |
| **PHP-injected hamburger** | Storefront's header structure can't be modified via CSS alone. Hamburger button injected via `storefront_header` hook at priority 69. |
| **JS menu toggle** | Lightweight vanilla JS in footer — no jQuery dependency. Toggles `aria-expanded` + `.norelle-nav-open` class. |
| **Sales pipeline** | Rendered server-side via PHP. Stage detection uses WooCommerce conditional functions. Only shown on cart/checkout/confirmation. |
| **No build tools** | Pure CSS + PHP. No Sass, no Webpack. Simple to maintain and deploy. |

---

## License

Theme: GPL v2 or later. Brand assets (Logo/, NORELLE.pdf) are proprietary to Norelle.
