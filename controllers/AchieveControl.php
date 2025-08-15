<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../models/Achievement.php';

class AchieveControl {
    private $conn;

    public function __construct() {
        $this->conn = Config::getConnection();
    }

    public function getUserAchievements($userId) {
        $query = "SELECT a.*, ua.date_earned, ua.current_progress,
                        COALESCE(ua.current_progress, 0) as current_progress
                 FROM achievements a 
                 LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
                 ORDER BY a.id";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("s", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $achievements = [];
            $totalPoints = 0;
            
            while ($row = $result->fetch_assoc()) {
                $isEarned = $row['date_earned'] !== null;
                if ($isEarned) {
                    $totalPoints += $row['points'];
                }
                
                $achievements[] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'icon' => $row['icon'],
                    'points' => $row['points'],
                    
                    'dateEarned' => $row['date_earned'],
                    'isEarned' => $isEarned,
                    'progress' => [
                        'current' => (int)$row['current_progress'],
                        'max' => isset($row['progress_max']) ? (int)$row['progress_max'] : 1
                    ],
                    'progressPercentage' => isset($row['progress_max']) && $row['progress_max'] > 0 
                        ? round(($row['current_progress'] / $row['progress_max']) * 100)
                        : ($row['current_progress'] > 0 ? 100 : 0)
                ];
            }
            
            return [
                'achievements' => $achievements,
                'totalPoints' => $totalPoints
            ];
        } catch (Exception $e) {
            error_log("Error in getUserAchievements: " . $e->getMessage());
            throw new Exception("Failed to get user achievements: " . $e->getMessage());
        }
    }

    public function awardAchievement($userId, $achievementId) {
        try {
            $query = "INSERT INTO user_achievements (user_id, achievement_id) 
                     VALUES (?, ?) 
                     ON DUPLICATE KEY UPDATE date_earned = CURRENT_TIMESTAMP";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("si", $userId, $achievementId);
            
            return $stmt->execute();
        } catch (Exception $e) {
            error_log("Error in awardAchievement: " . $e->getMessage());
            return false;
        }
    }
}