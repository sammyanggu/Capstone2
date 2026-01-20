/**
 * Smart AI Feedback System - Enhanced
 * Generates conditional feedback based on code analysis
 * Detects syntax errors, typos, spelling mistakes, and semantic issues
 * Customizable per exercise with language-specific AI feedback
 */

import { 
  getRandomLanguageSpecificFeedback, 
  getAllLanguageSpecificFeedback 
} from './languageSpecificFeedback';
import {
  getRandomTaskHint,
  getRandomTaskSyntaxError,
  getExerciseRequirements
} from './taskSpecificFeedback';

// Exercise-specific validation rules
const EXERCISE_RULES = {
  // HTML Tables Exercise
  'html-tables': {
    requiredTags: ['table', 'tr', 'td', 'thead', 'tbody'],
    requiredContent: [],
    commonTypos: {
      'tabel': 'table',
      'tabl': 'table',
      'tble': 'table',
      'rw': 'tr',
      'cell': 'td',
      'header': 'thead',
      'body': 'tbody',
      'col': 'td'
    },
    hints: [
      'Use <table> to create the table structure',
      'Use <tr> for table rows',
      'Use <td> for table data cells',
      'Consider using <thead> for headers and <tbody> for data'
    ]
  },
  // HTML Basic Exercise
  'html-basic': {
    requiredTags: ['h1', 'p'],
    requiredContent: [],
    commonTypos: {
      'h1': ['h1'],
      'heading': 'h1',
      'paragraph': 'p',
      'paragaph': 'p',
      'parragraph': 'p',
      'webbsite': 'website',
      'welcom': 'welcome',
      'sructure': 'structure',
      'structur': 'structure'
    },
    hints: [
      'Use <h1> for the main heading',
      'Use <p> for paragraphs',
      'Check spelling in text content'
    ]
  }
};

export function generateSmartFeedback(code, language, exerciseId, level, task, correctAnswer = '') {
  const trimmedCode = code.trim();

  // 1. CODE IS EMPTY
  if (!trimmedCode || trimmedCode.length === 0) {
    return {
      type: 'empty',
      feedback: '💡 Get started! Write some code to see feedback.',
      shouldShow: true
    };
  }

  // 2. EXTRACT TASK REQUIREMENTS AND CHECK WHAT'S MISSING
  const taskAnalysis = extractTaskRequirements(task, language, code);
  if (taskAnalysis.missingRequirements.length > 0) {
    return {
      type: 'incomplete',
      feedback: [
        '⚠️ You need to add:',
        taskAnalysis.missingRequirements.map(req => `• ${req}`).join('\n')
      ].join('\n'),
      shouldShow: true
    };
  }

  // 3. ANALYZE CODE STATE (pass correctAnswer for better typo detection)
  const codeAnalysis = analyzeCode(trimmedCode, language, exerciseId, level, task, correctAnswer);

  // 4. GENERATE CONDITIONAL FEEDBACK
  if (codeAnalysis.isCorrect) {
    return {
      type: 'correct',
      feedback: '✅ Perfect! Your code is working correctly!',
      shouldShow: true
    };
  }

  if (codeAnalysis.isIncomplete) {
    return {
      type: 'incomplete',
      feedback: [
        codeAnalysis.hint ? `💡 ${codeAnalysis.hint}` : null,
        '✨ Keep going! You\'re on the right track.'
      ].filter(Boolean).join('\n\n'),
      shouldShow: true
    };
  }

  if (codeAnalysis.hasSyntaxError) {
    // Try task-specific syntax error first, then fallback to language-specific
    const taskSyntaxError = exerciseId ? getRandomTaskSyntaxError(language, exerciseId) : '';
    const langSpecificError = taskSyntaxError || getRandomLanguageSpecificFeedback(language, level, 'syntaxErrors');
    const syntaxErrorMessage = codeAnalysis.syntaxError || langSpecificError || '⚠️ There\'s a syntax error in your code.';
    
    return {
      type: 'syntax',
      feedback: [
        syntaxErrorMessage,
        '✨ You\'re close! Check the highlighted error.'
      ].filter(Boolean).join('\n\n'),
      shouldShow: true
    };
  }

  if (codeAnalysis.hasTypoError) {
    // Use task-specific or language-specific typo feedback
    const taskHint = exerciseId ? getRandomTaskHint(language, exerciseId) : '';
    const langSpecificTypo = taskHint || getRandomLanguageSpecificFeedback(language, level, 'syntaxErrors');
    
    return {
      type: 'syntax',
      feedback: [
        `⚠️ Spelling Error: ${codeAnalysis.typoError}`,
        langSpecificTypo || '✨ Fix the typo and your code will work!'
      ].filter(Boolean).join('\n\n'),
      shouldShow: true
    };
  }

  if (codeAnalysis.differentApproach) {
    const feedbackItems = [];
    
    // Add hint - prefer codeAnalysis hint, then task-specific, then language-specific
    if (codeAnalysis.hint) {
      feedbackItems.push(`💡 ${codeAnalysis.hint}`);
    } else {
      const taskHint = exerciseId ? getRandomTaskHint(language, exerciseId) : '';
      const langHint = taskHint || getRandomLanguageSpecificFeedback(language, level, 'hints');
      if (langHint) feedbackItems.push(langHint);
    }
    
    // Add suggestion - prefer codeAnalysis suggestion, then language-specific
    if (codeAnalysis.suggestion) {
      feedbackItems.push(`✨ ${codeAnalysis.suggestion}`);
    } else {
      const langSuggestion = getRandomLanguageSpecificFeedback(language, level, 'suggestions');
      if (langSuggestion) feedbackItems.push(langSuggestion);
    }

    return {
      type: 'suggestion',
      feedback: feedbackItems.length > 0 ? feedbackItems.join('\n\n') : '✨ Keep going! You\'re on the right track.',
      shouldShow: true
    };
  }

  // Default: No specific feedback
  return {
    type: 'default',
    feedback: '✨ Keep going! You\'re making progress.',
    shouldShow: false
  };
}

