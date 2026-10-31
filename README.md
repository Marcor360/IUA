# Universidad IUA — sitio web institucional

Sitio de [Universidad IUA](https://iua.edu.mx) para consultar la oferta educativa, campus, RVOE, orientación vocacional, información institucional y medios de contacto. El frontend usa React, TypeScript, Vite y Tailwind CSS. Las páginas indexables se generan como HTML durante el build; el formulario se procesa con PHP en el hosting de cPanel.

**Versión del proyecto:** `1.8.4` (definida en `package.json`). **Versión del endpoint de contacto:** `php-mail-3`. El repositorio es mantenido por [Marcor360](https://github.com/Marcor360).

### Cambios recientes

- **1.8.4:** reglamentos institucionales servidos desde `public/Documentos/` y lector PDF integrado en Comunidad.
- **1.8.3:** ajustes de navegación adaptable y acceso flotante al test vocacional.
- **1.8.2:** enlaces desde la página de inicio a las fichas de los campus.
- **1.8.1:** iconos del sitio, consentimiento y mejoras de carga y caché.
- **Contacto actual:** envío desde PHP `mail()` a dos destinatarios, sin Resend; el endpoint `php-mail-3` mantiene códigos de diagnóstico para fallos de correo.

## Índice

- [Instalación paso a paso](#instalación-paso-a-paso)
- [Desarrollo y pruebas](#desarrollo-y-pruebas)
- [Funciones y rutas](#qué-incluye-el-sitio)
- [Arquitectura y datos](#arquitectura)
- [Formulario de contacto](#formulario-de-contacto)
- [Publicación en cPanel](#publicación-en-cpanel--apache)
- [Problemas frecuentes](#problemas-frecuentes)
- [Mantenimiento](#mantenimiento)
- [Documentación adicional](#documentación-adicional)

## Instalación paso a paso

### 1. Preparar el equipo

Instala Git, Node.js **24** y npm. El proyecto exige `>=24 <25` en `package.json`; `.nvmrc` contiene `24`. Si usas un gestor de versiones de Node, selecciona la versión 24 antes de instalar dependencias. Comprueba las herramientas en una terminal:

```bash
git --version
node --version
npm --version
```

`node --version` debe comenzar con `v24.`. npm viene normalmente con Node.js. Si el comando no se reconoce, vuelve a abrir la terminal después de instalar Node.

### 2. Obtener el código

```bash
git clone https://github.com/Marcor360/IUA.git
cd IUA
```

Si ya tienes una copia del repositorio, entra a su carpeta y actualízala con `git pull` antes de instalar. Comprueba que estás donde se encuentra `package.json`.

### 3. Instalar dependencias

```bash
npm ci
```

`npm ci` utiliza `package-lock.json` y realiza una instalación reproducible. No subas `node_modules/` al hosting: el sitio publicado usa el resultado de `dist/`.

### 4. Iniciar el sitio

```bash
npm run dev
```

Abre la URL que muestra Vite en la terminal, normalmente `http://127.0.0.1:5173/`. Detén el servidor con `Ctrl+C`. Los cambios en `src/` se reflejan durante el desarrollo.

### 5. Comprobar el proyecto

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

El build crea `dist/`. Para verlo localmente, ejecuta `npm run preview` y abre la URL que indique Vite. El servidor de desarrollo y la vista previa **no ejecutan PHP**: el formulario solo puede enviar desde un servidor PHP con correo saliente configurado, como el hosting de producción.

## Desarrollo y pruebas

Trabaja en `src/` para interfaz y datos, en `public/` para archivos publicados sin procesamiento de Vite y en `scripts/` para generación y validación. No edites `dist/` como fuente: se regenera con `npm run build` y está excluido de Git.

Para pruebas de navegador, instala Chromium de Playwright una vez en el equipo y genera el build antes de ejecutarlas:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright levanta automáticamente el servidor estático de `dist/` en el puerto 4173. Sus pruebas no cubren el envío PHP. Si el puerto ya está ocupado, cierra el proceso anterior antes de repetirlas. Los comandos completos y la CI se detallan en [Comandos y comprobaciones](#comandos-y-comprobaciones).

## Qué incluye el sitio

| Área | Rutas o función |
| --- | --- |
| Inicio e institución | `/`, `/nosotros`, `/comunidad`, `/aviso-de-privacidad` |
| Oferta educativa | `/oferta` y una ruta `/oferta/:slug` por programa |
| Campus | `/campus` y `/campus/:slug` para Chalco, Reyes, Texcoco y el plantel virtual |
| Validez oficial | `/rvoe` con asociaciones verificadas de programa, campus y modalidad |
| Orientación vocacional | `/que-carrera-estudiar`, cuestionario determinista de 20 preguntas basado en RIASEC |
| Contacto | `/contacto`, modal de solicitud, teléfono, correo y WhatsApp |

El listado concreto de rutas que se prerenderizan e incluyen en el sitemap está en [`src/config/indexableRoutes.json`](src/config/indexableRoutes.json). Las rutas desconocidas muestran una página 404 real con `noindex, follow`. `src/config/legacyRedirects.ts` está preparado para redirecciones históricas verificadas; actualmente no contiene reglas.

### Contenido académico

- `src/config/institution.ts`: identidad, contacto, campus y enlaces institucionales.
- `src/data/ofertaEducativa.ts`: fichas de programas y contenido visible.
- `src/data/programOfferings.ts` y `src/data/virtualCampusPrograms.ts`: relaciones de oferta y modalidad.
- `src/data/rvoe.ts`: registros y asociaciones de RVOE. Si una asociación es ambigua, no se asigna un registro por suposición.
- `src/features/careerQuiz/`: preguntas, puntuación y resultados del test vocacional.
- `public/Documentos/`: reglamentos PDF que se consultan desde Comunidad.

Antes de modificar un programa, campus o RVOE, comprueba esas fuentes y el contenido visible. Si cambia una página indexable, revisa sus metadatos y `updatedAt` en `src/config/indexableRoutes.json`. La fecha `lastmod` del sitemap representa una actualización editorial, no la fecha de cada compilación.

## Arquitectura

```text
src/
  App.tsx                     Rutas y composición de la aplicación
  page/                       Páginas institucionales y de campus
  components/                 Navegación, formulario y componentes compartidos
  data/ y config/             Oferta, RVOE, campus, rutas y metadatos
  features/careerQuiz/        Cuestionario vocacional
  utils/seo.ts                Metadatos por ruta
  utils/structuredData.ts     Datos estructurados
  entry-server.tsx            Renderizado de React en el build
public/
  api/contact.php             Endpoint PHP del formulario
  api/contact.config.example.php
  .htaccess                   Configuración de Apache
  Documentos/                Reglamentos PDF
scripts/
  generate-sitemap.mjs        Sitemap desde indexableRoutes.json
  validate-data.mjs           Integridad de datos académicos
  prerender.mjs               HTML de rutas y página 404
  validate-seo-build.mjs      Validación del artefacto
  serve-dist.mjs              Servidor estático para Playwright
tests/e2e/                   Pruebas de rutas y flujos críticos
dist/                        Resultado generado; no se guarda en Git
```

### SEO, prerender y GEO

`npm run build` ejecuta esta secuencia:

1. Genera `public/sitemap.xml` desde `src/config/indexableRoutes.json`.
2. Valida los datos académicos y sus relaciones.
3. Compila recursos con Vite.
4. Prerenderiza las rutas indexables y la página 404 con `src/entry-server.tsx`.
5. Comprueba HTML, metadatos, canonical, encabezados, JSON-LD, sitemap y 404.

El HTML inicial contiene contenido y metadatos antes de que React se hidrate. Los datos estructurados se construyen a partir de fuentes que también sustentan el contenido visible. La estrategia GEO está documentada en `docs/GEO-STRATEGY.md`: busca claridad y consistencia para sistemas de búsqueda generativa, sin prometer posiciones, menciones ni citas. `robots.txt` regula el rastreo y excluye `/api/`; no sustituye las validaciones del endpoint.

## Formulario de contacto

El modal de `src/components/ContactModal.tsx` envía JSON por `POST` a `/api/contact.php`. El usuario elige recibir contacto por teléfono o correo y selecciona programa y plantel. La opción WhatsApp abre un enlace aparte.

`public/api/contact.php` valida el método, tipo y tamaño de la petición, campos, programa y plantel. Incluye un campo trampa antispam y limita a cinco solicitudes por minuto por IP cuando el directorio temporal permite guardar el contador. Con la configuración actual envía **un mensaje** mediante PHP `mail()` a:

- `soy@iua.edu.mx`
- `admisiones@iua.edu.mx`

El remitente configurado en el código es `Universidad IUA <no-reply@iua.edu.mx>`. Si el usuario dejó su correo, se añade como `Reply-To`. El mensaje incluye nombre, contacto, programa y plantel. **No usa Resend ni necesita una clave API.** Los destinatarios y el remitente se cambian en `public/api/contact.php` y requieren publicar ese archivo de nuevo.

El contrato del endpoint es `POST` con `Content-Type: application/json`. Los valores de `programa` y `plantel` son identificadores, no las etiquetas visibles del formulario. Ejemplo de cuerpo para una prueba controlada:

```json
{
  "method": "phone",
  "nombre": "PRUEBA TECNICA IUA",
  "contacto": "5512345678",
  "programa": "secundaria",
  "plantel": "campus-reyes",
  "website": ""
}
```

`method` admite `phone` o `email`. En el segundo caso, `contacto` debe ser una dirección válida. El campo `website` es la trampa antispam y debe quedar vacío. Las respuestas son JSON; un `200` contiene `{"ok":true}`. No envíes datos personales reales en pruebas automáticas.

### Configuración del hosting

- El servidor debe ejecutar PHP 8.1 o posterior, con `mbstring` y `mail()` disponibles.
- El correo saliente del hosting debe estar habilitado. Comprueba SPF y DKIM para `iua.edu.mx` en **cPanel → Email Deliverability** y revisa los registros de correo del hosting si un mensaje no llega.
- Un `true` de `mail()` indica que el servidor aceptó el mensaje para entrega; no confirma que haya llegado a la bandeja de entrada.
- `public/api/contact.config.example.php` es solo una referencia para **Turnstile opcional**. El frontend actual no envía `turnstileToken`; deja `TURNSTILE_SECRET_KEY` y `turnstile_secret_key` vacíos hasta integrar el widget en el formulario. Activar solo el secreto haría que todas las solicitudes recibieran `Verificación requerida`.
- Si se usa `public_html/api/contact.config.php` para Turnstile, mantenlo fuera de Git. `public/api/.htaccess` bloquea su lectura pública en Apache. `.env.example` documenta únicamente `TURNSTILE_SECRET_KEY`; Vite no carga esa variable automáticamente en PHP.

### Diagnóstico

El frontend muestra un mensaje general cuando el endpoint devuelve un error. En la pestaña **Red / Network** del navegador, abre la respuesta de `/api/contact.php` para ver el estado y el campo `code`:

| Respuesta | Significado |
| --- | --- |
| `405` al abrir la URL en el navegador | Esperado: el endpoint solo acepta `POST` |
| `400` o `415` | Datos, verificación o tipo de contenido inválidos |
| `429` | Límite de solicitudes |
| `503` + `MAIL_UNAVAILABLE` | PHP `mail()` no está disponible en el hosting |
| `502` + `MAIL_SEND_FAILED` | El servidor de correo no aceptó el envío |
| `200` + `{"ok":true}` | PHP aceptó la solicitud; verifica la entrega en los buzones y registros de correo |

La cabecera `X-IUA-Contact-Version: php-mail-3` permite comprobar que producción ejecuta el endpoint de este repositorio. No pruebes el formulario repetidamente en el mismo minuto: el límite por IP puede producir un `429`. El correo de prueba debe identificarse claramente como tal.

## Publicación en cPanel / Apache

### 1. Preparar el build

En el equipo de desarrollo, con Node.js 24 y dentro de la raíz del repositorio:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
```

Comprueba que `dist/index.html`, `dist/.htaccess` y `dist/api/contact.php` existen. El build también incluye las páginas prerenderizadas, el sitemap, la página 404 y los recursos de `public/`.

### 2. Guardar una copia de la publicación actual

En cPanel, abre **Administrador de archivos** y localiza la raíz del sitio, normalmente `public_html/`. Conserva una copia de la versión actual antes de reemplazar archivos. Si hay un `public_html/api/contact.config.php` privado, consérvalo en el servidor: no está incluido en `dist/`.

### 3. Subir los archivos

Sube **el contenido de `dist/`**, no la carpeta `dist` como subcarpeta, a `public_html/`. En el Administrador de archivos de cPanel puedes comprimir localmente el contenido de `dist/`, subir el ZIP y extraerlo en `public_html/`. Comprueba que resulten estas rutas:

```text
public_html/index.html
public_html/.htaccess
public_html/api/contact.php
public_html/oferta/derecho/index.html
public_html/sitemap.xml
```

Si no ves `.htaccess`, activa **Mostrar archivos ocultos** en la configuración del Administrador de archivos. Para actualizar únicamente el formulario, reemplaza `public_html/api/contact.php` con `dist/api/contact.php`; no es necesario volver a subir todo el frontend.

### 4. Verificar PHP y el correo del hosting

El servidor debe procesar PHP 8.1 o posterior y tener `mbstring` y `mail()` disponibles. Los destinatarios y el remitente están en `contact.php`; no se requiere `contact.config.php` ni una clave de Resend para el envío ordinario. Revisa la configuración de correo saliente y **Email Deliverability** de cPanel para el dominio `iua.edu.mx`.

### 5. Verificar la publicación

1. Abre `/`, `/oferta/derecho` y `/contacto` directamente en el navegador.
2. Comprueba que una URL inexistente responde con la página 404.
3. Abre `/api/contact.php`: la respuesta `405 Método no permitido` es correcta para GET y debe incluir la cabecera `X-IUA-Contact-Version: php-mail-3`.
4. Envía **una** solicitud de prueba desde el formulario. Comprueba la respuesta en **Red / Network**, los dos buzones y los registros de correo del hosting. Espera al menos un minuto antes de repetir varias pruebas desde la misma IP.

Si algo falla tras publicar, restaura la copia anterior y revisa el [diagnóstico del formulario](#diagnóstico) o [problemas frecuentes](#problemas-frecuentes). `dist/.htaccess` permite servir las rutas prerenderizadas y mantiene `/api/contact.php` fuera de las reglas de navegación de React. La guía corta está en [`DEPLOY-CPANEL.md`](DEPLOY-CPANEL.md). `public/_headers` y `vercel.json` contienen cabeceras para otras plataformas, pero subir el frontend a una plataforma estática no ejecuta este PHP.

## Comandos y comprobaciones

| Comando | Función |
| --- | --- |
| `npm run dev` | Servidor local Vite |
| `npm run typecheck` | Tipos TypeScript |
| `npm run lint` | ESLint |
| `npm test` | Pruebas unitarias con Vitest |
| `npm run validate:data` | Integridad de programas, rutas, campus y RVOE |
| `npm run generate:sitemap` | Regenera `public/sitemap.xml` |
| `npm run build` | Sitemap, datos, Vite, prerender y validación SEO |
| `npm run preview` | Vista local del build estático |
| `npm run serve:e2e` | Sirve `dist/` en el puerto 4173 para Playwright |
| `npm run test:e2e` | Pruebas E2E de escritorio y móvil; ejecutar después de `build` |
| `npm run audit` | `npm audit --audit-level=high` |
| `npm run safe-install` | `npm install --ignore-scripts` |

Las pruebas E2E cubren encabezados y canonical de rutas críticas, 404, preferencias de cookies, test vocacional, navegación móvil, listado de campus y comportamiento del encabezado. No prueban la entrega del correo PHP porque su servidor local sirve archivos estáticos.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run audit
```

`ci.yml` ejecuta esas comprobaciones en `main` y en solicitudes de cambio; Playwright se ejecuta allí en Chromium. El proyecto mantiene los secretos fuera de Git: no publiques contraseñas, claves ni archivos de configuración privados.

## Problemas frecuentes

| Síntoma | Comprobación y solución |
| --- | --- |
| `node` no se reconoce o `npm ci` rechaza la versión | Instala o selecciona Node.js 24, abre una terminal nueva y comprueba `node --version`. |
| `npm ci` falla por diferencias con el lockfile | Comprueba que `package.json` y `package-lock.json` provienen de la misma revisión; no edites el lockfile a mano. |
| El sitio abre localmente pero el formulario falla | Vite y los servidores estáticos no ejecutan PHP. Prueba en Apache/PHP con correo saliente configurado. |
| Una ruta directa devuelve 404 en cPanel | Comprueba que se subió `dist/.htaccess`, que la ruta tiene su `index.html` prerenderizado y que Apache aplica las reglas. |
| El formulario muestra el mensaje rojo | Abre **Red / Network** y consulta el estado y el JSON de `/api/contact.php`; usa la tabla de [diagnóstico](#diagnóstico). |
| `/api/contact.php` devuelve `405` al abrirlo directamente | Es normal: el navegador hizo GET y el endpoint exige POST. |
| Responde `400 Verificación requerida` | Hay un secreto Turnstile activo, pero el frontend no envía token. Déjalo vacío hasta integrar el widget. |
| Responde `429` | Espera al siguiente minuto antes de probar de nuevo desde esa IP. |
| Responde `503 MAIL_UNAVAILABLE` | Solicita al hosting que habilite la función PHP `mail()` o revisa la configuración PHP de la cuenta. |
| Responde `502 MAIL_SEND_FAILED` | Revisa el correo saliente y los logs del hosting; PHP intentó enviar y el servidor no aceptó el mensaje. |
| Responde `200` pero no aparece el correo | Revisa ambos buzones, spam/cuarentena y los registros del servidor. Un `200` no prueba entrega final. Comprueba SPF y DKIM en cPanel. |
| Tras subir cambios se ve la versión anterior | Confirma que subiste el contenido de `dist/` a la raíz correcta y que no estás viendo una copia en caché; para PHP consulta `X-IUA-Contact-Version`. |

## Mantenimiento

### Dónde hacer cada cambio

| Cambio | Fuente principal | Comprobación |
| --- | --- | --- |
| Programa o texto académico | `src/data/ofertaEducativa.ts` | Página, rutas relacionadas y `npm run validate:data` |
| Campus o contacto institucional | `src/config/institution.ts` | Fichas de campus y enlaces |
| Oferta por campus o modalidad | `src/data/programOfferings.ts`, `src/data/virtualCampusPrograms.ts` | Coherencia con programa y RVOE |
| RVOE | `src/data/rvoe.ts` | Relación exacta con programa, campus e institución; consulta `docs/RVOE-MAPPING.md` |
| Metadatos y fecha editorial | `src/config/indexableRoutes.json`, `src/utils/seo.ts` | Sitemap, canonical y HTML prerenderizado |
| Reglamentos PDF | `public/Documentos/` y `src/page/comunidad.tsx` | Apertura del lector y enlace directo |
| Navegación o modal | `src/components/`, `src/context/` | Teclado, móvil y pruebas E2E |
| Correo de contacto | `public/api/contact.php` | Cabecera de versión, respuesta JSON y entrega real |

Para publicar una modificación: actualiza la fuente, ajusta los tests pertinentes, ejecuta las comprobaciones de [desarrollo y pruebas](#desarrollo-y-pruebas), genera `dist/`, conserva una copia de producción y despliega el artefacto nuevo. Modifica `updatedAt` solo si cambió el contenido editorial de esa ruta. Para un incidente, conserva el código de respuesta y consulta los logs de PHP o correo sin copiar datos personales ni secretos en issues públicos.

## Seguridad y privacidad

`public/.htaccess` configura cabeceras como CSP, HSTS y políticas de caché para Apache. `vercel.json` contiene cabeceras equivalentes para su plataforma. El sitio inicia Google Consent Mode con almacenamiento opcional denegado y actualiza las preferencias del usuario desde `src/components/cookieConsent.tsx`. Los eventos de `src/utils/analytics.ts` solo se envían a `dataLayer` cuando se concedió consentimiento analítico.

Las medidas del formulario y las cabeceras están resumidas en [`SECURITY.md`](SECURITY.md). Los datos personales del sitio se describen en `/aviso-de-privacidad`.

## Documentación adicional

| Archivo | Tema |
| --- | --- |
| [`DEPLOY-CPANEL.md`](DEPLOY-CPANEL.md) | Publicación en cPanel |
| [`SECURITY.md`](SECURITY.md) | Seguridad y consentimiento |
| [`docs/SEO-ARCHITECTURE.md`](docs/SEO-ARCHITECTURE.md) | Rutas, SEO, sitemap y prerender |
| [`docs/GEO-STRATEGY.md`](docs/GEO-STRATEGY.md) | Estrategia GEO y fuentes verificables |
| [`docs/RVOE-MAPPING.md`](docs/RVOE-MAPPING.md) | Asociaciones de RVOE |
| [`docs/RVOE-PENDING-MAPPINGS.md`](docs/RVOE-PENDING-MAPPINGS.md) | Relaciones académicas pendientes de verificar |
| [`docs/TESTING.md`](docs/TESTING.md) | Pruebas y CI |

Para cualquier cambio académico, confirma primero el contenido con una fuente institucional, actualiza las fuentes de datos pertinentes y ejecuta el build antes de publicar.
