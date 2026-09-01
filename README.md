# Universidad IUA — Plataforma Web Institucional

Sitio web institucional de **Universidad IUA** desarrollado con **React, TypeScript, Vite y Tailwind CSS**, con una arquitectura orientada a:

**UX · SEO Técnico · GEO · Rendimiento · Accesibilidad · Conversión · Mantenibilidad**

El proyecto centraliza la oferta educativa, programas académicos, campus, información de RVOE, orientación vocacional, contacto y contenidos institucionales dentro de una plataforma moderna preparada tanto para usuarios como para motores de búsqueda y sistemas generativos.

---

## Sobre el proyecto

Este repositorio contiene la plataforma web institucional de **Universidad IUA**.

El proyecto fue planteado más allá de una implementación frontend tradicional.

La arquitectura busca resolver cuatro áreas principales:

### Desarrollo Web

Una aplicación moderna, modular y mantenible basada en React y TypeScript.

### UX

Una experiencia enfocada en ayudar al usuario a descubrir programas educativos, conocer la institución y avanzar hacia acciones de contacto.

### SEO

Una arquitectura técnica diseñada para facilitar rastreo, indexación, interpretación semántica y posicionamiento orgánico.

### GEO

Una estrategia de **Generative Engine Optimization** orientada a que sistemas generativos puedan recuperar información institucional clara, estructurada, verificable y consistente.

---

# Objetivos

Los principales objetivos del proyecto son:

* Mejorar la experiencia digital de futuros estudiantes.
* Facilitar el descubrimiento de la oferta educativa.
* Construir páginas independientes para programas académicos.
* Centralizar información institucional y académica.
* Mejorar la arquitectura SEO del sitio.
* Preparar el contenido para estrategias GEO.
* Facilitar la interpretación de entidades y programas mediante datos estructurados.
* Reducir dependencia de JavaScript para contenido indexable.
* Mejorar la captación mediante formularios y WhatsApp.
* Mantener consistencia entre contenido visible y datos estructurados.
* Evitar información académica no verificada.
* Facilitar futuras actualizaciones por parte del cliente o de otros desarrolladores.

---

# Tecnologías

| Tecnología           | Implementación                  |
| -------------------- | ------------------------------- |
| React 19             | Componentes e interfaz          |
| TypeScript           | Tipado y arquitectura           |
| Vite 8               | Desarrollo y compilación        |
| Tailwind CSS 4       | Sistema de estilos              |
| React Router         | Navegación y routing            |
| React SSR            | Renderizado de rutas indexables |
| JSON-LD              | Datos estructurados             |
| Vitest               | Pruebas unitarias               |
| Playwright           | Pruebas E2E                     |
| ESLint               | Calidad de código               |
| PHP                  | Endpoint de contacto en cPanel  |
| Resend               | Entrega de formularios          |
| Cloudflare Turnstile | Protección anti-spam            |
| Google Consent Mode  | Gestión de consentimiento       |

---

# Desarrollo + UX + SEO + GEO

Uno de los principales diferenciadores del proyecto es que el desarrollo técnico, la experiencia de usuario y la estrategia de visibilidad digital se trabajan dentro de la misma arquitectura.

La plataforma no se limita a mostrar información.

Busca establecer un flujo claro:

**Descubrimiento → exploración → evaluación → confianza → contacto**

Esto permite conectar decisiones de desarrollo con objetivos de negocio y adquisición.

---

# SEO técnico

La aplicación implementa una arquitectura SEO propia para controlar la información de cada ruta.

Entre los elementos gestionados se encuentran:

* `<title>`
* Meta description
* Meta robots
* Canonical URL
* Open Graph
* Twitter Cards
* URLs indexables controladas
* Sitemap XML
* Fechas editoriales mediante `lastmod`
* Página 404 real
* Contenido disponible antes de ejecutar JavaScript
* Datos estructurados JSON-LD
* Breadcrumbs
* Arquitectura semántica
* Información institucional centralizada

La configuración principal de metadata se encuentra en:

```text
src/utils/seo.ts
```

Las rutas que pueden indexarse y sus fechas editoriales se administran desde:

```text
src/config/indexableRoutes.json
```

Esto evita depender de fechas automáticas generadas durante cada build.

