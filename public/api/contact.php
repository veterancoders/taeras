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
$type = $mysqli->real_escape_string($input['type'] ?? 'General Inquiry');
$country = $mysqli->real_escape_string($input['country'] ?? '');
$message = $mysqli->real_escape_string($input['message'] ?? '');
$joined_at = date('Y-m-d H:i:s');

$stmt = $mysqli->prepare("INSERT INTO contact_us (name, email, type, country, message, joined_at) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare failed']);
    exit;
}
$stmt->bind_param('ssssss', $name, $email, $type, $country, $message, $joined_at);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['error' => 'Insert failed']);
    exit;
}

echo json_encode(['ok' => true]);

?>
