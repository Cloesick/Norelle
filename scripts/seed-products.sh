#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

wp core is-installed --allow-root >/dev/null
wp plugin is-active woocommerce --allow-root >/dev/null

# Categories (idempotent)
wp term create product_cat "Necklaces" --allow-root >/dev/null 2>&1 || true
wp term create product_cat "Rings" --allow-root >/dev/null 2>&1 || true
wp term create product_cat "Earrings" --allow-root >/dev/null 2>&1 || true
wp term create product_cat "Bracelets" --allow-root >/dev/null 2>&1 || true

IMG_DIR="/var/www/html/wp-content/uploads/extracted-webp"

import_images() {
  local -n _out_ids=$1
  _out_ids=()

  if [ ! -d "$IMG_DIR" ]; then
    return 0
  fi

  mapfile -t files < <(ls -1 "$IMG_DIR"/*.webp 2>/dev/null | head -n 8 || true)
  if [ "${#files[@]}" -eq 0 ]; then
    return 0
  fi

  for f in "${files[@]}"; do
    id=$(wp media import "$f" --porcelain --allow-root)
    _out_ids+=("$id")
    echo "Imported $(basename "$f") => attachment $id"
  done
}

product_exists_by_sku() {
  local sku="$1"
  wp post list --post_type=product --meta_key=_sku --meta_value="$sku" --field=ID --allow-root 2>/dev/null | head -n 1
}

create_product() {
  local title="$1"
  local cat="$2"
  local price="$3"
  local sku="$4"
  local stock="$5"
  local thumb_id="${6:-}"

  existing_id=$(product_exists_by_sku "$sku" || true)
  if [ -n "${existing_id:-}" ]; then
    echo "Product with SKU $sku already exists (ID $existing_id), skipping"
    return 0
  fi

  pid=$(wp post create --post_type=product --post_status=publish --post_title="$title" --porcelain --allow-root)

  wp post meta update "$pid" _sku "$sku" --allow-root >/dev/null
  wp post meta update "$pid" _regular_price "$price" --allow-root >/dev/null
  wp post meta update "$pid" _price "$price" --allow-root >/dev/null
  wp post meta update "$pid" _stock_status instock --allow-root >/dev/null
  wp post meta update "$pid" _manage_stock yes --allow-root >/dev/null
  wp post meta update "$pid" _stock "$stock" --allow-root >/dev/null
  wp post meta update "$pid" _visibility visible --allow-root >/dev/null
  wp post meta update "$pid" _virtual no --allow-root >/dev/null
  wp post meta update "$pid" _downloadable no --allow-root >/dev/null

  wp post term set "$pid" product_cat "$cat" --allow-root >/dev/null

  if [ -n "${thumb_id:-}" ]; then
    wp post meta update "$pid" _thumbnail_id "$thumb_id" --allow-root >/dev/null
  fi

  echo "Created product $pid: $title ($sku)"
}

ATTACH_IDS=()
import_images ATTACH_IDS
thumb_fallback="${ATTACH_IDS[0]:-}"

create_product "Norelle Signature Necklace" "Necklaces" "89" "NOR-NECK-001" "12" "${ATTACH_IDS[0]:-$thumb_fallback}"
create_product "Norelle Minimal Ring" "Rings" "59" "NOR-RING-001" "18" "${ATTACH_IDS[1]:-$thumb_fallback}"
create_product "Norelle Pearl Drop Earrings" "Earrings" "69" "NOR-EARR-001" "15" "${ATTACH_IDS[2]:-$thumb_fallback}"
create_product "Norelle Classic Bracelet" "Bracelets" "75" "NOR-BRAC-001" "10" "${ATTACH_IDS[3]:-$thumb_fallback}"
create_product "Norelle Layered Necklace" "Necklaces" "99" "NOR-NECK-002" "8" "${ATTACH_IDS[4]:-$thumb_fallback}"
create_product "Norelle Stacking Ring Set" "Rings" "79" "NOR-RING-002" "9" "${ATTACH_IDS[5]:-$thumb_fallback}"

wp rewrite flush --hard --allow-root >/dev/null

echo "DONE"
