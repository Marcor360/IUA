# WordPress Content Model For IUA

## Goal

This frontend should use WordPress for editable institutional content and keep
Next.js responsible for layout, styling, responsiveness, navigation behavior,
and integrations.

## Recommended split

### Keep in WordPress

- Academic programs
- Institutional pages
- Blog posts and categories
- Campus/contact information
- Home carousel slides
- SEO text and featured images
- Clientify form URLs by academic level or program

### Keep in Next.js

- Layout and global navigation components
- Visual system, colors, spacing, responsiveness
- Carousel behavior and UI interactions
- Form iframe component and Clientify embed rendering
- Mapping logic and content normalization

## Recommended post types

### 1. `iua_programa`

Use one custom post type for all academic offers:

- Secundaria
- Bachillerato
- Licenciaturas
- Maestrias
- Doctorado

Why one type:

- One reusable template in the frontend
- One endpoint family in the REST API
- Easy filtering by level, area, or modality

Use the featured image as the main program image.

#### Fields for `iua_programa`

- `short_title`
- `summary`
- `pitch`
- `duration`
- `schedule`
- `focus_areas`
- `accent_color`
- `accent_soft_color`
- `clientify_form_url`
- `schedule_visit_url`
- `brochure_url`
- `hero_label`
- `is_featured_home`
- `is_featured_level`
- `campus_ids`

Notes:

- `focus_areas` should be stored as an array or repeater of short strings.
- `campus_ids` should store related `iua_campus` post IDs.
- `clientify_form_url` lets each level or program point to the right form.

### 2. `iua_campus`

Use a custom post type for campuses and contact centers.

#### Fields for `iua_campus`

- `short_name`
- `address`
- `reference`
- `phones`
- `email`
- `hours`
- `map_query`
- `google_maps_embed_url`
- `schedule_visit_url`

Use the featured image for campus photography if needed.

### 3. `iua_banner`

Use a custom post type for the home carousel and future promotional banners.

#### Fields for `iua_banner`

- `label`
- `headline`
- `description`
- `target_url`
- `sort_order`
- `is_active`

Use the featured image as the slide image.

### 4. Default `post`

Keep the WordPress default `post` post type for:

- News
- Blog
- Community articles

Keep default `category` for editorial grouping unless you want a stricter
taxonomy later.

### 5. Default `page`

Keep WordPress `page` for static institutional sections such as:

- Nosotros
- Comunidad
- Contacto
- Aviso de privacidad

If some of those pages need more structure than the block editor provides, move
their structured data into custom fields.

## Recommended taxonomies

### 1. `iua_nivel`

Assign to `iua_programa`.

Terms:

- Secundaria
- Bachillerato
- Licenciatura
- Maestria
- Doctorado

### 2. `iua_area`

Assign to `iua_programa`.

Suggested terms:

- Negocios
- Derecho
- Educacion
- Tecnologia
- Gastronomia
- Diseno
- Lenguas
- Psicologia
- Paisaje

### 3. `iua_modalidad`

Assign to `iua_programa`.

Suggested terms:

- Escolarizada
- Ejecutiva
- Online

## Minimum REST shape the frontend needs

The frontend currently expects normalized program data like:

- `slug`
- `title`
- `shortTitle`
- `summary`
- `pitch`
- `duration`
- `schedule`
- `campus`
- `focusAreas`
- `accent`
- `soft`
- `heroImage`

That means WordPress should expose:

- Standard post fields via REST
- Featured image
- Taxonomies
- Custom meta with `show_in_rest`

## Editorial ownership

### Marketing / admissions team

- Home slides
- Program copy
- Campus data
- Blog posts
- Clientify URLs

### Dev team

- Templates
- Fetch layer
- Data mapping
- Validation and fallback logic
- Performance and caching

## Mapping to the current frontend

These local structures should eventually be replaced by WordPress data:

- `programs`
- `programsByLevel`
- `levelBlocks`
- `campuses`
- `blogPosts`
- `homeCarouselSlides`

All of them currently live in:

- `src/lib/site-data.ts`

## Suggested implementation order

1. Connect blog posts from WordPress default `post`
2. Move campuses to `iua_campus`
3. Move academic programs to `iua_programa`
4. Move home carousel to `iua_banner`
5. Move remaining static page content to `page` or structured fields

## Backend implementation note

Register custom post types and taxonomies in a plugin, not a theme, so content
remains portable if the visual theme changes.
