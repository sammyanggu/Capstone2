<?php
require_once __DIR__ . '/../models/User.php';

// Controller for handling user logic
class UserController {
    public function getAllUsers() {
        return [
            new User(1, "john", "john@email.com", 120),
            new User(2, "jane", "jane@email.com", 200)
        ];
    }
}