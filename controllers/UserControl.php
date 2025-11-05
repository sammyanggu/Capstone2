<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../config/config.php';

class UserController {
    private $conn;

    public function __construct() {
        global $conn;
        $this->conn = $conn;
    }

    public function loginUser($email, $password) {
        $hashedPassword = hash('sha256', $password);
        
        $query = "SELECT * FROM users WHERE email = ? AND password = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss", $email, $hashedPassword);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            return array(
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'points' => $user['points'],
                'created_at' => $user['created_at']
            );
        }
        
        return null;
    }

    public function registerUser($name, $email, $password) {
        // Check if user already exists
        $query = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            return null;
        }

        // Insert new user
        $hashedPassword = hash('sha256', $password);
        $query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sss", $name, $email, $hashedPassword);
        
        if ($stmt->execute()) {
            $userId = $stmt->insert_id;
            return array(
                'id' => $userId,
                'name' => $name,
                'email' => $email,
                'points' => 0,
                'created_at' => date('Y-m-d H:i:s')
            );
        }
        
        return null;
    }

    public function getAllUsers() {
        $query = "SELECT id, name, email, points, created_at FROM users";
        $result = $this->conn->query($query);
        $users = array();
        
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        
        return $users;
    }
}