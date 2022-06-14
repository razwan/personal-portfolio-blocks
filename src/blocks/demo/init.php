<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_block_type( 'razvanonofrei/demo', array(
	'render_callback' => '__ro_render_demo_block'
) );

function __ro_render_demo_block( $attributes, $content, $block ) {
	return '<div class="__ro-demo-block alignwide">' . $content . '</div>';
}
