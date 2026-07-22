<?php
// Database connection config — update with your credentials
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'taeras';

header('Content-Type: application/json');

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
$mysqli->set_charset('utf8mb4');

//sql tables:
/*
CREATE TABLE waitlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(128),
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_us (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  type VARCHAR(128),
  country VARCHAR(128),
  message TEXT,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
*/

?>