`lastmod` sólo debe modificarse cuando existe una actualización real del contenido de la ruta correspondiente.

---

# SSR y prerender

Las rutas indexables son prerenderizadas durante el proceso de build.

El proyecto utiliza:

```text
src/entry-server.tsx
scripts/prerender.mjs
```

para renderizar el mismo árbol de React mediante SSR estático.

Como resultado, el HTML generado puede contener desde la respuesta inicial:

* Navegación
* H1
* Contenido principal
* Información académica
* Breadcrumbs
* Datos estructurados JSON-LD
* Metadata SEO

sin depender exclusivamente de la ejecución de JavaScript por parte del crawler.

En producción, React hidrata posteriormente ese HTML para convertirlo en una aplicación interactiva.

---

# GEO — Generative Engine Optimization

La estrategia del proyecto también contempla **GEO — Generative Engine Optimization**.

El objetivo es preparar la información institucional para que pueda ser comprendida y recuperada de forma más precisa por sistemas de búsqueda generativa y motores basados en inteligencia artificial.

GEO no sustituye al SEO.

Ambas disciplinas forman parte de la misma estrategia:

```text
SEO
↓
Descubrimiento + rastreo + indexación + relevancia

GEO
↓
Comprensión + recuperación + entidades + contexto + citabilidad
```

---

## Estrategia GEO aplicada

La implementación se basa en información visible y verificable.

Se utilizan fuentes de datos centralizadas para evitar inconsistencias entre la interfaz, el HTML prerenderizado y los datos estructurados.

### Institución

```text
src/config/institution.ts
```

Centraliza información como:

* Nombre institucional
* Descripción
* URL
* Contacto
* Campus
* Perfiles sociales

### Oferta educativa

```text
src/data/ofertaEducativa.ts
```

Centraliza información relacionada con los programas académicos.

### RVOE

```text
src/data/rvoe.ts
```

Gestiona los registros de RVOE y sus asociaciones.

### Rutas indexables

```text
src/config/indexableRoutes.json
```

Controla qué rutas forman parte de la arquitectura orgánica del proyecto.

---

# Datos estructurados

El sitio utiliza Schema.org para representar explícitamente diferentes entidades.

Entre los tipos utilizados se encuentran:

```text
Organization
CollegeOrUniversity
EducationalOrganization
EducationalOccupationalProgram
PostalAddress
BreadcrumbList
```

Los programas académicos utilizan:

```text
EducationalOccupationalProgram
```

Los campus físicos pueden representarse mediante:

```text
CollegeOrUniversity
PostalAddress
```

El campus virtual utiliza una entidad educativa correspondiente a su naturaleza digital.

Las jerarquías de navegación utilizan:

```text
BreadcrumbList
```

---

## Principio de consistencia semántica

Una regla importante del proyecto es:

> Los datos estructurados no deben afirmar información que no pueda encontrarse o verificarse dentro del contenido visible o de las fuentes institucionales del proyecto.

Esto permite mantener consistencia entre:

```text
Contenido visible
        ↓
Datos fuente
        ↓
HTML prerenderizado
        ↓
Schema
        ↓
SEO / GEO
```

---

# GEO y sistemas generativos

La arquitectura busca facilitar consultas tradicionales como:

> ¿Qué universidades ofrecen la Licenciatura en Derecho?

pero también búsquedas conversacionales más específicas, por ejemplo:

> ¿Dónde puedo estudiar Derecho en el Estado de México?

> ¿Qué carreras ofrece Universidad IUA?

> ¿Qué campus tiene Universidad IUA?

> ¿Universidad IUA tiene programas en línea?

El objetivo técnico no es garantizar una posición o una cita dentro de un sistema de IA.

El objetivo es aumentar la **claridad, consistencia, accesibilidad y recuperabilidad de la información institucional**.

---

# Principios GEO

La estrategia evita prácticas que podrían degradar la calidad del sitio.

No se implementan:

* Doorway pages.
* Keyword stuffing.
* Páginas generadas masivamente.
* Contenido artificial creado únicamente para crawlers.
* Información académica inventada.
* RVOE inferidos sin evidencia.
* Salarios inventados.
* Estadísticas sin fuente.
* Fechas de actualización artificiales.
* Datos estructurados incompatibles con el contenido visible.

