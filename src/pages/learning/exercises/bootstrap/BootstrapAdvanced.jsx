import React, { useState, useEffect, useRef } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import CodeFeedback from '../../../../components/CodeFeedback';
import { useAuth } from '../../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex, saveExerciseProgress, getExerciseProgress } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';

export default function BootstrapAdvanced() {
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
                        const progress = await getExerciseProgress(currentUser.uid, 'bootstrap', `advanced-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);
                    console.log('Loaded Bootstrap advanced exercise statuses:', newStatus);
                    
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'bootstrap', 'advanced');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                    } else {
                        setCurrentExercise(0);
                    }
                } catch (err) {
                    console.error('Error loading Bootstrap advanced exercise index:', err);
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
                    await saveCurrentExerciseIndex(currentUser.uid, 'bootstrap', 'advanced', currentExercise);
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
            title: "Bootstrap Carousel Component",
            description: "Create an image carousel with navigation controls",
            task: "Build a Bootstrap carousel with previous/next buttons, indicators, and auto-play functionality.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Carousel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">Image Carousel</h1>
        <!-- Add your carousel here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Carousel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">Image Carousel</h1>
        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Slide 1">
                </div>
                <div class="carousel-item">
                    <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Slide 2">
                </div>
                <div class="carousel-item">
                    <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Slide 3">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use carousel class with id and data-bs-ride",
                "Use carousel-indicators for dot navigation",
                "Use carousel-item for each slide with active class on first",
                "Use carousel-control-prev/next for arrow buttons"
            ]
        },
        {
            title: "Bootstrap Progress Bars and Badges",
            description: "Create progress indicators and status badges",
            task: "Build a layout with multiple progress bars at different completion levels and various badge styles.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Progress & Badges</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-5">Progress Bars & Badges</h1>
        <!-- Add your progress bars and badges here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Progress & Badges</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-5">Progress Bars & Badges</h1>
        
        <div class="mb-5">
            <h3 class="mb-3">Progress Bars</h3>
            <div class="mb-3">
                <label class="mb-2">HTML Progress</label>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 25%"></div>
                </div>
            </div>
            <div class="mb-3">
                <label class="mb-2">CSS Progress</label>
                <div class="progress">
                    <div class="progress-bar bg-info" role="progressbar" style="width: 50%"></div>
                </div>
            </div>
            <div class="mb-3">
                <label class="mb-2">JavaScript Progress</label>
                <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: 75%"></div>
                </div>
            </div>
        </div>
        
        <div>
            <h3 class="mb-3">Status Badges</h3>
            <p>
                <span class="badge bg-primary">Primary</span>
                <span class="badge bg-success">Success</span>
                <span class="badge bg-danger">Danger</span>
                <span class="badge bg-warning text-dark">Warning</span>
                <span class="badge bg-info">Info</span>
            </p>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use progress class with progress-bar inside",
                "Set width with inline style for progress amount",
                "Use bg-success, bg-info, bg-warning for colors",
                "Use badge class with bg-* for different styles"
            ]
        },
        {
            title: "Bootstrap Responsive Table",
            description: "Create responsive data tables with Bootstrap styling",
            task: "Build a responsive table that scrolls horizontally on mobile and includes striped rows, hover effects, and different color themes.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Table</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-4">Responsive Table</h1>
        <!-- Add your responsive table here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Table</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-4">Responsive Table</h1>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Join Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td><span class="badge bg-success">Active</span></td>
                        <td>2023-01-15</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>jane@example.com</td>
                        <td><span class="badge bg-warning text-dark">Pending</span></td>
                        <td>2023-02-20</td>
                    </tr>
                    <tr>
                        <td>Bob Johnson</td>
                        <td>bob@example.com</td>
                        <td><span class="badge bg-danger">Inactive</span></td>
                        <td>2023-03-10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use table-responsive div to make table scrollable",
                "Use table-striped for alternating row colors",
                "Use table-hover for row highlighting on hover",
                "Use table-dark for header background"
            ]
        },
        {
            title: "Bootstrap Alert and Toast Notifications",
            description: "Create alerts and toast notifications for user feedback",
            task: "Build various alert types (success, warning, danger, info) and toast notifications with dismiss buttons.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Alerts & Toasts</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-4">Alerts & Notifications</h1>
        <!-- Add your alerts and toasts here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Alerts & Toasts</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h1 class="mb-4">Alerts & Notifications</h1>
        
        <div class="mb-4">
            <h3 class="mb-3">Alerts</h3>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Your action completed successfully.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Warning!</strong> Please review your input.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> Something went wrong.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Info:</strong> Here's some useful information.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        </div>
        
        <div>
            <h3 class="mb-3">Toast Notifications</h3>
            <div class="toast show" role="alert">
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Notification</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    This is a toast notification message.
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use alert class with alert-success, alert-warning, alert-danger",
                "Use alert-dismissible fade show for dismissible alerts",
                "Use btn-close with data-bs-dismiss for close button",
                "Use toast class for notification containers"
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
            case 0: // Carousel
                const hasCarousel = /carousel["\s]/i.test(userClean);
                const hasControls = /carousel-control|carousel-indicators/i.test(userClean);
                const hasItems = /carousel-item/i.test(userClean);
                correct = hasCarousel && hasControls && hasItems;
                break;

            case 1: // Progress & Badges
                const hasProgress = /progress["\s]/i.test(userClean);
                const hasProgressBar = /progress-bar/i.test(userClean);
                const hasBadge = /badge/i.test(userClean);
                correct = hasProgress && hasProgressBar && hasBadge;
                break;

            case 2: // Table
                const hasTable = /table["\s]/i.test(userClean);
                const hasTableResponsive = /table-responsive/i.test(userClean);
                const hasTableVariant = /table-striped|table-hover/i.test(userClean);
                correct = hasTable && hasTableResponsive && hasTableVariant;
                break;

            case 3: // Alerts & Toasts
                const hasAlert = /alert["\s]/i.test(userClean);
                const hasAlertVariant = /alert-success|alert-warning|alert-danger/i.test(userClean);
                const hasDismissible = /alert-dismissible|btn-close/i.test(userClean);
                correct = hasAlert && hasAlertVariant && hasDismissible;
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
                        const levelKey = `advanced-${currentExercise}`;
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
                            await saveCurrentExerciseIndex(currentUser.uid, 'bootstrap', 'advanced', nextIndex);
                            console.log(`✅ Saved Bootstrap advanced index: ${nextIndex}`);
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
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">Bootstrap Advanced Exercises</h1>
                    
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
                                        exerciseId={`bootstrap-advanced-${currentExercise}`}
                                        level="advanced"
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
