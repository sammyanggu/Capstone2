-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    points INT DEFAULT 0
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(255)
);

-- Create user_achievements junction table
CREATE TABLE IF NOT EXISTS user_achievements (
    user_id VARCHAR(255),
    achievement_id INT,
    date_earned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, achievement_id),
    FOREIGN KEY (achievement_id) REFERENCES achievements(id)
);

-- Create user_badges junction table
CREATE TABLE IF NOT EXISTS user_badges (
    user_id VARCHAR(255),
    badge_id INT,
    is_equipped BOOLEAN DEFAULT FALSE,
    date_earned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, badge_id),
    FOREIGN KEY (badge_id) REFERENCES badges(id)
);
