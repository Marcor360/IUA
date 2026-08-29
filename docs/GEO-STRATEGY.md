# Estrategia GEO de Universidad IUA

## Estado GEO inicial

| Área | Estado inicial | Hallazgo principal |
|---|---|---|
| Entity SEO | MEJORABLE | Había datos institucionales repetidos y un teléfono con formato inconsistente. |
| Contenido factual | MEJORABLE | Existían perfiles y planes resumidos, mezclados con mensajes promocionales. |
| Carreras | MEJORABLE | Buen catálogo, pero sin breadcrumbs ni `EducationalOccupationalProgram`. |
| Campus | MEJORABLE | Había direcciones y contactos, sin relaciones visibles hacia programas. |
| RVOE | CRÍTICO | Sólo había afirmaciones genéricas; no existen números, fechas o PDFs en el repositorio. |
| Datos estructurados | MEJORABLE | Sólo entidad global y `Course` insertado tras ejecutar JavaScript. |
| Respuestas conversacionales | MEJORABLE | FAQ genérica e idéntica para todos los programas. |
| Interlinking | MEJORABLE | Navegación general, sin relaciones carrera-campus-quiz-RVOE. |
| HTML inicial | CRÍTICO | El `#root` estaba vacío y la metadata por ruta dependía de `useEffect`. |
| Rastreabilidad | MEJORABLE | SPA con sitemap, pero sin HTML inicial específico por ruta. |
| Robots IA | MEJORABLE | No se bloqueaban bots, pero no se documentaba OAI-SearchBot. |
| Sitemap | BUENO | Incluía páginas y programas; faltaban RVOE y quiz. |
| Orientación vocacional | NO EXISTE | No había landing ni herramienta. |
| Contenido comparativo | NO EXISTE | No existe contenido editorial verificable; no se generó artificialmente. |
| Citabilidad | MEJORABLE | Faltaban respuestas directas y contexto independiente por sección. |
| Autoridad institucional | MEJORABLE | Misión y visión estaban publicadas, pero sin una fuente de datos compartida. |

## Implementación

La entidad principal vive en `src/config/institution.ts`. Centraliza nombre, descripción, URL, logo, admisiones, perfiles sociales y los campus cuyos datos ya existían en el sitio. El identificador Schema estable es `https://iua.edu.mx/#organization`.

Las fichas de programa conservan la fuente `src/data/ofertaEducativa.ts` y ahora incluyen respuesta directa, ficha académica, perfil de ingreso, egreso, campo laboral, áreas de formación, preguntas específicas, breadcrumbs y enlaces a campus y test vocacional. El Schema usa `EducationalOccupationalProgram` y sólo propiedades respaldadas por contenido visible.

`/rvoe` explica cómo verificar un reconocimiento y centraliza las fichas de programas. No publica números, autoridades, fechas ni documentos porque esos datos no están en el repositorio. El modelo debe ampliarse con `number`, `grantedAt`, `authority` y `documentUrl` sólo cuando se reciban documentos institucionales comprobables.

`/que-carrera-estudiar` contiene explicación indexable antes de un test RIASEC determinista. El resultado no exige datos personales, muestra afinidad orientativa y mantiene la promoción IUA como enlace secundario. El catálogo es deliberadamente pequeño y extensible; futuras ampliaciones deben registrar fuente y fecha.

El build ejecuta `scripts/prerender.mjs`. Genera HTML por Home, Nosotros, Oferta, Campus, RVOE, quiz y cada programa, con `title`, description, canonical, H1, texto principal y JSON-LD antes de cargar React. El sitemap se genera desde las rutas reales.

`robots.txt` permite `OAI-SearchBot`. Este bot se relaciona con resultados de búsqueda de OpenAI; `GPTBot` tiene controles distintos y no se trata como equivalente. No se implementó `llms.txt`, porque no sustituye rastreabilidad, HTML, contenido ni Schema.

La arquitectura editorial futura está preparada en `src/content/articleTypes.ts` con categorías: elegir carrera, comparaciones, campo laboral, decisión universitaria y contenido local. La colección permanece vacía hasta contar con autor, revisor, fuentes y fechas verificables.

## Medición

`trackEvent` envía eventos no sensibles a `dataLayer`. El quiz prepara `career_quiz_start`, `career_quiz_complete` y `career_iua_program_click`. Próximos eventos a instrumentar sobre interacciones reales: `program_view`, `campus_view`, `rvoe_document_click`, `contact_open`, `whatsapp_click` y `lead_submit`, siempre respetando Consent Mode.

KPIs SEO: impresiones, clics, CTR, posición y páginas indexadas. KPIs GEO: referrals identificables desde buscadores generativos, landing pages, conversiones y menciones verificadas. Conversión: WhatsApp, formulario, llamada, quiz y lead. No se deben estimar ni inventar métricas.

## Reglas editoriales y técnicas

- No crear páginas masivas por ciudad, carrera o pregunta.
- No hacer keyword stuffing ni usar meta keywords como señal SEO.
- No inventar RVOE, costos, fechas, salarios, campus o estadísticas.
- No publicar FAQ falsas ni Schema que no corresponda al contenido visible.
- No presentar `llms.txt` como factor de ranking.
- Mantener headings, tablas accesibles, enlaces descriptivos, navegación por teclado y carga diferida de imágenes.
- Usar fechas de actualización sólo cuando representen una revisión editorial real.

## Pendientes institucionales

1. Entregar por programa y modalidad: número de RVOE, fecha, autoridad, campus aplicable y PDF oficial.
2. Confirmar la historia institucional con fechas y documentos para ampliar `/nosotros`.
3. Validar duración, modalidad, campus y plan completo de cada programa con control académico.
4. Definir autor y revisor institucional para futuros contenidos de orientación.
5. Confirmar una fuente oficial para ampliar el catálogo vocacional nacional.

## Matriz de cambios

| Archivo/área | Problema | Solución | Razón GEO/SEO | Riesgo | Impacto esperado |
|---|---|---|---|---|---|
| `src/config/institution.ts` | Datos repetidos | Fuente institucional única | Entidad consistente | Datos fuente pueden cambiar | Alta comprensión de entidad |
| Programas | Contenido y Schema genéricos | Respuestas directas, interlinking y Schema académico | Citabilidad y contexto | Revisión académica pendiente | Alta relevancia por programa |
| `/rvoe` | No había centro de confianza | Landing verificable sin inventar expedientes | Confianza y navegación | Faltan documentos | Base lista para publicación oficial |
| Quiz | No existía orientación | Landing + scoring probado | Cobertura de intención y conversión | No es diagnóstico profesional | Descubrimiento de programas |
| Build | Root vacío | Prerender estático por ruta | Rastreabilidad y HTML inicial | Hay que mantener rutas del script | Mejor indexación y recuperación |
| Robots/sitemap | Rutas y bot incompletos | OAI-SearchBot y nuevas URLs | Descubrimiento | Políticas de crawler pueden cambiar | Rastreo más explícito |
