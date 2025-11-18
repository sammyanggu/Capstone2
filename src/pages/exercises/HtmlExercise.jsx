import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';
import { saveExerciseProgress, getExerciseProgress } from '../../utils/progressTracker';

// HTML Exercise component that handles different difficulty levels
function HtmlExercise() {
  const { level } = useParams();
  const { currentUser } = useAuth();
  const [userCode, setUserCode] = useState(null);
  
  // Exercise content for different levels
  const exercises = {
    beginner: {
      instructions: "Create a simple HTML page with a heading and a paragraph",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <!-- Add your code here -->
  
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to HTML</h1>
  <p>This is my first HTML page!</p>
</body>
</html>`,
      hints: [
        "Use <h1> for the main heading",
        "Use <p> for the paragraph text"
      ]
    },
    intermediate: {
      instructions: "Create an HTML form with text input and submit button",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>HTML Form Exercise</title>
</head>
<body>
  <!-- Create your form here -->
  
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>HTML Form Exercise</title>
</head>
<body>
  <form action="/submit" method="POST">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
      hints: [
        "Use the <form> element to create a form",
        "Add <input> elements for user data",
        "Don't forget to add a submit button"
      ]
    },
    advanced: {
      instructions: "Create a semantic HTML structure with header, nav, main, and footer",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Semantic HTML Exercise</title>
</head>
<body>
  <!-- Create a semantic structure -->
  
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Semantic HTML Exercise</title>
</head>
<body>
  <header>
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <h2>Welcome</h2>
      <p>This is the main content of the page.</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`,
      hints: [
        "Use semantic elements like <header>, <nav>, <main>, and <footer>",
        "Include proper navigation structure",
        "Use <article> for main content"
      ]
    }
  };

  // Get the exercise content for the current level
  const exercise = exercises[level] || exercises.beginner;

  // Load saved progress when component mounts
  useEffect(() => {
    const loadProgress = async () => {
      if (currentUser && level) {
        const progress = await getExerciseProgress(currentUser.uid, 'html', level);
        if (progress && progress.code) {
          setUserCode(progress.code);
        }
      }
    };
    loadProgress();
  }, [currentUser, level]);

  // Handle code change and save to database
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    // Auto-save to database
    if (currentUser) {
      saveExerciseProgress(currentUser.uid, 'html', level, newCode, false, 0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">HTML Exercise - {level.charAt(0).toUpperCase() + level.slice(1)} Level</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
        <p className="mb-4">{exercise.instructions}</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Hints:</h3>
          <ul className="list-disc list-inside">
            {exercise.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      </div>
      <LiveHtmlEditor
        initialCode={userCode !== null ? userCode : exercise.initialCode}
        onChange={handleCodeChange}
        solution={exercise.solution}
      />
    </div>
  );
}

export default HtmlExercise;
