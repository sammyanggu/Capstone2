<?php
require_once 'config/config.php';

$conn = Config::getConnection();

$alterQueries = [
    // Add new columns
    "ALTER TABLE lessons 
     ADD COLUMN description TEXT AFTER title,
     ADD COLUMN difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner' AFTER tech,
     ADD COLUMN duration INT DEFAULT 30 AFTER difficulty,
     ADD COLUMN prerequisites JSON AFTER thumbnail,
     ADD COLUMN order_num INT DEFAULT 0 AFTER prerequisites,
     MODIFY COLUMN tech ENUM('html', 'css', 'javascript') NOT NULL",

    // Drop unused columns
    "ALTER TABLE lessons
     DROP COLUMN author,
     DROP COLUMN videoUrl",

    // Create user_progress table
    "CREATE TABLE IF NOT EXISTS user_progress (
        user_id VARCHAR(255),
        lesson_id INT,
        progress INT DEFAULT 0,
        completed_at TIMESTAMP NULL,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, lesson_id),
        FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )",
    
    // Create lesson_sections table
    "CREATE TABLE IF NOT EXISTS lesson_sections (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lesson_id INT,
        title VARCHAR(255) NOT NULL,
        content LONGTEXT,
        order_num INT DEFAULT 0,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )",
    
    // Create lesson_exercises table
    "CREATE TABLE IF NOT EXISTS lesson_exercises (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lesson_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        code_template TEXT,
        solution TEXT,
        tests JSON,
        order_num INT DEFAULT 0,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )"
];

echo "Starting database update...\n\n";

foreach ($alterQueries as $query) {
    try {
        if ($conn->query($query)) {
            echo "Success: Table structure updated\n";
        } else {
            echo "Error: " . $conn->error . "\n";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Now let's update existing lessons to have proper tech values
$updateQueries = [
    "UPDATE lessons SET tech = 'html' WHERE tech LIKE '%html%' OR tech LIKE '%HTML%'",
    "UPDATE lessons SET tech = 'css' WHERE tech LIKE '%css%' OR tech LIKE '%CSS%'",
    "UPDATE lessons SET tech = 'javascript' WHERE tech LIKE '%javascript%' OR tech LIKE '%js%' OR tech LIKE '%JavaScript%'",
    "UPDATE lessons SET tech = 'html' WHERE tech IS NULL OR tech NOT IN ('html', 'css', 'javascript')"
];

echo "\nUpdating existing lessons...\n";

foreach ($updateQueries as $query) {
    try {
        if ($conn->query($query)) {
            echo "Success: Updated tech values\n";
        } else {
            echo "Error: " . $conn->error . "\n";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

echo "\nUpdate complete!";
