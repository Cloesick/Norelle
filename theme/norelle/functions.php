<?php
/**
 * Norelle — Child Theme Functions
 *
 * @package Norelle
 * @since   1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Enqueue parent and child theme styles + Google Fonts.
 */
function norelle_enqueue_styles() {
    // Google Fonts — Cormorant Garamond (serif, elegant)
    wp_enqueue_style(
        'norelle-google-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
        array(),
        null
    );

    // Parent theme (Storefront)
    wp_enqueue_style(
        'storefront-style',
        get_template_directory_uri() . '/style.css',
        array('norelle-google-fonts'),
        wp_get_theme('storefront')->get('Version')
    );

    // Child theme (Norelle)
    wp_enqueue_style(
        'norelle-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('storefront-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'norelle_enqueue_styles', 20);

/**
 * Replace the WordPress custom logo with a tight-cropped inline SVG.
 * The original Logo-06.svg has viewBox 0 0 1080 1080 (square) — too much
 * padding. We crop to viewBox="230 430 620 220" which tightly wraps the
 * "Norēlle®" wordmark + "for those we live with" tagline.
 */
function norelle_custom_logo_svg( $html ) {
    $home = esc_url( home_url( '/' ) );
    $svg  = '<a href="' . $home . '" class="custom-logo-link" rel="home" aria-label="Norelle — Home">';
    $svg .= '<img src="' . esc_url( get_stylesheet_directory_uri() . '/images/logo-header.svg' ) . '"';
    $svg .= ' class="custom-logo" alt="Norelle" width="310" height="110" />';
    $svg .= '</a>';
    return $svg;
}
add_filter('get_custom_logo', 'norelle_custom_logo_svg');

/**
 * Inject mobile hamburger button into the header + toggle script.
 */
function norelle_mobile_menu_button() {
    echo '<button class="norelle-hamburger" aria-expanded="false" aria-label="Menu">&#9776;</button>';
}
add_action('storefront_header', 'norelle_mobile_menu_button', 69);

function norelle_mobile_menu_script() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        var nav = document.querySelector('.main-navigation');
        var btn = document.querySelector('.norelle-hamburger');
        if (!btn || !nav) return;

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var open = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!open));
            nav.classList.toggle('norelle-nav-open');
            btn.innerHTML = open ? '&#9776;' : '&#10005;';
        });

        // Close menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                btn.setAttribute('aria-expanded', 'false');
                nav.classList.remove('norelle-nav-open');
                btn.innerHTML = '&#9776;';
            });
        });
    });
    </script>
    <?php
}
add_action('wp_footer', 'norelle_mobile_menu_script', 99);

/**
 * Hide header on scroll down, show on scroll up.
 */
function norelle_scroll_header_script() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        var header = document.querySelector('.site-header');
        if (!header) return;
        var lastY = window.scrollY;
        var ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var y = window.scrollY;
                    if (y > lastY && y > 80) {
                        header.classList.add('header-hidden');
                    } else {
                        header.classList.remove('header-hidden');
                    }
                    lastY = y;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    });
    </script>
    <?php
}
add_action('wp_footer', 'norelle_scroll_header_script', 100);

/**
 * Theme setup: logo support, menus, WooCommerce features.
 */
