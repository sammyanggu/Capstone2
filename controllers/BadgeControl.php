<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../models/Badge.php';

class BadgeControl {
    private $conn;

    public function __construct() {
        $this->conn = Config::getConnection();
    }

    public function getUserBadges($userId) {
        $query = "SELECT b.*, ub.is_equipped, ub.date_earned,
                        GROUP_CONCAT(DISTINCT a.name) as required_achievement_names
                 FROM badges b 
                 LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?
                 LEFT JOIN achievements a ON FIND_IN_SET(a.id, b.required_achievements)
                 GROUP BY b.id
                 ORDER BY b.tier, b.category";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("s", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $badges = [];
            while ($row = $result->fetch_assoc()) {
                $tierColors = [
                    'bronze' => '#CD7F32',
                    'silver' => '#C0C0C0',
                    'gold' => '#FFD700',
                    'platinum' => '#E5E4E2'
                ];
                
                $badges[] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'icon' => $row['icon'],
                    'tier' => $row['tier'],
                    'tierColor' => $tierColors[$row['tier']] ?? '#CD7F32',
                    'category' => $row['category'],
                    'isEquipped' => (bool)$row['is_equipped'],
                    'dateEarned' => $row['date_earned'],
                    'isEarned' => $row['date_earned'] !== null,
                    'requiredAchievements' => $row['required_achievement_names'] 
                        ? explode(',', $row['required_achievement_names'])
                        : []
                ];
            }
            
            // Group badges by category
            $groupedBadges = [];
            foreach ($badges as $badge) {
                if (!isset($groupedBadges[$badge['category']])) {
                    $groupedBadges[$badge['category']] = [];
                }
                $groupedBadges[$badge['category']][] = $badge;
            }
            
            return [
                'badges' => $badges,
                'groupedBadges' => $groupedBadges
            ];
        } catch (Exception $e) {
            error_log("Error in getUserBadges: " . $e->getMessage());
            return [];
        }
    }

    public function equipBadge($userId, $badgeId) {
        try {
            // Start transaction
            $this->conn->begin_transaction();

            // First, unequip all badges for this user
            $unequipQuery = "UPDATE user_badges SET is_equipped = FALSE WHERE user_id = ?";
            $stmt = $this->conn->prepare($unequipQuery);
            $stmt->bind_param("s", $userId);
            $stmt->execute();

            // Then equip the selected badge
            $equipQuery = "UPDATE user_badges SET is_equipped = TRUE WHERE user_id = ? AND badge_id = ?";
            $stmt = $this->conn->prepare($equipQuery);
            $stmt->bind_param("si", $userId, $badgeId);
            $stmt->execute();

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollback();
            error_log("Error in equipBadge: " . $e->getMessage());
            return false;
        }
    }

    public function awardBadge($userId, $badgeId) {
        try {
            $query = "INSERT INTO user_badges (user_id, badge_id, is_equipped) 
                     VALUES (?, ?, FALSE) 
                     ON DUPLICATE KEY UPDATE date_earned = CURRENT_TIMESTAMP";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("si", $userId, $badgeId);
            
            return $stmt->execute();
        } catch (Exception $e) {
            error_log("Error in awardBadge: " . $e->getMessage());
            return false;
        }
    }
}