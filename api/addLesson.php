<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

require_once __DIR__ . '/../controllers/LessonControl.php';

$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'] ?? '';
$content = $data['content'] ?? '';
$xp = $data['xp'] ?? 0;
$thumbnail = $data['thumbnail'] ?? '';
$tech = $data['tech'] ?? '';
$author = $data['author'] ?? '';
$videoUrl = $data['videoUrl'] ?? '';

$controller = new LessonController();
$result = $controller->addLesson($title, $content, $xp, $thumbnail, $tech, $author, $videoUrl);

echo json_encode([
    'message' => $result ? 'Lesson added!' : 'Failed to add lesson.'
]);