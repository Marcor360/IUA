<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function fail(int $status, string $message): never {
    http_response_code($status);
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
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

$apiKey = getenv('RESEND_API_KEY') ?: (string)($config['resend_api_key'] ?? '');
$to = getenv('CONTACT_TO_EMAIL') ?: (string)($config['to_email'] ?? '');
$from = getenv('CONTACT_FROM_EMAIL') ?: (string)($config['from_email'] ?? '');
if ($apiKey === '' || !filter_var($to, FILTER_VALIDATE_EMAIL) || $from === '') { error_log('IUA contact configuration missing'); fail(503, 'Servicio temporalmente no disponible'); }

$program = $programs[$programId]; $campus = $campuses[$campusId];
$rows = [['Nombre',$name],[$method === 'email' ? 'Correo' : 'Teléfono',$contact],['Programa',$program],['Plantel',$campus]];
$htmlRows = '';
foreach ($rows as [$label,$item]) $htmlRows .= '<tr><th style="text-align:left;padding:8px">'.html($label).'</th><td style="padding:8px">'.html($item).'</td></tr>';
$email = ['from'=>$from,'to'=>[$to],'subject'=>'Nueva solicitud IUA: '.$program,'html'=>'<h1>Nueva solicitud de información IUA</h1><table>'.$htmlRows.'</table>','text'=>"Nueva solicitud IUA\nPrograma: $program\nPlantel: $campus"];
if ($method === 'email') $email['reply_to'] = $contact;

$request = curl_init('https://api.resend.com/emails');
curl_setopt_array($request, [CURLOPT_POST=>true,CURLOPT_RETURNTRANSFER=>true,CURLOPT_HTTPHEADER=>['Authorization: Bearer '.$apiKey,'Content-Type: application/json'],CURLOPT_POSTFIELDS=>json_encode($email, JSON_UNESCAPED_UNICODE),CURLOPT_TIMEOUT=>12,CURLOPT_CONNECTTIMEOUT=>5,CURLOPT_SSL_VERIFYPEER=>true,CURLOPT_SSL_VERIFYHOST=>2]);
$response = curl_exec($request); $status = (int)curl_getinfo($request, CURLINFO_HTTP_CODE); curl_close($request);
if ($response === false || $status < 200 || $status >= 300) { error_log('IUA contact provider failure status='.$status); fail(502, 'No se pudo enviar la solicitud'); }
echo json_encode(['ok'=>true]);
