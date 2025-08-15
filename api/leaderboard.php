<?php

require_once __DIR__ . '/../controllers/LeaderboardControl.php';

header('Content-Type: application/json');
$controller = new LeaderboardController();
echo json_encode($controller->getLeaderboard());