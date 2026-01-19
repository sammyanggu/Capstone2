import React, { useState } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import CodeFeedback from '../../../../components/CodeFeedback';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import { toast } from 'react-toastify';
import { phpIcon } from '../../../../assets/icons/index.js';

const initialCode = `<?php
// PHP Advanced Exercises
// Implement the following advanced concepts:

// Task 1: Create a class for a simple blog post system
class BlogPost {
    // Add properties and methods here
}

// Task 2: Implement database operations (simulated)
function connectToDatabase() {
    // Your database connection code
}

// Task 3: Create an API endpoint
function handleRequest($method, $endpoint, $data) {
    // Your API handling code
}

?>`;

const PhpAdvanced = () => {
    const { currentUser } = useAuth();
    const [currentExercise, setCurrentExercise] = useState(0);
    const [exerciseStatus, setExerciseStatus] = useState({
        0: false, 1: false, 2: false, 3: false, 4: false
    });
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [showCongrats, setShowCongrats] = useState(false);
    const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
    const isInitialLoadRef = React.useRef(true);

    const exercises = [
        {
            title: "Object-Oriented Programming",
            description: "Create classes and implement OOP concepts in PHP.",
            tasks: [
                "Create a BlogPost class with properties and methods",
                "Implement inheritance with a Comment class",
                "Use interfaces and abstract classes"
            ],
            starterCode: `<?php
// Task 1: Create a BlogPost class
class BlogPost {
    // Add properties and methods here
}

// Task 2: Implement inheritance with Comment class
class Comment {
    // Your code here
}

// Task 3: Create interface and abstract class
interface Publishable {
    // Your code here
}

abstract class Content {
    // Your code here
}
?>`,
            solution: `<?php
class BlogPost {
    private $title;
    private $content;
    private $author;

    public function __construct($title, $content, $author) {
        $this->title = $title;
        $this->content = $content;
        $this->author = $author;
    }

    public function display() {
        echo "Title: " . $this->title . "\\n";
        echo "Content: " . $this->content . "\\n";
        echo "Author: " . $this->author;
    }
}

class Comment extends BlogPost {
    private $commentText;

    public function __construct($title, $content, $author, $commentText) {
        parent::__construct($title, $content, $author);
        $this->commentText = $commentText;
    }
}

interface Publishable {
    public function publish();
}

abstract class Content implements Publishable {
    abstract public function publish();
}
?>`
        },
        {
            title: "Database Operations",
            description: "Work with MySQL databases using PHP PDO.",
            tasks: [
                "Create a database connection class",
                "Implement CRUD operations",
                "Use prepared statements for security"
            ],
            starterCode: `<?php
// Create a Database class
class Database {
    private $connection;

    public function __construct($host, $db, $user, $pass) {
        // Your connection code here
    }

    public function insert($table, $data) {
        // Your insert code here
    }

    public function select($table) {
        // Your select code here
    }
}
?>`,
            solution: `<?php
class Database {
    private $connection;

    public function __construct($host, $db, $user, $pass) {
        try {
            $this->connection = new PDO(
                "mysql:host=$host;dbname=$db",
                $user,
                $pass
            );
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function insert($table, $data) {
        $keys = implode(", ", array_keys($data));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        $query = "INSERT INTO $table ($keys) VALUES ($placeholders)";
        $stmt = $this->connection->prepare($query);
        return $stmt->execute(array_values($data));
    }

    public function select($table) {
        $query = "SELECT * FROM $table";
        return $this->connection->query($query)->fetchAll();
    }
}
?>`
        },
        {
            title: "RESTful API Development",
            description: "Build a simple REST API with PHP.",
            tasks: [
                "Create endpoints for GET, POST, PUT, DELETE",
                "Handle JSON requests and responses",
                "Implement proper error handling"
            ],
            starterCode: `<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// Handle different HTTP methods
switch ($method) {
    case 'GET':
        // Your GET code here
        break;
    case 'POST':
        // Your POST code here
        break;
    case 'PUT':
        // Your PUT code here
        break;
    case 'DELETE':
        // Your DELETE code here
        break;
}
?>`,
            solution: `<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($method) {
    case 'GET':
        echo json_encode(['status' => 'success', 'data' => []]);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode(['status' => 'created', 'data' => $data]);
        break;
    case 'PUT':
        echo json_encode(['status' => 'updated']);
        break;
    case 'DELETE':
        echo json_encode(['status' => 'deleted']);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>`
        },
        {
            title: "Authentication System",
            description: "Implement secure user authentication.",
            tasks: [
                "Create login and registration systems",
                "Implement password hashing",
                "Use JWT for authentication"
            ],
            starterCode: `<?php
class Auth {
    public function register($username, $password) {
        // Your registration code here
    }

    public function login($username, $password) {
        // Your login code here
    }

    public function generateJWT($username) {
        // Your JWT generation code here
    }
}
?>`,
            solution: `<?php
class Auth {
    public function register($username, $password) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        // Store in database
        return true;
    }

    public function login($username, $password) {
        // Retrieve user from database
        $stored = 'hashed_password';
        if (password_verify($password, $stored)) {
            return true;
        }
        return false;
    }

    public function generateJWT($username) {
        $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload = base64_encode(json_encode(['username' => $username]));
        $signature = hash_hmac('sha256', $header . '.' . $payload, 'secret');
        return $header . '.' . $payload . '.' . $signature;
    }
}
?>`
        },
        {
            title: "Advanced File Handling",
            description: "Work with file uploads and processing.",
            tasks: [
                "Handle file uploads securely",
                "Process image files (resize, convert)",
                "Implement file validation"
            ],
            starterCode: `<?php
class FileHandler {
    public function validateUpload($file) {
        // Your validation code here
    }

    public function processImage($source) {
        // Your image processing code here
    }

    public function moveUploadedFile($file, $destination) {
        // Your file move code here
    }
}
?>`,
            solution: `<?php
class FileHandler {
    public function validateUpload($file) {
        $allowed = ['jpg', 'png', 'gif'];
        $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        if (!in_array($fileExt, $allowed)) {
            return false;
        }
        if ($file['size'] > 5000000) {
            return false;
        }
        return true;
    }

    public function processImage($source) {
        if (extension_loaded('gd')) {
            $image = imagecreatefromjpeg($source);
            // Process image
            return true;
        }
        return false;
    }

    public function moveUploadedFile($file, $destination) {
        return move_uploaded_file($file['tmp_name'], $destination);
    }
}
?>`
        }
    ];

    // Load current exercise index from Firebase
    React.useEffect(() => {
        const loadExerciseIndex = async () => {
            if (currentUser?.uid) {
                try {
                    // Load completion status for each exercise (5 exercises for PHP Advanced)
                    const newStatus = { ...exerciseStatus };
                    for (let i = 0; i < 5; i++) {
                        const progress = await getExerciseProgress(currentUser.uid, 'php', `advanced-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);
                    console.log('Loaded PHP advanced exercise statuses:', newStatus);

                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'php', 'advanced');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                        console.log(`✅ Resumed from exercise ${savedIndex}`);
                    }
                    isInitialLoadRef.current = false;
                } catch (err) {
                    console.error('Error loading PHP advanced exercise index:', err);
                    isInitialLoadRef.current = false;
                }
            } else {
                isInitialLoadRef.current = false;
            }
        };

        loadExerciseIndex();
    }, [currentUser]);

    // Save current exercise index to Firebase whenever it changes (but not during initial load)
    React.useEffect(() => {
        if (isInitialLoadRef.current) return;
        
        const saveIndex = async () => {
            if (currentUser?.uid) {
                try {
                    await saveCurrentExerciseIndex(currentUser.uid, 'php', 'advanced', currentExercise);
                } catch (err) {
                    console.error('Error saving current exercise index:', err);
                }
            }
        };

        saveIndex();
    }, [currentExercise, currentUser]);

    // Reset code when exercise changes
    React.useEffect(() => {
        setCode(exercises[currentExercise]?.starterCode || initialCode);
    }, [currentExercise]);

    const canAccessExercise = (index) => {
        if (index === 0) return true;
        return exerciseStatus[index - 1] === true;
    };

    const handleSubmitCode = () => {
        // Mark as complete
        setExerciseStatus(prev => ({
            ...prev,
            [currentExercise]: true
        }));
        setShowCongrats(true);
        
        setTimeout(async () => {
            setShowCongrats(false);
            
            // Save exercise completion to Firebase with unique levelKey
            if (currentUser?.uid) {
                try {
                    const levelKey = `advanced-${currentExercise}`;
                    await saveExerciseProgress(currentUser.uid, 'php', levelKey, code, true, 10);
                    console.log(`✅ Saved PHP advanced exercise ${levelKey} completion`);
                } catch (err) {
                    console.error('Error saving exercise completion:', err);
                }
            }
            
            if (currentExercise < exercises.length - 1) {
                const nextIndex = currentExercise + 1;
                setCurrentExercise(nextIndex);
                
                // Save the new index to Firebase
                if (currentUser?.uid) {
                    try {
                        await saveCurrentExerciseIndex(currentUser.uid, 'php', 'advanced', nextIndex);
                        console.log(`✅ Saved PHP advanced index: ${nextIndex}`);
                    } catch (err) {
                        console.error('Error saving new index:', err);
                    }
                }
            } else if (currentExercise === exercises.length - 1 && currentUser?.uid) {
                toast.success('PHP Advanced completed! 🎉');
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Exercise navigation */}
            <div className="sticky top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur z-10 border-b border-gray-300 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                    <img src={phpIcon} alt="PHP Logo" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        PHP Advanced Exercises
                    </h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-2 px-4">
                    {exercises.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (canAccessExercise(index)) {
                                    setCurrentExercise(index);
                                    setCode('');
                                } else {
                                    setLockedExerciseIndex(index);
                                }
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                currentExercise === index
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : canAccessExercise(index)
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            } ${exerciseStatus[index] ? 'ring-1 ring-green-500/50' : ''}`}
                        >
                            Exercise {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="p-4">
                {/* Exercise Title and Instructions */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                        {exercises[currentExercise].title}
                    </h2>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 border border-gray-300 dark:border-gray-600">
                        <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-2">Description:</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                            {exercises[currentExercise].description}
                        </p>
                        
                        <h3 className="text-gray-800 dark:text-gray-200 font-medium mt-3 mb-2">Tasks:</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                            {exercises[currentExercise].tasks.map((task, idx) => (
                                <li key={idx}>{task}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-800/50 dark:bg-slate-900 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3 flex items-center">
                        <span className="text-lg mr-2">⌨️</span>
                        Code Editor
                    </h3>
                    <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            <LiveHtmlEditor
                                initialCode={code || exercises[currentExercise]?.starterCode || initialCode}
                                onChange={setCode}
                                language="php"
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <CodeFeedback 
                                code={code}
                                language="php"
                                task={exercises[currentExercise]?.task}
                                exerciseId={`php-advanced-${currentExercise}`}
                                level="advanced"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSubmitCode}
                            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                        >
                            Submit
                        </button>
                        <button 
                            className="px-4 py-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded text-sm font-medium flex items-center gap-2 border border-emerald-600 bg-white"
                            onClick={() => document.getElementById('solution-advanced').classList.toggle('hidden')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Show Solution
                        </button>
                    </div>

                    {/* Solution Box */}
                    <div id="solution-advanced" className="hidden mt-4 bg-white dark:bg-gray-700 rounded p-4 border border-gray-300 dark:border-gray-600">
                        <pre className="text-gray-800 dark:text-gray-200 text-sm overflow-x-auto">
                            <code>{exercises[currentExercise].solution || 'No solution available'}</code>
                        </pre>
                    </div>
                </div>

                {showCongrats && (
                    <>
                        <Confetti duration={3000} />
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 pointer-events-none" />
                        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold text-emerald-600 mb-4">🎉 Congratulations! 🎉</h1>
                                <p className="text-3xl text-white">You've completed this exercise!</p>
                                {currentExercise < exercises.length - 1 && (
                                    <p className="text-xl text-white mt-4">Moving to next exercise...</p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Exercise Locked Modal */}
                {lockedExerciseIndex !== null && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-orange-500 max-w-sm">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-orange-600 mb-2">🔒 Exercise Locked</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Complete the previous exercise first!</p>
                                <button
                                    onClick={() => setLockedExerciseIndex(null)}
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhpAdvanced;
