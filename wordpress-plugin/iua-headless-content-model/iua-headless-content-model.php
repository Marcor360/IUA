<?php
/**
 * Plugin Name: IUA Headless Content Model
 * Plugin URI: https://iua.edu.mx/
 * Description: Registers custom post types, taxonomies, and REST-ready meta fields for the IUA Next.js frontend.
 * Version: 0.1.0
 * Author: IUA
 * License: GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class IUA_Headless_Content_Model {
	public function __construct() {
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_meta_fields' ) );
	}

	public function register_post_types() {
		register_post_type(
			'iua_programa',
			array(
				'labels'       => array(
					'name'          => 'Programas',
					'singular_name' => 'Programa',
				),
				'public'       => true,
				'show_in_rest' => true,
				'menu_icon'    => 'dashicons-welcome-learn-more',
				'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
				'has_archive'  => true,
				'rewrite'      => array( 'slug' => 'programas-iua' ),
			)
		);

		register_post_type(
			'iua_campus',
			array(
				'labels'       => array(
					'name'          => 'Campus',
					'singular_name' => 'Campus',
				),
				'public'       => true,
				'show_in_rest' => true,
				'menu_icon'    => 'dashicons-location-alt',
				'supports'     => array( 'title', 'editor', 'thumbnail', 'revisions' ),
				'has_archive'  => false,
				'rewrite'      => array( 'slug' => 'campus-iua' ),
			)
		);

		register_post_type(
			'iua_banner',
			array(
				'labels'       => array(
					'name'          => 'Banners',
					'singular_name' => 'Banner',
				),
				'public'       => true,
				'show_in_rest' => true,
				'menu_icon'    => 'dashicons-images-alt2',
				'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
				'has_archive'  => false,
				'rewrite'      => array( 'slug' => 'banners-iua' ),
			)
		);
	}

	public function register_taxonomies() {
		register_taxonomy(
			'iua_nivel',
			array( 'iua_programa' ),
			array(
				'labels'       => array(
					'name'          => 'Niveles',
					'singular_name' => 'Nivel',
				),
				'public'       => true,
				'hierarchical' => true,
				'show_in_rest' => true,
			)
		);

		register_taxonomy(
			'iua_area',
			array( 'iua_programa' ),
			array(
				'labels'       => array(
					'name'          => 'Areas',
					'singular_name' => 'Area',
				),
				'public'       => true,
				'hierarchical' => true,
				'show_in_rest' => true,
			)
		);

		register_taxonomy(
			'iua_modalidad',
			array( 'iua_programa' ),
			array(
				'labels'       => array(
					'name'          => 'Modalidades',
					'singular_name' => 'Modalidad',
				),
				'public'       => true,
				'hierarchical' => true,
				'show_in_rest' => true,
			)
		);
	}

	public function register_meta_fields() {
		$this->register_string_meta( 'iua_programa', 'short_title' );
		$this->register_string_meta( 'iua_programa', 'summary' );
		$this->register_string_meta( 'iua_programa', 'pitch' );
		$this->register_string_meta( 'iua_programa', 'duration' );
		$this->register_string_meta( 'iua_programa', 'schedule' );
		$this->register_string_meta( 'iua_programa', 'accent_color' );
		$this->register_string_meta( 'iua_programa', 'accent_soft_color' );
		$this->register_string_meta( 'iua_programa', 'clientify_form_url' );
		$this->register_string_meta( 'iua_programa', 'schedule_visit_url' );
		$this->register_string_meta( 'iua_programa', 'brochure_url' );
		$this->register_string_meta( 'iua_programa', 'hero_label' );
		$this->register_boolean_meta( 'iua_programa', 'is_featured_home' );
		$this->register_boolean_meta( 'iua_programa', 'is_featured_level' );
		$this->register_string_array_meta( 'iua_programa', 'focus_areas' );
		$this->register_integer_array_meta( 'iua_programa', 'campus_ids' );

		$this->register_string_meta( 'iua_campus', 'short_name' );
		$this->register_string_meta( 'iua_campus', 'address' );
		$this->register_string_meta( 'iua_campus', 'reference' );
		$this->register_string_meta( 'iua_campus', 'email' );
		$this->register_string_meta( 'iua_campus', 'hours' );
		$this->register_string_meta( 'iua_campus', 'map_query' );
		$this->register_string_meta( 'iua_campus', 'google_maps_embed_url' );
		$this->register_string_meta( 'iua_campus', 'schedule_visit_url' );
		$this->register_string_array_meta( 'iua_campus', 'phones' );

		$this->register_string_meta( 'iua_banner', 'label' );
		$this->register_string_meta( 'iua_banner', 'headline' );
		$this->register_string_meta( 'iua_banner', 'description' );
		$this->register_string_meta( 'iua_banner', 'target_url' );
		$this->register_integer_meta( 'iua_banner', 'sort_order' );
		$this->register_boolean_meta( 'iua_banner', 'is_active' );
	}

	private function register_string_meta( $post_type, $key ) {
		register_post_meta(
			$post_type,
			$key,
			array(
				'single'            => true,
				'type'              => 'string',
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
	}

	private function register_integer_meta( $post_type, $key ) {
		register_post_meta(
			$post_type,
			$key,
			array(
				'single'            => true,
				'type'              => 'integer',
				'show_in_rest'      => true,
				'sanitize_callback' => 'absint',
			)
		);
	}

	private function register_boolean_meta( $post_type, $key ) {
		register_post_meta(
			$post_type,
			$key,
			array(
				'single'            => true,
				'type'              => 'boolean',
				'show_in_rest'      => true,
				'sanitize_callback' => array( $this, 'sanitize_boolean' ),
			)
		);
	}

	private function register_string_array_meta( $post_type, $key ) {
		register_post_meta(
			$post_type,
			$key,
			array(
				'single'            => true,
				'type'              => 'array',
				'show_in_rest'      => array(
					'schema' => array(
						'type'    => 'array',
						'items'   => array( 'type' => 'string' ),
						'default' => array(),
					),
				),
				'sanitize_callback' => array( $this, 'sanitize_string_array' ),
			)
		);
	}

	private function register_integer_array_meta( $post_type, $key ) {
		register_post_meta(
			$post_type,
			$key,
			array(
				'single'            => true,
				'type'              => 'array',
				'show_in_rest'      => array(
					'schema' => array(
						'type'    => 'array',
						'items'   => array( 'type' => 'integer' ),
						'default' => array(),
					),
				),
				'sanitize_callback' => array( $this, 'sanitize_integer_array' ),
			)
		);
	}

	public function sanitize_boolean( $value ) {
		return rest_sanitize_boolean( $value );
	}

	public function sanitize_string_array( $value ) {
		if ( ! is_array( $value ) ) {
			return array();
		}

		return array_values(
			array_filter(
				array_map( 'sanitize_text_field', $value )
			)
		);
	}

	public function sanitize_integer_array( $value ) {
		if ( ! is_array( $value ) ) {
			return array();
		}

		return array_values(
			array_filter(
				array_map( 'absint', $value )
			)
		);
	}
}

new IUA_Headless_Content_Model();
