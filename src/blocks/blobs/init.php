<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_block_type( 'razvanonofrei/blobs', array(
	'render_callback' => '__ro_render_blobs_block'
) );

function __ro_render_blobs_block( $attributes, $content, $block ) {
	return '<div class="__ro-blobs-block"></div>';
}
