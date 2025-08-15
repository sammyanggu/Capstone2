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
    "CREATE TABLE IF NOT EXISTS lessons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content LONGTEXT,
        tech ENUM('html', 'css', 'javascript') NOT NULL,
        difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
        duration INT DEFAULT 30,
        xp INT DEFAULT 100,
        thumbnail VARCHAR(255),
        prerequisites JSON,
        order_num INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    
    "CREATE TABLE IF NOT EXISTS user_progress (
        user_id VARCHAR(255),
        lesson_id INT,
        progress INT DEFAULT 0,
        completed_at TIMESTAMP NULL,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, lesson_id),
        FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )",
    
    "CREATE TABLE IF NOT EXISTS lesson_sections (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lesson_id INT,
        title VARCHAR(255) NOT NULL,
        content LONGTEXT,
        order_num INT DEFAULT 0,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )",
    
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

// Insert sample lessons
$sampleLessons = [
    [
        'title' => 'Introduction to HTML',
        'description' => 'Learn the basics of HTML, including tags, elements, and document structure.',
        'content' => '{"introduction": "HTML is the foundation of all web pages...", "sections": [...]}',
        'tech' => 'html',
        'difficulty' => 'beginner',
        'duration' => 30,
        'xp' => 100,
        'order_num' => 1
    ],
    [
        'title' => 'CSS Fundamentals',
        'description' => 'Master the basics of CSS styling, including selectors, properties, and values.',
        'content' => '{"introduction": "CSS is used to style your web pages...", "sections": [...]}',
        'tech' => 'css',
        'difficulty' => 'beginner',
        'duration' => 45,
        'xp' => 150,
        'order_num' => 2
    ],
    [
        'title' => 'JavaScript Basics',
        'description' => 'Start your journey into programming with JavaScript fundamentals.',
        'content' => '{"introduction": "JavaScript makes your pages interactive...", "sections": [...]}',
        'tech' => 'javascript',
        'difficulty' => 'beginner',
        'duration' => 60,
        'xp' => 200,
        'order_num' => 3
    ],
    [
        'title' => 'Advanced HTML Forms',
        'description' => 'Learn how to create complex forms with HTML5 features.',
        'content' => '{"introduction": "HTML forms are essential for user input...", "sections": [...]}',
        'tech' => 'html',
        'difficulty' => 'intermediate',
        'duration' => 45,
        'xp' => 175,
        'order_num' => 4
    ],
    [
        'title' => 'CSS Flexbox Layout',
        'description' => 'Master modern CSS layouts with Flexbox.',
        'content' => '{"introduction": "Flexbox is a powerful CSS layout model...", "sections": [...]}',
        'tech' => 'css',
        'difficulty' => 'intermediate',
        'duration' => 50,
        'xp' => 180,
        'order_num' => 5
    ],
    [
        'title' => 'JavaScript DOM Manipulation',
        'description' => 'Learn how to dynamically modify web pages with JavaScript.',
        'content' => '{"introduction": "The DOM is your gateway to dynamic web pages...", "sections": [...]}',
        'tech' => 'javascript',
        'difficulty' => 'intermediate',
        'duration' => 70,
        'xp' => 225,
        'order_num' => 6
    ]
];

echo "\nInserting sample lessons...\n";

foreach ($sampleLessons as $lesson) {
    try {
        $query = "INSERT INTO lessons (title, description, content, tech, difficulty, duration, xp, order_num) 
                 SELECT ?, ?, ?, ?, ?, ?, ?, ?
                 FROM dual
                 WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = ?)";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param(
            "sssssiiis",  // Changed to include one more 's' for the WHERE clause
            $lesson['title'],
            $lesson['description'],
            $lesson['content'],
            $lesson['tech'],
            $lesson['difficulty'],
            $lesson['duration'],
            $lesson['xp'],
            $lesson['order_num'],
            $lesson['title']
        );
        
        if ($stmt->execute()) {
            echo "Success: Lesson '{$lesson['title']}' inserted (if it didn't exist)\n";
        } else {
            echo "Error: " . $stmt->error . "\n";
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

echo "\nSetup complete!";
