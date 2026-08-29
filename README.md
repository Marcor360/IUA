# Universidad IUA web

Sitio institucional de Universidad IUA construido con React 19, TypeScript, Vite 8 y Tailwind CSS 4. Publica oferta educativa, fichas de carrera, campus, RVOE, orientación vocacional, contacto y aviso de privacidad.

## Requisitos y comandos

Node 24 es la versión común para desarrollo, CI y hosting (`package.json` y `.nvmrc`).

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run audit
```

`npm run build` valida datos, genera el sitemap, compila Vite, prerenderiza todas las rutas indexables mediante React SSR y valida el artefacto SEO/GEO.

## Rutas

- `/`, `/nosotros`, `/comunidad`, `/contacto`, `/aviso-de-privacidad`
- `/oferta` y `/oferta/:slug`
- `/campus` y `/campus/:slug`
- `/rvoe`
- `/que-carrera-estudiar`

Las rutas indexables y sus fechas editoriales viven en `src/config/indexableRoutes.json`. No existe blog ni generación masiva de contenido.

## Arquitectura técnica

- `src/data/ofertaEducativa.ts`: catálogo académico compartido por React, SSR y Schema.
- `src/config/institution.ts`: entidad y campus.
- `src/data/rvoe.ts`: fuente central y resolutores estrictos de RVOE.
- `src/utils/seo.ts`: metadata cliente con API `robots.index/follow`.
- `src/entry-server.tsx` y `scripts/prerender.mjs`: HTML estático real e hidratable.
- `scripts/generate-sitemap.mjs`: sitemap estructurado con `lastmod` editorial.
- `scripts/validate-data.mjs` y `scripts/validate-seo-build.mjs`: integridad de datos y build.

Consent Mode inicia denegado y se actualiza tras una preferencia versionada. El endpoint de contacto aplica validación, rate limiting y soporte Turnstile; consulta [SECURITY.md](SECURITY.md).

Más detalles: [arquitectura SEO](docs/SEO-ARCHITECTURE.md), [estrategia GEO](docs/GEO-STRATEGY.md), [mapping RVOE](docs/RVOE-MAPPING.md) y [testing](docs/TESTING.md).
