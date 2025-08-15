<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../debug.log');

require_once '../controllers/AchieveControl.php';

$controller = new AchieveControl();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get user achievements
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
    
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['message' => 'User ID is required']);
        exit();
    }

    $achievements = $controller->getUserAchievements($userId);
    echo json_encode($achievements);
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Award achievement to user
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['userId']) || !isset($data['achievementId'])) {
        http_response_code(400);
        echo json_encode(['message' => 'User ID and Achievement ID are required']);
        exit();
    }

    $success = $controller->awardAchievement($data['userId'], $data['achievementId']);
    
    if ($success) {
        echo json_encode(['message' => 'Achievement awarded successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to award achievement']);
    }
}