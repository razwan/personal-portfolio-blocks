<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_block_type( 'razvanonofrei/demo-view', array(
	'render_callback' => '__ro_render_demo_view_block'
) );

function __ro_render_demo_view_block( $attributes, $content, $block ) {
	return '<div class="__ro-demo-block__view">' .
	       '<div class="__ro-demo-block__view-wrapper">' .
	            $content .
	       '</div>' .
	       '</div>';
}