function norelle_theme_setup() {
    // Custom logo
    add_theme_support('custom-logo', array(
        'height'      => 120,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // WooCommerce support
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');

    // HTML5 support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Title tag
    add_theme_support('title-tag');

    // Wide alignment for Gutenberg blocks
    add_theme_support('align-wide');

    // Register navigation menus
    register_nav_menus(array(
        'primary'   => __('Primary Menu', 'norelle'),
        'secondary' => __('Footer Menu', 'norelle'),
    ));
}
add_action('after_setup_theme', 'norelle_theme_setup');

/**
 * Register widget areas.
 */
function norelle_widgets_init() {
    register_sidebar(array(
        'name'          => __('Footer Column 1', 'norelle'),
        'id'            => 'norelle-footer-1',
        'description'   => __('First footer widget area', 'norelle'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 2', 'norelle'),
        'id'            => 'norelle-footer-2',
        'description'   => __('Second footer widget area', 'norelle'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 3', 'norelle'),
        'id'            => 'norelle-footer-3',
        'description'   => __('Third footer widget area', 'norelle'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'norelle_widgets_init');

/**
 * Customize WooCommerce: products per row & per page.
 */
function norelle_wc_products_per_row() {
    return 3;
}
add_filter('loop_shop_columns', 'norelle_wc_products_per_row');

/**
 * Grid/List view toggle for shop pages.
 */
function norelle_view_toggle() {
    if ( ! is_shop() && ! is_product_category() && ! is_product_tag() ) return;
    echo '<div class="norelle-view-toggle">';
    echo '<button class="norelle-view-btn norelle-view-grid active" aria-label="Grid view" title="Grid">&#9642;&#9642;<br>&#9642;&#9642;</button>';
    echo '<button class="norelle-view-btn norelle-view-list" aria-label="List view" title="List">&#9776;</button>';
    echo '</div>';
}
add_action('woocommerce_before_shop_loop', 'norelle_view_toggle', 5);

function norelle_view_toggle_script() {
    if ( ! is_shop() && ! is_product_category() && ! is_product_tag() ) return;
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        var gridBtn = document.querySelector('.norelle-view-grid');
        var listBtn = document.querySelector('.norelle-view-list');
        var products = document.querySelector('.woocommerce ul.products');
        if (!gridBtn || !listBtn || !products) return;

        var saved = localStorage.getItem('norelle-view') || 'grid';
        if (saved === 'list') {
            products.classList.add('norelle-list-view');
            gridBtn.classList.remove('active');
            listBtn.classList.add('active');
        }

        gridBtn.addEventListener('click', function() {
            products.classList.remove('norelle-list-view');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            localStorage.setItem('norelle-view', 'grid');
        });

        listBtn.addEventListener('click', function() {
            products.classList.add('norelle-list-view');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            localStorage.setItem('norelle-view', 'list');
        });
    });
    </script>
    <?php
}
add_action('wp_footer', 'norelle_view_toggle_script', 99);

function norelle_wc_products_per_page() {
    return 12;
}
add_filter('loop_shop_per_page', 'norelle_wc_products_per_page', 20);

/**
 * Add "New Collection" and "Outlet" sorting options to the shop page.
 *
 * Products tagged "new-collection" or "outlet" (product_tag taxonomy)
 * will appear when the corresponding sort option is selected.
 * Also auto-creates the tags if they don't exist yet.
 */
function norelle_ensure_product_tags() {
    if ( ! taxonomy_exists('product_tag') ) return;
    $tags = array(
        'new-collection' => 'New Collection',
        'outlet'         => 'Outlet',
    );
    foreach ( $tags as $slug => $name ) {
        if ( ! term_exists($slug, 'product_tag') ) {
            wp_insert_term($name, 'product_tag', array('slug' => $slug));
        }
    }
}
add_action('init', 'norelle_ensure_product_tags', 99);

function norelle_custom_sorting_options( $options ) {
    $options['new_collection'] = __('New Collection', 'norelle');
    $options['outlet']         = __('Outlet', 'norelle');
    return $options;
}
add_filter('woocommerce_catalog_orderby', 'norelle_custom_sorting_options');
add_filter('woocommerce_default_catalog_orderby_options', 'norelle_custom_sorting_options');

function norelle_custom_sorting_query( $args ) {
    if ( ! is_admin() && isset($_GET['orderby']) ) {
        $orderby = sanitize_text_field($_GET['orderby']);

        if ( $orderby === 'new_collection' ) {
            $args['tax_query'][] = array(
                'taxonomy' => 'product_tag',
                'field'    => 'slug',
                'terms'    => 'new-collection',
            );
            $args['orderby'] = 'date';
            $args['order']   = 'DESC';
        }

        if ( $orderby === 'outlet' ) {
            $args['tax_query'][] = array(
                'taxonomy' => 'product_tag',
                'field'    => 'slug',
                'terms'    => 'outlet',
            );
            $args['orderby'] = 'date';
            $args['order']   = 'DESC';
        }
    }
    return $args;
}
add_filter('woocommerce_get_catalog_ordering_args', 'norelle_custom_sorting_query', 20);

/**
 * Filter shop by on_sale=1 query parameter — show only sale products.
 */
function norelle_on_sale_filter( $query ) {
    if ( ! is_admin() && $query->is_main_query() && isset($_GET['on_sale']) && $_GET['on_sale'] === '1' ) {
        $sale_ids = wc_get_product_ids_on_sale();
        if ( ! empty($sale_ids) ) {
            $query->set('post__in', $sale_ids);
        } else {
            $query->set('post__in', array(0));
        }
    }
}
add_action('woocommerce_product_query', 'norelle_on_sale_filter', 20);

/**
 * Customize the "Add to Cart" button text.
 */
function norelle_add_to_cart_text($text) {
    return __('Add to Bag', 'norelle');
}
add_filter('woocommerce_product_single_add_to_cart_text', 'norelle_add_to_cart_text');
add_filter('woocommerce_product_add_to_cart_text', 'norelle_add_to_cart_text');

/**
 * Remove Storefront's default homepage sections we don't need.
 */
function norelle_remove_storefront_defaults() {
    remove_action('homepage', 'storefront_homepage_content', 10);
    remove_action('homepage', 'storefront_product_categories', 20);
    remove_action('homepage', 'storefront_recent_products', 30);
    remove_action('homepage', 'storefront_featured_products', 40);
    remove_action('homepage', 'storefront_popular_products', 50);
    remove_action('homepage', 'storefront_on_sale_products', 60);
    remove_action('homepage', 'storefront_best_selling_products', 70);
}
add_action('init', 'norelle_remove_storefront_defaults');

/**
 * Add Norelle homepage sections.
 */
/* Hero section removed — "Norelle" is now the header home button */

/**
 * Norelle homepage: Featured Products section.
 */
function norelle_homepage_featured() {
    if (is_front_page()) {
        ?>
        <section class="norelle-section norelle-text-center" style="padding: 4rem 2rem; background-color: #3b0505;">
            <h2 style="
                font-family: 'Cormorant Garamond', Georgia, serif;
                font-weight: 300;
                letter-spacing: 0.06em;
                margin-bottom: 0.5rem;
                color: #eeefc9;
            "><?php esc_html_e('Featured', 'norelle'); ?></h2>
            <div class="norelle-divider"></div>
            <?php
            echo do_shortcode('[featured_products per_page="6" columns="3"]');
            ?>
        </section>
        <?php
    }
}
add_action('homepage', 'norelle_homepage_featured', 20);

/**
 * Norelle homepage: New Arrivals section.
 */
function norelle_homepage_new_arrivals() {
    if (is_front_page()) {
        ?>
        <section class="norelle-section norelle-section-cream norelle-text-center" style="padding: 4rem 2rem; background-color: #5a1a1a;">
            <h2 style="
                font-family: 'Cormorant Garamond', Georgia, serif;
                font-weight: 300;
                letter-spacing: 0.06em;
                margin-bottom: 0.5rem;
                color: #eeefc9;
            "><?php esc_html_e('New Arrivals', 'norelle'); ?></h2>
            <div class="norelle-divider"></div>
            <?php
            echo do_shortcode('[recent_products per_page="6" columns="3"]');
            ?>
        </section>
        <?php
    }
}
add_action('homepage', 'norelle_homepage_new_arrivals', 30);


/**
 * Add custom body class.
 */
function norelle_body_class($classes) {
    $classes[] = 'norelle-theme';
    return $classes;
}
add_filter('body_class', 'norelle_body_class');

/**
 * Preload Google Fonts for performance.
 */
function norelle_preload_fonts() {
    ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php
}
add_action('wp_head', 'norelle_preload_fonts', 1);

/**
 * Restructure Storefront header: remove clutter, build clean layout.
 * Keep Storefront containers but remove unwanted elements and add account link.
 */
function norelle_restructure_header() {
    // Remove Storefront defaults we don't want
    remove_action('storefront_header', 'storefront_social_icons', 10);
    remove_action('storefront_header', 'storefront_product_search', 40);
    remove_action('storefront_header', 'storefront_secondary_navigation', 30);
}
add_action('init', 'norelle_restructure_header');


/**
 * Restructure Storefront footer: remove defaults, add custom footer.
 */
function norelle_restructure_footer() {
    remove_action('storefront_footer', 'storefront_footer_widgets', 10);
    remove_action('storefront_footer', 'storefront_credit', 20);
}
add_action('init', 'norelle_restructure_footer');

/**
 * Custom footer output: 4 columns — brand, shop links, help links, contact.
 */
function norelle_custom_footer() {
    $shop_url = get_permalink(wc_get_page_id('shop'));
    ?>
    <div class="norelle-footer-grid">
        <div class="norelle-footer-col">
            <h4 class="widget-title">Norelle</h4>
            <p>Timeless elegance, crafted with care. Every piece tells a story.</p>
        </div>
        <div class="norelle-footer-col">
            <h4 class="widget-title">Shop</h4>
            <ul>
                <li><a href="<?php echo esc_url($shop_url); ?>">All Products</a></li>
                <li><a href="<?php echo esc_url(get_term_link('necklaces', 'product_cat')); ?>">Necklaces</a></li>
                <li><a href="<?php echo esc_url(get_term_link('earrings', 'product_cat')); ?>">Earrings</a></li>
                <li><a href="<?php echo esc_url(get_term_link('bracelets', 'product_cat')); ?>">Bracelets</a></li>
                <li><a href="<?php echo esc_url(get_term_link('rings', 'product_cat')); ?>">Rings</a></li>
            </ul>
        </div>
        <div class="norelle-footer-col">
            <h4 class="widget-title">Help</h4>
            <ul>
                <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('shipping-policy'))); ?>">Shipping</a></li>
                <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('returns-refunds'))); ?>">Returns & Refunds</a></li>
                <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('terms-and-conditions'))); ?>">Terms & Conditions</a></li>
                <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('privacy-policy'))); ?>">Privacy Policy</a></li>
                <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>">Contact</a></li>
            </ul>
        </div>
        <div class="norelle-footer-col">
            <h4 class="widget-title">Stay Connected</h4>
            <p>Follow us for new arrivals and exclusive offers.</p>
            <div class="norelle-footer-social">
                <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="#" aria-label="Pinterest"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a4 4 0 1 1 8 0c0 2.5-1.5 4.5-3 6l-1 3"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M9 17c-1.5-1-3-3.5-3-5a6 6 0 1 1 12 0c0 2-1 3.5-2 5"/></svg></a>
            </div>
        </div>
    </div>
    <div class="norelle-footer-bottom">
        &copy; <?php echo date('Y'); ?> <?php echo esc_html(get_bloginfo('name')); ?>. All rights reserved.
    </div>
    <?php
}
add_action('storefront_footer', 'norelle_custom_footer', 10);

