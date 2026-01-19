import { getFormattedFeedback } from './aiExerciseFeedback';

export async function getCodeFeedback(userCode, language = "python", level = "beginner") {
  // Return hardcoded AI feedback based on language and difficulty level
  try {
    const feedback = getFormattedFeedback(language, level);
    return feedback;
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw new Error('Failed to generate feedback');
  }
}