/**
 * Analyze code and return detailed analysis
 */
function analyzeCode(code, language, exerciseId, level, task, correctAnswer = '') {
  const codeLower = code.toLowerCase();
  const codeWords = code.split(/\s+/);

  // Language-specific analysis
  if (language === 'python') {
    return analyzePythonCode(code, codeLower, exerciseId, level, task, correctAnswer);
  } else if (language === 'html' || language === 'bootstrap') {
    return analyzeHtmlCode(code, codeLower, exerciseId, level, task, correctAnswer);
  } else if (language === 'css' || language === 'tailwind') {
    return analyzeCssCode(code, codeLower, exerciseId, level, task, correctAnswer);
  } else if (language === 'javascript') {
    return analyzeJavaScriptCode(code, codeLower, exerciseId, level, task, correctAnswer);
  } else if (language === 'php') {
    return analyzePhpCode(code, codeLower, exerciseId, level, task, correctAnswer);
  }

  return {
    isCorrect: false,
    isIncomplete: false,
    hasSyntaxError: false,
    hasTypoError: false,
    differentApproach: false,
    hint: null,
    syntaxError: null,
    typoError: null,
    suggestion: null
  };
}

/**
 * Detect typos in text by comparing against expected words
 */
function detectTypos(code, codeLower, commonTypos) {
  for (const [typo, correct] of Object.entries(commonTypos)) {
    if (code.includes(typo) || codeLower.includes(typo.toLowerCase())) {
      return {
        found: true,
        typo,
        correct: Array.isArray(correct) ? correct[0] : correct,
        message: `Did you mean "${Array.isArray(correct) ? correct[0] : correct}" instead of "${typo}"?`
      };
    }
  }
  return { found: false };
}

/**
 * Extract requirements from task description and check what's missing
 * This directly compares task requirements against user code
 */
function extractTaskRequirements(task, language, code) {
  const taskLower = task.toLowerCase();
  const codeLower = code.toLowerCase();
  const missingRequirements = [];

  if (language === 'html') {
    // Parse HTML tag requirements from task
    const htmlTags = [
      'header', 'nav', 'article', 'section', 'aside', 'footer', 'main',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'table', 'form', 'ul', 'ol', 'li', 'div', 'span'
    ];

    for (const tag of htmlTags) {
      if (taskLower.includes(tag) && !codeLower.includes(`<${tag}`)) {
        missingRequirements.push(`Add <${tag}> tag`);
      }
    }

    // Check for specific semantic patterns in task
    if (taskLower.includes('semantic') && !codeLower.includes('<header')) {
      missingRequirements.push('Add semantic HTML structure with <header>');
    }
    if (taskLower.includes('blog') && !codeLower.includes('<article')) {
      missingRequirements.push('Add <article> for blog post content');
    }
    if (taskLower.includes('navigation') && !codeLower.includes('<nav')) {
      missingRequirements.push('Add <nav> for navigation menu');
    }
  } else if (language === 'css') {
    // Parse CSS property requirements from task
    const cssProperties = [
      'color', 'background', 'background-color', 'padding', 'margin', 
      'border', 'font-size', 'font-weight', 'text-align', 'width', 
      'height', 'display', 'position', 'flex', 'grid'
    ];

    for (const prop of cssProperties) {
      if (taskLower.includes(prop) && !codeLower.includes(prop)) {
        missingRequirements.push(`Add CSS property: ${prop}`);
      }
    }

    // Check for color-related tasks
    if ((taskLower.includes('color') || taskLower.includes('styled')) && !codeLower.includes('color')) {
      missingRequirements.push('Add color property to your CSS');
    }
  } else if (language === 'javascript') {
    // Parse JavaScript requirements from task
    if (taskLower.includes('function') && !codeLower.includes('function') && !codeLower.includes('=>')) {
      missingRequirements.push('Write a function using function keyword or arrow function');
    }
    if (taskLower.includes('loop') && !codeLower.includes('for') && !codeLower.includes('while')) {
      missingRequirements.push('Add a loop (for or while)');
    }
    if (taskLower.includes('array') && !code.includes('[')) {
      missingRequirements.push('Create an array using [ ]');
    }
    if (taskLower.includes('object') && !code.includes('{')) {
      missingRequirements.push('Create an object using { }');
    }
    if (taskLower.includes('variable') && !codeLower.includes('const') && !codeLower.includes('let') && !codeLower.includes('var')) {
      missingRequirements.push('Declare a variable using const, let, or var');
    }
    if (taskLower.includes('return') && codeLower.includes('function') && !codeLower.includes('return')) {
      missingRequirements.push('Add a return statement in your function');
    }
  } else if (language === 'python') {
    // Parse Python requirements from task
    if (taskLower.includes('function') && !codeLower.includes('def ')) {
      missingRequirements.push('Define a function using def');
    }
    if (taskLower.includes('loop') && !codeLower.includes('for') && !codeLower.includes('while')) {
      missingRequirements.push('Add a loop (for or while)');
    }
    if (taskLower.includes('list') && !code.includes('[')) {
      missingRequirements.push('Create a list using [ ]');
    }
    if (taskLower.includes('dictionary') && !code.includes('{')) {
      missingRequirements.push('Create a dictionary using { }');
    }
    if (taskLower.includes('print') && !codeLower.includes('print(')) {
      missingRequirements.push('Use print() to display output');
    }
    if (taskLower.includes('if') && !codeLower.includes('if ')) {
      missingRequirements.push('Add an if statement for conditions');
    }
  } else if (language === 'php') {
    // Parse PHP requirements from task
    if (taskLower.includes('function') && !codeLower.includes('function ')) {
      missingRequirements.push('Define a function using function keyword');
    }
    if (taskLower.includes('echo') && !codeLower.includes('echo') && !codeLower.includes('print')) {
      missingRequirements.push('Use echo or print to output content');
    }
    if (taskLower.includes('variable') && !code.includes('$')) {
      missingRequirements.push('Create a variable using $ prefix');
    }
    if (taskLower.includes('array') && !codeLower.includes('array(') && !code.includes('[')) {
      missingRequirements.push('Create an array using array() or [ ]');
    }
    if (taskLower.includes('loop') && !codeLower.includes('foreach') && !codeLower.includes('for ')) {
      missingRequirements.push('Add a loop (for or foreach)');
    }
    if (taskLower.includes('if') && !codeLower.includes('if ')) {
      missingRequirements.push('Add an if statement for conditions');
    }
  } else if (language === 'tailwind') {
    // Parse Tailwind CSS requirements from task
    if (taskLower.includes('padding') && !codeLower.includes('p-')) {
      missingRequirements.push('Add padding utility class (p-1, p-2, p-4, etc.)');
    }
    if (taskLower.includes('margin') && !codeLower.includes('m-')) {
      missingRequirements.push('Add margin utility class (m-1, m-2, m-4, etc.)');
    }
    if (taskLower.includes('color') && !codeLower.includes('text-') && !codeLower.includes('bg-')) {
      missingRequirements.push('Add color utility class (text-blue-500, bg-red-200, etc.)');
    }
    if (taskLower.includes('grid') && !codeLower.includes('grid')) {
      missingRequirements.push('Add grid utility class (grid, grid-cols-2, etc.)');
    }
    if (taskLower.includes('flex') && !codeLower.includes('flex')) {
      missingRequirements.push('Add flex utility class (flex, flex-col, etc.)');
    }
    if (taskLower.includes('responsive') && !codeLower.includes('sm:') && !codeLower.includes('md:') && !codeLower.includes('lg:')) {
      missingRequirements.push('Add responsive classes (sm:, md:, lg:, etc.)');
    }
  }

  return {
    missingRequirements: [...new Set(missingRequirements)] // Remove duplicates
  };
}

