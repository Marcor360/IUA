# IUA Headless Content Model

## What this plugin does

Registers:

- `iua_programa`
- `iua_campus`
- `iua_banner`
- `iua_nivel`
- `iua_area`
- `iua_modalidad`

And exposes REST-ready meta fields for the Next.js frontend.

## Installation

1. Copy the `iua-headless-content-model` folder into `wp-content/plugins/`
2. Activate the plugin in WordPress admin
3. Go to `Settings > Permalinks` and save once to refresh rewrite rules
4. Confirm these endpoints exist:
   - `/wp-json/wp/v2/iua_programa`
   - `/wp-json/wp/v2/iua_campus`
   - `/wp-json/wp/v2/iua_banner`

## Important note

This plugin registers the content model only.

To get a better editorial experience, the next recommended step is adding a
custom fields UI such as:

- ACF Pro
- Meta Box
- Pods

That UI should write to the meta keys already registered by this plugin.
