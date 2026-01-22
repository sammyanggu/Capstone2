/**
 * Smart AI Feedback System - OpenAI Only
 * Generates feedback using OpenAI API exclusively
 */

import { getAIHint } from '../utils/aiHintService';

// Rate limiting: prevent too many requests to OpenAI
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // Minimum 2 seconds between API requests

/**
 * Get AI feedback from OpenAI API endpoint with rate limiting
 */
async function getOpenAIFeedback(code, language, task = '', correctAnswer = '', exerciseId = '') {
  try {
    // Rate limiting: check if enough time has passed since last request
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      console.warn(`⏱️ Rate limit: waiting ${waitTime}ms before next request...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    lastRequestTime = Date.now();
    
    const trimmedCode = code.substring(0, 3000);
    console.log(`🤖 Requesting AI feedback for ${language}...`);
    
    const hint = await getAIHint(trimmedCode, language, task);
    
    if (hint && (hint.includes('Error') || hint.includes('Warning'))) {
      console.warn('⚠️ AI returned error hint:', hint);
      return null;
    }
    
    if (hint && hint.trim().length > 0) {
      console.log('✅ AI feedback received');
      return {
        type: 'ai',
        feedback: hint,
        shouldShow: true,
        fromOpenAI: true,
        source: 'openai'
      };
    }
    
    return null;
  } catch (error) {
    console.error('❌ OpenAI API call failed:', error);
    return null;
  }
}

/**
 * Generate smart feedback for code
 */
export async function generateSmartFeedback(code, language, exerciseId, level, task, correctAnswer = '') {
  const trimmedCode = code.trim();
  
  if (!trimmedCode || trimmedCode.length === 0) {
    return {
      type: 'empty',
      feedback: '💡 Get started! Write some code to see feedback.',
      shouldShow: true
    };
  }
  
  const openAIFeedback = await getOpenAIFeedback(trimmedCode, language, task, correctAnswer, exerciseId);
  if (openAIFeedback) {
    return openAIFeedback;
  }
  
  const looksValid = isCodeLikelyValid(trimmedCode, language);
  if (looksValid) {
    return {
      type: 'correct',
      feedback: '✅ Your code looks good! Keep practicing.',
      shouldShow: true
    };
  }
  
  return {
    type: 'incomplete',
    feedback: '💡 Keep going! Review your code and try again.',
    shouldShow: true
  };
}

/**
 * Very basic validation
 */
function isCodeLikelyValid(code, language) {
  code = code.toLowerCase();
  
  if (language === 'html') {
    return code.includes('<h1') && code.includes('</h1') &&
           code.includes('<p') && code.includes('</p');
  }
  
  if (language === 'css') {
    return code.includes('{') && code.includes('}') && code.includes(':');
  }
  
  if (language === 'javascript') {
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    return openBraces === closeBraces;
  }
  
  if (language === 'python') {
    return code.includes('print') || code.includes('=');
  }
  
  return false;
}

/**
 * Get simple hint from OpenAI
 */
export async function getSimpleHint(code, language, task = '') {
  const trimmedCode = code.substring(0, 1500);
  try {
    const hint = await getAIHint(trimmedCode, language, task);
    return hint || '💡 Keep trying! Review the exercise guidelines.';
  } catch (error) {
    console.error('Error getting hint:', error);
    return '💡 Unable to get hint. Try again later.';
  }
}