/**
 * Python Code Analysis - Enhanced with Typo Detection
 */
function analyzePythonCode(code, codeLower, exerciseId, level, task, correctAnswer = '') {
  const analysis = {
    isCorrect: false,
    isIncomplete: false,
    hasSyntaxError: false,
    hasTypoError: false,
    differentApproach: false,
    hint: null,
    syntaxError: null,
    typoError: null,
    suggestion: null
  };

  // Check for common Python typos first
  const commonPythonTypos = {
    'pritn': 'print',
    'pint': 'print',
    'prit': 'print',
    'prnt': 'print',
    'defin': 'define',
    'functino': 'function',
    'retur': 'return',
    'returm': 'return',
    'fro ': 'for ',
    'whiel': 'while',
    'eliff': 'elif',
    'elif ': 'elif'
  };

  const typoDetection = detectTypos(code, codeLower, commonPythonTypos);
  if (typoDetection.found) {
    analysis.hasTypoError = true;
    analysis.typoError = typoDetection.message;
    return analysis;
  }

  // Check for common Python errors
  if (code.includes('pritn') || code.includes('pint')) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = 'It looks like "print" is misspelled. Check the spelling: p-r-i-n-t';
    return analysis;
  }

  if (code.includes('=') && !code.includes('print')) {
    analysis.isIncomplete = true;
    analysis.hint = 'You\'ve created a variable, but remember to use print() to display it.';
    return analysis;
  }

  if (!code.includes('=') && !code.includes('print')) {
    analysis.isIncomplete = true;
    analysis.hint = 'Try creating a variable with the assignment operator (=) and then print it.';
    return analysis;
  }

  if (!code.includes('print')) {
    analysis.isIncomplete = true;
    analysis.hint = 'Don\'t forget to use print() to display your output.';
    return analysis;
  }

  // Check if print statement exists but might be incomplete
  if (code.includes('print(') && !code.includes(')')) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = 'Your print statement is missing a closing parenthesis: print(...)';
    return analysis;
  }

  // Check for indentation issues
  if (code.startsWith(' ') && !code.trim().startsWith('def ') && !code.trim().startsWith('class ')) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = 'Python doesn\'t allow unnecessary indentation at the start of code. Remove the leading spaces.';
    return analysis;
  }

  // If it has print and assignment, likely correct or close
  if (code.includes('=') && code.includes('print')) {
    analysis.differentApproach = false;
    analysis.isCorrect = true; // Assume correct if basic structure is there
    return analysis;
  }

  return analysis;
}

/**
 * HTML Code Analysis - Enhanced with Typo Detection & Task-Aware Suggestions
 */
