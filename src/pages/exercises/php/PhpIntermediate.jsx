import React, { useState } from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';

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
        <div className="min-h-screen bg-slate-900 pt-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-fuchsia-500 mb-8">PHP Exercises - Intermediate</h1>
                
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

export default PhpIntermediate;