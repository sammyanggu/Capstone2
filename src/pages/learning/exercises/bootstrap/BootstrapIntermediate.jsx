import React, { useState, useEffect, useRef } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import CodeFeedback from '../../../../components/CodeFeedback';
import { useAuth } from '../../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex, saveExerciseProgress, getExerciseProgress } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';

export default function BootstrapIntermediate() {
    const { currentUser } = useAuth();
    const [currentExercise, setCurrentExercise] = useState(0);
    const [exerciseStatus, setExerciseStatus] = useState({
        0: false,
        1: false,
        2: false,
        3: false
    });
    const [userCode, setUserCode] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
    const isInitialLoadRef = useRef(true);

    useEffect(() => {
        const loadExerciseIndex = async () => {
            if (currentUser?.uid) {
                try {
                    // Load completion status for each exercise
                    const newStatus = { ...exerciseStatus };
                    for (let i = 0; i < 4; i++) {
                        const progress = await getExerciseProgress(currentUser.uid, 'bootstrap', `intermediate-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);
                    console.log('Loaded Bootstrap intermediate exercise statuses:', newStatus);
                    
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'bootstrap', 'intermediate');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                    } else {
                        setCurrentExercise(0);
                    }
                } catch (err) {
                    console.error('Error loading Bootstrap intermediate exercise index:', err);
                } finally {
                    isInitialLoadRef.current = false;
                }
            }
        };
        loadExerciseIndex();
    }, [currentUser]);

    useEffect(() => {
        const saveIndex = async () => {
            if (currentUser?.uid && !isInitialLoadRef.current) {
                try {
                    await saveCurrentExerciseIndex(currentUser.uid, 'bootstrap', 'intermediate', currentExercise);
                } catch (err) {
                    console.error('Error saving current exercise index:', err);
                }
            }
        };
        saveIndex();
    }, [currentExercise, currentUser]);

    // Reset userCode when exercise changes
    useEffect(() => {
        setUserCode('');
    }, [currentExercise]);

    const exercises = [
        {
            title: "Bootstrap Responsive Grid System",
            description: "Master Bootstrap's advanced grid capabilities",
            task: "Create a responsive 12-column grid layout that displays 4 columns on desktop, 2 on tablets, and 1 on mobile using col-md and col-lg classes.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Grid</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container-fluid py-5">
        <h1 class="text-center mb-5">Advanced Grid System</h1>
        <!-- Add your responsive grid here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Grid</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container-fluid py-5">
        <h1 class="text-center mb-5">Advanced Grid System</h1>
        <div class="row g-4">
            <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Card 1</h5>
                        <p class="card-text">Content for card 1</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Card 2</h5>
                        <p class="card-text">Content for card 2</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Card 3</h5>
                        <p class="card-text">Content for card 3</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Card 4</h5>
                        <p class="card-text">Content for card 4</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use col-12 for full width on mobile",
                "Use col-sm-6 for 2 columns on tablets",
                "Use col-md-6 or col-lg-3 for different breakpoints",
                "Use g-4 for gap/gutter between columns"
            ]
        },
        {
            title: "Bootstrap Dropdown Menu",
            description: "Create interactive dropdown menus with Bootstrap",
            task: "Build a navbar with a dropdown menu that shows submenu items when clicked or hovered.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Dropdown</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Menu</a>
            <!-- Add your dropdown menu here -->
        </div>
    </nav>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Dropdown</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Menu</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Item 1</a></li>
                            <li><a class="dropdown-item" href="#">Item 2</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Item 3</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</body>
</html>`,
            hints: [
                "Use dropdown class with dropdown-toggle",
                "Use dropdown-menu for submenu items",
                "Use dropdown-divider for separators",
                "Require bootstrap.bundle.min.js for dropdown functionality"
            ]
        },
        {
            title: "Bootstrap Form Validation",
            description: "Implement form validation with Bootstrap classes",
            task: "Create a form with validation using Bootstrap's is-valid and is-invalid classes with feedback messages.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Form Validation</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-4">Form Validation</h1>
        <form>
            <!-- Add validated form fields here -->
        </form>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Form Validation</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-4">Form Validation</h1>
        <form>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control is-valid" placeholder="Enter username">
                <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control is-invalid" placeholder="Enter email">
                <div class="invalid-feedback">Email is invalid!</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control is-valid" placeholder="Enter password">
                <div class="valid-feedback">Password accepted!</div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>
</html>`,
            hints: [
                "Use is-valid class for valid inputs with green border",
                "Use is-invalid class for invalid inputs with red border",
                "Add valid-feedback div for success messages",
                "Add invalid-feedback div for error messages"
            ]
        },
        {
            title: "Bootstrap Modal with Transitions",
            description: "Create animated modals with backdrop and animations",
            task: "Build a modal dialog with header, body, footer, and animations that opens/closes with fade effect.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Modal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body class="p-5">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Open Modal
    </button>
    <!-- Add your modal here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Modal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body class="p-5">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Open Modal
    </button>
    
    <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal Title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>This is the modal content area.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use modal fade for fade animation",
                "Use modal-header, modal-body, modal-footer",
                "Use data-bs-toggle and data-bs-target to trigger modal",
                "Use btn-close for close button in header"
            ]
        }
    ];

    const handleCodeSubmit = () => {
        const cleanCode = (code) => {
            return code.toLowerCase()
                      .replace(/[\n\t\r]/g, '')
                      .replace(/\s+/g, ' ')
                      .trim();
        };

        const userClean = cleanCode(userCode);
        let correct = false;

        switch(currentExercise) {
            case 0: // Responsive Grid
                const hasColClasses = /col-[a-z]*-[0-9]/i.test(userClean);
                const hasResponsive = /col-lg|col-md|col-sm/i.test(userClean);
                const hasGap = /g-[0-9]/i.test(userClean);
                correct = hasColClasses && hasResponsive && hasGap;
                break;

            case 1: // Dropdown
                const hasDropdown = /dropdown/i.test(userClean);
                const hasDropdownMenu = /dropdown-menu/i.test(userClean);
                const hasToggle = /dropdown-toggle|data-bs-toggle/i.test(userClean);
                correct = hasDropdown && hasDropdownMenu && hasToggle;
                break;

            case 2: // Form Validation
                const hasIsValid = /is-valid|is-invalid/i.test(userClean);
                const hasFeedback = /valid-feedback|invalid-feedback/i.test(userClean);
                const hasFormControl = /form-control|form-label/i.test(userClean);
                correct = hasIsValid && hasFeedback && hasFormControl;
                break;

            case 3: // Modal
                const hasModal = /modal["\s]/i.test(userClean);
                const hasModalFade = /modal fade/i.test(userClean);
                const hasModalBody = /modal-body|modal-header|modal-footer/i.test(userClean);
                correct = hasModal && hasModalFade && hasModalBody;
                break;
        }

        if (correct) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
            setShowCongrats(true);
            setTimeout(async () => {
                setShowCongrats(false);
                
                // Save exercise completion to Firebase with unique levelKey
                if (currentUser?.uid) {
                    try {
                        const levelKey = `intermediate-${currentExercise}`;
                        await saveExerciseProgress(currentUser.uid, 'bootstrap', levelKey, userCode, true, 10);
                        console.log(`✅ Saved Bootstrap exercise ${levelKey} completion`);
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
                            await saveCurrentExerciseIndex(currentUser.uid, 'bootstrap', 'intermediate', nextIndex);
                            console.log(`✅ Saved Bootstrap intermediate index: ${nextIndex}`);
                        } catch (err) {
                            console.error('Error saving new index:', err);
                        }
                    }
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
            {showCongrats && (
                <>
                    <Confetti duration={3000} />
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 pointer-events-none" />
                    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
                        <div className="text-center px-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-600 mb-2 sm:mb-4">🎉 Congratulations! 🎉</h1>
                            <p className="text-lg sm:text-2xl md:text-3xl text-white">You've completed this exercise!</p>
                            {currentExercise < exercises.length - 1 && (
                                <p className="text-sm sm:text-base md:text-lg text-white mt-2 sm:mt-4">Moving to next exercise...</p>
                            )}
                        </div>
                    </div>
                </>
            )}

            {lockedExerciseIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-xl border border-orange-500 max-w-sm">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-orange-600 mb-2">🔒 Exercise Locked</h3>
                            <p className="text-gray-700 mb-4">Complete the previous exercise first to unlock this one.</p>
                            <button
                                onClick={() => setLockedExerciseIndex(null)}
                                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">Bootstrap Intermediate Exercises</h1>
                    
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {exercises.map((ex, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1.5 rounded-lg text-sm ${
                                    !canAccessExercise(index)
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : currentExercise === index
                                        ? 'bg-emerald-500 text-white'
                                        : exerciseStatus[index]
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-300 text-gray-700'
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
                                {exerciseStatus[index] && <span className="ml-1">✓</span>}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                        <h2 className="text-lg font-bold text-emerald-600 mb-1">{exercises[currentExercise].title}</h2>
                        <p className="text-gray-700 mb-3 text-sm">{exercises[currentExercise].description}</p>
                        
                        <div>
                            <div className="bg-white rounded p-4 mb-4 border border-gray-300">
                                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Your Task:</h3>
                                <p className="text-gray-700">{exercises[currentExercise].task}</p>
                            </div>
                            
                            <div className="mb-4">
                                <button 
                                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-2"
                                    onClick={() => document.getElementById('hints').classList.toggle('hidden')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    Show Hints
                                </button>
                                <div id="hints" className="hidden mt-2 bg-white rounded p-4 border border-gray-300">
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {exercises[currentExercise].hints?.map((hint, index) => (
                                            <li key={index} className="text-sm">{hint}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                    <LiveHtmlEditor 
                                        initialCode={exercises[currentExercise].initialCode}
                                        onChange={setUserCode}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <CodeFeedback 
                                        code={userCode}
                                        language="html"
                                        task={exercises[currentExercise].task}
                                        exerciseId={`bootstrap-intermediate-${currentExercise}`}
                                        level="intermediate"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={handleCodeSubmit}
                                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer text-sm font-medium"
                                >
                                    Submit Code
                                </button>

                                <button 
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2 px-4 py-1.5 border border-emerald-400 rounded bg-white"
                                    onClick={() => document.getElementById('solution').classList.toggle('hidden')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Show Solution
                                </button>
                            </div>

                            {showError && (
                                <div className="mt-4 bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded animate-shake">
                                    <p>Not quite right! Check the requirements and try again.</p>
                                </div>
                            )}

                            <div id="solution" className="hidden mt-4 bg-white rounded p-4 border border-gray-300">
                                <pre className="text-gray-800 text-sm overflow-x-auto">
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