function analyzeHtmlCode(code, codeLower, exerciseId, level, task, correctAnswer = '') {
  const analysis = {
    isCorrect: false,
    isIncomplete: false,
    hasSyntaxError: false,
    hasTypoError: false,
    differentApproach: false,
    hint: null,
    syntaxError: null,
    typoError: null,
    suggestion: null
  };

  const taskLower = task.toLowerCase();

  // CHECK FOR SYNTAX ERRORS FIRST (spaces in tags, malformed tags)
  const syntaxErrors = checkHtmlSyntaxErrors(code);
  if (syntaxErrors.found) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = syntaxErrors.message;
    return analysis;
  }

  // CHECK FOR TYPOS BASED ON CORRECT ANSWER
  if (correctAnswer) {
    const typoFromCorrect = detectTyposFromCorrectAnswer(code, correctAnswer);
    if (typoFromCorrect.found) {
      analysis.hasTypoError = true;
      analysis.typoError = typoFromCorrect.message;
      return analysis;
    }
  }

  // Check for common typos in HTML attributes and content
  const commonHtmlTypos = {
    'webbsite': 'website',
    'webssite': 'website',
    'webiste': 'website',
    'welcom': 'welcome',
    'welcomme': 'welcome',
    'sructure': 'structure',
    'structur': 'structure',
    'coloumn': 'column',
    'tabel': 'table',
    'tabl': 'table',
    'tble': 'table',
    'semanttic': 'semantic',
    'sematic': 'semantic',
    'artical': 'article',
    'headerr': 'header',
    'navagation': 'navigation'
  };

  const typoDetection = detectTypos(code, codeLower, commonHtmlTypos);
  if (typoDetection.found) {
    analysis.hasTypoError = true;
    analysis.typoError = typoDetection.message;
    return analysis;
  }

  // Parse unclosed tags more intelligently
  const missingCloseTags = findMissingCloseTags(code, codeLower);
  if (missingCloseTags.length > 0) {
    const tagsList = missingCloseTags.join(', ');
    analysis.hasSyntaxError = true;
    analysis.syntaxError = `Missing closing tag(s): ${tagsList}. Make sure every opening tag has a closing tag.`;
    return analysis;
  }

  // Task-aware detection: Check what the task asks for
  const missingRequiredTags = detectMissingRequiredTags(code, codeLower, taskLower);
  if (missingRequiredTags.length > 0) {
    analysis.isIncomplete = true;
    
    // Create specific hint based on missing tags
    if (missingRequiredTags.length === 1) {
      const tag = missingRequiredTags[0];
      const hints = getHintForTag(tag);
      analysis.hint = hints;
    } else {
      analysis.hint = `You're missing these semantic elements: ${missingRequiredTags.join(', ')}. Add them to complete your structure.`;
    }
    return analysis;
  }

  // Check if code looks correct
  if (code.includes('<') && code.includes('>') && code.includes('</')) {
    analysis.isCorrect = true;
    return analysis;
  }

  return analysis;
}

/**
 * Detect typos by comparing against the correct answer
 * Extract key content words and check if they match
 */
function detectTyposFromCorrectAnswer(code, correctAnswer) {
  if (!correctAnswer) return { found: false };

  // Extract all text content from code and correct answer (ignore tags)
  const extractTextContent = (str) => {
    return str.replace(/<[^>]*>/g, '').toLowerCase().trim();
  };

  const codeText = extractTextContent(code);
  const correctText = extractTextContent(correctAnswer);

  // If texts match exactly, no typo
  if (codeText === correctText) {
    return { found: false };
  }

  // Split into words and find differences
  const codeWords = codeText.split(/\s+/).filter(w => w);
  const correctWords = correctText.split(/\s+/).filter(w => w);

  // Check if any words from code don't match correct words (close match with typos)
  for (const codeWord of codeWords) {
    for (const correctWord of correctWords) {
      // If words are similar but not exact (possible typo)
      if (codeWord !== correctWord && isSimilarWord(codeWord, correctWord)) {
        return {
          found: true,
          message: `Did you mean "${correctWord}" instead of "${codeWord}"?`
        };
      }
    }
  }

  // Check for missing words
  const missingWords = correctWords.filter(word => !codeWords.includes(word));
  if (missingWords.length > 0 && missingWords.length <= 2) {
    return {
      found: true,
      message: `You're missing the word: "${missingWords[0]}"`
    };
  }

  return { found: false };
}

/**
 * Check if two words are similar (within 2 character differences)
 */
function isSimilarWord(word1, word2) {
  if (word1 === word2) return false;
  if (Math.abs(word1.length - word2.length) > 2) return false;

  let differences = 0;
  const maxLen = Math.max(word1.length, word2.length);

  for (let i = 0; i < maxLen; i++) {
    if ((word1[i] || '') !== (word2[i] || '')) {
      differences++;
    }
  }

  return differences <= 2;
}

/**
 * Check for strict HTML syntax errors like spaces in tags
 */
