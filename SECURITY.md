# Seguridad

El formulario usa `public/api/contact.php`. El endpoint valida método, origen, tamaño y campos; aplica rate limiting, soporta Turnstile del lado servidor y no usa fallback PHP `mail()`. Los secretos se configuran fuera del repositorio con `public/api/contact.config.example.php`.

Consent Mode declara `default denied` antes de GTM. La preferencia versionada emite `consent update`. CSP, HSTS, frame protection, referrer policy y permissions policy están configurados para Apache y Vercel.

`robots.txt` no es seguridad: `/api/` se excluye del rastreo, pero el endpoint valida cada solicitud.

No publiques vulnerabilidades o credenciales en issues públicos. Reporta al responsable técnico con reproducción, impacto y versión afectada; rota cualquier secreto expuesto y revisa logs.
