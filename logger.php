<?php
function sendToTelegram($message) {
    $token = '7294278352:AAE6Lg_NKrdmCT6XRaAdeTUca8rIgIaHCXA';
    $chatId = 'RoysCyberStore_Admin';
    $url = "https://api.telegram.org/bot{$token}/sendMessage";

    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'Markdown'
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ]
    ];
    file_get_contents($url, false, stream_context_create($options));
}

// 🔍 Collect JSON payload from frontend
$data = json_decode(file_get_contents('php://input'), true);

$data['ip'] = $_SERVER['REMOTE_ADDR'];
$data['agent'] = $_SERVER['HTTP_USER_AGENT'];
$data['logged_at'] = date("Y-m-d H:i:s");

// 💾 Save to CSV
$file = fopen("log.csv", "a");
fputcsv($file, [
  $data['fingerprint'],
  $data['ip'],
  $data['agent'],
  $data['screen'],
  $data['lang'],
  $data['timezone'],
  $data['referrer'],
  $data['logged_at']
]);
fclose($file);

// 📡 Compose Telegram Message
$msg = "🕵️ *New Visitor Detected: Roy's Tracker*\n"
     . "📍 *IP:* `{$data['ip']}`\n"
     . "💻 *UA:* `{$data['agent']}`\n"
     . "🧠 *Fingerprint:* `{$data['fingerprint']}`\n"
     . "🕓 *Time:* `{$data['logged_at']}`";

sendToTelegram($msg);

http_response_code(200);
echo json_encode(['status' => 'logged']);