function checkHtmlSyntaxErrors(code) {
  // Check for spaces before tag name or closing bracket: < div>, <p >, <div />, etc.
  const spacedTagRegex = /<\s+\w+|<\/\s+\w+|<\w+\s*>/g;
  const spaceMatches = code.match(/<\s+\w+/g) || [];
  if (spaceMatches.length > 0) {
    return {
      found: true,
      message: `⚠️ HTML Syntax Error: Remove spaces after '<'. For example, use <p> instead of "< p>" or "<p >".\n✨ Tags must be written without spaces between the angle bracket and tag name.`
    };
  }

  // Check for spaces in closing tags: </ div>, </ p>
  const closeSpaceMatches = code.match(/<\/\s+\w+/g) || [];
  if (closeSpaceMatches.length > 0) {
    return {
      found: true,
      message: `⚠️ HTML Syntax Error: Remove spaces in closing tags. For example, use </p> instead of "</ p>".\n✨ Closing tags must be written without spaces.`
    };
  }

  // Check for spaces before closing bracket in attributes or tag: <div class = "container">
  const attrSpaceRegex = /\s+\s+=/g;
  if (code.match(attrSpaceRegex)) {
    return {
      found: true,
      message: `⚠️ HTML Syntax Error: Remove extra spaces in attributes. Use <div class="container"> instead of "< div class = 'container'>".\n✨ Attributes should not have spaces around the equals sign.`
    };
  }

  // Check for invalid tag names (common misspellings like <divv>, <pp>, etc.)
  const commonMisspelledTags = {
    '<divv>': '<div>',
    '<diiv>': '<div>',
    '<pp>': '<p>',
    '<ppp>': '<p>',
    '<hh>': '<h1>',
    '<hhh>': '<h1>',
    '<headerr>': '<header>',
    '<footerr>': '<footer>',
    '<sectino>': '<section>',
    '<articel>': '<article>',
    '<navv>': '<nav>',
    '<asidee>': '<aside>',
    '<maiiin>': '<main>',
    '<formm>': '<form>',
    '<tabble>': '<table>',
    '<ttr>': '<tr>',
    '<td>': '<td>', // Already correct
    '<thh>': '<th>'
  };

  for (const [misspelled, correct] of Object.entries(commonMisspelledTags)) {
    if (code.includes(misspelled)) {
      return {
        found: true,
        message: `⚠️ HTML Spelling Error: Did you mean "${correct}" instead of "${misspelled}"?\n✨ Check your tag spelling carefully.`
      };
    }
  }

  // Check for quotes consistency (mixing " and ')
  const singleQuoteAttrs = code.match(/\s+\w+='[^']*'/g) || [];
  const doubleQuoteAttrs = code.match(/\s+\w+="[^"]*"/g) || [];
  if (singleQuoteAttrs.length > 0 && doubleQuoteAttrs.length > 0) {
    return {
      found: true,
      message: `⚠️ HTML Syntax Error: Mix single (') and double (") quotes inconsistently in attributes.\n✨ Use either all single quotes or all double quotes throughout your code.`
    };
  }

  return { found: false };
}

/**
 * Find which tags are not properly closed
 */
