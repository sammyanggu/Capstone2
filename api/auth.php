<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../controllers/UserControl.php';

$controller = new UserController();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'login':
                if (isset($data->email) && isset($data->password)) {
                    $result = $controller->loginUser($data->email, $data->password);
                    if ($result) {
                        $response = array(
                            'status' => 'success',
                            'message' => 'Login successful',
                            'user' => $result
                        );
                    } else {
                        $response = array(
                            'status' => 'error',
                            'message' => 'Invalid credentials'
                        );
                    }
                }
                break;

            case 'register':
                if (isset($data->name) && isset($data->email) && isset($data->password)) {
                    $result = $controller->registerUser($data->name, $data->email, $data->password);
                    if ($result) {
                        $response = array(
                            'status' => 'success',
                            'message' => 'Registration successful',
                            'user' => $result
                        );
                    } else {
                        $response = array(
                            'status' => 'error',
                            'message' => 'Registration failed'
                        );
                    }
                }
                break;
        }
    }
}

echo json_encode($response);