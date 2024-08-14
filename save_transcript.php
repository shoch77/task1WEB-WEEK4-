<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "robot_control";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$text = $data['text'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO voice_transcripts (transcript) VALUES (?)");
$stmt->bind_param("s", $text);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Transcript saved"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save transcript"]);
}

$stmt->close();
$conn->close();
?>
