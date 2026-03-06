#!/bin/bash
# Norelle WooCommerce â€” Automated Setup Script
# ==============================================
# This script runs via WP-CLI inside Docker to:
# 1. Wait for WordPress to be ready
# 2. Install & configure WordPress
# 3. Install & activate WooCommerce
# 4. Activate the Norelle theme
# 5. Configure basic WooCommerce settings

set -e

echo "â³ Waiting for WordPress to be ready..."
sleep 15

# Wait for WordPress database to be available
DB_HOST_ONLY="${WORDPRESS_DB_HOST%%:*}"
DB_PORT_ONLY="${WORDPRESS_DB_HOST##*:}"
if [ "${DB_PORT_ONLY}" = "${WORDPRESS_DB_HOST}" ]; then
  DB_PORT_ONLY="3306"
fi

until mysqladmin ping \
  -h "${DB_HOST_ONLY:-db}" \
  -P "${DB_PORT_ONLY}" \
  --protocol=tcp \
  --skip-ssl \
  --skip-ssl-verify-server-cert \
  -u"${WORDPRESS_DB_USER:-root}" \
  -p"${WORDPRESS_DB_PASSWORD:-${MYSQL_ROOT_PASSWORD:-}}" \
  --silent 2>/dev/null; do
  echo "â³ Database not ready yet, retrying in 5s..."
  sleep 5
done

echo "âœ… Database is ready."

# Ensure required directories exist and are writable (WP-CLI installs/plugins need these)
mkdir -p /var/www/html/wp-content/uploads /var/www/html/wp-content/upgrade
chmod -R 777 /var/www/html/wp-content/uploads /var/www/html/wp-content/upgrade || true

# Check if WordPress is already installed
if wp core is-installed --allow-root 2>/dev/null; then
  echo "âœ… WordPress is already installed."
else
  echo "ðŸ”§ Installing WordPress..."
  wp core install \
    --url="${WP_SITE_URL:-http://localhost:8080}" \
    --title="${WP_SITE_TITLE:-Norelle}" \
    --admin_user="${WP_ADMIN_USER:-admin}" \
    --admin_password="${WP_ADMIN_PASSWORD:-norelle_admin_2024}" \
    --admin_email="${WP_ADMIN_EMAIL:-admin@norelle.com}" \
    --skip-email \
    --allow-root
  echo "âœ… WordPress installed."
fi

# Set permalink structure (important for WooCommerce)
echo "ðŸ”§ Configuring permalinks..."
wp rewrite structure '/%postname%/' --allow-root
wp rewrite flush --allow-root

# Install and activate WooCommerce
if wp plugin is-installed woocommerce --allow-root 2>/dev/null; then
  echo "âœ… WooCommerce is already installed."
  wp plugin activate woocommerce --allow-root 2>/dev/null || true
else
  echo "ðŸ”§ Installing WooCommerce..."
  wp plugin install woocommerce --activate --allow-root
  echo "âœ… WooCommerce installed and activated."
fi

# Install and activate Storefront parent theme (Norelle's parent)
if wp theme is-installed storefront --allow-root 2>/dev/null; then
  echo "âœ… Storefront theme already installed."
else
  echo "ðŸ”§ Installing Storefront theme..."
  wp theme install storefront --allow-root
  echo "âœ… Storefront theme installed."
fi

# Activate Norelle child theme
if wp theme is-installed norelle --allow-root 2>/dev/null; then
  echo "ðŸ”§ Activating Norelle theme..."
  wp theme activate norelle --allow-root
  echo "âœ… Norelle theme activated."
else
  echo "âš ï¸  Norelle theme not found. Activating Storefront instead."
  wp theme activate storefront --allow-root
fi

# Create WooCommerce pages
echo "ðŸ”§ Setting up WooCommerce pages..."
wp wc --user=admin tool run install_pages --allow-root 2>/dev/null || \
  echo "âš ï¸  WooCommerce pages may need manual setup via admin."

# Configure WooCommerce settings
echo "ðŸ”§ Configuring WooCommerce settings..."
wp option update woocommerce_currency 'EUR' --allow-root
wp option update woocommerce_currency_pos 'left_space' --allow-root
wp option update woocommerce_price_decimal_sep ',' --allow-root
wp option update woocommerce_price_thousand_sep '.' --allow-root
wp option update woocommerce_price_num_decimals '2' --allow-root
wp option update woocommerce_default_country 'BE' --allow-root
wp option update woocommerce_calc_taxes 'yes' --allow-root
wp option update woocommerce_enable_reviews 'yes' --allow-root

# Set timezone
wp option update timezone_string 'Europe/Brussels' --allow-root
wp option update date_format 'd/m/Y' --allow-root

# Remove default content
wp post delete 1 --force --allow-root 2>/dev/null || true
wp post delete 2 --force --allow-root 2>/dev/null || true

# Install useful plugins
echo "ðŸ”§ Installing additional plugins..."

# SEO
wp plugin install wordpress-seo --activate --allow-root 2>/dev/null || \
  echo "âš ï¸  Could not install Yoast SEO."

# Security
wp plugin install wordfence --activate --allow-root 2>/dev/null || \
  echo "âš ï¸  Could not install Wordfence."

# Performance
wp plugin install wp-super-cache --activate --allow-root 2>/dev/null || \
  echo "âš ï¸  Could not install WP Super Cache."

echo ""
echo "=========================================="
echo "  ðŸŽ‰ Norelle WooCommerce Setup Complete!"
echo "=========================================="
echo ""
echo "  ðŸŒ Store:      ${WP_SITE_URL:-http://localhost:8080}"
echo "  ðŸ”§ Admin:      ${WP_SITE_URL:-http://localhost:8080}/wp-admin"
echo "  ðŸ“Š phpMyAdmin:  http://localhost:8081"
echo ""
echo "  ðŸ‘¤ Admin User:  ${WP_ADMIN_USER:-admin}"
echo "  ðŸ”‘ Admin Pass:  ${WP_ADMIN_PASSWORD:-norelle_admin_2024}"
echo ""
echo "  ðŸ’° Currency:    EUR (â‚¬)"
echo "  ðŸŒ Country:     Belgium"
echo "=========================================="