/**
 * Admin: Add Norelle branding to login page.
 */
function norelle_login_styles() {
    ?>
    <style>
        body.login {
            background-color: #fffaea;
        }
        .login h1 a {
            background-image: none !important;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 2rem;
            font-weight: 300;
            letter-spacing: 0.08em;
            color: #3b0505;
            text-indent: 0;
            width: auto;
            height: auto;
        }
        .login h1 a::after {
            content: 'Norelle';
        }
        .login form {
            border: 1px solid rgba(59, 5, 5, 0.12);
            border-radius: 2px;
        }
        .login input[type="submit"] {
            background-color: #3b0505 !important;
            border-color: #3b0505 !important;
            border-radius: 2px;
            font-family: 'Cormorant Garamond', Georgia, serif;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }
    </style>
    <?php
}
add_action('login_enqueue_scripts', 'norelle_login_styles');

function norelle_login_url() {
    return home_url();
}
add_filter('login_headerurl', 'norelle_login_url');

/* ================================================================
   SALES PIPELINE & UX OPTIMIZATIONS
   ================================================================ */

/**
 * Homepage: Trust/USP bar below hero.
 */
function norelle_homepage_trust_bar() {
    if ( ! is_front_page() ) return;
    ?>
    <div class="norelle-trust-bar">
        <div class="norelle-trust-item">
            <span class="norelle-trust-icon">&#10003;</span>
            <span>Free Shipping over &euro;75</span>
        </div>
        <div class="norelle-trust-item">
            <span class="norelle-trust-icon">&#9829;</span>
            <span>Handcrafted with Care</span>
        </div>
        <div class="norelle-trust-item">
            <span class="norelle-trust-icon">&#8634;</span>
            <span>30-Day Returns</span>
        </div>
        <div class="norelle-trust-item">
            <span class="norelle-trust-icon">&#9733;</span>
            <span>Secure Checkout</span>
        </div>
    </div>
    <?php
}
add_action('homepage', 'norelle_homepage_trust_bar', 15);