El enfoque es:

**menos contenido artificial, más información institucional útil y verificable.**

---

# Crawlers de IA

El proyecto diferencia entre crawlers y finalidades distintas.

La configuración de `robots.txt` mantiene políticas específicas para crawlers relacionados con sistemas generativos y evita tratar automáticamente todos los agentes como equivalentes.

También se excluyen endpoints técnicos como:

```text
/api/
```

del rastreo general.

Es importante considerar que `robots.txt` controla rastreo, no seguridad.

La seguridad del endpoint se implementa independientemente a nivel servidor.

---

# RVOE y exactitud académica

El proyecto dispone de una fuente central para manejar información de RVOE.

```text
src/data/rvoe.ts
```

La arquitectura utiliza resolutores estrictos para evitar mostrar un RVOE cuando la relación entre:

* Programa
* Campus
* Modalidad
* Institución

no sea suficientemente clara.

Si la relación es ambigua, el sistema no debe inventar ni asumir el registro correspondiente.

La página:

```text
/rvoe
```

funciona como punto de consulta central de esta información.

---

# Orientación vocacional

La plataforma incluye una herramienta de orientación ubicada en:

```text
/que-carrera-estudiar
```

El cuestionario utiliza un sistema determinista basado en **RIASEC**.

Consta de 20 preguntas y genera inicialmente un resultado de orientación general.

Posteriormente puede relacionar esos resultados con opciones académicas disponibles dentro de IUA.

Actualmente el sistema:

* No utiliza un LLM para calcular resultados.
* No inventa salarios.
* No inventa demanda laboral.
* No afirma niveles de empleabilidad sin fuentes.
* No genera recomendaciones aleatorias mediante IA.

Esto permite que el resultado sea reproducible y auditable.

---

# Experiencia de usuario

La plataforma incorpora diferentes puntos de navegación y conversión.

Entre ellos:

* Home institucional.
* Oferta educativa.
* Fichas individuales de carrera.
* Información de campus.
* RVOE.
* Orientación vocacional.
* Información institucional.
* Comunidad.
* Contacto.
* WhatsApp.
* Aviso de privacidad.
* Consentimiento de cookies.
* Página 404.

El objetivo es reducir fricción entre el descubrimiento del sitio y una acción de contacto.

---

# Rutas principales

Actualmente la aplicación contempla rutas como:

```text
/
/nosotros
/comunidad
/contacto
/aviso-de-privacidad

/oferta
/oferta/:slug

/campus
/campus/:slug

/rvoe

/que-carrera-estudiar
```

Las rutas indexables se administran de forma central desde:

```text
src/config/indexableRoutes.json
```

---

# Arquitectura técnica

Algunas de las piezas principales del proyecto son:

```text
IUA/
│
├── .github/
│
├── docs/
│   ├── GEO-STRATEGY.md
│   ├── SEO-ARCHITECTURE.md
│   ├── RVOE-MAPPING.md
│   └── TESTING.md
│
├── public/
│   └── api/
│
├── scripts/
│   ├── generate-sitemap.mjs
│   ├── prerender.mjs
│   ├── validate-data.mjs
│   ├── validate-seo-build.mjs
│   └── serve-dist.mjs
│
├── src/
│   ├── config/
│   │   ├── institution.ts
│   │   └── indexableRoutes.json
│   │
│   ├── data/
│   │   ├── ofertaEducativa.ts
│   │   └── rvoe.ts
│   │
│   ├── utils/
│   │   └── seo.ts
│   │
│   ├── entry-server.tsx
│   └── ...
│
├── tests/
│   └── e2e/
│
├── .env.example
├── .nvmrc
├── DEPLOY-CPANEL.md
├── SECURITY.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

# Requisitos

Para trabajar con el proyecto se requiere:

* Git
* Node.js 24
* npm

El proyecto declara explícitamente:

```text
Node >=24 <25
```

y utiliza `.nvmrc` para mantener consistencia entre desarrollo, CI y hosting.

Si utilizas NVM:

```bash
nvm use
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/Marcor360/IUA.git
```

Entrar al proyecto:

```bash
cd IUA
```

---

## 2. Instalar dependencias

Para una instalación reproducible utilizando el `package-lock.json`:

```bash
npm ci
```

También existe una instalación con ejecución de scripts restringida:

```bash
npm run safe-install
```

equivalente a:

```bash
npm install --ignore-scripts
```

---

# Desarrollo local

Inicia Vite mediante:

```bash
npm run dev
```

La aplicación estará disponible en el puerto indicado por Vite.

---

# Variables y secretos

El repositorio contiene:

```text
.env.example
```

como referencia de las variables utilizadas por los servicios relacionados con contacto.

Ejemplo:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=admisiones@iua.edu.mx
CONTACT_FROM_EMAIL="Universidad IUA <no-reply@iua.edu.mx>"
TURNSTILE_SECRET_KEY=
```

