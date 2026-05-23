# IUA Home Landing React — versión segura

Proyecto React + Vite + Tailwind CSS v4 para una home landing enfocada en inscripciones de Universidad IUA.

## Cambios de seguridad aplicados

- Se quitó `latest` del `package.json`.
- Se fijaron versiones exactas.
- Se agregó `.npmrc` con `ignore-scripts=true`.
- Se redujeron dependencias: Tailwind corre con `@tailwindcss/vite`, sin `postcss` ni `autoprefixer`.
- No se incluye `node_modules`.
- No se incluye ningún `.env`.

## Instalar de forma más segura

```bash
npm install --ignore-scripts
npm audit
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Rutas incluidas

- `/` Home landing
- `/oferta`
- `/campus`
- `/becas`
- `/contacto`

## Pendientes para producción

- Cambiar el WhatsApp demo `525512345678` por el número real.
- Cambiar correos y teléfonos.
- Sustituir imágenes externas de Unsplash por assets propios de IUA.
- Generar `package-lock.json` localmente después del primer `npm install --ignore-scripts`.
