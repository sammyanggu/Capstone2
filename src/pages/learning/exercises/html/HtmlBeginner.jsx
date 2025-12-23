import React, { useState, useEffect } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import { toast } from 'react-toastify';

export default function HtmlBeginner() {
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
    
    // Save progress to localStorage
    useEffect(() => {
        const savedStatus = localStorage.getItem('htmlExerciseStatus');
        if (savedStatus) {
            setExerciseStatus(JSON.parse(savedStatus));
        }
    }, []);

    // Load saved progress from Firebase for signed-in users
    useEffect(() => {
        const loadFirebaseProgress = async () => {
            if (!currentUser?.uid) return;
            try {
                const newStatus = { ...exerciseStatus };
                for (let i = 0; i < exercises.length; i++) {
                    const levelKey = `beginner-${i}`;
                    const progress = await getExerciseProgress(currentUser.uid, 'html', levelKey);
                    if (progress && progress.isCompleted) {
                        newStatus[i] = true;
                    }
                    // If coding exercise and saved code exists, prefill
                    if (i === 3 && progress && progress.code) {
                        setUserCode(progress.code);
                    }
                }
                setExerciseStatus(newStatus);

                // Load the current exercise index
                const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'html', 'beginner');
                if (savedIndex !== null && savedIndex !== undefined) {
                    setCurrentExercise(savedIndex);
                    console.log(`✅ Resumed from exercise ${savedIndex}`);
                }
            } catch (err) {
                console.error('Error loading HTML beginner progress from Firebase:', err);
            }
        };

        loadFirebaseProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('htmlExerciseStatus', JSON.stringify(exerciseStatus));
    }, [exerciseStatus]);

    // Save current exercise index to Firebase whenever it changes
    useEffect(() => {
        const saveIndex = async () => {
            if (currentUser?.uid) {
                try {
                    await saveCurrentExerciseIndex(currentUser.uid, 'html', 'beginner', currentExercise);
                } catch (err) {
                    console.error('Error saving current exercise index:', err);
                }
            }
        };

        saveIndex();
    }, [currentExercise, currentUser]);

    const exercises = [
        {
            title: "HTML Document Type",
            description: "Understanding the basics of HTML document structure",
            type: "multiple-choice",
            question: "What is a correct HTML markup for the document type declaration?",
            options: [
                "<!DOCTYPE html>",
                "DOCTYPE html;",
                "--DOCTYPE html;"
            ],
            correctAnswer: "<!DOCTYPE html>",
            explanation: "The correct DOCTYPE declaration for HTML5 is <!DOCTYPE html>. It must be the very first line in your HTML document."
        },
        {
            title: "HTML Basic Structure",
            type: "multiple-choice",
            description: "Learn about the essential HTML elements",
            question: "Which set of tags is required in a valid HTML document?",
            options: [
                "<html>, <head>, and <body>",
                "<header> and <footer>",
                "<div> and <span>"
            ],
            correctAnswer: "<html>, <head>, and <body>",
            explanation: "Every HTML document requires the basic structure of <html>, <head>, and <body> tags."
        },
        {
            title: "HTML Headings",
            type: "multiple-choice",
            description: "Understanding HTML heading levels",
            question: "Which heading tag represents the most important heading in HTML?",
            options: [
                "<h1>",
                "<h6>",
                "<heading>"
            ],
            correctAnswer: "<h1>",
            explanation: "<h1> is the highest level heading tag and should be used for the main heading of your page."
        },
        {
            title: "Creating a Basic Web Page",
            type: "coding",
            description: "Create a simple web page with a heading and a paragraph.",
            task: "Add an <h1> heading that says 'My First Web Page' and a <p> paragraph that says 'Welcome to my website!'",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Basic Web Page</title>
</head>
<body>
    <!-- Add your code here -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Basic Web Page</title>
</head>
<body>
    <h1>My First Web Page</h1>
    <p>Welcome to my website!</p>
</body>
</html>`,
            hints: [
                "Use <h1> tags for the main heading",
                "Use <p> tags for the paragraph"
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
            // Hide congrats and move to next exercise after delay
            setTimeout(async () => {
                setShowCongrats(false);
                // Save to Firebase when signed in
                if (currentUser?.uid) {
                    try {
                        const levelKey = `beginner-${currentExercise}`;
                        const ok = await saveExerciseProgress(currentUser.uid, 'html', levelKey, '', true, 10);
                        if (ok) console.log('Saved MCQ completion to Firebase for', levelKey);
                        else console.warn('Failed to save MCQ completion to Firebase for', levelKey);
                    } catch (err) {
                        console.error('Error saving MCQ completion to Firebase:', err);
                    }
                }

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
        
        // Check for required elements
        const hasH1 = /<h1[^>]*>my\s*first\s*web\s*page<\/h1>/i.test(userClean);
        const hasP = /<p[^>]*>welcome\s*to\s*my\s*website!?<\/p>/i.test(userClean);
        const hasDocType = userClean.includes('<!doctype html>') || userClean.includes('<!DOCTYPE html>');
        const hasHtmlStructure = userClean.includes('<html') && userClean.includes('</html>');
        
        // More lenient check if the strict check fails
        const hasH1Lenient = userClean.includes('<h1') && userClean.includes('</h1') && 
                            userClean.toLowerCase().includes('first') && userClean.toLowerCase().includes('web page');
        const hasPLenient = userClean.includes('<p') && userClean.includes('</p') && 
                           userClean.toLowerCase().includes('welcome') && userClean.toLowerCase().includes('website');

        const correct = (hasH1 && hasP) || (hasH1Lenient && hasPLenient);

        if (correct) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
            setShowCongrats(true);
            setTimeout(async () => {
                setShowCongrats(false);
                // Save code completion to Firebase when signed in
                if (currentUser?.uid) {
                    try {
                        const levelKey = `beginner-${currentExercise}`;
                        const ok = await saveExerciseProgress(currentUser.uid, 'html', levelKey, userCode || '', true, 10);
                        if (ok) {
                            console.log('Saved code completion to Firebase for', levelKey);
                            toast.success('Progress saved to your account.');
                        } else {
                            console.warn('Failed to save code completion to Firebase for', levelKey);
                        }
                    } catch (err) {
                        console.error('Error saving code completion to Firebase:', err);
                        toast.error('Error saving progress to server');
                    }
                }

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
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">HTML Beginner Exercises</h1>
                    
                    {/* Exercise Navigation */}
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
                    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                        <h2 className="text-lg font-bold text-emerald-600 mb-1">{exercises[currentExercise].title}</h2>
                        <p className="text-gray-700 mb-3 text-sm">{exercises[currentExercise].description}</p>
                        
                        {exercises[currentExercise].type === 'multiple-choice' ? (
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded p-4 mb-4 border border-gray-300">
                                    <h3 className="text-lg font-semibold text-emerald-600 mb-3">
                                        {exercises[currentExercise].question}
                                    </h3>
                                    <div className="space-y-2">
                                        {exercises[currentExercise].options.map((option, index) => (
                                            <div key={index} 
                                                className={`flex items-center p-2 rounded transition-colors cursor-pointer
                                                    ${selectedAnswer === option ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                                onClick={() => {
                                                    setSelectedAnswer(option);
                                                    setShowError(false);
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    id={`option-${index}`}
                                                    name="answer"
                                                    value={option}
                                                    checked={selectedAnswer === option}
                                                    onChange={(e) => {
                                                        setSelectedAnswer(e.target.value);
                                                        setShowError(false);
                                                    }}
                                                    className="mr-3 h-4 w-4 accent-emerald-600 cursor-pointer"
                                                />
                                                <label htmlFor={`option-${index}`} className="text-gray-700 cursor-pointer flex-1">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {showError && (
                                        <div className="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                                            <p>Wrong Answer! Try again.</p>
                                        </div>
                                    )}
                                    
                                    {exerciseStatus[currentExercise] && (
                                        <div className="mt-4 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded">
                                            <p>Correct! You can now move to the next exercise.</p>
                                            <p className="mt-2 text-sm opacity-90">{exercises[currentExercise].explanation}</p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleAnswerSubmit}
                                        className={`mt-4 px-4 py-2 rounded text-sm ${
                                            selectedAnswer 
                                                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                                                : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                                        }`}
                                        disabled={!selectedAnswer}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="bg-white rounded p-4 mb-4 border border-gray-300">
                                    <h3 className="text-lg font-semibold text-emerald-600 mb-2">Your Task:</h3>
                                    <p className="text-gray-700">{exercises[currentExercise].task}</p>
                                </div>
                                
                                {/* Hints */}
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
                                
                                {/* Code Editor */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="lg:col-span-2 bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                        <div className="p-3 flex gap-2 items-center">
                                            <button
                                                className="px-3 py-1 bg-slate-600 text-white rounded text-sm"
                                                onClick={() => setUserCode('')}
                                            >
                                                Clear Demo
                                            </button>
                                        </div>
                                        <LiveHtmlEditor 
                                            initialCode={userCode || exercises[currentExercise].initialCode}
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
                                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-2"
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
                                        <p>Not quite right! Make sure you've added both the heading and paragraph.</p>
                                    </div>
                                )}

                                <div id="solution" className="hidden mt-4 bg-white rounded p-4 border border-gray-300">
                                    <pre className="text-gray-800 text-sm overflow-x-auto">
                                        <code>{exercises[currentExercise].solution}</code>
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
