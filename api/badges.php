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

require_once '../controllers/BadgeControl.php';

$controller = new BadgeControl();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get user badges
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
    
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['message' => 'User ID is required']);
        exit();
    }

    $badges = $controller->getUserBadges($userId);
    echo json_encode($badges);
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['userId']) || !isset($data['badgeId'])) {
        http_response_code(400);
        echo json_encode(['message' => 'User ID and Badge ID are required']);
        exit();
    }

    if (isset($data['action']) && $data['action'] === 'equip') {
        // Equip badge
        $success = $controller->equipBadge($data['userId'], $data['badgeId']);
        
        if ($success) {
            echo json_encode(['message' => 'Badge equipped successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to equip badge']);
        }
    } else {
        // Award badge
        $success = $controller->awardBadge($data['userId'], $data['badgeId']);
        
        if ($success) {
            echo json_encode(['message' => 'Badge awarded successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to award badge']);
        }
    }
}