function findMissingCloseTags(code, codeLower) {
  const missingTags = [];
  const commonTags = ['h1', 'h2', 'h3', 'p', 'header', 'footer', 'article', 'section', 'nav', 'main', 'aside', 'div', 'table', 'tr', 'td', 'thead', 'tbody'];
  
  for (const tag of commonTags) {
    const openCount = (code.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length;
    const closeCount = (code.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    
    if (openCount > closeCount) {
      missingTags.push(`</${tag}>`);
    }
  }
  
  return missingTags;
}

/**
 * Detect missing required tags based on task description
 */
function detectMissingRequiredTags(code, codeLower, taskLower) {
  const missingTags = [];
  
  // Semantic elements detection
  const semanticTags = {
    'header': taskLower.includes('header'),
    'nav': taskLower.includes('nav') || taskLower.includes('navigation'),
    'article': taskLower.includes('article'),
    'section': taskLower.includes('section'),
    'aside': taskLower.includes('aside') || taskLower.includes('sidebar'),
    'footer': taskLower.includes('footer'),
    'main': taskLower.includes('main')
  };
  
  // Basic structure detection
  const basicTags = {
    'h1': taskLower.includes('heading') || taskLower.includes('h1'),
    'h2': taskLower.includes('h2') || taskLower.includes('subheading'),
    'p': taskLower.includes('paragraph') || taskLower.includes('content'),
    'table': taskLower.includes('table'),
    'form': taskLower.includes('form'),
    'ul': taskLower.includes('list') || taskLower.includes('ul'),
    'ol': taskLower.includes('ordered') || taskLower.includes('ol')
  };
  
  // Check semantic tags
  for (const [tag, isRequired] of Object.entries(semanticTags)) {
    if (isRequired && !codeLower.includes(`<${tag}`)) {
      missingTags.push(`<${tag}>`);
    }
  }
  
  // Check basic tags
  for (const [tag, isRequired] of Object.entries(basicTags)) {
    if (isRequired && !codeLower.includes(`<${tag}`)) {
      missingTags.push(`<${tag}>`);
    }
  }
  
  return missingTags;
}

/**
 * Get specific hint for missing tag
 */
function getHintForTag(tag) {
  const hints = {
    '<header>': '💡 Add a <header> tag to define the header section of your page (logo, navigation, etc.).',
    '<nav>': '💡 Add a <nav> tag to wrap your navigation menu.',
    '<article>': '💡 Add an <article> tag to define a self-contained piece of content like a blog post.',
    '<section>': '💡 Add a <section> tag to group related content together.',
    '<aside>': '💡 Add an <aside> tag for sidebar or supplementary content.',
    '<footer>': '💡 Add a <footer> tag to define the footer section (copyright, links, etc.).',
    '<main>': '💡 Add a <main> tag to wrap your main page content.',
    '<h1>': '💡 Add an <h1> heading tag for your main title.',
    '<p>': '💡 Add a <p> paragraph tag for your text content.',
    '<table>': '💡 Add a <table> tag to create your data table.',
    '<form>': '💡 Add a <form> tag to create a form for user input.',
    '<ul>': '💡 Add a <ul> (unordered list) tag to create a bulleted list.',
    '<ol>': '💡 Add an <ol> (ordered list) tag to create a numbered list.'
  };
  
  return hints[tag] || `💡 Add a ${tag} tag to your code.`;
}

/**
 * Check for strict CSS syntax errors
 */
function checkCssSyntaxErrors(code) {
  // Check for missing colons in property declarations
  const propWithoutColon = code.match(/(\w+)[\s]*(?!:)[\s]*[a-zA-Z0-9#\-]/g);
  const lines = code.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines, comments, and selectors
    if (!line || line.startsWith('/*') || line.startsWith('*') || line.startsWith('//') || line.includes('{') || line.includes('}')) {
      continue;
    }
    
    // Check if line looks like a property (has value) but missing colon
    if (line && !line.includes(':') && !line.includes(';') && line.match(/[\w\-]+\s+[\w\-#0-9]/)) {
      return {
        found: true,
        message: `⚠️ CSS Syntax Error: Missing colon (:) in property declaration.\n✨ CSS properties need a colon like: "color: blue;" or "padding: 10px;"`
      };
    }
    
    // Check for missing semicolon at end of property (but allow last property before closing brace)
    if (line.includes(':') && !line.endsWith(';') && !line.endsWith('{') && !line.endsWith('}')) {
      const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
      if (!nextLine.startsWith('}') && nextLine) {
        return {
          found: true,
          message: `⚠️ CSS Syntax Error: Missing semicolon (;) at end of property.\n✨ Each CSS property declaration must end with a semicolon: "color: blue;"`
        };
      }
    }
  }

  // Check for unmatched braces
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    return {
      found: true,
      message: `⚠️ CSS Syntax Error: Mismatched curly braces { }.\n✨ Make sure every opening brace has a closing brace.`
    };
  }

  // Check for common spacing errors in property values (e.g., "10 px" instead of "10px")
  const spacedUnitMatch = code.match(/[\d]\s+(px|em|rem|%|pt|cm|mm)/gi);
  if (spacedUnitMatch) {
    return {
      found: true,
      message: `⚠️ CSS Syntax Error: Space between number and unit detected.\n✨ Use "10px" instead of "10 px" - no space between value and unit.`
    };
  }

  return { found: false };
}

/**
 * CSS Code Analysis - Enhanced with Task-Aware Detection
 */
function analyzeCssCode(code, codeLower, exerciseId, level, task, correctAnswer = '') {
  const analysis = {
    isCorrect: false,
    isIncomplete: false,
    hasSyntaxError: false,
    hasTypoError: false,
    differentApproach: false,
    hint: null,
    syntaxError: null,
    typoError: null,
    suggestion: null
  };

  const taskLower = task.toLowerCase();

  // CHECK FOR SYNTAX ERRORS FIRST (missing colons, semicolons, braces)
  const cssSyntaxErrors = checkCssSyntaxErrors(code);
  if (cssSyntaxErrors.found) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = cssSyntaxErrors.message;
    return analysis;
  }

  // CHECK FOR TYPOS BASED ON CORRECT ANSWER
  if (correctAnswer) {
    const typoFromCorrect = detectTyposFromCorrectAnswer(code, correctAnswer);
    if (typoFromCorrect.found) {
      analysis.hasTypoError = true;
      analysis.typoError = typoFromCorrect.message;
      return analysis;
    }
  }

  // Check for common CSS typos
  const commonCssTypos = {
    'coler': 'color',
    'colour': 'color',
    'backgroun': 'background',
    'backgroundd': 'background',
    'pading': 'padding',
    'paddin': 'padding',
    'marign': 'margin',
    'maring': 'margin',
    'bordr': 'border',
    'boarder': 'border',
    'fontsize': 'font-size',
    'fontweight': 'font-weight',
    'textalign': 'text-align',
    'displayflex': 'display: flex',
    'widht': 'width',
    'heght': 'height',
    'backrgound-color': 'background-color'
  };

  const typoDetection = detectTypos(code, codeLower, commonCssTypos);
  if (typoDetection.found) {
    analysis.hasTypoError = true;
    analysis.typoError = typoDetection.message;
    return analysis;
  }

  // Check for missing properties based on task
  const requiredCssProperties = detectMissingCssProperties(code, codeLower, taskLower);
  if (requiredCssProperties.length > 0) {
    analysis.isIncomplete = true;
    if (requiredCssProperties.length === 1) {
      analysis.hint = `💡 Add the '${requiredCssProperties[0]}' CSS property to your styles.`;
    } else {
      analysis.hint = `💡 You're missing these CSS properties: ${requiredCssProperties.join(', ')}`;
    }
    return analysis;
  }

  // Check for basic CSS structure
  if (!code.includes('{')) {
    analysis.isIncomplete = true;
    analysis.hint = 'CSS rules need curly braces: selector { property: value; }';
    return analysis;
  }

  if (!code.includes('}')) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = 'Your CSS rule is missing a closing brace: }';
    return analysis;
  }

  if (!code.includes(':')) {
    analysis.isIncomplete = true;
    analysis.hint = 'CSS properties need a colon: property: value;';
    return analysis;
  }

  if (!code.includes(';') && code.includes(':')) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = 'CSS rules need a semicolon at the end: property: value;';
    return analysis;
  }

  // If has basic structure
  if (code.includes('{') && code.includes('}') && code.includes(':') && code.includes(';')) {
    analysis.isCorrect = true;
    return analysis;
  }

  return analysis;
}

/**
 * Detect missing CSS properties based on task description
 */
function detectMissingCssProperties(code, codeLower, taskLower) {
  const missingProperties = [];
  
  const cssPropertyMap = {
    'color': taskLower.includes('color') || taskLower.includes('text color'),
    'background': taskLower.includes('background') || taskLower.includes('bg'),
    'background-color': taskLower.includes('background color') || taskLower.includes('background-color'),
    'padding': taskLower.includes('padding') || taskLower.includes('space inside'),
    'margin': taskLower.includes('margin') || taskLower.includes('space outside'),
    'border': taskLower.includes('border') || taskLower.includes('outline'),
    'font-size': taskLower.includes('font size') || taskLower.includes('font-size') || taskLower.includes('text size'),
    'font-weight': taskLower.includes('bold') || taskLower.includes('font weight'),
    'text-align': taskLower.includes('align') || taskLower.includes('text-align') || taskLower.includes('centered'),
    'width': taskLower.includes('width') || taskLower.includes('wide'),
    'height': taskLower.includes('height') || taskLower.includes('tall'),
    'display': taskLower.includes('display') || taskLower.includes('flex') || taskLower.includes('grid'),
    'position': taskLower.includes('position') || taskLower.includes('absolute') || taskLower.includes('relative')
  };
  
  for (const [property, isRequired] of Object.entries(cssPropertyMap)) {
    if (isRequired && !codeLower.includes(property)) {
      missingProperties.push(property);
    }
  }
  
  return missingProperties;
}

/**
 * JavaScript Code Analysis - Enhanced with Task-Aware Detection
 */
function analyzeJavaScriptCode(code, codeLower, exerciseId, level, task, correctAnswer = '') {
  const analysis = {
    isCorrect: false,
    isIncomplete: false,
    hasSyntaxError: false,
    hasTypoError: false,
    differentApproach: false,
    hint: null,
    syntaxError: null,
    typoError: null,
    suggestion: null
  };

  const taskLower = task.toLowerCase();

  // Check for common JavaScript typos
  const commonJsTypos = {
    'functino': 'function',
    'fuction': 'function',
    'functin': 'function',
    'consol': 'console',
    'consolee': 'console',
    'console.lg': 'console.log',
    'console.lo': 'console.log',
    'construl': 'const',
    'lett': 'let',
    'varr': 'var',
    'retur': 'return',
    'returm': 'return',
    'if ': 'if',
    'whiel': 'while',
    'fro ': 'for ',
    'forr': 'for',
    'eliff': 'elif',
    'swithc': 'switch',
    'casee': 'case',
    'elseif': 'else if'
  };

  const typoDetection = detectTypos(code, codeLower, commonJsTypos);
  if (typoDetection.found) {
    analysis.hasTypoError = true;
    analysis.typoError = typoDetection.message;
    return analysis;
  }

  // Check for required JavaScript elements based on task
  const missingElements = detectMissingJsElements(code, codeLower, taskLower);
  if (missingElements.length > 0) {
    analysis.isIncomplete = true;
    if (missingElements.length === 1) {
      analysis.hint = getMissingJsHint(missingElements[0]);
    } else {
      analysis.hint = `💡 You're missing: ${missingElements.join(', ')}`;
    }
    return analysis;
  }

  // Check for missing parentheses in function calls
  if ((code.includes('console.log') || code.includes('alert')) && !code.includes('(')) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = 'Function calls need parentheses: console.log(...)';
    return analysis;
  }

  // Check for unclosed brackets
  const openBrackets = (code.match(/\{/g) || []).length;
  const closeBrackets = (code.match(/\}/g) || []).length;

  if (openBrackets > closeBrackets) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = `Missing closing brace(s). You have ${openBrackets - closeBrackets} unclosed bracket(s).`;
    return analysis;
  }

  // Check for unclosed parentheses
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;

  if (openParens > closeParens) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = `Missing closing parenthesis. You have ${openParens - closeParens} unclosed parenthesis(es).`;
    return analysis;
  }

  // If has basic function structure
  if ((codeLower.includes('function') || codeLower.includes('=>') || codeLower.includes('const') || codeLower.includes('let')) && 
      code.includes('{') && code.includes('}')) {
    analysis.isCorrect = true;
    return analysis;
  }

  return analysis;
}

