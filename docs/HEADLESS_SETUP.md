# Norēlle — Headless WooCommerce Setup

## Architecture

```
┌─────────────────────┐     REST API      ┌──────────────────────┐
│   Next.js (:3000)   │ ◄──────────────── │  WooCommerce (:8080) │
│   Customer frontend │     wc/v3         │  API backend only    │
│   App look & feel   │                   │  Product management  │
└─────────────────────┘                   │  Orders & payments   │
                                          │  Inventory & taxes   │
                                          └──────┬───────────────┘
                                                 │
                                          ┌──────┴───────────────┐
                                          │   MySQL 8.0 (:3306)  │
                                          └──────────────────────┘
```

- **Next.js** (`localhost:3000`) — the storefront customers see. App-like feel with bottom nav, page transitions, PWA support.
- **WordPress + WooCommerce** (`localhost:8080`) — headless API backend. Only you (admin) access this via `/wp-admin`.
- **phpMyAdmin** (`localhost:8081`) — database management UI.
- **MySQL 8.0** (`localhost:3306`) — database.

Customers **never** see WordPress. All e-commerce logic (products, orders, payments, taxes, shipping) is managed through WooCommerce's admin panel and exposed via the REST API.

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Node.js](https://nodejs.org/) 18+ installed
- Git

---

## Quick Start

### 1. Clone and enter the repo

```bash
git clone https://github.com/Cloesick/Norelle.git
cd Norelle
```

### 2. Create the `.env` file

Create a `.env` file in the repo root (not in `webshop/`):

```env
# MySQL
MYSQL_ROOT_PASSWORD=norelle_root_2024
MYSQL_DATABASE=norelle_wp
MYSQL_USER=norelle_user
MYSQL_PASSWORD=norelle_pass_2024

# WordPress Database Connection
WORDPRESS_DB_HOST=db:3306
WORDPRESS_DB_NAME=norelle_wp
WORDPRESS_DB_USER=norelle_user
WORDPRESS_DB_PASSWORD=norelle_pass_2024
WORDPRESS_TABLE_PREFIX=wp_
WORDPRESS_DEBUG=true

# WordPress Admin (used by WP-CLI setup script)
WP_SITE_URL=http://localhost:8080
WP_SITE_TITLE=Norelle
WP_ADMIN_USER=admin
WP_ADMIN_PASSWORD=norelle_admin_2024
WP_ADMIN_EMAIL=admin@norelle.com
```

### 3. Start the WooCommerce backend

```bash
docker compose up -d
```

Wait ~60 seconds for WP-CLI to finish the automated setup (WordPress install, WooCommerce, plugins, theme activation).

Check progress:
```bash
docker logs norelle-wpcli --follow
```

You'll see "Norelle WooCommerce Setup Complete!" when done.

### 4. Generate WooCommerce API keys

1. Open `http://localhost:8080/wp-admin`
2. Log in: `admin` / `norelle_admin_2024`
3. Go to **WooCommerce → Settings → Advanced → REST API**
4. Click **Add key**
5. Description: `Next.js Headless`
6. User: `admin`
7. Permissions: `Read/Write`
8. Click **Generate API key**
9. Copy the **Consumer key** and **Consumer secret**

### 5. Configure the Next.js frontend

Create `webshop/.env.local`:

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=http://localhost:8080
WOOCOMMERCE_CONSUMER_KEY=ck_your_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_consumer_secret_here
```

### 6. Install dependencies and start the frontend

```bash
cd webshop
npm install
npm run dev
```

The storefront is now live at `http://localhost:3000`.

---

## Project Structure

```
Norelle/
├── docker-compose.yml      # WooCommerce backend (MySQL + WordPress + WP-CLI + phpMyAdmin)
├── .env                    # Docker environment variables (gitignored)
├── scripts/
│   ├── setup.sh            # Automated WP-CLI setup (runs on docker compose up)
│   └── seed-products.sh    # Optional: seed sample products
├── theme/norelle/          # WordPress theme (mounted in Docker, minimal)
├── plugins/                # Custom WordPress plugins (mounted in Docker)
├── uploads/                # WordPress uploads (mounted in Docker)
├── nginx/                  # Nginx reverse proxy config (production)
├── docs/
│   ├── HEADLESS_SETUP.md   # This file
│   └── ...
└── webshop/                # Next.js frontend (the app customers see)
    ├── app/                # Next.js App Router pages
    │   ├── api/            # API routes proxying WooCommerce
    │   │   ├── products/   # GET /api/products, GET /api/products/[slug]
    │   │   ├── categories/ # GET /api/categories
    │   │   └── health/     # GET /api/health (connection check)
    │   ├── page.tsx        # Homepage
    │   ├── shop/           # Shop page
    │   └── template.tsx    # Page transitions (Framer Motion)
    ├── components/         # React components
    │   ├── BottomNav.tsx   # Mobile bottom navigation bar
    │   ├── Header.tsx      # Desktop header + mobile logo
    │   ├── Footer.tsx
    │   └── ProductCard.tsx
    ├── lib/
    │   └── woocommerce.ts  # WooCommerce REST API client
    ├── data/
    │   └── products.ts     # Static fallback product data
    ├── .env.local          # WooCommerce API keys (gitignored)
    └── public/
        ├── manifest.json   # PWA manifest
        └── images/         # Product images (placeholder SVGs for now)
```

---

## Services

| Service | URL | Purpose |
|---|---|---|
| **Next.js** | `http://localhost:3000` | Customer-facing storefront |
| **WordPress Admin** | `http://localhost:8080/wp-admin` | Product/order management |
| **WooCommerce API** | `http://localhost:8080/wp-json/wc/v3/` | REST API |
| **phpMyAdmin** | `http://localhost:8081` | Database management |

---

## WooCommerce API Endpoints

The Next.js app proxies these through its own API routes:

| Next.js Route | WooCommerce Endpoint | Description |
|---|---|---|
| `GET /api/products` | `wc/v3/products` | List all products |
| `GET /api/products/[slug]` | `wc/v3/products?slug=X` | Get product by slug |
| `GET /api/categories` | `wc/v3/products/categories` | List categories |
| `GET /api/health` | `wc/v3/system_status` | Connection check |

The WooCommerce client library (`lib/woocommerce.ts`) also exposes:
- `getProducts(params)` — fetch products with filters
- `getProductBySlug(slug)` — fetch single product
- `getProductById(id)` — fetch by ID
- `getFeaturedProducts()` — featured products only
- `getCategories()` — all categories
- `createOrder(data)` — create a new order
- `checkConnection()` — verify API connectivity

---

## Managing Products

Products are managed through the WooCommerce admin panel:

1. Go to `http://localhost:8080/wp-admin`
2. Navigate to **Products → Add New**
3. Add product name, description, price, images, categories
4. Set **Catalog visibility** to your preference
5. Click **Publish**

The Next.js frontend will automatically fetch and display the product via the API.

---

## Common Commands

```bash
# Start everything
docker compose up -d && cd webshop && npm run dev

# Stop WooCommerce backend
docker compose down

# Stop and remove all data (fresh start)
docker compose down -v

# View WP-CLI setup logs
docker logs norelle-wpcli

# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" --filter "name=norelle"

# Test WooCommerce API connection
curl http://localhost:3000/api/health
```

---

## Troubleshooting

### WP-CLI setup fails with `$'\r': command not found`
The `scripts/setup.sh` file has Windows line endings (CRLF). Fix:
```powershell
(Get-Content "scripts/setup.sh" -Raw) -replace "`r`n", "`n" | Set-Content "scripts/setup.sh" -NoNewline -Encoding utf8
docker restart norelle-wpcli
```

### WooCommerce API returns 401 Unauthorized
Your consumer key/secret in `webshop/.env.local` are wrong or expired. Regenerate them in WooCommerce → Settings → Advanced → REST API.

### Next.js can't reach WooCommerce
Make sure Docker containers are running: `docker ps`. The WordPress container must be healthy before the API works.

### Products don't show on the frontend
1. Check products exist in WooCommerce admin
2. Verify products are **Published** (not Draft)
3. Test the API directly: `http://localhost:8080/wp-json/wc/v3/products?consumer_key=ck_...&consumer_secret=cs_...`
4. Check `http://localhost:3000/api/health` for connection status

---

## Environment Files

| File | Location | Gitignored | Purpose |
|---|---|---|---|
| `.env` | Repo root | Yes | Docker/WordPress credentials |
| `.env.local` | `webshop/` | Yes | WooCommerce API keys for Next.js |

**Never commit these files.** They contain credentials.