/**
 * Homepage: Sale / Best Sellers section after New Arrivals.
 */
function norelle_homepage_on_sale() {
    if ( ! is_front_page() ) return;
    ?>
    <section class="norelle-section norelle-text-center" style="padding: 4rem 2rem; background-color: #3b0505;">
        <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:300;letter-spacing:0.06em;margin-bottom:0.5rem;color:#eeefc9;">
            On Sale
        </h2>
        <div class="norelle-divider"></div>
        <?php echo do_shortcode('[sale_products per_page="3" columns="3"]'); ?>
        <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop')) . '?on_sale=1'); ?>" class="norelle-cta-link">View All Deals &rarr;</a>
    </section>
    <?php
}
add_action('homepage', 'norelle_homepage_on_sale', 40);

/**
 * Homepage: Newsletter / email capture CTA.
 */
function norelle_homepage_newsletter() {
    if ( ! is_front_page() ) return;
    ?>
    <section class="norelle-newsletter">
        <h2>Join the Norelle World</h2>
        <p>Be the first to know about new collections, exclusive offers, and style inspiration.</p>
        <form class="norelle-newsletter-form" onsubmit="event.preventDefault(); this.querySelector('.norelle-newsletter-btn').textContent='Thank you!'; this.querySelector('input[type=email]').disabled=true;">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="norelle-newsletter-btn">Subscribe</button>
        </form>
    </section>
    <?php
}
add_action('homepage', 'norelle_homepage_newsletter', 50);

/**
 * Single product: Urgency notice (low stock / sale ending).
 */
function norelle_product_urgency() {
    global $product;
    if ( ! $product ) return;

    $stock = $product->get_stock_quantity();
    if ( $stock !== null && $stock > 0 && $stock <= 5 ) {
        echo '<div class="norelle-urgency"><span class="norelle-urgency-dot"></span> Only ' . esc_html($stock) . ' left in stock</div>';
    }

    if ( $product->is_on_sale() ) {
        echo '<div class="norelle-sale-badge-text">Limited time offer</div>';
    }
}
add_action('woocommerce_single_product_summary', 'norelle_product_urgency', 25);

