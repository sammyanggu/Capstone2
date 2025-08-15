<?php
header('Content-Type: text/html');
require_once 'config/config.php';

$conn = Config::getConnection();

function checkTable($conn, $tableName) {
    $result = $conn->query("SHOW TABLES LIKE '$tableName'");
    return $result->num_rows > 0;
}

function checkColumn($conn, $tableName, $columnName) {
    $result = $conn->query("SHOW COLUMNS FROM `$tableName` LIKE '$columnName'");
    return $result->num_rows > 0;
}

$tables = [
    'achievements',
    'badges',
    'user_achievements',
    'user_badges',
    'notifications'
];

$tableStatus = [];
foreach ($tables as $table) {
    $exists = checkTable($conn, $table);
    $tableStatus[$table] = $exists;
}

// Check required columns
$columns = [
    'achievements' => ['category', 'progress_max', 'achievement_order'],
    'badges' => ['tier', 'category', 'required_achievements'],
    'user_achievements' => ['current_progress'],
    'user_badges' => ['is_equipped']
];

$columnStatus = [];
foreach ($columns as $table => $cols) {
    if ($tableStatus[$table]) {
        foreach ($cols as $col) {
            $columnStatus[$table][$col] = checkColumn($conn, $table, $col);
        }
    }
}

echo "<h2>Database Status Check</h2>";

echo "<h3>Tables:</h3>";
echo "<ul>";
foreach ($tableStatus as $table => $exists) {
    $status = $exists ? "✅" : "❌";
    echo "<li>$table: $status</li>";
}
echo "</ul>";

echo "<h3>Columns:</h3>";
echo "<ul>";
foreach ($columnStatus as $table => $cols) {
    echo "<li>$table:";
    echo "<ul>";
    foreach ($cols as $col => $exists) {
        $status = $exists ? "✅" : "❌";
        echo "<li>$col: $status</li>";
    }
    echo "</ul>";
    echo "</li>";
}
echo "</ul>";

// Check for existing data
echo "<h3>Data Count:</h3>";
echo "<ul>";
$tables = ['achievements', 'badges'];
foreach ($tables as $table) {
    if ($tableStatus[$table]) {
        $result = $conn->query("SELECT COUNT(*) as count FROM $table");
        $count = $result->fetch_assoc()['count'];
        echo "<li>$table: $count records</li>";
    }
}
echo "</ul>";
