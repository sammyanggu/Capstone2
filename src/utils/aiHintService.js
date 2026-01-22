/**
 * Frontend AI Hint Service
 * Calls the serverless OpenAI endpoint to get coding hints
 * 
 * Usage:
 * const hint = await getAIHint(userCode, 'html');
 * console.log(hint);
 */

/**
 * Get AI hint for user code
 * @param {string} code - The user's code
 * @param {string} language - Programming language (html, css, javascript, python, php, bootstrap, tailwind)
 * @param {string} task - Optional: The task description
 * @param {string} level - Optional: Difficulty level (beginner, intermediate, advanced)
 * @returns {Promise<string>} AI-generated hint
 */
export async function getAIHint(code, language, task = '', level = 'beginner') {
  try {
    // Validate input
    if (!code || code.trim().length === 0) {
      return '💡 Get started! Write some code to see AI feedback.';
    }

    if (!language) {
      return '⚠️ Please specify a programming language.';
    }

    console.log(`📤 Sending ${language} code to AI endpoint...`);

    // Call the serverless API endpoint
    const response = await fetch('/api/ai_hint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code.substring(0, 5000), // Limit to 5000 chars
        language: language.toLowerCase(),
        task: task,
        level: level
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      // Handle rate limiting specifically
      if (response.status === 429) {
        console.warn('⏱️ Rate limit reached (429). Please wait before requesting feedback again.');
        return '⏱️ Too many requests. Please wait a few seconds before trying again.';
      }
      
      console.error(`❌ API error ${response.status}:`, response.statusText);
      try {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        return `⚠️ Error: ${errorData.error || 'Unable to get AI feedback'}`;
      } catch {
        return `⚠️ API Error ${response.status}. Check server logs.`;
      }
    }

    // Parse response - handle empty JSON
    let data;
    try {
      data = await response.json();
    } catch (parseErr) {
      console.error('❌ Failed to parse JSON response:', parseErr);
      return '⚠️ Server returned invalid response. Check server logs.';
    }

    if (!data.hint) {
      console.error('❌ No hint in response:', data);
      return '⚠️ No feedback available at the moment.';
    }

    console.log('✅ AI feedback received');
    return data.hint;

  } catch (err) {
    console.error('❌ Error connecting to AI service:', err.message);
    return '⚠️ Cannot reach AI service. Please check your connection.';
  }
}

/**
 * Get AI hint with fallback to hardcoded feedback
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @param {Function} fallbackFunction - Function to call if AI fails
 * @returns {Promise<string>} Hint from AI or fallback
 */
export async function getAIHintWithFallback(code, language, fallbackFunction) {
  try {
    const hint = await getAIHint(code, language);
    
    // If hint contains "Error" or "Warning", use fallback
    if (hint.includes('Error') || hint.includes('Warning')) {
      console.log('📚 Using fallback feedback...');
      return fallbackFunction ? fallbackFunction() : hint;
    }
    
    return hint;
  } catch (err) {
    console.error('❌ Error in fallback logic:', err);
    return fallbackFunction ? fallbackFunction() : 'Unable to get feedback.';
  }
}

/**
 * Batch get hints for multiple code snippets
 * @param {Array} codeSnippets - Array of {code, language} objects
 * @returns {Promise<Array>} Array of hints
 */
export async function getAIHintsBatch(codeSnippets) {
  try {
    const promises = codeSnippets.map(snippet => 
      getAIHint(snippet.code, snippet.language)
    );
    
    return await Promise.all(promises);
  } catch (err) {
    console.error('❌ Error in batch hint request:', err);
    return codeSnippets.map(() => 'Unable to get feedback.');
  }
}
