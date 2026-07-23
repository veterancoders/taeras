<?php
require __DIR__ . '/connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$name = $input['name'] ?? '';
$email = $input['email'];
$type = $input['type'] ?? 'General Inquiry';
$country = $input['country'] ?? '';
$message = $input['message'] ?? '';
$joined_at = date('Y-m-d H:i:s');

try {
    $stmt = $mysqli->prepare("INSERT INTO contact_us (name, email, type, country, message, joined_at) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('ssssss', $name, $email, $type, $country, $message, $joined_at);
    $stmt->execute();
    echo json_encode(['ok' => true]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not save your submission']);
}

?>
