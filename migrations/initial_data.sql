-- Insert achievement categories
INSERT INTO achievements (name, description, icon, points, category, progress_max, achievement_order) VALUES
-- HTML Achievements
('HTML Beginner', 'Complete your first HTML lesson', '/assets/achievements/html-beginner.png', 10, 'html', 1, 1),
('HTML Explorer', 'Complete 5 HTML lessons', '/assets/achievements/html-explorer.png', 50, 'html', 5, 2),
('HTML Master', 'Complete all HTML lessons', '/assets/achievements/html-master.png', 100, 'html', 10, 3),

-- CSS Achievements
('CSS Beginner', 'Complete your first CSS lesson', '/assets/achievements/css-beginner.png', 10, 'css', 1, 1),
('CSS Stylist', 'Complete 5 CSS lessons', '/assets/achievements/css-stylist.png', 50, 'css', 5, 2),
('CSS Master', 'Complete all CSS lessons', '/assets/achievements/css-master.png', 100, 'css', 10, 3),

-- JavaScript Achievements
('JS Beginner', 'Complete your first JavaScript lesson', '/assets/achievements/js-beginner.png', 10, 'javascript', 1, 1),
('JS Coder', 'Complete 5 JavaScript lessons', '/assets/achievements/js-coder.png', 50, 'javascript', 5, 2),
('JS Master', 'Complete all JavaScript lessons', '/assets/achievements/js-master.png', 100, 'javascript', 10, 3),

-- General Achievements
('Quick Learner', 'Complete 3 lessons in one day', '/assets/achievements/quick-learner.png', 30, 'general', 3, 1),
('Dedicated Student', 'Log in for 5 consecutive days', '/assets/achievements/dedicated-student.png', 50, 'general', 5, 2),
('Perfect Score', 'Get 100% on any exercise', '/assets/achievements/perfect-score.png', 20, 'general', 1, 3);

-- Insert badge tiers
INSERT INTO badges (name, description, icon, tier, category, required_achievements) VALUES
-- HTML Badges
('HTML Rookie', 'Start your HTML journey', '/assets/badges/html-rookie.png', 'bronze', 'html', '1'),
('HTML Enthusiast', 'Show your growing HTML expertise', '/assets/badges/html-enthusiast.png', 'silver', 'html', '1,2'),
('HTML Expert', 'Master of HTML', '/assets/badges/html-expert.png', 'gold', 'html', '1,2,3'),

-- CSS Badges
('CSS Rookie', 'Start your CSS journey', '/assets/badges/css-rookie.png', 'bronze', 'css', '4'),
('CSS Designer', 'Show your growing CSS expertise', '/assets/badges/css-designer.png', 'silver', 'css', '4,5'),
('CSS Expert', 'Master of CSS', '/assets/badges/css-expert.png', 'gold', 'css', '4,5,6'),

-- JavaScript Badges
('JS Rookie', 'Start your JavaScript journey', '/assets/badges/js-rookie.png', 'bronze', 'javascript', '7'),
('JS Developer', 'Show your growing JavaScript expertise', '/assets/badges/js-developer.png', 'silver', 'javascript', '7,8'),
('JS Expert', 'Master of JavaScript', '/assets/badges/js-expert.png', 'gold', 'javascript', '7,8,9'),

-- Special Badges
('Full Stack Developer', 'Master of HTML, CSS, and JavaScript', '/assets/badges/full-stack.png', 'platinum', 'special', '3,6,9'),
('Quick Study', 'Fast and efficient learner', '/assets/badges/quick-study.png', 'gold', 'special', '10,11,12');