## Importante

Nunca deben publicarse:

* API keys.
* Tokens.
* Credenciales.
* Contraseñas.
* Configuraciones privadas del servidor.

Los secretos reales deben permanecer fuera del repositorio.

---

# Formulario de contacto

En cPanel, el formulario utiliza el endpoint:

```text
/api/contact.php
```

El endpoint implementa controles relacionados con:

* Método HTTP.
* Validación de origen.
* Tamaño de petición.
* Validación de campos.
* Rate limiting.
* Cloudflare Turnstile.
* Envío mediante Resend.

No utiliza `PHP mail()` como fallback.

---

# Configuración del formulario en cPanel

Antes de utilizar el formulario en producción debe crearse:

```text
public_html/api/contact.config.php
```

Puedes utilizar como referencia:

```text
public/api/contact.config.example.php
```

Ejemplo:

```php
<?php

return [
    'resend_api_key' => 're_xxxxxxxxxxxxxxxxxxxxxxxxx',
    'to_email' => 'soy@iua.edu.mx',
    'from_email' => 'Universidad IUA <no-reply@iua.edu.mx>',
    'turnstile_secret_key' => '',
];
```

`from_email` debe utilizar un dominio correctamente verificado en Resend.

El archivo con credenciales reales **no debe almacenarse en GitHub**.

---

# Seguridad

El proyecto incorpora diferentes medidas de seguridad.

Entre ellas:

* Validación del endpoint de contacto.
* Rate limiting.
* Turnstile server-side.
* Secretos fuera del repositorio.
* Content Security Policy.
* HSTS.
* Frame protection.
* Referrer Policy.
* Permissions Policy.
* Reglas específicas para Apache y Vercel.

También implementa:

**Google Consent Mode**

con consentimiento inicial:

```text
default denied
```

antes de Google Tag Manager.

Una vez que el usuario selecciona sus preferencias, se emite la actualización correspondiente de consentimiento.

Consulta:

```text
SECURITY.md
```

para información adicional.

---

# Testing y calidad

El proyecto utiliza diferentes niveles de validación.

## TypeScript

```bash
npm run typecheck
```

Valida los tipos sin generar archivos.

---

## ESLint

```bash
npm run lint
```

Ejecuta las reglas de calidad del código.

---

## Unit testing

```bash
npm test
```

Utiliza **Vitest**.

Existen pruebas relacionadas con:

* SEO.
* RVOE.
* Schema.
* Catálogo académico.
* Scoring de orientación.

---

## Validación de datos

```bash
npm run validate:data
```

Comprueba integridad relacionada con:

* Programas.
* Rutas.
* Campus.
* Relaciones.
* RVOE.
* Duplicados.

---

## End-to-End

```bash
npm run test:e2e
```

Utiliza **Playwright**.

Las pruebas E2E cubren áreas como:

* Home.
* Oferta educativa.
* Ficha de carrera.
* Campus.
* RVOE.
* Contacto.
* Orientación vocacional.
* Cookies.
* Navegación móvil.
* URLs inexistentes.

---

# Build de producción

Para generar el proyecto:

```bash
npm run build
```

El build ejecuta una cadena completa:

```text
Generación del sitemap
        ↓
Validación de datos
        ↓
Build de Vite
        ↓
Prerender SSR
        ↓
Validación SEO/GEO
```

Internamente corresponde a:

```bash
npm run generate:sitemap
npm run validate:data
vite build
npm run prerender
npm run validate:seo
```

