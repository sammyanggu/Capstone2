<?php
// Database config (update with your credentials)
define('DB_HOST', 'localhost');
define('DB_NAME', 'capstone');
define('DB_USER', 'root');
define('DB_PASS', '');

class Config {
    private static $conn = null;

    public static function getConnection() {
        if (self::$conn === null) {
            try {
                self::$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
                self::$conn->set_charset("utf8mb4");
                
                if (self::$conn->connect_error) {
                    throw new Exception("Connection failed: " . self::$conn->connect_error);
                }
            } catch (Exception $e) {
                die("Connection failed: " . $e->getMessage());
            }
        }
        return self::$conn;
    }

    // Keep PDO connection for backward compatibility
    public static function getPDO() {
        return new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS);
    }
}