/**
 * Cart page: Free shipping progress bar.
 */
function norelle_free_shipping_notice() {
    if ( ! function_exists('WC') || ! WC()->cart ) return;

    $threshold = 75;
    $current = WC()->cart->get_subtotal();
    $remaining = $threshold - $current;

    if ( $remaining > 0 ) {
        $pct = min(100, round(($current / $threshold) * 100));
        echo '<div class="norelle-shipping-bar">';
        echo '<p>Add <strong>&euro;' . number_format($remaining, 2, ',', '.') . '</strong> more for <strong>free shipping!</strong></p>';
        echo '<div class="norelle-progress"><div class="norelle-progress-fill" style="width:' . $pct . '%"></div></div>';
        echo '</div>';
    } else {
        echo '<div class="norelle-shipping-bar norelle-shipping-free">';
        echo '<p>&#10003; You qualify for <strong>free shipping!</strong></p>';
        echo '</div>';
    }
}
add_action('woocommerce_before_cart_table', 'norelle_free_shipping_notice');
add_action('woocommerce_before_checkout_form', 'norelle_free_shipping_notice', 5);

/**
 * Cart: Cross-sell heading.
 */
function norelle_cross_sell_heading($text) {
    return __('Complete Your Look', 'norelle');
}
add_filter('woocommerce_product_cross_sells_products_heading', 'norelle_cross_sell_heading');

/**
 * Single product: Social proof / recently viewed count (simulated).
 */
function norelle_social_proof() {
    $views = rand(12, 48);
    echo '<div class="norelle-social-proof">' . $views . ' people viewed this today</div>';
}
add_action('woocommerce_single_product_summary', 'norelle_social_proof', 35);

/**
 * Checkout: Trust badges below payment.
 */
function norelle_checkout_trust() {
    ?>
    <div class="norelle-checkout-trust">
        <span>&#128274; Secure SSL Checkout</span>
        <span>&#8634; 30-Day Returns</span>
        <span>&#128230; Tracked Shipping</span>
    </div>
    <?php
}
add_action('woocommerce_review_order_after_payment', 'norelle_checkout_trust');

/**
 * Thank-you page: Encourage sharing.
 */
function norelle_thankyou_share($order_id) {
    ?>
    <div class="norelle-share-order">
        <h3>Love your new jewellery?</h3>
        <p>Share the Norelle experience with friends and family.</p>
        <div class="norelle-share-buttons">
            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo esc_url(home_url()); ?>" target="_blank" rel="noopener" class="norelle-share-btn">Share on Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener" class="norelle-share-btn">Follow on Instagram</a>
        </div>
    </div>
    <?php
}
add_action('woocommerce_thankyou', 'norelle_thankyou_share');

/**
 * Add sale percentage badge to products.
 */
function norelle_sale_percentage_badge($html, $post, $product) {
    if ( $product->is_on_sale() && $product->get_regular_price() ) {
        $regular = (float) $product->get_regular_price();
        $sale = (float) $product->get_sale_price();
        if ( $regular > 0 ) {
            $pct = round((($regular - $sale) / $regular) * 100);
            return '<span class="onsale norelle-sale-pct">-' . $pct . '%</span>';
        }
    }
    return $html;
}
add_filter('woocommerce_sale_flash', 'norelle_sale_percentage_badge', 10, 3);

/**
 * Empty cart: Show CTA to continue shopping.
 */
function norelle_empty_cart_message() {
    ?>
    <div class="norelle-empty-cart">
        <p class="norelle-empty-cart-msg">Your bag is empty</p>
        <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="button">Discover the Collection</a>
    </div>
    <?php
}
add_action('woocommerce_cart_is_empty', 'norelle_empty_cart_message');

/* ================================================================
   MOBILE — Sticky "Add to Bag" bar on single product pages
   ================================================================ */

/**
 * Render a sticky bottom bar with product name, price, and Add to Bag button
 * that appears when the user scrolls past the main add-to-cart form.
 */