El resultado final se genera dentro de:

```text
dist/
```

---

# Validación SEO/GEO del build

Una de las características del proyecto es que el proceso de construcción inspecciona el artefacto final.

La validación comprueba elementos como:

* Metadata.
* Canonical.
* Robots.
* H1.
* Contenido significativo.
* JSON-LD.
* Secciones académicas.
* Sitemap.
* Página 404.

Esto permite detectar errores SEO/GEO antes de publicar una nueva versión.

---

# Sitemap

Para generar manualmente el sitemap:

```bash
npm run generate:sitemap
```

La generación también forma parte de:

```bash
npm run build
```

El sitemap:

* Utiliza URLs HTTPS.
* Sólo incluye rutas indexables.
* Evita duplicados.
* Excluye API.
* Excluye 404.
* Utiliza fechas editoriales reales.

---

# Auditoría de dependencias

Ejecuta:

```bash
npm run audit
```

Esto utiliza:

```bash
npm audit --audit-level=high
```

para detectar vulnerabilidades de severidad alta o superior dentro del árbol de dependencias.

---

# Comandos disponibles

| Comando                    | Función                             |
| -------------------------- | ----------------------------------- |
| `npm run dev`              | Servidor local                      |
| `npm run typecheck`        | Validación TypeScript               |
| `npm run lint`             | ESLint                              |
| `npm test`                 | Pruebas Vitest                      |
| `npm run test:e2e`         | Pruebas Playwright                  |
| `npm run generate:sitemap` | Generación del sitemap              |
| `npm run validate:data`    | Validación de datos                 |
| `npm run prerender`        | Prerender SSR                       |
| `npm run validate:seo`     | Validación SEO/GEO                  |
| `npm run build`            | Build completo                      |
| `npm run preview`          | Preview del build                   |
| `npm run audit`            | Auditoría npm                       |
| `npm run safe-install`     | Instalación sin scripts automáticos |

---

# Checklist recomendado antes de publicar

Ejecutar:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run audit
```

Si alguno de los pasos críticos falla, la publicación debe revisarse antes de llegar a producción.

---

# Despliegue en cPanel

El proyecto está preparado para desplegarse en hosting con **cPanel / Apache**.

## 1. Generar build

```bash
npm install
npm run build
```

---

## 2. Subir archivos

Subir el contenido generado dentro de:

```text
dist/
```

a:

```text
public_html/
```

---

## 3. Configurar formulario

Crear:

```text
public_html/api/contact.config.php
```

utilizando como referencia:

```text
public/api/contact.config.example.php
```

---

## 4. Verificar rutas

El build incluye configuración `.htaccess` para soportar las rutas prerenderizadas.

Por ejemplo:

```text
/oferta/derecho
```

puede abrirse directamente sin ser enviado incorrectamente hacia un fallback SPA global.

El endpoint:

```text
/api/contact.php
```

también se mantiene separado del sistema de rutas de React.

Consulta:

```text
DEPLOY-CPANEL.md
```

para la documentación específica de despliegue.

---

# CI

El flujo de integración continua comprueba:

```text
Instalación reproducible
        ↓
TypeScript
        ↓
Lint
        ↓
Unit tests
        ↓
Build
        ↓
npm audit
        ↓
Playwright E2E
```

Esto permite detectar regresiones antes de integrar cambios que puedan afectar producción.

---

# Mantenimiento

Para actualizar una instalación existente:

```bash
git pull
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Después debe desplegarse el nuevo contenido generado dentro de:

```text
dist/
```

---

# Antes de modificar información académica

Los datos académicos no deben modificarse únicamente desde la interfaz visual.

Es necesario comprobar las fuentes centrales relacionadas con:

```text
src/data/ofertaEducativa.ts
src/data/rvoe.ts
src/config/institution.ts
src/config/indexableRoutes.json
```

Dependiendo de la modificación, puede ser necesario actualizar:

* Datos visibles.
* Schema.
* RVOE.
* Campus.
* Sitemap.
* `updatedAt`.
* Metadata.
* Tests.

Después de cualquier cambio relevante debe ejecutarse nuevamente:

```bash
npm run build
```

para validar el artefacto SEO/GEO.

---

# Documentación técnica

