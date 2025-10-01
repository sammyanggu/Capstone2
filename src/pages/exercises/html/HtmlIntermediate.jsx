import React, { useState, useEffect } from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';

export default function HtmlIntermediate() {
    const [currentExercise, setCurrentExercise] = useState(0);
    const [exerciseStatus, setExerciseStatus] = useState({
        0: false,
        1: false,
        2: false,
        3: false
    });
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [userCode, setUserCode] = useState('');
    
    useEffect(() => {
        const savedStatus = localStorage.getItem('htmlIntermediateStatus');
        if (savedStatus) {
            setExerciseStatus(JSON.parse(savedStatus));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('htmlIntermediateStatus', JSON.stringify(exerciseStatus));
    }, [exerciseStatus]);

    const exercises = [
        {
            title: "HTML Tables",
            description: "Creating structured data using HTML tables",
            type: "coding",
            task: "Create a table with 3 rows and 3 columns showing student grades. Include table headers for 'Name', 'Subject', and 'Grade'.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Student Grades</title>
</head>
<body>
    <!-- Add your table here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Student Grades</title>
</head>
<body>
    <table border="1">
        <thead>
            <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John</td>
                <td>Math</td>
                <td>90</td>
            </tr>
            <tr>
                <td>Emma</td>
                <td>Science</td>
                <td>95</td>
            </tr>
            <tr>
                <td>Mike</td>
                <td>History</td>
                <td>88</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`,
            hints: [
                "Use <table> to create a table",
                "Use <thead> for header section and <tbody> for table content",
                "Use <tr> for table rows",
                "Use <th> for header cells and <td> for data cells"
            ]
        },
        {
            title: "HTML Forms",
            type: "coding",
            description: "Creating interactive forms with different input types",
            task: "Create a contact form with name (text), email (email), message (textarea), and a submit button.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <!-- Add your form here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <form action="/submit" method="post">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Send Message</button>
    </form>
</body>
</html>`,
            hints: [
                "Use <form> to create a form",
                "Use <label> to label your inputs",
                "Use <input type=\"text\"> for name",
                "Use <input type=\"email\"> for email",
                "Use <textarea> for the message"
            ]
        },
        {
            title: "HTML Lists and Navigation",
            type: "coding",
            description: "Creating navigation menus with lists",
            task: "Create a navigation menu using an unordered list with 4 links: Home, About, Services, and Contact.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Navigation Menu</title>
</head>
<body>
    <!-- Add your navigation here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Navigation Menu</title>
</head>
<body>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</body>
</html>`,
            hints: [
                "Use <nav> for navigation sections",
                "Use <ul> for unordered list",
                "Use <li> for list items",
                "Use <a href=\"#\"> for links"
            ]
        },
        {
            title: "HTML Semantic Elements",
            type: "coding",
            description: "Using semantic HTML elements for better structure",
            task: "Create a blog post structure using semantic HTML elements including header, article, section, and footer.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Blog Post</title>
</head>
<body>
    <!-- Add your blog structure here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Blog Post</title>
</head>
<body>
    <header>
        <h1>My First Blog Post</h1>
        <nav>
            <a href="#home">Home</a> |
            <a href="#about">About</a>
        </nav>
    </header>
    
    <article>
        <header>
            <h2>Why HTML is Important</h2>
            <p>Published on September 28, 2025</p>
        </header>
        
        <section>
            <h3>Introduction</h3>
            <p>HTML is the backbone of the web...</p>
        </section>
        
        <section>
            <h3>Main Points</h3>
            <p>Let's explore the key concepts...</p>
        </section>
    </article>
    
    <footer>
        <p>&copy; 2025 My Blog. All rights reserved.</p>
    </footer>
</body>
</html>`,
            hints: [
                "Use <header> for the page header",
                "Use <article> for the main content",
                "Use <section> for different parts of the content",
                "Use <footer> for the page footer"
            ]
        }
    ];

    const handleAnswerSubmit = () => {
        const currentEx = exercises[currentExercise];
        if (selectedAnswer === currentEx.correctAnswer) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
            setShowError(false);
            setSelectedAnswer('');
            setShowCongrats(true);
            setTimeout(() => {
                setShowCongrats(false);
                if (currentExercise < exercises.length - 1) {
                    setCurrentExercise(currentExercise + 1);
                }
            }, 2000);
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
        }
    };

    const handleCodeSubmit = () => {
        // Clean up the code for comparison by removing whitespace and converting to lowercase
        const cleanCode = (code) => {
            return code.toLowerCase()
                      .replace(/[\n\t\r]/g, '')
                      .replace(/\s+/g, ' ')
                      .trim();
        };

        const userClean = cleanCode(userCode);
        let correct = false;

        switch(currentExercise) {
            case 0: // Tables exercise
                const hasTable = /<table[^>]*>.*<\/table>/is.test(userClean);
                const hasTableHeader = /<th[^>]*>name<\/th>/i.test(userClean) &&
                                    /<th[^>]*>subject<\/th>/i.test(userClean) &&
                                    /<th[^>]*>grade<\/th>/i.test(userClean);
                const hasTableRows = (userClean.match(/<tr[^>]*>/g) || []).length >= 3;
                const hasTableData = (userClean.match(/<td[^>]*>/g) || []).length >= 9;
                
                correct = hasTable && hasTableHeader && hasTableRows && hasTableData;
                break;

            case 1: // Forms exercise
                const hasForm = /<form[^>]*>.*<\/form>/is.test(userClean);
                const hasNameInput = /<input[^>]*type=["']text["'][^>]*>/i.test(userClean);
                const hasEmailInput = /<input[^>]*type=["']email["'][^>]*>/i.test(userClean);
                const hasTextarea = /<textarea[^>]*>.*<\/textarea>/is.test(userClean);
                const hasLabels = (userClean.match(/<label[^>]*>/g) || []).length >= 3;
                
                correct = hasForm && hasNameInput && hasEmailInput && hasTextarea && hasLabels;
                break;

            case 2: // Navigation exercise
                const hasNav = /<nav[^>]*>.*<\/nav>/is.test(userClean);
                const hasUl = /<ul[^>]*>.*<\/ul>/is.test(userClean);
                const hasLiCount = (userClean.match(/<li[^>]*>/g) || []).length >= 4;
                const hasLinks = userClean.includes('href="#home"') &&
                               userClean.includes('href="#about"') &&
                               userClean.includes('href="#services"') &&
                               userClean.includes('href="#contact"');
                
                correct = hasNav && hasUl && hasLiCount && hasLinks;
                break;

            case 3: // Semantic HTML exercise
                const hasSemanticElements = [
                    'header',
                    'article',
                    'section',
                    'footer'
                ].every(tag => {
                    const regex = new RegExp(`<${tag}[^>]*>.*<\/${tag}>`, 'is');
                    return regex.test(userClean);
                });
                const hasHeadings = [
                    /<h1[^>]*>.*<\/h1>/i,
                    /<h2[^>]*>.*<\/h2>/i,
                    /<h3[^>]*>.*<\/h3>/i
                ].some(regex => regex.test(userClean));
                
                correct = hasSemanticElements && hasHeadings;
                break;
        }
        
        if (correct) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
            setShowCongrats(true);
            setTimeout(() => {
                setShowCongrats(false);
                if (currentExercise < exercises.length - 1) {
                    setCurrentExercise(currentExercise + 1);
                }
            }, 2000);
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
        }
    };

    const canAccessExercise = (index) => {
        if (index === 0) return true;
        return exerciseStatus[index - 1] === true;
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-16">
            {/* Congratulations Modal */}
            {showCongrats && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-fuchsia-500 animate-bounce">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-fuchsia-400 mb-2">🎉 Congratulations! 🎉</h3>
                            <p className="text-slate-300">You've completed this exercise!</p>
                            {currentExercise < exercises.length - 1 && (
                                <p className="text-slate-400 text-sm mt-2">Moving to next exercise...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-4 max-w-4xl">
                <div className="bg-slate-800/50 rounded-lg shadow-lg p-4 mb-4">
                    <h1 className="text-xl font-bold text-fuchsia-400 mb-3">HTML Intermediate Exercises</h1>
                    
                    {/* Exercise Navigation */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {exercises.map((ex, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1.5 rounded-lg text-sm ${
                                    !canAccessExercise(index)
                                        ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                                        : currentExercise === index
                                        ? 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
                                        : exerciseStatus[index]
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                                onClick={() => canAccessExercise(index) && setCurrentExercise(index)}
                                disabled={!canAccessExercise(index)}
                            >
                                Exercise {index + 1}
                                {exerciseStatus[index] && (
                                    <span className="ml-1">✓</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Current Exercise */}
                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold text-fuchsia-400 mb-1">{exercises[currentExercise].title}</h2>
                        <p className="text-slate-300 mb-3 text-sm">{exercises[currentExercise].description}</p>
                        
                        <div>
                            <div className="bg-slate-800/50 rounded p-4 mb-4 border border-slate-700/50">
                                <h3 className="text-lg font-semibold text-fuchsia-300 mb-2">Your Task:</h3>
                                <p className="text-slate-300">{exercises[currentExercise].task}</p>
                            </div>
                            
                            {/* Hints */}
                            <div className="mb-4">
                                <button 
                                    className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium flex items-center gap-2"
                                    onClick={() => document.getElementById('hints').classList.toggle('hidden')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    Show Hints
                                </button>
                                <div id="hints" className="hidden mt-2 bg-slate-800/50 rounded p-4 border border-slate-700/50">
                                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                                        {exercises[currentExercise].hints?.map((hint, index) => (
                                            <li key={index} className="text-sm">{hint}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Code Editor */}
                            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                <LiveHtmlEditor 
                                    initialCode={exercises[currentExercise].initialCode}
                                    onChange={setUserCode}
                                />
                            </div>

                            {/* Submit and Solution Buttons */}
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={handleCodeSubmit}
                                    className="px-4 py-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600 transition-colors cursor-pointer text-sm font-medium"
                                >
                                    Submit Code
                                </button>

                                <button 
                                    className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium flex items-center gap-2"
                                    onClick={() => document.getElementById('solution').classList.toggle('hidden')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Show Solution
                                </button>
                            </div>

                            {showError && (
                                <div className="mt-4 bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 rounded animate-shake">
                                    <p>Not quite right! Check the requirements and try again.</p>
                                </div>
                            )}

                            <div id="solution" className="hidden mt-4 bg-slate-800/50 rounded p-4 border border-slate-700/50">
                                <pre className="text-slate-300 text-sm">
                                    <code>{exercises[currentExercise].solution}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}