/**
 * Detect missing JavaScript elements based on task
 */
function detectMissingJsElements(code, codeLower, taskLower) {
  const missingElements = [];
  
  const jsElementMap = {
    'function': taskLower.includes('function') || taskLower.includes('write a function'),
    'const': taskLower.includes('variable') || taskLower.includes('const'),
    'let': taskLower.includes('variable') || taskLower.includes('let'),
    'for loop': taskLower.includes('loop') || taskLower.includes('for') || taskLower.includes('iterate'),
    'if statement': taskLower.includes('if') || taskLower.includes('condition'),
    'array': taskLower.includes('array') || taskLower.includes('list'),
    'object': taskLower.includes('object') || taskLower.includes('key-value'),
    'event listener': taskLower.includes('click') || taskLower.includes('event') || taskLower.includes('listener'),
    'return': taskLower.includes('return') && (codeLower.includes('function') || codeLower.includes('=>'))
  };
  
  for (const [element, isRequired] of Object.entries(jsElementMap)) {
    const elementCheck = checkJsElement(code, codeLower, element);
    if (isRequired && !elementCheck) {
      missingElements.push(element);
    }
  }
  
  return missingElements;
}

/**
 * Check if a JavaScript element exists in code
 */
function checkJsElement(code, codeLower, element) {
  const checks = {
    'function': codeLower.includes('function') || codeLower.includes('=>'),
    'const': codeLower.includes('const'),
    'let': codeLower.includes('let'),
    'for loop': codeLower.includes('for'),
    'if statement': codeLower.includes('if'),
    'array': codeLower.includes('[') && codeLower.includes(']'),
    'object': codeLower.includes('{') && codeLower.includes(':'),
    'event listener': codeLower.includes('addeventlistener') || codeLower.includes('addEventListener') || codeLower.includes('onclick'),
    'return': codeLower.includes('return')
  };
  
  return checks[element] || false;
}

/**
 * Get helpful hint for missing JavaScript element
 */
function getMissingJsHint(element) {
  const hints = {
    'function': '💡 Try defining a function: function name() { } or const name = () => { }',
    'const': '💡 Define a variable using const: const name = value;',
    'let': '💡 Define a variable using let: let name = value;',
    'for loop': '💡 Use a for loop to iterate: for (let i = 0; i < array.length; i++) { }',
    'if statement': '💡 Use an if statement to check conditions: if (condition) { }',
    'array': '💡 Create an array: const array = [item1, item2, item3];',
    'object': '💡 Create an object: const obj = { key: value };',
    'event listener': '💡 Add an event listener: element.addEventListener("click", function() { });',
    'return': '💡 Remember to return a value from your function: return value;'
  };
  
  return hints[element] || `💡 Add ${element} to your code.`;
}

