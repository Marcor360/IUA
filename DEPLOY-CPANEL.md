# Despliegue en GoDaddy cPanel

## Build

```bash
npm install
npm run build
```

Sube el contenido de `dist/` a `public_html/`.

## Formulario de contacto

El formulario envia los datos a:

```text
/api/contact.php
```

Antes de probar el formulario en produccion, crea este archivo en el servidor:

```text
public_html/api/contact.config.php
```

Puedes partir de `public_html/api/contact.config.example.php`:

```php
<?php
return [
    'resend_api_key' => 're_xxxxxxxxxxxxxxxxxxxxxxxxx',
    'to_email' => 'admisiones@iua.edu.mx',
    'from_email' => 'Universidad IUA <no-reply@iua.edu.mx>',
];
```

`from_email` debe ser un dominio/correo verificado en Resend.

## Rutas React

El archivo `dist/.htaccess` permite abrir rutas como `/oferta/derecho` directamente y evita que `/api/contact.php` sea enviado a `index.html`.
