import React, { useState, useEffect } from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';
import Confetti from '../../../components/Confetti';
import { useAuth } from '../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../utils/progressTracker';

export default function HtmlAdvanced() {
    const { currentUser } = useAuth();
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
    const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
    
    useEffect(() => {
        const savedStatus = localStorage.getItem('htmlAdvancedStatus');
        if (savedStatus) {
            setExerciseStatus(JSON.parse(savedStatus));
        }
    }, []);

    // Load current exercise index from Firebase
    useEffect(() => {
        const loadExerciseIndex = async () => {
            if (currentUser?.uid) {
                try {
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'html', 'advanced');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                        console.log(`✅ Resumed from exercise ${savedIndex}`);
                    }
                } catch (err) {
                    console.error('Error loading HTML advanced exercise index:', err);
                }
            }
        };

        loadExerciseIndex();
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('htmlAdvancedStatus', JSON.stringify(exerciseStatus));
    }, [exerciseStatus]);

    // Save current exercise index to Firebase whenever it changes
    useEffect(() => {
        const saveIndex = async () => {
            if (currentUser?.uid) {
                try {
                    await saveCurrentExerciseIndex(currentUser.uid, 'html', 'advanced', currentExercise);
                } catch (err) {
                    console.error('Error saving current exercise index:', err);
                }
            }
        };

        saveIndex();
    }, [currentExercise, currentUser]);

    const exercises = [
        {
            title: "Responsive Image Gallery",
            description: "Creating a responsive image gallery with figure and figcaption",
            type: "coding",
            task: "Create a responsive image gallery with 3 images using figure, figcaption, and the picture element for responsive images.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Image Gallery</title>
    <style>
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }
        figure {
            margin: 0;
            position: relative;
        }
        img {
            width: 100%;
            height: auto;
        }
        figcaption {
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 0.5rem;
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <!-- Add your gallery here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Image Gallery</title>
    <style>
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }
        figure {
            margin: 0;
            position: relative;
        }
        img {
            width: 100%;
            height: auto;
        }
        figcaption {
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 0.5rem;
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="gallery">
        <figure>
            <picture>
                <source media="(min-width: 800px)" srcset="https://picsum.photos/800/600">
                <source media="(min-width: 400px)" srcset="https://picsum.photos/400/300">
                <img src="https://picsum.photos/300/200" alt="Nature Image 1">
            </picture>
            <figcaption>Beautiful Nature Scene 1</figcaption>
        </figure>
        
        <figure>
            <picture>
                <source media="(min-width: 800px)" srcset="https://picsum.photos/800/600?random=2">
                <source media="(min-width: 400px)" srcset="https://picsum.photos/400/300?random=2">
                <img src="https://picsum.photos/300/200?random=2" alt="Nature Image 2">
            </picture>
            <figcaption>Beautiful Nature Scene 2</figcaption>
        </figure>
        
        <figure>
            <picture>
                <source media="(min-width: 800px)" srcset="https://picsum.photos/800/600?random=3">
                <source media="(min-width: 400px)" srcset="https://picsum.photos/400/300?random=3">
                <img src="https://picsum.photos/300/200?random=3" alt="Nature Image 3">
            </picture>
            <figcaption>Beautiful Nature Scene 3</figcaption>
        </figure>
    </div>
</body>
</html>`,
            hints: [
                "Use <figure> and <figcaption> for each image",
                "Use <picture> element for responsive images",
                "Include multiple <source> elements with different media queries",
                "Don't forget alt attributes for accessibility"
            ]
        },
        {
            title: "Interactive Form with Custom Validation",
            type: "coding",
            description: "Creating a form with custom HTML5 validation and patterns",
            task: "Create a registration form with custom validation for username (alphanumeric, 5-15 chars), password (min 8 chars, 1 uppercase, 1 number), and phone number (format: XXX-XXX-XXXX).",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        form {
            max-width: 400px;
            margin: 2rem auto;
            padding: 1rem;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
        }
        input {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 0.25rem;
        }
        input:invalid {
            border-color: red;
        }
        .error {
            color: red;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <!-- Add your form here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        form {
            max-width: 400px;
            margin: 2rem auto;
            padding: 1rem;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
        }
        input {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 0.25rem;
        }
        input:invalid {
            border-color: red;
        }
        .error {
            color: red;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <form id="registration" novalidate>
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"
                   pattern="^[a-zA-Z0-9]{5,15}$"
                   required
                   title="Username must be 5-15 characters long and contain only letters and numbers">
            <div class="error" id="username-error"></div>
        </div>
        
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"
                   pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                   required
                   title="Password must be at least 8 characters long, contain 1 uppercase letter and 1 number">
            <div class="error" id="password-error"></div>
        </div>
        
        <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone"
                   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                   required
                   title="Phone number format: XXX-XXX-XXXX">
            <div class="error" id="phone-error"></div>
        </div>
        
        <button type="submit">Register</button>
    </form>

    <script>
        const form = document.getElementById('registration');
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const error = document.getElementById(\`\${input.id}-error\`);
                if (input.validity.valid) {
                    error.textContent = '';
                } else {
                    error.textContent = input.title;
                }
            });
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                alert('Form submitted successfully!');
            } else {
                inputs.forEach(input => {
                    const error = document.getElementById(\`\${input.id}-error\`);
                    if (!input.validity.valid) {
                        error.textContent = input.title;
                    }
                });
            }
        });
    </script>
</body>
</html>`,
            hints: [
                "Use pattern attribute for custom validation rules",
                "Use title attribute to show custom error messages",
                "Implement JavaScript validation for better user experience",
                "Add error message elements for each input"
            ]
        },
        {
            title: "Accessible Data Table",
            type: "coding",
            description: "Creating an accessible and responsive data table",
            task: "Create an accessible table showing product information with proper ARIA labels, scope attributes, and caption. Include column headers for Product Name, Category, Price, and Stock.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Product Table</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        caption {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            text-align: left;
        }
        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
        }
        @media (max-width: 600px) {
            th, td {
                display: block;
            }
            th {
                display: none;
            }
            td {
                display: grid;
                grid-template-columns: 50% 50%;
                padding: 0.5rem;
            }
            td::before {
                content: attr(data-label);
                font-weight: bold;
            }
        }
    </style>
