import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock quiz data - replace with API call
  const mockQuizzes = [
    {
      id: 'html-basics',
      title: 'HTML Basics Quiz',
      description: 'Test your knowledge of HTML fundamentals',
      difficulty: 'Beginner',
      questions: [
        {
          id: 1,
          question: 'What does HTML stand for?',
          options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Home Tool Markup Language',
            'Hyperlinks and Text Markup Language'
          ],
          correctAnswer: 0,
          explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for web pages.'
        },
        {
          id: 2,
          question: 'Which tag is used for the largest heading?',
          options: ['<h6>', '<h1>', '<heading>', '<head>'],
          correctAnswer: 1,
          explanation: 'The <h1> tag is used for the largest heading, while <h6> is for the smallest.'
        },
        {
          id: 3,
          question: 'What is the correct syntax for a hyperlink?',
          options: ['<a href="url">Link</a>', '<link url>Link</link>', '<a url="url">Link</a>', '<url="link">Link</url>'],
          correctAnswer: 0,
          explanation: 'The correct syntax for a hyperlink is <a href="url">Link</a>.'
        },
        {
          id: 4,
          question: 'Which tag is used to insert an image?',
          options: ['<image>', '<img />', '<picture>', '<image src="">'],
          correctAnswer: 1,
          explanation: 'The <img /> tag is used to insert images in HTML. It is a self-closing tag.'
        },
        {
          id: 5,
          question: 'What is the purpose of the <meta> tag?',
          options: [
            'To define metadata about the HTML document',
            'To create a menu',
            'To define a variable',
            'To link external files'
          ],
          correctAnswer: 0,
          explanation: 'The <meta> tag is used to specify metadata about an HTML document, such as character set and viewport.'
        }
      ]
    },
    {
      id: 'css-selectors',
      title: 'CSS Selectors Quiz',
      description: 'Master CSS selectors and styling',
      difficulty: 'Intermediate',
      questions: [
        {
          id: 1,
          question: 'Which CSS selector selects all elements with a specific class?',
          options: ['#classname', '.classname', '*classname', ':classname'],
          correctAnswer: 1,
          explanation: 'The . (dot) selector is used to select elements with a specific class.'
        },
        {
          id: 2,
          question: 'What does the * selector do?',
          options: [
            'Selects the first element',
            'Selects all elements',
            'Selects elements with a specific ID',
            'Selects child elements'
          ],
          correctAnswer: 1,
          explanation: 'The * selector selects all elements on the page.'
        },
        {
          id: 3,
          question: 'Which property is used to change the text color?',
          options: ['text-color', 'font-color', 'color', 'text-style'],
          correctAnswer: 2,
          explanation: 'The color property is used to change the text color in CSS.'
        },
        {
          id: 4,
          question: 'How do you add a background color to an element?',
          options: ['background-color', 'bg-color', 'back-color', 'color-bg'],
          correctAnswer: 0,
          explanation: 'The background-color property is used to set the background color of an element.'
        },
        {
          id: 5,
          question: 'What is the purpose of the box-shadow property?',
          options: [
            'To add shadow effects to boxes',
            'To change box border color',
            'To hide box content',
            'To increase box size'
          ],
          correctAnswer: 0,
          explanation: 'The box-shadow property is used to add shadow effects around an element\'s frame.'
        }
      ]
    },
    {
      id: 'js-basics',
      title: 'JavaScript Basics Quiz',
      description: 'Understand JavaScript fundamentals',
      difficulty: 'Beginner',
      questions: [
        {
          id: 1,
          question: 'What is JavaScript primarily used for?',
          options: [
            'Styling web pages',
            'Making web pages interactive',
            'Managing databases',
            'Creating server backends'
          ],
          correctAnswer: 1,
          explanation: 'JavaScript is primarily used to make web pages interactive on the client side.'
        },
        {
          id: 2,
          question: 'How do you declare a variable in JavaScript?',
          options: ['var x = 5;', 'declare x = 5;', 'variable x = 5;', 'x := 5;'],
          correctAnswer: 0,
          explanation: 'Variables in JavaScript are declared using var, let, or const keywords.'
        },
        {
          id: 3,
          question: 'What is the correct way to write a function?',
          options: [
            'function myFunc() {}',
            'function = myFunc() {}',
            'myFunc function() {}',
            'func myFunc() {}'
          ],
          correctAnswer: 0,
          explanation: 'The correct syntax for a function declaration is function myFunc() {}.'
        },
        {
          id: 4,
          question: 'What does the DOM stand for?',
          options: [
            'Document Object Model',
            'Data Object Management',
            'Digital Output Module',
            'Document Orientation Model'
          ],
          correctAnswer: 0,
          explanation: 'DOM stands for Document Object Model, which represents the structure of a web page.'
        },
        {
          id: 5,
          question: 'How do you add an event listener in JavaScript?',
          options: [
            'element.addEventListener("click", function)',
            'element.addEvent("click", function)',
            'element.onEvent("click", function)',
            'element.listenEvent("click", function)'
          ],
          correctAnswer: 0,
          explanation: 'The addEventListener method is used to attach event listeners to elements in JavaScript.'
        }
      ]
    }
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Fetch quizzes from API or use mock data as fallback
    fetchQuizzes();

    return () => unsubscribe();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/quizzes.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setQuizzes(Array.isArray(data) ? data : (data.quizzes || mockQuizzes));
      } else {
        // Fallback to mock data
        setQuizzes(mockQuizzes);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      // Fallback to mock data on error
      setQuizzes(mockQuizzes);
    }
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (userAnswers[currentQuestion] === null) {
      toast.warning('Please select an answer before proceeding');
      return;
    }

    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = async () => {
    let finalScore = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        finalScore += 20; // 5 questions = 100 points
      }
    });
    setScore(finalScore);
    setQuizCompleted(true);

    // Save quiz result to database
    if (currentUser) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/quiz-results.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            user_id: currentUser.uid,
            user_email: currentUser.email,
            quiz_id: selectedQuiz.id,
            quiz_title: selectedQuiz.title,
            score: finalScore,
            total_questions: selectedQuiz.questions.length,
            answers: userAnswers,
            completed_at: new Date().toISOString()
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Quiz result saved:', result);
          toast.success('Quiz completed! Score saved to your profile');
        } else {
          console.error('Failed to save quiz result');
          toast.info('Quiz completed! (Score saved locally)');
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
        toast.info('Quiz completed! (Could not save to server)');
      }
    }
  };

  const restartQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
  };

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
        {/* Soft gradient glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>
        <div className="relative z-10 text-white text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg">Loading quizzes...</p>
        </div>
        <style>{`
          @keyframes floatGlow {
            from { transform: translate(-200px, -150px); }
            to   { transform: translate(200px, 150px); }
          }
        `}</style>
      </div>
    );
  }

  // Quiz not started - Show quiz selection
  if (!selectedQuiz) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
        {/* Soft gradient glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              📝 Quizzes
            </h1>
            <p className="text-gray-400 text-lg">
              Test your knowledge and earn points
            </p>
          </div>

          {/* Quiz Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    quiz.difficulty === 'Beginner'
                      ? 'bg-green-100 text-green-700'
                      : quiz.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{quiz.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>📚 {quiz.questions.length} Questions</span>
                  <span>⏱️ ~10 min</span>
                </div>

                <button
                  onClick={() => startQuiz(quiz)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
          </div>
        </div>

        <style>{`
          @keyframes floatGlow {
            from { transform: translate(-200px, -150px); }
            to   { transform: translate(200px, 150px); }
          }
        `}</style>
      </div>
    );
  }

  // Quiz completed - Show results
  if (quizCompleted) {
    const correctCount = userAnswers.filter(
      (answer, index) => answer === selectedQuiz.questions[index].correctAnswer
    ).length;
    const percentage = (score / 100) * 100;

    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
        {/* Soft gradient glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '💪'} Quiz Completed!
              </h1>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  {score}/100
                </div>
                <p className="text-2xl text-gray-700 mb-4">{correctCount} out of {selectedQuiz.questions.length} correct</p>
                <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Performance Message */}
              <div className="text-center mb-8">
                {percentage >= 80 && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                    <p className="text-green-700 font-semibold">Excellent work! Keep it up! 🌟</p>
                  </div>
                )}
                {percentage >= 60 && percentage < 80 && (
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
                    <p className="text-yellow-700 font-semibold">Good job! Review the weak areas to improve. 📚</p>
                  </div>
                )}
                {percentage < 60 && (
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
                    <p className="text-orange-700 font-semibold">Keep practicing! You'll improve soon. 💪</p>
                  </div>
                )}
              </div>

              {/* Review Button */}
              <div className="space-y-4">
                <button
                  onClick={() => setCurrentQuestion(0) || setQuizCompleted(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all"
                >
                  📖 Review Answers
                </button>
                <button
                  onClick={restartQuiz}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                >
                  🔄 Take Another Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes floatGlow {
            from { transform: translate(-200px, -150px); }
            to   { transform: translate(200px, 150px); }
          }
        `}</style>
      </div>
    );
  }

  // Quiz in progress
  const question = selectedQuiz.questions[currentQuestion];
  const selectedAnswer = userAnswers[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
      {/* Soft gradient glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
          left: '-100px',
          top: '-100px',
          animation: 'floatGlow 12s infinite alternate ease-in-out'
        }}></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedQuiz.title}</h2>
              <button
                onClick={restartQuiz}
                className="text-gray-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Question {currentQuestion + 1} of {selectedQuiz.questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="bg-white rounded-lg p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">{question.question}</h3>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all duration-200 border-2 ${
                    selectedAnswer === index
                      ? 'border-emerald-500 bg-emerald-100 text-gray-800'
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index ? 'border-emerald-500 bg-emerald-500' : 'border-gray-400'
                    }`}>
                      {selectedAnswer === index && <span className="text-white text-sm">✓</span>}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold rounded-lg transition-all"
              >
                ← Previous
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
              >
                {currentQuestion === selectedQuiz.questions.length - 1 ? 'Submit Quiz →' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatGlow {
          from { transform: translate(-200px, -150px); }
          to   { transform: translate(200px, 150px); }
        }
      `}</style>
    </div>
  );
};

export default Quiz;