function norelle_sticky_add_to_cart() {
    if ( ! is_product() ) return;
    global $product;
    if ( ! $product ) return;
    ?>
    <div class="norelle-sticky-atc" id="norelle-sticky-atc">
        <div class="norelle-sticky-atc-info">
            <div class="norelle-sticky-atc-title"><?php echo esc_html($product->get_name()); ?></div>
            <div class="norelle-sticky-atc-price"><?php echo $product->get_price_html(); ?></div>
        </div>
        <a href="<?php echo esc_url($product->add_to_cart_url()); ?>" class="button"><?php esc_html_e('Add to Bag', 'norelle'); ?></a>
    </div>
    <script>
    (function(){
        var bar = document.getElementById('norelle-sticky-atc');
        var form = document.querySelector('.single-product form.cart');
        if (!bar || !form) return;
        var shown = false;
        function check() {
            var rect = form.getBoundingClientRect();
            var shouldShow = rect.bottom < 0;
            if (shouldShow !== shown) {
                shown = shouldShow;
                bar.classList.toggle('visible', shown);
            }
        }
        window.addEventListener('scroll', check, {passive: true});
        check();
    })();
    </script>
    <?php
}
add_action('wp_footer', 'norelle_sticky_add_to_cart', 90);

/* ================================================================
   SALES PIPELINE — Animated Step Indicator
   Stages: Initiation → Selection → Summary → Payment → Confirmation
   ================================================================ */

/**
 * Determine the current pipeline stage based on the WooCommerce page context.
 *  1 = Initiation  (homepage / landing)
 *  2 = Selection    (shop, product category, single product)
 *  3 = Summary      (cart)
 *  4 = Payment      (checkout)
 *  5 = Confirmation (order-received / thank-you)
 *
 * Returns 0 if not in a pipeline-relevant page.
 */
function norelle_get_pipeline_stage() {
    if ( function_exists('is_order_received_page') && is_order_received_page() ) return 5;
    if ( function_exists('is_checkout') && is_checkout() && ! is_order_received_page() ) return 4;
    if ( function_exists('is_cart') && is_cart() ) return 3;
    // Only show pipeline once user has items in cart (stages 3-5)
    return 0;
}

/**
 * Render the animated pipeline bar.
 */
function norelle_sales_pipeline() {
    static $rendered = false;
    if ( $rendered ) return;
    $stage = norelle_get_pipeline_stage();
    if ( $stage === 0 ) return;
    $rendered = true;

    $stages = array(
        1 => array('icon' => '&#10024;',  'label' => __('Discover',   'norelle')),
        2 => array('icon' => '&#128142;', 'label' => __('Select',     'norelle')),
        3 => array('icon' => '&#128221;', 'label' => __('Summary',    'norelle')),
        4 => array('icon' => '&#128179;', 'label' => __('Payment',    'norelle')),
        5 => array('icon' => '&#10003;',  'label' => __('Confirmed',  'norelle')),
    );

    echo '<div class="norelle-pipeline" role="navigation" aria-label="' . esc_attr__('Purchase progress', 'norelle') . '">';
    echo '<ol class="norelle-pipeline-steps">';

    $i = 0;
    foreach ( $stages as $num => $s ) {
        $state = 'upcoming';
        if ( $num < $stage )  $state = 'completed';
        if ( $num === $stage ) $state = 'active';

        echo '<li class="norelle-pipeline-step norelle-pipeline-' . $state . '" style="animation-delay:' . ($i * 0.12) . 's">';
        echo   '<span class="norelle-pipeline-icon">' . $s['icon'] . '</span>';
        echo   '<span class="norelle-pipeline-label">' . esc_html($s['label']) . '</span>';
        echo '</li>';

        if ( $num < 5 ) {
            $line_state = ( $num < $stage ) ? 'filled' : 'empty';
            echo '<li class="norelle-pipeline-connector norelle-pipeline-connector-' . $line_state . '" aria-hidden="true"';
            echo ' style="animation-delay:' . ($i * 0.12 + 0.06) . 's"></li>';
        }
        $i++;
    }

    echo '</ol>';
    echo '</div>';
}
add_action('storefront_before_content', 'norelle_sales_pipeline', 5);
add_action('storefront_page_before', 'norelle_sales_pipeline', 5);

/* ================================================================
   CONTACT FORM (shortcode: [norelle_contact_form])
   ================================================================ */

/**
 * Process contact form submission and render the form.
 */
