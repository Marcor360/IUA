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
    'to_email' => ['soy@iua.edu.mx', 'admisiones@iua.edu.mx'],
    'from_email' => 'Universidad IUA <no-reply@iua.edu.mx>',
];
```

`from_email` debe ser un dominio/correo verificado en Resend.
`to_email` puede ser un correo o una lista de correos. Si `CONTACT_TO_EMAIL` está definida en el servidor, prevalece sobre este archivo; para enviar a ambos destinatarios usa `soy@iua.edu.mx,admisiones@iua.edu.mx`.

## Rutas React

El archivo `dist/.htaccess` permite abrir rutas como `/oferta/derecho` directamente y evita que `/api/contact.php` sea enviado a `index.html`.
