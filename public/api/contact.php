<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-IUA-Contact-Version: php-mail-2');

function fail(int $status, string $message, ?string $code = null): never {
    http_response_code($status);
    $response = ['error' => $message];
    if ($code !== null) $response['code'] = $code;
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Método no permitido');
}
if (!str_starts_with(strtolower((string)($_SERVER['CONTENT_TYPE'] ?? '')), 'application/json')) fail(415, 'Se requiere JSON');
$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength <= 0 || $contentLength > 16384) fail(413, 'Carga no válida');

$raw = file_get_contents('php://input', false, null, 0, 16385);
if ($raw === false || strlen($raw) > 16384) fail(413, 'Carga demasiado grande');
$body = json_decode($raw, true, 16, JSON_INVALID_UTF8_SUBSTITUTE);
if (!is_array($body) || json_last_error() !== JSON_ERROR_NONE) fail(400, 'JSON inválido');

function value(array $body, string $key, int $max): string {
    $result = trim((string)($body[$key] ?? ''));
    if ($result === '' || mb_strlen($result) > $max) fail(400, 'Datos inválidos');
    return $result;
}
function html(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

if (trim((string)($body['website'] ?? '')) !== '') fail(400, 'Solicitud inválida');
$method = value($body, 'method', 10);
$name = value($body, 'nombre', 100);
$contact = value($body, 'contacto', 254);
$programId = value($body, 'programa', 80);
$campusId = value($body, 'plantel', 40);
if (!in_array($method, ['phone', 'email'], true)) fail(400, 'Método inválido');
if ($method === 'email' && !filter_var($contact, FILTER_VALIDATE_EMAIL)) fail(400, 'Correo inválido');
if ($method === 'phone' && !preg_match('/^\+?[0-9 ()-]{8,20}$/', $contact)) fail(400, 'Teléfono inválido');

$programs = [
  'secundaria'=>'Secundaria','bachillerato'=>'Bachillerato','derecho'=>'Licenciatura en Derecho','psicologia'=>'Licenciatura en Psicología',
  'pedagogia'=>'Licenciatura en Pedagogía','arquitectura'=>'Licenciatura en Arquitectura','artes-culinarias'=>'Licenciatura en Artes Culinarias',
  'contaduria-publica'=>'Licenciatura en Contaduría Pública','administracion-de-empresas'=>'Licenciatura en Administración de Empresas',
  'diseno-grafico'=>'Licenciatura en Diseño Gráfico','lenguas-extranjeras'=>'Licenciatura en Lenguas Extranjeras',
  'ingenieria-en-sistemas-computacionales'=>'Ingeniería en Sistemas Computacionales','maestria-derecho-penal'=>'Maestría en Derecho Penal',
  'maestria-educacion'=>'Maestría en Educación','doctorado-derecho'=>'Doctorado en Derecho'
];
$campuses = ['campus-chalco'=>'Campus Chalco','campus-reyes'=>'Campus Reyes','campus-texcoco'=>'Plantel Texcoco','campus-en-linea'=>'Plantel virtual'];
if (!isset($programs[$programId]) || !isset($campuses[$campusId])) fail(400, 'Programa o plantel inválido');

$clientIp = (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$bucket = hash('sha256', $clientIp . '|' . date('Y-m-d-H-i'));
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'iua-contact-' . $bucket;
$handle = fopen($rateFile, 'c+');
if ($handle !== false) {
    flock($handle, LOCK_EX); $count = (int)stream_get_contents($handle);
    if ($count >= 5) { flock($handle, LOCK_UN); fclose($handle); fail(429, 'Demasiadas solicitudes'); }
    ftruncate($handle, 0); rewind($handle); fwrite($handle, (string)($count + 1)); flock($handle, LOCK_UN); fclose($handle);
}

$config = [];
$configPath = __DIR__ . '/contact.config.php';
if (is_file($configPath)) { $loaded = require $configPath; if (is_array($loaded)) $config = $loaded; }
$turnstileSecret = getenv('TURNSTILE_SECRET_KEY') ?: (string)($config['turnstile_secret_key'] ?? '');
if ($turnstileSecret !== '') {
    $token = trim((string)($body['turnstileToken'] ?? ''));
    if ($token === '') fail(400, 'Verificación requerida');
    $verify = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($verify, [CURLOPT_POST=>true,CURLOPT_RETURNTRANSFER=>true,CURLOPT_POSTFIELDS=>http_build_query(['secret'=>$turnstileSecret,'response'=>$token,'remoteip'=>$clientIp]),CURLOPT_TIMEOUT=>8,CURLOPT_CONNECTTIMEOUT=>4,CURLOPT_SSL_VERIFYPEER=>true,CURLOPT_SSL_VERIFYHOST=>2]);
    $verification = curl_exec($verify); $verifyStatus = (int)curl_getinfo($verify, CURLINFO_HTTP_CODE); curl_close($verify);
    $verified = is_string($verification) ? json_decode($verification, true) : null;
    if ($verifyStatus !== 200 || !is_array($verified) || ($verified['success'] ?? false) !== true) fail(400, 'Verificación fallida');
}

$configuredTo = getenv('CONTACT_TO_EMAIL') ?: ($config['to_email'] ?? '');
$to = is_array($configuredTo) ? $configuredTo : explode(',', (string)$configuredTo);
$to = array_map(static fn($address) => is_string($address) ? trim($address) : '', $to);
$from = getenv('CONTACT_FROM_EMAIL') ?: (string)($config['from_email'] ?? '');
$fromAddress = preg_match('/<([^<>]+)>$/', $from, $match) ? $match[1] : trim($from);
if ($to === [] || count($to) > 10 || preg_match('/[\r\n]/', $from) || !filter_var($fromAddress, FILTER_VALIDATE_EMAIL) || count(array_filter($to, static fn($address) => filter_var($address, FILTER_VALIDATE_EMAIL) === false)) > 0) {
    error_log('IUA contact configuration missing');
    fail(503, 'Servicio temporalmente no disponible', 'CONTACT_CONFIG_INVALID');
}

$program = $programs[$programId]; $campus = $campuses[$campusId];
$subject = mb_encode_mimeheader('Nueva solicitud IUA: '.$program, 'UTF-8');
$message = "Nueva solicitud de información IUA\n\nNombre: $name\n".($method === 'email' ? 'Correo' : 'Teléfono').": $contact\nPrograma: $program\nPlantel: $campus\n";
$headers = [
    'From' => 'Universidad IUA <'.$fromAddress.'>',
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
];
if ($method === 'email') $headers['Reply-To'] = $contact;

if (!function_exists('mail')) {
    error_log('IUA contact mail() unavailable');
    fail(503, 'Servicio temporalmente no disponible', 'MAIL_UNAVAILABLE');
}
if (!mail(implode(', ', $to), $subject, $message, $headers, '-f'.$fromAddress)) {
    error_log('IUA contact mail() failure');
    fail(502, 'No se pudo enviar la solicitud', 'MAIL_SEND_FAILED');
}
echo json_encode(['ok'=>true]);
