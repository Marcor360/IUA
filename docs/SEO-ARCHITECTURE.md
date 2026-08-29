# Arquitectura SEO

`src/config/indexableRoutes.json` alimenta sitemap, prerender y validación. `src/utils/seo.ts` administra title, description, canonical, Open Graph, Twitter y robots en navegación cliente. Por defecto genera `index, follow`; una página puede declarar `index: false` o `follow: false`. No se generan meta keywords.

## SSR estático e hidratación

`scripts/prerender.mjs` carga `src/entry-server.tsx` y renderiza el mismo árbol React con `StaticRouter`. Cada archivo de `dist` contiene navegación, H1, secciones y JSON-LD antes de JavaScript. El cliente usa `hydrateRoot` cuando encuentra HTML y `createRoot` en desarrollo.

Los programas incluyen `EducationalOccupationalProgram` y `BreadcrumbList`; los campus incluyen entidad educativa, breadcrumbs y `PostalAddress` cuando existe dirección. La entidad global usa `CollegeOrUniversity` y `Organization`.

## Sitemap y lastmod

El sitemap sólo admite HTTPS bajo `https://iua.edu.mx`, URLs únicas e indexables. Excluye API y 404. `updatedAt` no es fecha de build: sólo cambia cuando el contenido de esa ruta cambia de forma real y verificable. Nunca se actualizan todas las fechas automáticamente.

## 404 y rastreo

`public/.htaccess` sirve rutas prerenderizadas, archivos y API reales y usa `ErrorDocument 404 /404.html`; no existe fallback global. `vercel.json` tampoco contiene rewrite catch-all. `robots.txt` excluye `/api/` para el wildcard y mantiene OAI-SearchBot sin equipararlo a GPTBot.
