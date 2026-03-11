<?php
/**
 * Generate WooCommerce REST API keys and verify they work.
 * Run inside the WordPress container:
 *   docker exec norelle-wordpress php /tmp/generate-api-keys.php
 */
require_once '/var/www/html/wp-load.php';

// Remove any existing keys to avoid conflicts
global $wpdb;
$wpdb->query("DELETE FROM {$wpdb->prefix}woocommerce_api_keys WHERE description = 'nextjs'");

// Generate raw key and secret
$consumer_key    = 'ck_' . wc_rand_hash();
$consumer_secret = 'cs_' . wc_rand_hash();

// Store (WooCommerce hashes the consumer_key before storing)
$data = array(
    'user_id'         => 1,
    'description'     => 'nextjs',
    'permissions'     => 'read_write',
    'consumer_key'    => wc_api_hash($consumer_key),
    'consumer_secret' => $consumer_secret,
    'truncated_key'   => substr($consumer_key, -7),
);
$wpdb->insert($wpdb->prefix . 'woocommerce_api_keys', $data);

if ($wpdb->insert_id) {
    // Verify: look up by hashed key
    $row = $wpdb->get_row(
        $wpdb->prepare(
            "SELECT key_id, permissions FROM {$wpdb->prefix}woocommerce_api_keys WHERE consumer_key = %s",
            wc_api_hash($consumer_key)
        )
    );
    if ($row) {
        echo "VERIFIED=true\n";
    } else {
        echo "VERIFIED=false\n";
    }
    echo "CONSUMER_KEY={$consumer_key}\n";
    echo "CONSUMER_SECRET={$consumer_secret}\n";
} else {
    echo "ERROR=insert_failed\n";
    echo $wpdb->last_error . "\n";
}
