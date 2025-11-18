# Progress Tracking System Documentation

## Overview

The progress tracking system saves user exercise completion progress to Firebase Realtime Database, allowing users to:
- Resume exercises from where they left off
- Track completed exercises
- Accumulate points for achievements
- View progress statistics

## Database Structure

Progress data is stored in the following Firebase Realtime Database structure:

```
users/
  {userId}/
    progress/
      exercises/
        {exerciseType}/
          {level}/
            - code: string (user's code)
            - isCompleted: boolean (completion status)
            - points: number (points earned)
            - lastModified: timestamp
            - submittedAt: timestamp
    - points: number (total user points)
    - updatedAt: timestamp
```

### Example

```
users/
  abc123/
    progress/
      exercises/
        html/
          beginner/
            code: "<!DOCTYPE html>..."
            isCompleted: true
            points: 10
            lastModified: 1700000000000
            submittedAt: 1700000000000
        css/
          beginner/
            code: "body { color: red; }"
            isCompleted: false
            points: 0
            lastModified: 1700000100000
    points: 10
    updatedAt: 1700000000000
```

## API Reference

### Progress Tracker Functions

Located in: `src/utils/progressTracker.js`

#### saveExerciseProgress()

Saves or updates user's exercise progress.

```javascript
import { saveExerciseProgress } from '../utils/progressTracker';

await saveExerciseProgress(
  userId,        // string: User's Firebase UID
  exerciseType,  // string: 'html', 'css', 'javascript', 'php', 'bootstrap', 'tailwind'
  level,         // string: 'beginner', 'intermediate', 'advanced'
  code,          // string: User's code solution
  isCompleted,   // boolean: Whether exercise is completed (default: false)
  points         // number: Points to award (default: 0)
);
```

**Returns:** `boolean` - Success status

**Example:**
```javascript
const { currentUser } = useAuth();

// Auto-save while typing
const handleCodeChange = (newCode) => {
  setUserCode(newCode);
  saveExerciseProgress(currentUser.uid, 'html', 'beginner', newCode, false, 0);
};

// Save as completed when submitted
const handleSubmit = async () => {
  await saveExerciseProgress(currentUser.uid, 'html', 'beginner', userCode, true, 10);
};
```

#### getExerciseProgress()

Retrieves saved progress for a specific exercise.

```javascript
import { getExerciseProgress } from '../utils/progressTracker';

const progress = await getExerciseProgress(
  userId,        // string: User's Firebase UID
  exerciseType,  // string: Exercise type
  level          // string: Difficulty level
);
```

**Returns:** `object` - Progress data or `null` if not found

**Example:**
```javascript
useEffect(() => {
  const loadProgress = async () => {
    if (currentUser) {
      const progress = await getExerciseProgress(currentUser.uid, 'css', 'beginner');
      if (progress && progress.code) {
        setUserCode(progress.code); // Resume from saved code
      }
    }
  };
  loadProgress();
}, [currentUser]);
```

#### completeExercise()

Marks an exercise as completed and awards points.

```javascript
import { completeExercise } from '../utils/progressTracker';

await completeExercise(
  userId,        // string: User's Firebase UID
  exerciseType,  // string: Exercise type
  level,         // string: Difficulty level
  points         // number: Points to award (default: 10)
);
```

**Example:**
```javascript
const handleExerciseComplete = async () => {
  await completeExercise(currentUser.uid, 'javascript', 'intermediate', 15);
  alert('Exercise completed! +15 points');
};
```

#### getUserExerciseProgress()

Retrieves all exercise progress for a user.

```javascript
import { getUserExerciseProgress } from '../utils/progressTracker';

const allProgress = await getUserExerciseProgress(userId);
```

**Returns:** `object` - Nested object with all progress data

#### getCompletionStats()

Gets completion statistics for a user.

```javascript
import { getCompletionStats } from '../utils/progressTracker';

const stats = await getCompletionStats(userId);
// Returns: {
//   totalCompleted: 5,
//   totalPoints: 50,
//   byType: {
//     html: { completed: 2, total: 3 },
//     css: { completed: 1, total: 3 },
//     javascript: { completed: 2, total: 3 }
//   }
// }
```