</head>
<body>
    <!-- Add your table here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Product Table</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        caption {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            text-align: left;
        }
        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
        }
        @media (max-width: 600px) {
            th, td {
                display: block;
            }
            th {
                display: none;
            }
            td {
                display: grid;
                grid-template-columns: 50% 50%;
                padding: 0.5rem;
            }
            td::before {
                content: attr(data-label);
                font-weight: bold;
            }
        }
    </style>
</head>
<body>
    <table role="grid" aria-label="Product Inventory">
        <caption>Product Inventory List</caption>
        <thead>
            <tr>
                <th scope="col" id="name">Product Name</th>
                <th scope="col" id="category">Category</th>
                <th scope="col" id="price">Price</th>
                <th scope="col" id="stock">Stock</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-label="Product Name" headers="name">Wireless Mouse</td>
                <td data-label="Category" headers="category">Electronics</td>
                <td data-label="Price" headers="price">$29.99</td>
                <td data-label="Stock" headers="stock">45</td>
            </tr>
            <tr>
                <td data-label="Product Name" headers="name">Mechanical Keyboard</td>
                <td data-label="Category" headers="category">Electronics</td>
                <td data-label="Price" headers="price">$89.99</td>
                <td data-label="Stock" headers="stock">32</td>
            </tr>
            <tr>
                <td data-label="Product Name" headers="name">USB-C Cable</td>
                <td data-label="Category" headers="category">Accessories</td>
                <td data-label="Price" headers="price">$12.99</td>
                <td data-label="Stock" headers="stock">78</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`,
            hints: [
                "Use proper table structure with thead and tbody",
                "Add scope attributes to th elements",
                "Use ARIA labels for better accessibility",
                "Add data-label attributes for responsive display"
            ]
        },
        {
            title: "Semantic Article with Rich Content",
            type: "coding",
            description: "Creating a semantic article layout with various HTML5 elements",
            task: "Create an article page with header, sections, aside, and footer. Include a figure with image, blockquote, and details/summary elements.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Blog Article</title>
    <style>
        body {
            max-width: 800px;
            margin: 0 auto;
            padding: 1rem;
            line-height: 1.6;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        figure {
            margin: 2rem 0;
        }
        blockquote {
            border-left: 4px solid #ccc;
            margin: 1.5rem 0;
            padding-left: 1rem;
        }
        aside {
            background: #f8f9fa;
            padding: 1rem;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <!-- Add your article here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Blog Article</title>
    <style>
        body {
            max-width: 800px;
            margin: 0 auto;
            padding: 1rem;
            line-height: 1.6;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        figure {
            margin: 2rem 0;
        }
        blockquote {
            border-left: 4px solid #ccc;
            margin: 1.5rem 0;
            padding-left: 1rem;
        }
        aside {
            background: #f8f9fa;
            padding: 1rem;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <article>
        <header>
            <h1>The Future of Web Development</h1>
            <div class="metadata">
                <time datetime="2025-09-28">September 28, 2025</time>
                <address>By <a href="#author">John Smith</a></address>
            </div>
        </header>

        <section>
            <h2>Introduction</h2>
            <p>Web development continues to evolve at a rapid pace...</p>
            
            <figure>
                <img src="https://picsum.photos/800/400" alt="Modern web development illustration">
                <figcaption>The modern web development landscape</figcaption>
            </figure>
            
            <blockquote cite="https://example.com">
                <p>"The only constant in web development is change itself."</p>
                <footer>— <cite>Jane Doe, Web Standards Committee</cite></footer>
            </blockquote>
        </section>

        <aside>
            <h3>Quick Facts</h3>
            <details>
                <summary>Web Development Statistics</summary>
                <ul>
                    <li>75% of developers use JavaScript</li>
                    <li>React remains the most popular framework</li>
                    <li>WebAssembly adoption growing by 34%</li>
                </ul>
            </details>
            <details>
                <summary>Future Trends</summary>
                <ul>
                    <li>AI-driven development</li>
                    <li>No-code platforms</li>
                    <li>Web3 integration</li>
                </ul>
            </details>
        </aside>

        <section>
            <h2>Looking Ahead</h2>
            <p>As we look to the future of web development...</p>
        </section>

        <footer>
            <p>Tags: 
                <a href="#web" rel="tag">Web Development</a>,
                <a href="#tech" rel="tag">Technology</a>,
                <a href="#future" rel="tag">Future Trends</a>
            </p>
            <small>&copy; 2025 Tech Blog. All rights reserved.</small>
        </footer>
    </article>
</body>
</html>`,
            hints: [
                "Use semantic elements like article, section, aside",
                "Include metadata with time and address elements",
                "Use figure and figcaption for images",
                "Implement details/summary for expandable content"
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
            case 0: // Gallery exercise
                const hasFigures = (userClean.match(/<figure[^>]*>.*?<\/figure>/gs) || []).length >= 3;
                const hasPictures = (userClean.match(/<picture[^>]*>.*?<\/picture>/gs) || []).length >= 3;
                const hasResponsiveSources = (userClean.match(/<source[^>]*media=/g) || []).length >= 3;
                const hasFigcaptions = (userClean.match(/<figcaption[^>]*>.*?<\/figcaption>/gs) || []).length >= 3;
                const hasAltText = (userClean.match(/alt=["'][^"']*["']/g) || []).length >= 3;
                
                correct = hasFigures && hasPictures && hasResponsiveSources && hasFigcaptions && hasAltText;
                break;

            case 1: // Form exercise
                const hasForm = /<form[^>]*novalidate[^>]*>.*<\/form>/is.test(userClean);
                const hasUsernamePattern = /pattern=["'](\^)?[a-za-z0-9]{5,15}(\$)?["']/i.test(userClean);
                const hasPasswordPattern = /pattern=["'].*[A-Z].*[0-9].*["']/i.test(userClean) || 
                                        /pattern=["'].*[0-9].*[A-Z].*["']/i.test(userClean);
                const hasPhonePattern = /pattern=["'][0-9]{3}-[0-9]{3}-[0-9]{4}["']/i.test(userClean);
                const hasRequiredFields = (userClean.match(/required/g) || []).length >= 3;
                const hasErrorDivs = (userClean.match(/class=["']error["']/g) || []).length >= 3;
                
                correct = hasForm && hasUsernamePattern && hasPasswordPattern && 
                         hasPhonePattern && hasRequiredFields && hasErrorDivs;
                break;

            case 2: // Table exercise
                const hasAccessibleTable = /<table[^>]*role=["']grid["'][^>]*>/i.test(userClean);
                const hasCaption = /<caption[^>]*>.*?<\/caption>/i.test(userClean);
                const hasColumnHeaders = (userClean.match(/scope=["']col["']/g) || []).length >= 4;
                const hasHeadersAttr = (userClean.match(/headers=["'][^"']*["']/g) || []).length >= 3;
                const hasDataLabels = (userClean.match(/data-label=["'][^"']*["']/g) || []).length >= 3;
                const hasAriaLabel = /aria-label=["'][^"']*["']/i.test(userClean);
                
                correct = hasAccessibleTable && hasCaption && hasColumnHeaders && 
                         hasHeadersAttr && hasDataLabels && hasAriaLabel;
                break;

            case 3: // Article exercise
                const hasArticleStructure = /<article[^>]*>.*<\/article>/is.test(userClean);
                const hasBlockquote = /<blockquote[^>]*>.*<cite>.*<\/cite>.*<\/blockquote>/is.test(userClean);
                const hasDetails = /<details[^>]*>.*<summary>.*<\/summary>.*<\/details>/is.test(userClean);
                const hasFigure = /<figure[^>]*>.*<figcaption>.*<\/figcaption>.*<\/figure>/is.test(userClean);
                const hasAside = /<aside[^>]*>.*<\/aside>/is.test(userClean);
                const hasTime = /<time[^>]*datetime=["'][^"']*["'][^>]*>.*<\/time>/i.test(userClean);
                
                correct = hasArticleStructure && hasBlockquote && hasDetails && 
                         hasFigure && hasAside && hasTime;
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
        <div className="min-h-screen bg-white pt-16">
            {/* Congratulations Celebration */}
            {showCongrats && (
                <>
                    <Confetti duration={3000} />
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 pointer-events-none" />
                    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-emerald-600 mb-4">🎉 Congratulations! 🎉</h1>
                            <p className="text-3xl text-gray-800">You've completed this exercise!</p>
                            {currentExercise < exercises.length - 1 && (
                                <p className="text-xl text-gray-600 mt-4">Moving to next exercise...</p>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Exercise Locked Modal */}
            {lockedExerciseIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-xl border border-orange-500 max-w-sm">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-orange-600 mb-2">🔒 Exercise Locked</h3>
                            <p className="text-gray-700 mb-4">This exercise has already been completed!</p>
                            <p className="text-gray-600 text-sm mb-4">
                                You can reset your progress in the Settings page to retry this exercise.
                            </p>
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

            <div className="container mx-auto px-4 py-4 max-w-4xl">
                <div className="bg-gray-100 rounded-lg shadow-lg p-4 mb-4">
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">HTML Advanced Exercises</h1>
                    
                    {/* Exercise Navigation */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {exercises.map((ex, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1.5 rounded-lg text-sm ${
                                    !canAccessExercise(index)
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : currentExercise === index
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                        : exerciseStatus[index]
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                }`}
                                onClick={() => {
                                    if (!canAccessExercise(index)) {
                                        setLockedExerciseIndex(index);
                                        return;
                                    }
                                    setCurrentExercise(index);
                                }}
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
                        <h2 className="text-lg font-bold text-emerald-400 mb-1">{exercises[currentExercise].title}</h2>
                        <p className="text-slate-300 mb-3 text-sm">{exercises[currentExercise].description}</p>
                        
                        <div>
                            <div className="bg-slate-800/50 rounded p-4 mb-4 border border-slate-700/50">
                                <h3 className="text-lg font-semibold text-emerald-300 mb-2">Your Task:</h3>
                                <p className="text-slate-300">{exercises[currentExercise].task}</p>
                            </div>
                            
                            {/* Hints */}
                            <div className="mb-4">
                                <button 
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
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
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                                <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                    <LiveHtmlEditor 
                                        initialCode={exercises[currentExercise].initialCode}
                                        onChange={setUserCode}
                                    />
                                </div>
                            </div>

                            {/* Submit and Solution Buttons */}
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={handleCodeSubmit}
                                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer text-sm font-medium"
                                >
                                    Submit Code
                                </button>

                                <button 
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
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