/**
 * PHP Code Analysis - Enhanced with Task-Aware Detection
 */
function analyzePhpCode(code, codeLower, exerciseId, level, task, correctAnswer = '') {
  const analysis = {
    isCorrect: false,
    isIncomplete: false,
    hasSyntaxError: false,
    hasTypoError: false,
    differentApproach: false,
    hint: null,
    syntaxError: null,
    typoError: null,
    suggestion: null
  };

  const taskLower = task.toLowerCase();

  // Check for common PHP typos
  const commonPhpTypos = {
    'echo ': 'echo',
    'pring': 'print',
    'prnt': 'print',
    'varaiable': 'variable',
    'functino': 'function',
    'retrun': 'return',
    'foreachs': 'foreach',
    'issets': 'isset',
    'emty': 'empty'
  };

  const typoDetection = detectTypos(code, codeLower, commonPhpTypos);
  if (typoDetection.found) {
    analysis.hasTypoError = true;
    analysis.typoError = typoDetection.message;
    return analysis;
  }

  // Check PHP opening tag
  if (!code.includes('<?') && !code.includes('<?php')) {
    analysis.hasSyntaxError = true;
    analysis.syntaxError = 'PHP code must start with <?php or <? tag';
    return analysis;
  }

  // Check for missing output statement
  if (!codeLower.includes('echo') && !codeLower.includes('print') && taskLower.includes('output')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Use echo or print to display output: echo "text"; or print "text";';
    return analysis;
  }

  // Check for variable usage
  const variableCount = (code.match(/\$/g) || []).length;
  if (variableCount === 0 && taskLower.includes('variable')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Create a variable in PHP using the $ prefix: $name = "value";';
    return analysis;
  }

  // Check for function definition if required
  if (taskLower.includes('function') && !codeLower.includes('function ')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Define a function: function name() { /* code */ }';
    return analysis;
  }

  // Check for array if required
  if (taskLower.includes('array') && !codeLower.includes('array(') && !code.includes('[')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Create an array: array(item1, item2) or [item1, item2]';
    return analysis;
  }

  // Check for loop if required
  if (taskLower.includes('loop') && !codeLower.includes('foreach') && !codeLower.includes('for ')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Use a loop: foreach ($array as $item) { } or for ($i = 0; $i < count; $i++) { }';
    return analysis;
  }

  // If has basic structure
  if (code.includes('<?') && (codeLower.includes('echo') || codeLower.includes('print'))) {
    analysis.isCorrect = true;
    return analysis;
  }

  return analysis;
}

/**
 * Tailwind CSS Code Analysis
 */
function analyzeTailwindCode(code, codeLower, exerciseId, level, task) {
  const analysis = {
    isCorrect: false,
    isIncomplete: false,
    hasSyntaxError: false,
    hasTypoError: false,
    differentApproach: false,
    hint: null,
    syntaxError: null,
    typoError: null,
    suggestion: null
  };

  const taskLower = task.toLowerCase();

  // Check for Tailwind class naming typos
  const commonTailwindTypos = {
    'padd': 'p-',
    'marg': 'm-',
    'backgroun': 'bg-',
    'txt-': 'text-',
    'bdr': 'border',
    'w-full': 'w-full',
    'h-full': 'h-full'
  };

  const typoDetection = detectTypos(code, codeLower, commonTailwindTypos);
  if (typoDetection.found) {
    analysis.hasTypoError = true;
    analysis.typoError = typoDetection.message;
    return analysis;
  }

  // Check for padding if required
  if (taskLower.includes('padding') && !codeLower.includes('p-')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Add padding utility classes: p-2, p-4, px-2, py-4, etc.';
    return analysis;
  }

  // Check for margin if required
  if (taskLower.includes('margin') && !codeLower.includes('m-')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Add margin utility classes: m-2, m-4, mx-2, my-4, etc.';
    return analysis;
  }

  // Check for colors if required
  if (taskLower.includes('color') && !codeLower.includes('text-') && !codeLower.includes('bg-')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Add color utility classes: text-red-500, bg-blue-200, etc.';
    return analysis;
  }

  // Check for layout if required
  if (taskLower.includes('flex') && !codeLower.includes('flex')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Use Tailwind flex utilities: flex, flex-col, flex-row, justify-center, items-center';
    return analysis;
  }

  if (taskLower.includes('grid') && !codeLower.includes('grid')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Use Tailwind grid utilities: grid, grid-cols-2, grid-cols-3, gap-4';
    return analysis;
  }

  // Check for responsive design if required
  if (taskLower.includes('responsive') && !codeLower.includes('sm:') && !codeLower.includes('md:') && !codeLower.includes('lg:')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Add responsive prefixes: sm:, md:, lg:, xl: Example: md:w-1/2 lg:w-1/3';
    return analysis;
  }

  // If has HTML with Tailwind classes
  if (code.includes('class=') && (codeLower.includes('text-') || codeLower.includes('bg-') || codeLower.includes('p-') || codeLower.includes('m-'))) {
    analysis.isCorrect = true;
    return analysis;
  }

  // Check if has HTML structure
  if (code.includes('<') && code.includes('>')) {
    analysis.isIncomplete = true;
    analysis.hint = '💡 Add Tailwind utility classes to your HTML elements';
    return analysis;
  }

  return analysis;
}

