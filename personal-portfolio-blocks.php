<?php
/**
 * Plugin Name: Personal Portfolio Blocks
 * Plugin URI: https://razvanonofrei.com
 * Description: Blocks created to showcase some of my work
 * Version: 1.0.0
 * Author: Razvan Onofrei
 * Author URI: https://www.razvanonofrei.com
 * Text Domain: __ro-blocks
 * Tested up to: 5.9.1
 * Requires PHP: 5.6.40
 * License: GPLv2 or later
 */

function __ro_get_plugin_url() {
	return plugins_url( null, __FILE__ );
}

function __ro_get_plugin_path() {
	return plugin_dir_path( __FILE__ );
}

function __ro_register_block_types() {
	$plugin_url = __ro_get_plugin_url();

	wp_register_script(
		'__ro-script',
		trailingslashit( $plugin_url ) . 'dist/index.js',
		array(
			'wp-blocks',
			'wp-block-editor'
		),
		filemtime( __ro_get_plugin_path() . 'dist/index.js' )
	);

	wp_register_script(
		'__ro-script-frontend',
		trailingslashit( $plugin_url ) . 'dist/frontend.js',
		array( 'wp-dom-ready', 'wp-element' ),
		filemtime( __ro_get_plugin_path() . 'dist/frontend.js' )
	);

    wp_register_style(
        '__ro-style',
		trailingslashit( $plugin_url ) . 'dist/frontend.css',
	    array(),
	    filemtime( __ro_get_plugin_path() . 'dist/frontend.css' )
    );
}
add_action( 'init', '__ro_register_block_types', 20 );

function myguten_enqueue() {
	wp_enqueue_script( '__ro-script' );
	wp_enqueue_style( '__ro-style' );
}
add_action( 'enqueue_block_editor_assets', 'myguten_enqueue' );

function my_load_scripts($hook) {
	wp_enqueue_script( '__ro-script-frontend' );
	wp_enqueue_style( '__ro-style' );
}
add_action( 'wp_enqueue_scripts', 'my_load_scripts' );

require_once dirname( __FILE__ ) . '/src/blocks/blobs/init.php';
require_once dirname( __FILE__ ) . '/src/blocks/demo/init.php';
require_once dirname( __FILE__ ) . '/src/blocks/demo-content/init.php';
require_once dirname( __FILE__ ) . '/src/blocks/demo-view/init.php';
