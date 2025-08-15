<?php
header('Content-Type: text/html');
require_once 'config/config.php';

$conn = Config::getConnection();

// Test user ID (replace with your actual Firebase user ID)
$testUserId = 'test_user_1';

// Award some achievements
function awardAchievement($conn, $userId, $achievementId, $progress = 1) {
    $stmt = $conn->prepare("INSERT INTO user_achievements (user_id, achievement_id, current_progress) 
                           VALUES (?, ?, ?) 
                           ON DUPLICATE KEY UPDATE current_progress = ?");
    $stmt->bind_param("siii", $userId, $achievementId, $progress, $progress);
    return $stmt->execute();
}

// Award some badges
function awardBadge($conn, $userId, $badgeId, $isEquipped = false) {
    $stmt = $conn->prepare("INSERT INTO user_badges (user_id, badge_id, is_equipped) 
                           VALUES (?, ?, ?) 
                           ON DUPLICATE KEY UPDATE is_equipped = ?");
    $stmt->bind_param("sibb", $userId, $badgeId, $isEquipped, $isEquipped);
    return $stmt->execute();
}

// Create a notification
function createNotification($conn, $userId, $type, $referenceId, $message) {
    $stmt = $conn->prepare("INSERT INTO notifications (user_id, type, reference_id, message) 
                           VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssis", $userId, $type, $referenceId, $message);
    return $stmt->execute();
}

echo "<h2>Testing Data Creation</h2>";

// Award HTML Beginner achievement
if (awardAchievement($conn, $testUserId, 1, 1)) {
    echo "<p>✅ Awarded HTML Beginner achievement</p>";
    createNotification($conn, $testUserId, 'achievement', 1, 'You earned the HTML Beginner achievement!');
}

// Award CSS Beginner achievement with partial progress
if (awardAchievement($conn, $testUserId, 4, 3)) {
    echo "<p>✅ Awarded CSS Beginner achievement (partial progress)</p>";
}

// Award JavaScript Beginner badge
if (awardBadge($conn, $testUserId, 7, true)) {
    echo "<p>✅ Awarded and equipped JS Rookie badge</p>";
    createNotification($conn, $testUserId, 'badge', 7, 'You earned the JS Rookie badge!');
}

// Award HTML Rookie badge
if (awardBadge($conn, $testUserId, 1, false)) {
    echo "<p>✅ Awarded HTML Rookie badge</p>";
    createNotification($conn, $testUserId, 'badge', 1, 'You earned the HTML Rookie badge!');
}

echo "<h3>Current Status:</h3>";

// Check achievements
$result = $conn->query("SELECT a.name, ua.current_progress, ua.date_earned 
                       FROM achievements a 
                       JOIN user_achievements ua ON a.id = ua.achievement_id 
                       WHERE ua.user_id = '$testUserId'");

echo "<h4>User Achievements:</h4>";
echo "<ul>";
while ($row = $result->fetch_assoc()) {
    echo "<li>{$row['name']} - Progress: {$row['current_progress']} (Earned: {$row['date_earned']})</li>";
}
echo "</ul>";

// Check badges
$result = $conn->query("SELECT b.name, ub.is_equipped, ub.date_earned 
                       FROM badges b 
                       JOIN user_badges ub ON b.id = ub.badge_id 
                       WHERE ub.user_id = '$testUserId'");

echo "<h4>User Badges:</h4>";
echo "<ul>";
while ($row = $result->fetch_assoc()) {
    $equipped = $row['is_equipped'] ? " (Equipped)" : "";
    echo "<li>{$row['name']}{$equipped} (Earned: {$row['date_earned']})</li>";
}
echo "</ul>";
