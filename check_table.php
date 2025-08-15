<?php
require_once 'config/config.php';

$conn = Config::getConnection();

// Get table structure
$result = $conn->query("SHOW CREATE TABLE lessons");
if ($result) {
    $row = $result->fetch_assoc();
    echo "Current table structure:\n";
    echo $row['Create Table'] . "\n\n";
} else {
    echo "Error getting table structure: " . $conn->error . "\n";
}