#### updateUserPoints()

Directly updates user's total points (called automatically by save functions).

```javascript
import { updateUserPoints } from '../utils/progressTracker';

await updateUserPoints(userId, pointsToAdd);
```

## Integration Examples

### Example 1: HTML Exercise Component

```javascript
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';
import { saveExerciseProgress, getExerciseProgress } from '../../utils/progressTracker';

function HtmlExercise() {
  const { level } = useParams();
  const { currentUser } = useAuth();
  const [userCode, setUserCode] = useState(null);

  // Load saved progress on mount
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

  // Auto-save on code change
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    if (currentUser) {
      saveExerciseProgress(currentUser.uid, 'html', level, newCode, false, 0);
    }
  };

  return (
    <div>
      <LiveHtmlEditor
        initialCode={userCode || defaultCode}
        onChange={handleCodeChange}
      />
    </div>
  );
}

export default HtmlExercise;
```

### Example 2: CSS Exercise Component with Completion

```javascript
import { useAuth } from '../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, completeExercise } from '../../utils/progressTracker';

function CssExercise() {
  const { currentUser } = useAuth();
  const [userCode, setUserCode] = useState('');

  const handleSubmitExercise = async () => {
    // Save the code
    await saveExerciseProgress(currentUser.uid, 'css', 'beginner', userCode, false, 0);
    
    // Mark as completed if correct
    if (isCorrect(userCode)) {
      await completeExercise(currentUser.uid, 'css', 'beginner', 10);
      setShowCongrats(true);
    }
  };

  return (
    <div>
      <CodeEditor onChange={setUserCode} value={userCode} />
      <button onClick={handleSubmitExercise}>Submit Solution</button>
    </div>
  );
}
```

## Features

✅ **Auto-save Functionality**
- Code is automatically saved as user types
- No data loss if user leaves page unexpectedly

✅ **Resume Progress**
- Users can resume exercises from saved code
- Progress persists across browser sessions

✅ **Points System**
- Points awarded on completion
- Total points tracked per user
- Used for badges and achievements

✅ **Progress Tracking**
- Track which exercises are completed
- View completion statistics
- Track completion rates by exercise type

✅ **Timestamps**
- Last modified timestamp for all progress
- Submission timestamp for completed exercises
- Used for progress analytics

## Best Practices

1. **Always check for currentUser** before saving:
   ```javascript
   if (currentUser) {
     saveExerciseProgress(currentUser.uid, ...);
   }
   ```

2. **Use auto-save for user experience**:
   ```javascript
   // Save every keystroke
   const handleCodeChange = (code) => {
     setUserCode(code);
     saveExerciseProgress(...);
   };
   ```

3. **Load progress on component mount**:
   ```javascript
   useEffect(() => {
     if (currentUser) {
       getExerciseProgress(...).then(progress => {
         if (progress) setUserCode(progress.code);
       });
     }
   }, [currentUser, exerciseId]);
   ```

4. **Differentiate between auto-save and submission**:
   ```javascript
   // Auto-save: mark as not completed
   saveExerciseProgress(..., false, 0);
   
   // Submission: mark as completed
   saveExerciseProgress(..., true, 10);
   ```

## Troubleshooting

### Progress not saving
- Verify `currentUser` is not null
- Check Firebase rules allow write access to `users/{uid}/progress/`
- Check browser console for errors

### Progress not loading
- Ensure `currentUser` is loaded before loading progress
- Check that exercise type and level match exactly
- Verify data exists in Firebase

### Points not updating
- Check that `isCompleted` is `true` when saving
- Verify points value is greater than 0
- Check user's total points in database

## Future Enhancements

- [ ] Offline support with sync
- [ ] Exercise submission history
- [ ] Peer review functionality
- [ ] Achievement badges
- [ ] Progress visualization dashboard
- [ ] Time tracking per exercise
- [ ] Difficulty progression recommendations
