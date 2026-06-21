<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'Metodo no permitido']);
    exit;
}

$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody ?: '', true);

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON invalido']);
    exit;
}

function clean_value(array $body, string $key): string
{
    return trim((string)($body[$key] ?? ''));
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$payload = [
    'method' => clean_value($body, 'method'),
    'nombre' => clean_value($body, 'nombre'),
    'contacto' => clean_value($body, 'contacto'),
    'programa' => clean_value($body, 'programa'),
    'plantel' => clean_value($body, 'plantel'),
];

if (
    $payload['method'] === '' ||
    $payload['nombre'] === '' ||
    $payload['contacto'] === '' ||
    $payload['programa'] === '' ||
    $payload['plantel'] === ''
) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos obligatorios']);
    exit;
}

if (!in_array($payload['method'], ['phone', 'email'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Metodo de contacto invalido']);
    exit;
}

$config = [];
$configPath = __DIR__ . '/contact.config.php';
if (is_file($configPath)) {
    $loadedConfig = require $configPath;
    if (is_array($loadedConfig)) {
        $config = $loadedConfig;
    }
}

$resendApiKey = getenv('RESEND_API_KEY') ?: (string)($config['resend_api_key'] ?? '');
$toEmail = getenv('CONTACT_TO_EMAIL') ?: (string)($config['to_email'] ?? 'admisiones@iua.edu.mx');
$fromEmail = getenv('CONTACT_FROM_EMAIL') ?: (string)($config['from_email'] ?? 'Universidad IUA <onboarding@resend.dev>');

$contactLabel = $payload['method'] === 'phone' ? 'Telefono' : 'Correo electronico';
$methodLabel = $payload['method'] === 'phone' ? 'Llamada telefonica' : 'Correo electronico';

$rows = [
    ['Nombre', $payload['nombre']],
    [$contactLabel, $payload['contacto']],
    ['Programa de interes', $payload['programa']],
    ['Plantel', $payload['plantel']],
    ['Metodo elegido', $methodLabel],
];

$htmlRows = '';
foreach ($rows as [$label, $value]) {
    $htmlRows .= '
        <tr>
            <td style="border:1px solid #eee;background:#f8f4ec;padding:10px 12px;font-weight:700;width:190px">' . h($label) . '</td>
            <td style="border:1px solid #eee;padding:10px 12px">' . h($value) . '</td>
        </tr>';
}

$html = '
    <div style="font-family:Arial,sans-serif;color:#1f1f1f;line-height:1.5">
        <h1 style="color:#650B15;font-size:22px;margin:0 0 12px">Nueva solicitud de informacion IUA</h1>
        <p style="margin:0 0 18px">Un prospecto dejo sus datos desde el formulario del sitio web.</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:620px">' . $htmlRows . '</table>
    </div>';

$text = implode("\n", [
    'Nueva solicitud de informacion IUA',
    'Nombre: ' . $payload['nombre'],
    $contactLabel . ': ' . $payload['contacto'],
    'Programa de interes: ' . $payload['programa'],
    'Plantel: ' . $payload['plantel'],
    'Metodo elegido: ' . $methodLabel,
]);

$emailPayload = [
    'from' => $fromEmail,
    'to' => [$toEmail],
    'subject' => 'Nueva solicitud IUA: ' . $payload['programa'],
    'html' => $html,
    'text' => $text,
];

if ($payload['method'] === 'email' && filter_var($payload['contacto'], FILTER_VALIDATE_EMAIL)) {
    $emailPayload['reply_to'] = $payload['contacto'];
}

// --- Intento 1: Resend API ---
if ($resendApiKey !== '') {
    $ch = curl_init('https://api.resend.com/emails');

    $caBundle = '';
    foreach (['/etc/ssl/certs/ca-bundle.crt', '/etc/pki/tls/certs/ca-bundle.crt', '/etc/ssl/ca-bundle.pem'] as $path) {
        if (file_exists($path)) {
            $caBundle = $path;
            break;
        }
    }

    $curlOpts = [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $resendApiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS     => json_encode($emailPayload),
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ];

    if ($caBundle !== '') {
        $curlOpts[CURLOPT_CAINFO] = $caBundle;
    }

    curl_setopt_array($ch, $curlOpts);

    $response  = curl_exec($ch);
    $status    = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response !== false && $status >= 200 && $status < 300) {
        echo json_encode(['ok' => true]);
        exit;
    }

    error_log('Resend contact form error [' . $status . ']: ' . ($curlError ?: (string)$response));
}

// --- Intento 2: PHP mail() nativo (cPanel) ---
$mailSubject = '=?UTF-8?B?' . base64_encode('Nueva solicitud IUA: ' . $payload['programa']) . '?=';
$mailHeaders = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Formulario IUA <noreply@iua.edu.mx>',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$sent = @mail($toEmail, $mailSubject, $html, $mailHeaders);

if (!$sent) {
    error_log('PHP mail() also failed for contact form submission');
    http_response_code(502);
    echo json_encode(['error' => 'No se pudo enviar el correo']);
    exit;
}

echo json_encode(['ok' => true]);
