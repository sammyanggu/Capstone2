import React, { useState } from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';
import { phpIcon } from '../../../assets/icons/index.js';

const initialCode = `<?php
// PHP Intermediate Exercises
// Complete the following tasks:

// Task 1: Create an array of user data and loop through it
$users = [
    ['name' => 'John', 'age' => 25],
    ['name' => 'Jane', 'age' => 30]
];

// Your code here to display user information

// Task 2: Create a function that checks if a number is prime
function isPrime($number) {
    // Your code here
}

// Task 3: Work with POST data (simulated)
$_POST['username'] = 'testuser';
$_POST['email'] = 'test@example.com';

// Validate and display the form data
// Your code here

?>`;

const PhpIntermediate = () => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');

    const exercises = [
        {
            title: "Arrays and Loops",
            description: "Practice working with arrays and different types of loops in PHP.",
            tasks: [
                "Create an associative array with user data",
                "Use foreach to display all user information",
                "Calculate and display average age"
            ]
        },
        {
            title: "Functions and Logic",
            description: "Create functions with complex logic and calculations.",
            tasks: [
                "Write a function to check if a number is prime",
                "Create a function that finds factors of a number",
                "Implement error handling with try-catch"
            ]
        },
        {
            title: "Form Handling",
            description: "Learn to handle form data and validate input.",
            tasks: [
                "Validate username (alphanumeric only)",
                "Check if email format is valid",
                "Display appropriate error messages"
            ]
        },
        {
            title: "File Operations",
            description: "Work with file reading and writing operations.",
            tasks: [
                "Create a function to read from a text file",
                "Write data to a file with proper error handling",
                "List all files in a directory"
            ]
        }
    ];

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        // Here you would typically send the code to a PHP server for execution
        setOutput('Code updated! Connect to PHP server to see actual output.');
    };

    return (
        <div className="min-h-screen bg-white pt-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <img src={phpIcon} alt="PHP Logo" className="w-12 h-12" />
                    <h1 className="text-3xl font-bold text-emerald-600">PHP Exercises - Intermediate</h1>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Exercise List */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-emerald-600 mb-4">Exercises</h2>
                        <div className="space-y-6">
                            {exercises.map((exercise, index) => (
                                <div key={index} className="border border-gray-300 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-emerald-600 mb-2">{exercise.title}</h3>
                                    <p className="text-gray-700 mb-3 text-sm">{exercise.description}</p>
                                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                        {exercise.tasks.map((task, taskIndex) => (
                                            <li key={taskIndex}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-emerald-600 mb-4">Code Editor</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                                <LiveHtmlEditor 
                                    code={code}
                                    onChange={handleCodeChange}
                                    language="php"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-emerald-600 mb-2">Output</h3>
                            <div className="bg-white rounded-lg p-4 text-gray-700 border border-gray-300">
                                <pre>{output}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhpIntermediate;
