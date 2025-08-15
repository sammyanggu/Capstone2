<?php
header('Content-Type: text/plain');
require_once 'config/config.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');

$conn = Config::getConnection();

// SQL to create tables
$sql = [
    "CREATE TABLE IF NOT EXISTS achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(255),
        points INT DEFAULT 0,
        category VARCHAR(50) DEFAULT 'general',
        progress_max INT DEFAULT 1,
        achievement_order INT DEFAULT 0
    )",
    
    "CREATE TABLE IF NOT EXISTS badges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(255),
        tier VARCHAR(20) DEFAULT 'bronze',
        category VARCHAR(50) DEFAULT 'general',
        required_achievements TEXT
    )",
    
    "CREATE TABLE IF NOT EXISTS user_achievements (
        user_id VARCHAR(255),
        achievement_id INT,
        current_progress INT DEFAULT 0,
        date_earned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, achievement_id)
    )",
    
    "CREATE TABLE IF NOT EXISTS user_badges (
        user_id VARCHAR(255),
        badge_id INT,
        is_equipped BOOLEAN DEFAULT FALSE,
        date_earned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, badge_id)
    )",
    
    "CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        type ENUM('achievement', 'badge') NOT NULL,
        reference_id INT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )"
];

echo "Starting database setup...\n\n";

foreach ($sql as $query) {
    try {
        if ($conn->query($query)) {
            echo "Success: Table created or already exists\n";
        } else {
            echo "Error: " . $conn->error . "\n";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Insert sample data if tables are empty
$sampleData = [
    "INSERT INTO achievements (name, description, icon, points, category, progress_max, achievement_order) 
     SELECT 'HTML Beginner', 'Complete your first HTML lesson', '/assets/achievements/placeholder.svg', 10, 'html', 1, 1 
     WHERE NOT EXISTS (SELECT 1 FROM achievements LIMIT 1)",
     
    "INSERT INTO badges (name, description, icon, tier, category) 
     SELECT 'HTML Rookie', 'Start your HTML journey', '/assets/badges/placeholder.svg', 'bronze', 'html' 
     WHERE NOT EXISTS (SELECT 1 FROM badges LIMIT 1)"
];

echo "\nChecking if sample data is needed...\n";

foreach ($sampleData as $query) {
    try {
        if ($conn->query($query)) {
            echo "Success: Sample data inserted (if needed)\n";
        } else {
            echo "Error: " . $conn->error . "\n";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Create test data for the current user
$userId = '07FgvEbIZoaAGpfDeIiFy9wjnIG2'; // Your user ID

$testData = [
    "INSERT INTO user_achievements (user_id, achievement_id, current_progress) 
     VALUES ('$userId', 1, 1) 
     ON DUPLICATE KEY UPDATE current_progress = current_progress",
     
    "INSERT INTO user_badges (user_id, badge_id, is_equipped) 
     VALUES ('$userId', 1, TRUE) 
     ON DUPLICATE KEY UPDATE is_equipped = is_equipped",
     
    "INSERT INTO notifications (user_id, type, reference_id, message) 
     VALUES ('$userId', 'achievement', 1, 'You earned the HTML Beginner achievement!')"
];

echo "\nCreating test data for user...\n";

foreach ($testData as $query) {
    try {
        if ($conn->query($query)) {
            echo "Success: Test data created\n";
        } else {
            echo "Error: " . $conn->error . "\n";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Verify data exists
echo "\nVerifying data...\n";

$tables = ['achievements', 'badges', 'user_achievements', 'user_badges', 'notifications'];

foreach ($tables as $table) {
    $result = $conn->query("SELECT COUNT(*) as count FROM $table");
    $count = $result->fetch_assoc()['count'];
    echo "$table count: $count\n";
}

echo "\nSetup complete!";
