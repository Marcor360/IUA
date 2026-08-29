# Testing y validación

- `npm run typecheck`: TypeScript independiente.
- `npm run lint`: ESLint con reglas TypeScript, hooks y variables no usadas.
- `npm test`: Vitest para SEO, RVOE, Schema, catálogo y scoring.
- `npm run validate:data`: duplicados y referencias de programas, rutas, campus, relacionados y RVOE.

`npm run build` inspecciona `dist` y exige metadata, canonical, robots, H1, contenido significativo, JSON-LD y secciones académicas. También valida sitemap y 404.

`npm run test:e2e` usa Playwright contra `scripts/serve-dist.mjs`, que devuelve status 404 real. Cubre Home, Oferta, carrera, campus, RVOE, contacto, quiz completo, cookies, navegación móvil y URL inexistente.

CI ejecuta instalación reproducible, typecheck, lint, unit tests, build, `npm audit --audit-level=high` y E2E Chromium.
