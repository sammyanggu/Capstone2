<?php
/**
 * AI Hint API Endpoint
 * Provides coding hints from OpenAI ChatGPT securely
 * API Key is stored server-side (.env) - never exposed to frontend
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set JSON response header
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

// Load environment variables
$env_file = __DIR__ . '/.env';
if (file_exists($env_file)) {
    $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            [$key, $value] = explode('=', $line, 2);
            putenv(trim($key) . '=' . trim($value));
        }
    }
}

// Get API key from environment
$openai_api_key = getenv('OPENAI_API_KEY');
if (!$openai_api_key || $openai_api_key === 'your_openai_api_key_here') {
    http_response_code(500);
    echo json_encode(['error' => 'OpenAI API key not configured']);
    exit;
}

// Parse JSON request body
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input || empty($input['code']) || empty($input['language'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: code, language']);
    exit;
}

$code = trim($input['code']);
$language = trim($input['language']);

// Reject empty code
if (strlen($code) < 5) {
    echo json_encode(['hint' => 'Write more code first!']);
    exit;
}

// Create the system prompt for safe hints only
$system_prompt = "You are a coding assistant helping students learn to code. 
Your role is to:
- Provide brief hints and explanations (1-3 sentences max)
- Point out potential issues or mistakes
- Suggest improvements without giving full solutions
- Be encouraging and educational
Never provide complete corrected code. Keep hints concise and actionable.";

// Create user message
$user_message = "The user is learning $language programming. Here's their code:\n\n```$language\n$code\n```\n\nProvide a brief hint to help them improve this code.";

// Prepare OpenAI API request
$openai_url = 'https://api.openai.com/v1/chat/completions';
$openai_body = json_encode([
    'model' => 'gpt-3.5-turbo',
    'messages' => [
        ['role' => 'system', 'content' => $system_prompt],
        ['role' => 'user', 'content' => $user_message]
    ],
    'max_tokens' => 100,
    'temperature' => 0.7
]);

// Initialize cURL
$ch = curl_init($openai_url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $openai_body,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $openai_api_key
    ],
    CURLOPT_TIMEOUT => 10
]);

// Execute request
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);

// Parse response
if ($curl_error) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . $curl_error]);
    exit;
}

if ($http_code !== 200) {
    http_response_code($http_code);
    echo json_encode(['error' => 'OpenAI API error: HTTP ' . $http_code]);
    exit;
}

$data = json_decode($response, true);

if (!isset($data['choices'][0]['message']['content'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid response from OpenAI']);
    exit;
}

// Extract hint from response
$hint = trim($data['choices'][0]['message']['content']);

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'hint' => $hint
]);
exit;
?>
