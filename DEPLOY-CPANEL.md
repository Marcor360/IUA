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

Los destinatarios (`soy@iua.edu.mx` y `admisiones@iua.edu.mx`) y el remitente (`no-reply@iua.edu.mx`) están definidos en `public/api/contact.php`. Sube la versión actual a `public_html/api/contact.php`.

El archivo siguiente es opcional y solo se usa si activas Cloudflare Turnstile:

```text
public_html/api/contact.config.php
```

Puedes partir de `public_html/api/contact.config.example.php`:

```php
<?php
return [
    'turnstile_secret_key' => '',
];
```

El servidor debe tener habilitada la función PHP `mail()` y el dominio debe tener SPF y DKIM configurados para el correo saliente del hosting.

Si el formulario falla, abre la petición a `/api/contact.php` en la pestaña Red del navegador. La cabecera `X-IUA-Contact-Version: php-mail-3` confirma que está publicado el PHP actual. El campo `code` de la respuesta distingue `MAIL_UNAVAILABLE` (función `mail()` deshabilitada) y `MAIL_SEND_FAILED` (el servidor no aceptó el envío).

## Rutas React

El archivo `dist/.htaccess` permite abrir rutas como `/oferta/derecho` directamente y evita que `/api/contact.php` sea enviado a `index.html`.
