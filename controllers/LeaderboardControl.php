<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../models/User.php';

class LeaderboardController {
    public function getLeaderboard() {
        $pdo = getPDO();
        $stmt = $pdo->query("SELECT id, username, email, xp FROM users ORDER BY xp DESC LIMIT 10");
        $users = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $users[] = new User($row['id'], $row['username'], $row['email'], $row['xp']);
        }
        return $users;
    }
}