El repositorio incluye documentación adicional:

```text
docs/SEO-ARCHITECTURE.md
```

Arquitectura SEO, prerender, sitemap, robots y manejo de rutas.

```text
docs/GEO-STRATEGY.md
```

Estrategia GEO, entidades, contenido estructurado y reglas de exactitud.

```text
docs/RVOE-MAPPING.md
```

Asociaciones y lógica relacionada con RVOE.

```text
docs/TESTING.md
```

Testing, validación, build y CI.

```text
SECURITY.md
```

Seguridad, endpoint de contacto, Consent Mode y headers.

```text
DEPLOY-CPANEL.md
```

Proceso de despliegue para GoDaddy/cPanel.

---

# Métricas recomendadas

Para evaluar el impacto del proyecto deben utilizarse datos reales provenientes de plataformas de analítica y búsqueda.

Entre los KPIs recomendados se encuentran:

### SEO

* Impresiones orgánicas.
* Clics.
* CTR.
* Posición.
* Cobertura de indexación.
* Páginas indexadas.
* Consultas por programa académico.

### GEO / AI Search

* Referrals identificables desde sistemas generativos.
* Consultas de marca.
* Visibilidad de entidades.
* Recuperación de información institucional verificable.

### UX / Conversión

* Aperturas de contacto.
* Envíos de formulario.
* Clics en WhatsApp.
* Navegación hacia programas.
* Finalización del cuestionario vocacional.
* Interacción con campus.

No deben inventarse métricas GEO cuando la fuente de datos no permita medirlas de forma verificable.

---

# Enfoque profesional

Este proyecto representa un enfoque de desarrollo web donde **código, experiencia de usuario y adquisición orgánica no se trabajan como disciplinas aisladas**.

La arquitectura combina:

**Web Development · UX · Technical SEO · GEO · Semantic Web · Conversion Optimization**

El objetivo no es únicamente construir interfaces visuales.

El objetivo es desarrollar sitios que puedan ser:

* Utilizados fácilmente por personas.
* Interpretados correctamente por buscadores.
* Comprendidos por sistemas generativos.
* Rastreados e indexados eficientemente.
* Mantenidos por otros desarrolladores.
* Medidos mediante datos reales.
* Utilizados para cumplir objetivos de negocio.

---

# Desarrollo

Repositorio mantenido por:

**Marcor360**

GitHub:

```text
https://github.com/Marcor360
```

Áreas aplicadas dentro del proyecto:

```text
Frontend Development
React
TypeScript
UX
Technical SEO
GEO
Structured Data
Semantic Architecture
Web Performance
Conversion Optimization
Testing
Web Security
```

> Un sitio web no debería limitarse a verse bien. Debe ser usable, rastreable, comprensible, mantenible y capaz de cumplir un objetivo de negocio.

---

# Cliente

**Universidad IUA**

Plataforma desarrollada para fortalecer su presencia digital institucional y facilitar el descubrimiento de su oferta educativa.

Sitio:

```text
https://iua.edu.mx
```

---

# Estado

🟢 **Activo**

El proyecto se encuentra preparado para continuar evolucionando mediante:

* Nuevos programas académicos.
* Nuevas páginas institucionales.
* Mejoras UX.
* Optimización SEO.
* Evolución de la estrategia GEO.
* Nuevos datos estructurados.
* Optimización de rendimiento.
* Nuevas integraciones.
* Nuevos tests y validaciones.

---

# Nota sobre SEO y GEO

La implementación de SEO técnico, datos estructurados y GEO mejora las condiciones técnicas para el descubrimiento, comprensión y recuperación de información.

No implica ni garantiza:

* Rankings específicos.
* Aparición automática en respuestas generativas.
* Inclusión automática en resultados enriquecidos.
* Citaciones por parte de plataformas de inteligencia artificial.

Estos resultados dependen también de factores externos como autoridad, calidad de contenido, rastreo, indexación, competencia, señales de marca y funcionamiento de cada plataforma.

---

## Universidad IUA

**React · TypeScript · UX · SEO · GEO**

Desarrollo web orientado a construir una plataforma institucional **útil para personas, interpretable por buscadores y preparada para la evolución de la búsqueda mediante inteligencia artificial**.
