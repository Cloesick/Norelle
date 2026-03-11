<?php
/**
 * Seed Norēlle products into WooCommerce using internal PHP functions.
 * Run inside the WordPress container:
 *   docker cp scripts/seed-products.php norelle-wordpress:/tmp/seed-products.php
 *   docker exec norelle-wordpress php /tmp/seed-products.php
 */
require_once '/var/www/html/wp-load.php';

// ─── Categories ─────────────────────────────────────────────

$categories = [
    ['name' => 'Eau de Parfum', 'slug' => 'eau-de-parfum', 'desc' => 'Full-size luxury fragrances for your companion'],
    ['name' => 'Travel Sprays', 'slug' => 'travel', 'desc' => 'Portable elegance for on the go'],
    ['name' => 'Gift Sets', 'slug' => 'gift-sets', 'desc' => 'Curated collections presented in luxury packaging'],
];

$cat_ids = [];
foreach ($categories as $cat) {
    $existing = get_term_by('slug', $cat['slug'], 'product_cat');
    if ($existing) {
        $cat_ids[$cat['slug']] = $existing->term_id;
        echo "⏭️  Category: {$cat['name']} (exists, id={$existing->term_id})\n";
    } else {
        $result = wp_insert_term($cat['name'], 'product_cat', [
            'slug' => $cat['slug'],
            'description' => $cat['desc'],
        ]);
        if (is_wp_error($result)) {
            echo "❌ Category {$cat['name']}: {$result->get_error_message()}\n";
            continue;
        }
        $cat_ids[$cat['slug']] = $result['term_id'];
        echo "✅ Category: {$cat['name']} (id={$result['term_id']})\n";
    }
}

// ─── Products ───────────────────────────────────────────────

