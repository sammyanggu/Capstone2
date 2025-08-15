<?php
require_once '../config/config.php';
require_once '../controllers/LessonControl.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');

// Set headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

try {
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
    
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['message' => 'User ID is required']);
        exit();
    }
    
    $controller = new LessonControl();
    
    switch($_SERVER['REQUEST_METHOD']) {
        case 'OPTIONS':
            http_response_code(200);
            exit();
            
        case 'GET':
            if (isset($_GET['lessonId'])) {
                // Get specific lesson
                $lesson = $controller->getLesson($_GET['lessonId'], $userId);
                echo json_encode(['data' => $lesson]);
            } else {
                // Get all lessons with progress
                $lessons = $controller->getLessonsWithProgress($userId);
                echo json_encode(['data' => $lessons]);
            }
            break;
            
        case 'POST':
            // Handle lesson completion or progress update
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['lessonId'])) {
                throw new Exception('Lesson ID is required');
            }
            
            $result = $controller->updateProgress($userId, $input['lessonId'], $input['progress'] ?? 100);
            echo json_encode($result);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['message' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    error_log("Error in lessons.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Internal server error: ' . $e->getMessage()
    ]);
}
?>
}
}
        'data' => array_values($filtered)
    ];
}

// Single JSON response at the end
echo json_encode($response);