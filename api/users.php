<?php

require_once __DIR__ . '/../controllers/UserControl.php';

header('Content-Type: application/json');
$controller = new UserController();
echo json_encode($controller->getAllUsers());