$products = [
    [
        'name' => 'Élevé — Eau de Parfum',
        'slug' => 'eleve-eau-de-parfum',
        'sku' => 'NOR-EL-001',
        'price' => '89',
        'desc' => "Élevé means \"elevated\". It suggests a moment above the everyday — not festive in a playful sense, but a subtle form of ceremony. This fragrance positions the scent as something you use when the presence of your companion deserves that extra touch of radiance.\n\nComposed with warm amber, soft musk, and a hint of bergamot, Élevé is designed for special occasions: gatherings, celebrations, or simply those moments when care becomes ritual.",
        'short' => 'For special occasions. Warm amber & soft musk.',
        'cat' => 'eau-de-parfum',
        'featured' => true,
        'stock' => 30,
        'weight' => '0.35',
        'dims' => ['length' => '8', 'width' => '8', 'height' => '12'],
    ],
    [
        'name' => 'Solène — Eau de Parfum',
        'slug' => 'solene-eau-de-parfum',
        'sku' => 'NOR-SO-001',
        'price' => '89',
        'desc' => "Solène has a soft, serene sound. It feels pure and refined. Instead of speaking about \"masking\" outdoor scents — functional and technical — this fragrance reframes the moment as a reset towards freshness and elegance. It's not about hiding, but about restoring.\n\nBuilt on notes of white tea, fresh linen, and subtle cedar, Solène transforms the post-walk moment into a quiet ritual of renewal.",
        'short' => 'For restoring freshness. White tea & linen.',
        'cat' => 'eau-de-parfum',
        'featured' => true,
        'stock' => 25,
        'weight' => '0.35',
        'dims' => ['length' => '8', 'width' => '8', 'height' => '12'],
    ],
    [
        'name' => 'Fovère — Eau de Parfum',
        'slug' => 'fovere-eau-de-parfum',
        'sku' => 'NOR-FO-001',
        'price' => '89',
        'desc' => "Fovère sounds warm and enveloping. It evokes harmony. This function is not about overpowering, but about integrating. The name supports the idea of fusion — as if the scent naturally becomes part of your interior.\n\nWith notes of cashmere woods, vanilla, and sandalwood, Fovère blends seamlessly with your home ambiance, making your companion's presence feel like an effortless extension of the space.",
        'short' => 'For blending with home. Cashmere woods & vanilla.',
        'cat' => 'eau-de-parfum',
        'featured' => true,
        'stock' => 20,
        'weight' => '0.35',
        'dims' => ['length' => '8', 'width' => '8', 'height' => '12'],
    ],
    [
        'name' => 'Élevé — Travel Spray',
        'slug' => 'eleve-travel-spray',
        'sku' => 'NOR-EL-T01',
        'price' => '39',
        'desc' => "The same elevated composition in a sleek travel format. The Élevé Travel Spray fits effortlessly into your bag, ready for those special moments wherever you go.\n\n10ml of warm amber, soft musk, and bergamot — perfectly proportioned for on-the-go use.",
        'short' => 'Travel-size Élevé. 10ml spray.',
        'cat' => 'travel',
        'featured' => false,
        'stock' => 50,
        'weight' => '0.05',
        'dims' => ['length' => '2', 'width' => '2', 'height' => '12'],
    ],
    [
        'name' => 'Solène — Travel Spray',
        'slug' => 'solene-travel-spray',
        'sku' => 'NOR-SO-T01',
        'price' => '39',
        'desc' => "Fresh renewal in your pocket. The Solène Travel Spray brings the serene, restorative composition wherever your adventures take you.\n\n10ml of white tea, linen, and subtle cedar — the perfect post-walk refresher.",
        'short' => 'Travel-size Solène. 10ml spray.',
        'cat' => 'travel',
        'featured' => false,
        'stock' => 45,
        'weight' => '0.05',
        'dims' => ['length' => '2', 'width' => '2', 'height' => '12'],
    ],
    [
        'name' => 'Fovère — Travel Spray',
        'slug' => 'fovere-travel-spray',
        'sku' => 'NOR-FO-T01',
        'price' => '39',
        'desc' => "Warm harmony on the move. The Fovère Travel Spray carries the enveloping blend of cashmere woods, vanilla, and sandalwood in a sleek portable format.\n\n10ml — for when you want your companion to feel right at home, anywhere.",
        'short' => 'Travel-size Fovère. 10ml spray.',
        'cat' => 'travel',
        'featured' => false,
        'stock' => 40,
        'weight' => '0.05',
        'dims' => ['length' => '2', 'width' => '2', 'height' => '12'],
    ],
    [
        'name' => 'The Ritual Collection',
        'slug' => 'the-ritual-collection',
        'sku' => 'NOR-GS-001',
        'price' => '239',
        'sale' => '219',
        'desc' => "All three Norēlle fragrances united in one luxurious gift box. The Ritual Collection presents Élevé, Solène, and Fovère together — each addressing a different moment of care.\n\nPresented in custom Norēlle packaging with a handwritten thank-you card personalised with your pet's name. Because they give us everything, without condition.",
        'short' => 'All three fragrances in luxury gift packaging.',
        'cat' => 'gift-sets',
        'featured' => true,
        'stock' => 15,
        'weight' => '1.2',
        'dims' => ['length' => '30', 'width' => '12', 'height' => '14'],
    ],
    [
        'name' => 'The Discovery Set',
        'slug' => 'the-discovery-set',
        'sku' => 'NOR-GS-002',
        'price' => '99',
        'desc' => "Three travel sprays, one elegant pouch. The Discovery Set is the perfect introduction to the world of Norēlle — letting you explore Élevé, Solène, and Fovère before committing to a full size.\n\nPresented in a natural linen drawstring pouch with the Norēlle monogram.",
        'short' => 'Three travel sprays in a linen pouch.',
        'cat' => 'gift-sets',
        'featured' => true,
        'stock' => 35,
        'weight' => '0.25',
        'dims' => ['length' => '15', 'width' => '10', 'height' => '14'],
    ],
];

foreach ($products as $p) {
    // Check if product already exists by SKU
    $existing = wc_get_product_id_by_sku($p['sku']);
    if ($existing) {
        echo "⏭️  {$p['name']} (exists, id={$existing})\n";
        continue;
    }

    $product = new WC_Product_Simple();
    $product->set_name($p['name']);
    $product->set_slug($p['slug']);
    $product->set_sku($p['sku']);
    $product->set_regular_price($p['price']);
    if (!empty($p['sale'])) $product->set_sale_price($p['sale']);
    $product->set_description($p['desc']);
    $product->set_short_description($p['short']);
    $product->set_status('publish');
    $product->set_catalog_visibility('visible');
    $product->set_featured($p['featured']);
    $product->set_manage_stock(true);
    $product->set_stock_quantity($p['stock']);
    $product->set_stock_status('instock');
    $product->set_weight($p['weight']);
    $product->set_length($p['dims']['length']);
    $product->set_width($p['dims']['width']);
    $product->set_height($p['dims']['height']);
    $product->set_category_ids([$cat_ids[$p['cat']]]);

    $id = $product->save();
    echo "✅ {$p['name']} (id={$id}, sku={$p['sku']})\n";
}

echo "\n🎉 Seeding complete!\n";
