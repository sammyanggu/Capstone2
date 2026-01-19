import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../AuthContext';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';
import { saveExerciseProgress, getExerciseProgress, completeExercise, saveCurrentExerciseIndex } from '../../utils/progressTracker';
import { toast } from 'react-toastify';

// HTML Exercise component that handles different difficulty levels
function HtmlExercise() {
  const { level } = useParams();
  const { currentUser } = useAuth();
  const [userCode, setUserCode] = useState(null);
  const saveTimeoutRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
  
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
      console.log('HtmlExercise - currentUser:', currentUser?.uid, 'level:', level);
      if (currentUser?.uid && level) {
        try {
          const progress = await getExerciseProgress(currentUser.uid, 'html', level);
          console.log('✓ Loaded HTML progress:', progress);
          if (progress && progress.code) {
            console.log('Setting code from saved progress');
            setUserCode(progress.code);
          } else {
            console.log('No saved progress, using initial code');
            setUserCode(exercise.initialCode);
          }
        } catch (error) {
          console.error('✗ Error loading HTML progress:', error);
          setUserCode(exercise.initialCode);
        }
      }
    };
    loadProgress();
  }, [currentUser?.uid, level, exercise.initialCode]);

  // Flush any pending autosave when component unmounts to avoid losing changes
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        // Try to immediately save the latest code if user is signed in
        if (currentUser && userCode != null) {
          console.log('Flushing autosave before unmount for user:', currentUser.uid);
          saveExerciseProgress(currentUser.uid, 'html', level, userCode, false, 0)
            .then((success) => {
              if (success) console.log('Autosave flush: saved successfully on unmount');
              else console.warn('Autosave flush: failed to save on unmount');
            })
            .catch((err) => console.error('Autosave flush error:', err));
        }
      }
    };
  }, [currentUser, level, userCode]);

  // Handle code change and save to database with debouncing
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout for auto-save (debounce for 1 second)
    saveTimeoutRef.current = setTimeout(() => {
      if (currentUser) {
        console.log('Saving progress for user:', currentUser.uid);
        setIsSaving(true);
        saveExerciseProgress(currentUser.uid, 'html', level, newCode, false, 0)
          .then((success) => {
            if (success) {
              console.log('✓ Progress saved successfully');
            } else {
              console.error('✗ Failed to save progress');
              toast.error('Failed to save progress');
            }
            setIsSaving(false);
          })
          .catch((error) => {
            console.error('✗ Error saving progress:', error);
            toast.error('Error saving progress');
            setIsSaving(false);
          });
      } else {
        console.warn('No user logged in, cannot save progress');
      }
    }, 1000);
  };

  // Handle exercise submission
  const handleSubmit = async (code) => {
    console.log('🔵 handleSubmit called with code length:', code?.length, 'currentUser:', currentUser?.uid);
    
    if (!currentUser) {
      console.warn('❌ No user logged in');
      toast.error('Please sign in to submit');
      return;
    }

    if (!code || code.trim().length === 0) {
      console.warn('⚠️ Code is empty');
      toast.error('Please write some code before submitting');
      return;
    }

    try {
      console.log('💾 Submitting HTML exercise...');
      // Save final code and mark as completed
      await saveExerciseProgress(currentUser.uid, 'html', level, code, true, 10);
      await completeExercise(currentUser.uid, 'html', level, 10);
      console.log('✅ Exercise submitted successfully');
      toast.success('Exercise completed! 🎉');
    } catch (error) {
      console.error('❌ Error submitting exercise:', error);
      toast.error('Error submitting exercise');
    }
  };

  // Track current exercise index for resume functionality
  useEffect(() => {
    const trackIndex = async () => {
      if (currentUser?.uid && level) {
        try {
          // Save that the user is on this exercise type/level (index 0 for single-exercise pages)
          await saveCurrentExerciseIndex(currentUser.uid, 'html', level, 0);
        } catch (err) {
          console.warn('Could not save exercise index:', err);
        }
      }
    };
    trackIndex();
  }, [currentUser?.uid, level]);

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

      {/* Submit Code button - explicit save/complete action */}
      <div className="mt-4">
        <button
          onClick={() => {
            console.log('🔴 Submit Code button clicked, userCode state:', userCode?.substring(0, 100));
            handleSubmit(userCode);
          }}
          className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer text-sm font-medium"
        >
          Submit Code
        </button>
      </div>
    </div>
  );
}

export default HtmlExercise;
