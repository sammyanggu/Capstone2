<?php
require_once __DIR__ . '/../config/config.php';

class LessonControl {
    private $conn;
    
    public function __construct() {
        $this->conn = Config::getConnection();
    }
    
    public function getLessonsWithProgress($userId) {
        try {
            $query = "SELECT 
                        l.*,
                        COALESCE(up.progress, 0) as progress,
                        IF(up.completed_at IS NOT NULL, 1, 0) as is_completed,
                        up.completed_at
                    FROM lessons l
                    LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
                    ORDER BY l.order_num ASC";
            
            $stmt = $this->conn->prepare($query);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $this->conn->error);
            }
            
            $stmt->bind_param("s", $userId);
            
            if (!$stmt->execute()) {
                throw new Exception("Execute failed: " . $stmt->error);
            }
            
            $result = $stmt->get_result();
            $lessons = [];
            
            while ($row = $result->fetch_assoc()) {
                $lessons[] = [
                    'id' => $row['id'],
                    'title' => $row['title'],
                    'description' => $row['description'],
                    'tech' => $row['tech'],
                    'difficulty' => $row['difficulty'],
                    'duration' => (int)$row['duration'],
                    'xp' => (int)$row['xp'],
                    'thumbnail' => $row['thumbnail'],
                    'progress' => (int)$row['progress'],
                    'isCompleted' => (bool)$row['is_completed'],
                    'completedAt' => $row['completed_at'],
                    'prerequisites' => json_decode($row['prerequisites'] ?? '[]'),
                    'order' => (int)$row['order_num']
                ];
            }
            
            return $lessons;
            
        } catch (Exception $e) {
            error_log("Error in getLessonsWithProgress: " . $e->getMessage());
            throw $e;
        }
    }
    
    public function getLesson($lessonId, $userId) {
        try {
            $query = "SELECT 
                        l.*,
                        COALESCE(up.progress, 0) as progress,
                        IF(up.completed_at IS NOT NULL, 1, 0) as is_completed,
                        up.completed_at
                    FROM lessons l
                    LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
                    WHERE l.id = ?";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("si", $userId, $lessonId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($row = $result->fetch_assoc()) {
                return [
                    'id' => $row['id'],
                    'title' => $row['title'],
                    'description' => $row['description'],
                    'content' => $row['content'],
                    'tech' => $row['tech'],
                    'difficulty' => $row['difficulty'],
                    'duration' => (int)$row['duration'],
                    'xp' => (int)$row['xp'],
                    'thumbnail' => $row['thumbnail'],
                    'progress' => (int)$row['progress'],
                    'isCompleted' => (bool)$row['is_completed'],
                    'completedAt' => $row['completed_at'],
                    'prerequisites' => json_decode($row['prerequisites'] ?? '[]')
                ];
            }
            
            return null;
            
        } catch (Exception $e) {
            error_log("Error in getLesson: " . $e->getMessage());
            throw $e;
        }
    }
    
    public function updateProgress($userId, $lessonId, $progress) {
        try {
            $query = "INSERT INTO user_progress (user_id, lesson_id, progress, completed_at) 
                    VALUES (?, ?, ?, IF(? >= 100, NOW(), NULL))
                    ON DUPLICATE KEY UPDATE 
                        progress = ?,
                        completed_at = IF(? >= 100, IF(completed_at IS NULL, NOW(), completed_at), completed_at)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("siiiii", $userId, $lessonId, $progress, $progress, $progress, $progress);
            
            if (!$stmt->execute()) {
                throw new Exception($stmt->error);
            }
            
            // If lesson is completed, check for achievements
            if ($progress >= 100) {
                $this->checkAndAwardAchievements($userId, $lessonId);
            }
            
            return [
                'success' => true,
                'message' => 'Progress updated successfully',
                'progress' => $progress
            ];
            
        } catch (Exception $e) {
            error_log("Error in updateProgress: " . $e->getMessage());
            throw $e;
        }
    }
    
    private function checkAndAwardAchievements($userId, $lessonId) {
        try {
            // Get lesson details
            $query = "SELECT tech FROM lessons WHERE id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $lessonId);
            $stmt->execute();
            $lesson = $stmt->get_result()->fetch_assoc();
            
            if (!$lesson) return;
            
            // Count completed lessons in this technology
            $query = "SELECT COUNT(*) as count
                    FROM user_progress up
                    JOIN lessons l ON up.lesson_id = l.id
                    WHERE up.user_id = ? AND l.tech = ? AND up.completed_at IS NOT NULL";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ss", $userId, $lesson['tech']);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc();
            $completedCount = $result['count'];
            
            // Check for achievements based on completed count
            $achievements = [
                1 => ['id' => 1, 'name' => 'First Steps', 'description' => 'Complete your first lesson'],
                5 => ['id' => 2, 'name' => 'Getting Better', 'description' => 'Complete 5 lessons'],
                10 => ['id' => 3, 'name' => 'Master Student', 'description' => 'Complete 10 lessons']
            ];
            
            foreach ($achievements as $requiredCount => $achievement) {
                if ($completedCount === $requiredCount) {
                    // Award achievement
                    $query = "INSERT IGNORE INTO user_achievements (user_id, achievement_id)
                            VALUES (?, ?)";
                    $stmt = $this->conn->prepare($query);
                    $stmt->bind_param("si", $userId, $achievement['id']);
                    $stmt->execute();
                    
                    // Create notification
                    if ($stmt->affected_rows > 0) {
                        $query = "INSERT INTO notifications (user_id, type, reference_id, message)
                                VALUES (?, 'achievement', ?, ?)";
                        $stmt = $this->conn->prepare($query);
                        $message = "You've earned the {$achievement['name']} achievement!";
                        $stmt->bind_param("sis", $userId, $achievement['id'], $message);
                        $stmt->execute();
                    }
                }
            }
            
        } catch (Exception $e) {
            error_log("Error in checkAndAwardAchievements: " . $e->getMessage());
            // Don't throw the error as this is a background process
        }
    }
}