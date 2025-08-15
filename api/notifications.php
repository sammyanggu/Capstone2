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

require_once '../config/config.php';

$conn = Config::getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
    
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['message' => 'User ID is required']);
        exit();
    }

    $query = "SELECT * FROM notifications 
              WHERE user_id = ? 
              ORDER BY created_at DESC 
              LIMIT 50";
    
    try {
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $notifications = [];
        while ($row = $result->fetch_assoc()) {
            $notifications[] = [
                'id' => $row['id'],
                'type' => $row['type'],
                'message' => $row['message'],
                'is_read' => (bool)$row['is_read'],
                'created_at' => $row['created_at']
            ];
        }
        
        echo json_encode($notifications);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Error fetching notifications']);
    }
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action']) && $data['action'] === 'mark_read') {
        if (!isset($data['notificationId'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Notification ID is required']);
            exit();
        }

        $query = "UPDATE notifications SET is_read = TRUE WHERE id = ?";
        
        try {
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $data['notificationId']);
            $success = $stmt->execute();
            
            if ($success) {
                echo json_encode(['message' => 'Notification marked as read']);
            } else {
                throw new Exception('Failed to update notification');
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Error updating notification']);
        }
    }
}
