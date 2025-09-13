<?php
// Set proper headers for API endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

function fetchIntel($ip) {
    // Validate IP address
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        return ['country' => 'Invalid IP', 'org' => 'N/A', 'city' => 'N/A', 'timezone' => 'N/A'];
    }
    
    $context = stream_context_create([
        'http' => [
            'timeout' => 5, // 5 second timeout
            'user_agent' => 'TweakSquad-Tracker/1.0'
        ]
    ]);
    
    $res = @file_get_contents("https://ipapi.co/{$ip}/json/", false, $context);
    if (!$res) {
        return ['country' => 'Unknown', 'org' => 'N/A', 'city' => 'N/A', 'timezone' => 'N/A'];
    }
    
    $data = json_decode($res, true);
    if (!$data) {
        return ['country' => 'Unknown', 'org' => 'N/A', 'city' => 'N/A', 'timezone' => 'N/A'];
    }
    
    return [
        'country' => $data['country_name'] ?? 'Unknown',
        'city'    => $data['city'] ?? 'N/A',
        'org'     => $data['org'] ?? 'N/A',
        'timezone'=> $data['timezone'] ?? 'N/A'
    ];
}

// 🧠 Collect & enrich data with validation
$raw_input = file_get_contents('php://input');
if (!$raw_input) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit;
}

$data = json_decode($raw_input, true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Sanitize and validate input data
$data['ip'] = filter_var($_SERVER['REMOTE_ADDR'] ?? 'unknown', FILTER_VALIDATE_IP) ?: 'unknown';
$data['agent'] = htmlspecialchars($_SERVER['HTTP_USER_AGENT'] ?? 'unknown', ENT_QUOTES, 'UTF-8');
$data['logged_at'] = date("Y-m-d H:i:s");
$data['fingerprint'] = htmlspecialchars($data['fingerprint'] ?? 'unknown', ENT_QUOTES, 'UTF-8');
$data['screen'] = htmlspecialchars($data['screen'] ?? 'unknown', ENT_QUOTES, 'UTF-8');
$data['lang'] = htmlspecialchars($data['lang'] ?? 'unknown', ENT_QUOTES, 'UTF-8');
$data['timezone'] = htmlspecialchars($data['timezone'] ?? 'unknown', ENT_QUOTES, 'UTF-8');
$data['referrer'] = htmlspecialchars($data['referrer'] ?? 'unknown', ENT_QUOTES, 'UTF-8');

$redirected = $data['redirected'] ?? false;
$intel = fetchIntel($data['ip']);

// 💾 Log everything to log.csv with error handling
try {
    $f1 = fopen("log.csv", "a");
    if (!$f1) {
        throw new Exception("Could not open log.csv for writing");
    }
    
    fputcsv($f1, [
        $data['fingerprint'],
        $data['ip'],
        $data['agent'],
        $data['screen'],
        $data['lang'],
        $data['timezone'],
        $data['referrer'],
        $intel['country'],
        $intel['city'],
        $intel['org'],
        $intel['timezone'],
        $data['logged_at']
    ]);
    fclose($f1);

    // 🌀 If redirected, log to separate file
    if ($redirected) {
        $f2 = fopen("redirect_log.csv", "a");
        if ($f2) {
            fputcsv($f2, [
                $data['fingerprint'],
                $data['ip'],
                $data['screen'],
                $data['lang'],
                $data['referrer'],
                $data['timezone'],
                $data['logged_at']
            ]);
            fclose($f2);
        }
    }

    echo json_encode(['status' => 'logged', 'timestamp' => $data['logged_at']]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Logging failed', 'message' => $e->getMessage()]);
}
