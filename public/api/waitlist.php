<?php
require __DIR__ . '/connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$name = $mysqli->real_escape_string($input['name'] ?? '');
$email = $mysqli->real_escape_string($input['email']);
$country = $mysqli->real_escape_string($input['country'] ?? '');
$joined_at = date('Y-m-d H:i:s');

$stmt = $mysqli->prepare("INSERT INTO waitlist (name, email, country, joined_at) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare failed']);
    exit;
}
$stmt->bind_param('ssss', $name, $email, $country, $joined_at);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['error' => 'Insert failed or duplicate email']);
    exit;
}

echo json_encode(['ok' => true]);

?>
