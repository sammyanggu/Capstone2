import React, { useState, useEffect } from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';

export default function CssAdvanced() {
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
        const savedStatus = localStorage.getItem('cssAdvancedStatus');
        if (savedStatus) {
            setExerciseStatus(JSON.parse(savedStatus));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cssAdvancedStatus', JSON.stringify(exerciseStatus));
    }, [exerciseStatus]);

    const exercises = [
        {
            title: "CSS Animations",
            description: "Create a complex animation sequence",
            type: "coding",
            task: "Create a loading spinner animation that transitions through multiple colors and rotates continuously.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            /* Add animation properties */
        }
        
        /* Add keyframes animation */
        
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 4px solid transparent;
            border-top-color: #ff4081;
            animation: spin 1s linear infinite,
                       colorChange 3s linear infinite;
        }
        
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @keyframes colorChange {
            0% { border-top-color: #ff4081; }
            33% { border-top-color: #3f51b5; }
            66% { border-top-color: #4caf50; }
            100% { border-top-color: #ff4081; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
    </div>
</body>
</html>`,
            hints: [
                "Use @keyframes for custom animations",
                "Combine multiple animations with comma separation",
                "Use transform: rotate for spinning effect"
            ]
        },
        {
            title: "CSS Custom Properties",
            type: "coding",
            description: "Create a theme switcher using CSS variables",
            task: "Create a light/dark theme switcher using CSS custom properties (variables). The theme should affect background, text color, and accent colors.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add root variables */
        
        body {
            margin: 0;
            min-height: 100vh;
            /* Use CSS variables */
        }
        
        .card {
            padding: 2rem;
            border-radius: 8px;
            margin: 2rem;
            /* Use CSS variables */
        }
        
        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            /* Use CSS variables */
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Theme Switcher</h2>
        <p>This content should change with the theme.</p>
        <button onclick="toggleTheme()">Toggle Theme</button>
    </div>

    <script>
        function toggleTheme() {
            document.documentElement.classList.toggle('dark-theme');
        }
    </script>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #333333;
            --card-bg: #f0f0f0;
            --accent-color: #ff4081;
        }
        
        .dark-theme {
            --bg-color: #1a1a1a;
            --text-color: #ffffff;
            --card-bg: #333333;
            --accent-color: #ff79b0;
        }
        
        body {
            margin: 0;
            min-height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: all 0.3s ease;
        }
        
        .card {
            padding: 2rem;
            border-radius: 8px;
            margin: 2rem;
            background-color: var(--card-bg);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: var(--accent-color);
            color: white;
            transition: all 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Theme Switcher</h2>
        <p>This content should change with the theme.</p>
        <button onclick="toggleTheme()">Toggle Theme</button>
    </div>

    <script>
        function toggleTheme() {
            document.documentElement.classList.toggle('dark-theme');
        }
    </script>
</body>
</html>`,
            hints: [
                "Define variables in :root selector",
                "Use var(--variable-name) to use variables",
                "Create a dark-theme class to override variables"
            ]
        },
        {
            title: "CSS Grid Areas",
            type: "coding",
            description: "Create a complex layout using CSS Grid areas",
            task: "Create a responsive dashboard layout with header, sidebar, main content, and footer using CSS Grid areas. Layout should stack on mobile.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
        }
        
        .dashboard {
            min-height: 100vh;
            /* Add grid properties */
        }
        
        /* Style grid areas */
        
        /* Add media query for mobile */
        
    </style>
</head>
<body>
    <div class="dashboard">
        <header>Dashboard Header</header>
        <nav class="sidebar">Sidebar Navigation</nav>
        <main>Main Content Area</main>
        <footer>Dashboard Footer</footer>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
        }
        
        .dashboard {
            min-height: 100vh;
            display: grid;
            grid-template-areas:
                "header header"
                "sidebar main"
                "footer footer";
            grid-template-columns: 250px 1fr;
            grid-template-rows: auto 1fr auto;
        }
        
        header {
            grid-area: header;
            background: #333;
            color: white;
            padding: 1rem;
        }
        
        .sidebar {
            grid-area: sidebar;
            background: #f0f0f0;
            padding: 1rem;
            border-right: 1px solid #ddd;
        }
        
        main {
            grid-area: main;
            padding: 1rem;
        }
        
        footer {
            grid-area: footer;
            background: #333;
            color: white;
            padding: 1rem;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .dashboard {
                grid-template-areas:
                    "header"
                    "sidebar"
                    "main"
                    "footer";
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <header>Dashboard Header</header>
        <nav class="sidebar">Sidebar Navigation</nav>
        <main>Main Content Area</main>
        <footer>Dashboard Footer</footer>
    </div>
</body>
</html>`,
            hints: [
                "Use grid-template-areas for layout",
                "Define areas with grid-area property",
                "Use different template areas for mobile"
            ]
        },
        {
            title: "CSS Clip-path and Shapes",
            type: "coding",
            description: "Create complex shapes using CSS",
            task: "Create an interactive button with a creative shape using clip-path and transform on hover.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .button {
            padding: 1.5rem 3rem;
            font-size: 1.2rem;
            border: none;
            color: white;
            cursor: pointer;
            /* Add shape and animation properties */
        }
    </style>
</head>
<body>
    <div class="container">
        <button class="button">Hover Me</button>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .button {
            padding: 1.5rem 3rem;
            font-size: 1.2rem;
            border: none;
            color: white;
            cursor: pointer;
            background: linear-gradient(45deg, #ff4081, #3f51b5);
            clip-path: polygon(
                10% 0%,
                90% 0%,
                100% 50%,
                90% 100%,
                10% 100%,
                0% 50%
            );
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: scale(1.1) rotate(-2deg);
            clip-path: polygon(
                0% 0%,
                100% 0%,
                90% 100%,
                10% 100%
            );
            background: linear-gradient(45deg, #3f51b5, #ff4081);
        }
    </style>
</head>
<body>
    <div class="container">
        <button class="button">Hover Me</button>
    </div>
</body>
</html>`,
            hints: [
                "Use clip-path with polygon() for custom shapes",
                "Combine transform properties for hover effects",
                "Use transitions for smooth shape changes"
            ]
        }
    ];

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
            case 0: // CSS Animations
                const hasKeyframes = /@keyframes\s+(spin|colorchange)/.test(userClean);
                const hasAnimation = /animation\s*:/.test(userClean);
                const hasRotate = /rotate\s*\(\s*360deg\s*\)/.test(userClean);
                const hasColorTransition = /border-(top-)?color/.test(userClean);
                correct = hasKeyframes && hasAnimation && hasRotate && hasColorTransition;
                break;

            case 1: // CSS Custom Properties
                const hasRootVariables = /:root\s*{[^}]*--/.test(userClean);
                const hasDarkTheme = /\.dark-theme\s*{[^}]*--/.test(userClean);
                const usesVarFunction = /var\s*\(\s*--/.test(userClean);
                const hasTransition = /transition/.test(userClean);
                correct = hasRootVariables && hasDarkTheme && usesVarFunction && hasTransition;
                break;

            case 2: // CSS Grid Areas
                const hasGridTemplate = /grid-template-areas/.test(userClean);
                const hasNamedAreas = /grid-area\s*:\s*(header|sidebar|main|footer)/.test(userClean);
                const hasMediaQuery = /@media/.test(userClean);
                const hasMobileLayout = /grid-template-columns\s*:\s*1fr/.test(userClean);
                correct = hasGridTemplate && hasNamedAreas && hasMediaQuery && hasMobileLayout;
                break;

            case 3: // Clip-path and Shapes
                const hasClipPath = /clip-path\s*:\s*polygon/.test(userClean);
                const hasTransform = /transform\s*:\s*scale/.test(userClean);
                const hasHoverEffect = /:hover/.test(userClean);
                const hasGradient = /linear-gradient/.test(userClean);
                correct = hasClipPath && hasTransform && hasHoverEffect && hasGradient;
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
                    <h1 className="text-xl font-bold text-fuchsia-400 mb-3">CSS Advanced Exercises</h1>
                    
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