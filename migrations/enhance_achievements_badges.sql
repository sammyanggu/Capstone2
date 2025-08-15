-- Add categories and tiers
ALTER TABLE achievements ADD COLUMN category VARCHAR(50) DEFAULT 'general';
ALTER TABLE achievements ADD COLUMN progress_max INT DEFAULT 1;
ALTER TABLE achievements ADD COLUMN achievement_order INT DEFAULT 0;

ALTER TABLE badges ADD COLUMN tier VARCHAR(20) DEFAULT 'bronze';
ALTER TABLE badges ADD COLUMN category VARCHAR(50) DEFAULT 'general';
ALTER TABLE badges ADD COLUMN required_achievements TEXT;

-- Add progress tracking for user achievements
ALTER TABLE user_achievements ADD COLUMN current_progress INT DEFAULT 0;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    type ENUM('achievement', 'badge') NOT NULL,
    reference_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
