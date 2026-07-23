<?php
require __DIR__ . '/connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['responses']) || !is_array($input['responses'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$email = trim($input['email'] ?? '');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$fullName = $input['fullName'] ?? '';
$foundersCircle = $input['foundersCircle'] ?? '';
$responsesJson = json_encode($input['responses']);
$submittedAt = date('Y-m-d H:i:s');

try {
    $stmt = $mysqli->prepare("INSERT INTO survey_responses (email, full_name, founders_circle, responses, submitted_at) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param('sssss', $email, $fullName, $foundersCircle, $responsesJson, $submittedAt);
    $stmt->execute();
    echo json_encode(['ok' => true]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not save your submission']);
}

?>
