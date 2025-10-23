import React, { useState } from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';

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
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');

    const exercises = [
        {
            title: "Object-Oriented Programming",
            description: "Create classes and implement OOP concepts in PHP.",
            tasks: [
                "Create a BlogPost class with properties and methods",
                "Implement inheritance with a Comment class",
                "Use interfaces and abstract classes"
            ]
        },
        {
            title: "Database Operations",
            description: "Work with MySQL databases using PHP PDO.",
            tasks: [
                "Create a database connection class",
                "Implement CRUD operations",
                "Use prepared statements for security"
            ]
        },
        {
            title: "RESTful API Development",
            description: "Build a simple REST API with PHP.",
            tasks: [
                "Create endpoints for GET, POST, PUT, DELETE",
                "Handle JSON requests and responses",
                "Implement proper error handling"
            ]
        },
        {
            title: "Authentication System",
            description: "Implement secure user authentication.",
            tasks: [
                "Create login and registration systems",
                "Implement password hashing",
                "Use JWT for authentication"
            ]
        },
        {
            title: "Advanced File Handling",
            description: "Work with file uploads and processing.",
            tasks: [
                "Handle file uploads securely",
                "Process image files (resize, convert)",
                "Implement file validation"
            ]
        }
    ];

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        // Here you would typically send the code to a PHP server for execution
        setOutput('Code updated! Connect to PHP server to see actual output.');
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-fuchsia-500 mb-8">PHP Exercises - Advanced</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Exercise List */}
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-fuchsia-400 mb-4">Exercises</h2>
                        <div className="space-y-6">
                            {exercises.map((exercise, index) => (
                                <div key={index} className="border border-slate-700 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-fuchsia-300 mb-2">{exercise.title}</h3>
                                    <p className="text-slate-300 mb-3 text-sm">{exercise.description}</p>
                                    <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                        {exercise.tasks.map((task, taskIndex) => (
                                            <li key={taskIndex}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-fuchsia-400 mb-4">Code Editor</h2>
                        <LiveHtmlEditor 
                            code={code}
                            onChange={handleCodeChange}
                            language="php"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-fuchsia-300 mb-2">Output</h3>
                            <div className="bg-slate-900 rounded-lg p-4 text-slate-300">
                                <pre>{output}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhpAdvanced;