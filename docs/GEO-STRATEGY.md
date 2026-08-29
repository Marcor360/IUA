# Estrategia GEO onsite

La estrategia busca que buscadores y sistemas generativos recuperen hechos institucionales respaldados por contenido visible y datos estructurados, sin producir artículos ni páginas masivas.

## Fuentes compartidas

- `src/config/institution.ts`: entidad, contactos y campus.
- `src/data/ofertaEducativa.ts`: perfiles, duración, modalidades, campus y áreas académicas.
- `src/data/rvoe.ts`: 22 registros proporcionados por IUA y resolución estricta.
- `src/config/indexableRoutes.json`: rutas, metadata y fecha real de actualización.

Estas fuentes alimentan React, prerender SSR, Schema y validadores. Los programas entregan en HTML inicial resumen, beneficios, información clave, perfil de ingreso/egreso, campo laboral, plan, CTA y breadcrumbs. Los campus incluyen datos visibles y `PostalAddress` cuando existe.

## Entidades y Schema

La organización conserva el identificador `https://iua.edu.mx/#organization`. Las carreras usan `EducationalOccupationalProgram`; campus físicos usan `CollegeOrUniversity`, el virtual `EducationalOrganization`, y las jerarquías visibles usan `BreadcrumbList`. No se publica Schema que contradiga o amplíe hechos no visibles.

## RVOE y exactitud

La página `/rvoe` muestra la fuente completa con su contexto. Una ficha genérica sólo muestra `RVOE: XXXXXXXX` cuando la asociación es única; ante campus/modalidad/institución ambiguos no adivina. No se equiparan automáticamente modalidades comerciales con modalidades oficiales.

## Orientación vocacional

`/que-carrera-estudiar` utiliza 20 preguntas paso a paso y scoring RIASEC determinista. Primero presenta resultados vocacionales generales y después enlaces a opciones IUA. No usa LLM, salarios, demanda ni empleabilidad inventados. El catálogo puede ampliarse con `source` y fecha cuando existan fuentes externas.

## Rastreo y medición

El sitemap y SSR facilitan descubrimiento antes de JavaScript. OAI-SearchBot está permitido; GPTBot conserva una política separada. `/api/` se excluye del wildcard. Consent Mode controla analítica y marketing.

KPIs válidos: impresiones, clics, CTR, indexación, referrals identificables, aperturas de contacto, WhatsApp y finalización del quiz. No se estiman métricas sin datos.

## Reglas

- No inventar RVOE, costos, salarios, fechas, empleabilidad o estadísticas.
- No crear blog, doorway pages ni keyword stuffing.
- No usar meta keywords.
- Mantener contenido visible, Schema y datos fuente sincronizados.
- Cambiar `lastmod` sólo ante una modificación real del contenido.
