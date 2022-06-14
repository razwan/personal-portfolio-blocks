<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_block_type( 'razvanonofrei/demo-content', array(
	'render_callback' => '__ro_render_demo_content_block'
) );

function __ro_render_demo_content_block( $attributes, $content, $block ) {
	return '<div class="__ro-demo-block__content __ro-demo-block__inner-container">' . $content . '</div>';
}