function norelle_contact_form_shortcode() {
    $success = false;
    $errors = array();
    $fields = array(
        'norelle_name'       => '',
        'norelle_email'      => '',
        'norelle_phone'      => '',
        'norelle_order'      => '',
        'norelle_subject'    => '',
        'norelle_message'    => '',
        'norelle_newsletter' => '',
    );

    // Process form submission
    if ( isset($_POST['norelle_contact_nonce']) && wp_verify_nonce($_POST['norelle_contact_nonce'], 'norelle_contact_submit') ) {

        $fields['norelle_name']       = sanitize_text_field($_POST['norelle_name'] ?? '');
        $fields['norelle_email']      = sanitize_email($_POST['norelle_email'] ?? '');
        $fields['norelle_phone']      = sanitize_text_field($_POST['norelle_phone'] ?? '');
        $fields['norelle_order']      = sanitize_text_field($_POST['norelle_order'] ?? '');
        $fields['norelle_subject']    = sanitize_text_field($_POST['norelle_subject'] ?? '');
        $fields['norelle_message']    = sanitize_textarea_field($_POST['norelle_message'] ?? '');
        $fields['norelle_newsletter'] = isset($_POST['norelle_newsletter']) ? '1' : '';

        // Honeypot check
        if ( ! empty($_POST['norelle_website_url']) ) {
            $errors[] = 'Spam detected.';
        }

        // Validation
        if ( empty($fields['norelle_name']) ) {
            $errors[] = 'Please enter your full name.';
        }
        if ( empty($fields['norelle_email']) || ! is_email($fields['norelle_email']) ) {
            $errors[] = 'Please enter a valid email address.';
        }
        if ( empty($fields['norelle_subject']) ) {
            $errors[] = 'Please select a subject.';
        }
        if ( empty($fields['norelle_message']) ) {
            $errors[] = 'Please enter your message.';
        }
        if ( strlen($fields['norelle_message']) < 10 ) {
            $errors[] = 'Your message is too short (minimum 10 characters).';
        }

        // Send email
        if ( empty($errors) ) {
            $to = get_option('admin_email');
            $subject = '[Norelle Contact] ' . $fields['norelle_subject'] . ' — ' . $fields['norelle_name'];

            $body  = "New contact form submission from Norelle webshop:\n\n";
            $body .= "Name: " . $fields['norelle_name'] . "\n";
            $body .= "Email: " . $fields['norelle_email'] . "\n";
            $body .= "Phone: " . ($fields['norelle_phone'] ?: '—') . "\n";
            $body .= "Order #: " . ($fields['norelle_order'] ?: '—') . "\n";
            $body .= "Subject: " . $fields['norelle_subject'] . "\n";
            $body .= "Newsletter: " . ($fields['norelle_newsletter'] ? 'Yes' : 'No') . "\n";
            $body .= "\n--- Message ---\n\n";
            $body .= $fields['norelle_message'] . "\n";

            $headers = array(
                'From: Norelle <' . $to . '>',
                'Reply-To: ' . $fields['norelle_name'] . ' <' . $fields['norelle_email'] . '>',
                'Content-Type: text/plain; charset=UTF-8',
            );

            $sent = wp_mail($to, $subject, $body, $headers);
            $success = true;
        }
    }

    // Render form
    ob_start();
    ?>
    <div class="norelle-contact-form">

    <?php if ( $success ) : ?>
        <div class="norelle-form-success">
            <h3>Thank you for reaching out!</h3>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="button">Continue Shopping</a>
        </div>
    <?php else : ?>

        <?php if ( ! empty($errors) ) : ?>
            <div class="norelle-form-errors">
                <?php foreach ($errors as $err) : ?>
                    <p><?php echo esc_html($err); ?></p>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <form method="post" class="norelle-form" novalidate>
            <?php wp_nonce_field('norelle_contact_submit', 'norelle_contact_nonce'); ?>

            <!-- Honeypot -->
            <div style="position:absolute;left:-9999px;" aria-hidden="true">
                <input type="text" name="norelle_website_url" tabindex="-1" autocomplete="off">
            </div>

            <div class="norelle-form-row norelle-form-row-2col">
                <div class="norelle-form-field">
                    <label for="norelle_name">Full Name <span class="required">*</span></label>
                    <input type="text" id="norelle_name" name="norelle_name" value="<?php echo esc_attr($fields['norelle_name']); ?>" required placeholder="e.g. Sophie De Vries">
                </div>
                <div class="norelle-form-field">
                    <label for="norelle_email">Email Address <span class="required">*</span></label>
                    <input type="email" id="norelle_email" name="norelle_email" value="<?php echo esc_attr($fields['norelle_email']); ?>" required placeholder="e.g. sophie@example.com">
                </div>
            </div>

            <div class="norelle-form-row norelle-form-row-2col">
                <div class="norelle-form-field">
                    <label for="norelle_phone">Phone Number <span class="optional">(optional)</span></label>
                    <input type="tel" id="norelle_phone" name="norelle_phone" value="<?php echo esc_attr($fields['norelle_phone']); ?>" placeholder="e.g. +32 470 12 34 56">
                </div>
                <div class="norelle-form-field">
                    <label for="norelle_order">Order Number <span class="optional">(optional)</span></label>
                    <input type="text" id="norelle_order" name="norelle_order" value="<?php echo esc_attr($fields['norelle_order']); ?>" placeholder="e.g. #1234">
                </div>
            </div>

            <div class="norelle-form-row">
                <div class="norelle-form-field">
                    <label for="norelle_subject">Subject <span class="required">*</span></label>
                    <select id="norelle_subject" name="norelle_subject" required>
                        <option value="" disabled <?php selected($fields['norelle_subject'], ''); ?>>Select a topic...</option>
                        <option value="General Enquiry" <?php selected($fields['norelle_subject'], 'General Enquiry'); ?>>General Enquiry</option>
                        <option value="Order Status" <?php selected($fields['norelle_subject'], 'Order Status'); ?>>Order Status</option>
                        <option value="Returns & Refunds" <?php selected($fields['norelle_subject'], 'Returns & Refunds'); ?>>Returns &amp; Refunds</option>
                        <option value="Shipping" <?php selected($fields['norelle_subject'], 'Shipping'); ?>>Shipping &amp; Delivery</option>
                        <option value="Product Question" <?php selected($fields['norelle_subject'], 'Product Question'); ?>>Product Question</option>
                        <option value="Sizing & Fit" <?php selected($fields['norelle_subject'], 'Sizing & Fit'); ?>>Sizing &amp; Fit</option>
                        <option value="Wholesale / Collaboration" <?php selected($fields['norelle_subject'], 'Wholesale / Collaboration'); ?>>Wholesale / Collaboration</option>
                        <option value="Press & Media" <?php selected($fields['norelle_subject'], 'Press & Media'); ?>>Press &amp; Media</option>
                        <option value="Feedback" <?php selected($fields['norelle_subject'], 'Feedback'); ?>>Feedback &amp; Suggestions</option>
                        <option value="Other" <?php selected($fields['norelle_subject'], 'Other'); ?>>Other</option>
                    </select>
                </div>
            </div>

            <div class="norelle-form-row">
                <div class="norelle-form-field">
                    <label for="norelle_message">Message <span class="required">*</span></label>
                    <textarea id="norelle_message" name="norelle_message" rows="7" required placeholder="How can we help you?"><?php echo esc_textarea($fields['norelle_message']); ?></textarea>
                </div>
            </div>

            <div class="norelle-form-row">
                <div class="norelle-form-field norelle-form-checkbox">
                    <label>
                        <input type="checkbox" name="norelle_newsletter" value="1" <?php checked($fields['norelle_newsletter'], '1'); ?>>
                        <span>Keep me updated on new collections and exclusive offers</span>
                    </label>
                </div>
            </div>

            <div class="norelle-form-row">
                <div class="norelle-form-field">
                    <p class="norelle-form-privacy">By submitting this form, you agree to our <a href="<?php echo esc_url(get_permalink(get_page_by_path('privacy-policy'))); ?>">Privacy Policy</a>. We will never share your information with third parties.</p>
                </div>
            </div>

            <div class="norelle-form-row">
                <button type="submit" class="button norelle-form-submit">Send Message</button>
            </div>
        </form>
    <?php endif; ?>

    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('norelle_contact_form', 'norelle_contact_form_shortcode');

/**
 * JSON-LD structured data for Organization + WebSite (homepage only).
 */
function norelle_structured_data() {
    if ( ! is_front_page() ) return;
    $logo_id  = get_theme_mod('custom_logo');
    $logo_url = $logo_id ? wp_get_attachment_image_url($logo_id, 'full') : '';
    ?>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Norelle",
        "url": "<?php echo esc_url(home_url('/')); ?>",
        <?php if ($logo_url) : ?>"logo": "<?php echo esc_url($logo_url); ?>",<?php endif; ?>
        "description": "<?php echo esc_attr(get_bloginfo('description')); ?>",
        "sameAs": []
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Norelle",
        "url": "<?php echo esc_url(home_url('/')); ?>",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "<?php echo esc_url(home_url('/')); ?>?s={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
    <?php
}
add_action('wp_head', 'norelle_structured_data', 1);

/**
 * Preconnect to external resources for faster loading (SEO: page speed).
 */
function norelle_resource_hints() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '<link rel="dns-prefetch" href="//www.google-analytics.com">' . "\n";
}
add_action('wp_head', 'norelle_resource_hints', 1);

/**
 * Add theme color meta tag for mobile browsers.
 */
function norelle_meta_theme_color() {
    echo '<meta name="theme-color" content="#3b0505">' . "\n";
}
add_action('wp_head', 'norelle_meta_theme_color', 1);

/**
 * Google Analytics 4 — gtag.js tracking.
 * Replace 'G-XXXXXXXXXX' with your real GA4 Measurement ID.
 */
function norelle_gtag_tracking() {
    $ga_id = 'G-5M1T3RFTZL';
    if ( empty($ga_id) ) return;
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr($ga_id); ?>"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '<?php echo esc_attr($ga_id); ?>', {
        'send_page_view': true,
        'cookie_flags': 'SameSite=None;Secure'
    });
    </script>
    <?php
}
add_action('wp_head', 'norelle_gtag_tracking', 2);
