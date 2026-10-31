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
    'to_email' => ['soy@iua.edu.mx', 'admisiones@iua.edu.mx'],
    'from_email' => 'Universidad IUA <no-reply@iua.edu.mx>',
];
```

El servidor debe tener habilitada la función PHP `mail()` y el dominio debe tener SPF y DKIM configurados para el correo saliente del hosting.
`to_email` puede ser un correo o una lista de correos. Si `CONTACT_TO_EMAIL` está definida en el servidor, prevalece sobre este archivo; para enviar a ambos destinatarios usa `soy@iua.edu.mx,admisiones@iua.edu.mx`.

Si el formulario falla, abre la petición a `/api/contact.php` en la pestaña Red del navegador. La cabecera `X-IUA-Contact-Version: php-mail-2` confirma que está publicado el PHP actual. El campo `code` de la respuesta distingue `CONTACT_CONFIG_INVALID` (destinatario o remitente), `MAIL_UNAVAILABLE` (función `mail()` deshabilitada) y `MAIL_SEND_FAILED` (el servidor no aceptó el envío). No muestra credenciales.

## Rutas React

El archivo `dist/.htaccess` permite abrir rutas como `/oferta/derecho` directamente y evita que `/api/contact.php` sea enviado a `index.html`.
