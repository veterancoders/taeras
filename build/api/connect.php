<?php
// Database connection config — update with your credentials
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'taeras';

header('Content-Type: application/json');

// mysqli throws mysqli_sql_exception on error by default (PHP 8.1+).
// Every endpoint that uses $mysqli must catch mysqli_sql_exception around
// prepare()/execute() calls, otherwise an uncaught exception becomes an
// unhandled 500 with no JSON body.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    $mysqli->set_charset('utf8mb4');
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

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

CREATE TABLE survey_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  full_name VARCHAR(255),
  founders_circle VARCHAR(64),
  responses JSON NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
*/

?>
