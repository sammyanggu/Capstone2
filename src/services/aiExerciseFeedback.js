/**
 * Hardcoded AI Feedback for All Exercises
 * Focused feedback: Hints, Syntax Errors, and Suggestions ONLY
 */

const correctFeedback = [
  " You're doing great - keep it up!",
  " Your code is correct! You're on the right track!",
  " Great job! Keep practicing and you'll master this!",
  " Your solution is spot on! Awesome progress!",
  " You nailed it! Keep up the great work!",
  " Perfect code! You're getting better every day!"
];

const exerciseFeedback = {
  // HTML Exercises
  html: {
    beginner: [
      "💡 **Hint**: Remember to use `<h1>` tags for headings and `<p>` tags for paragraphs.",
      "⚠️ **Syntax**: Make sure all tags are properly closed - every `<tag>` needs a `</tag>`.",
      "💬 **Suggestion**: Consider using semantic HTML elements for better structure."
    ],
    intermediate: [
      "💡 **Hint**: Use `<label>` with `for` attribute and `<input>` with `id` to connect them.",
      "⚠️ **Syntax**: Forms need `<form>` wrapper and input elements inside.",
      "💬 **Suggestion**: Add `required` attribute to important form fields for validation."
    ],
    advanced: [
      "💡 **Hint**: Use `<header>`, `<nav>`, `<main>`, and `<footer>` for semantic structure.",
      "⚠️ **Syntax**: Ensure all semantic elements are properly nested.",
      "💬 **Suggestion**: Add `aria-label` attributes for better accessibility."
    ]
  },

  // CSS Exercises
  css: {
    beginner: [
      "💡 **Hint**: Use selectors like `h1 { color: red; }` to target elements.",
      "⚠️ **Syntax**: CSS rules need selector, property, and value: `selector { property: value; }`.",
      "💬 **Suggestion**: Use class names (`.classname`) for more flexible styling."
    ],
    intermediate: [
      "💡 **Hint**: Use `display: flex;` with `justify-content` and `align-items` for layouts.",
      "⚠️ **Syntax**: Check for missing semicolons and curly braces in your CSS rules.",
      "💬 **Suggestion**: Add media queries `@media (max-width: 600px)` for responsive design."
    ],
    advanced: [
      "💡 **Hint**: Use `display: grid;` with `grid-template-columns` for complex layouts.",
      "⚠️ **Syntax**: Verify CSS variable syntax: `var(--variable-name)` and `--variable-name: value;`.",
      "💬 **Suggestion**: Use CSS variables `--color: value;` for maintainable themes."
    ]
  },

  // JavaScript Exercises
  javascript: {
    beginner: [
      "💡 **Hint**: Create functions with `function name() { }` or `const name = () => { }`.",
      "⚠️ **Syntax**: Use `const` for variables, `function` or arrow `=>` for functions.",
      "💬 **Suggestion**: Use `document.getElementById()` to get elements from the page."
    ],
    intermediate: [
      "💡 **Hint**: Use `.filter()`, `.map()`, `.forEach()` for array operations.",
      "⚠️ **Syntax**: Check for missing `.then()` chains or `await` keywords in async code.",
      "💬 **Suggestion**: Use `async/await` instead of `.then()` for cleaner code."
    ],
    advanced: [
      "💡 **Hint**: Use closures and higher-order functions for abstraction.",
      "⚠️ **Syntax**: Ensure proper error handling with try-catch blocks.",
      "💬 **Suggestion**: Implement debouncing for performance-heavy operations."
    ]
  },

  // PHP Exercises
  php: {
    beginner: [
      "💡 **Hint**: Start with `<?php` and use `echo` or `print` to output.",
      "⚠️ **Syntax**: Variable names start with `$`, use camelCase format.",
      "💬 **Suggestion**: Use `isset()` to check if variables exist before using them."
    ],
    intermediate: [
      "💡 **Hint**: Create classes with `class Name { public function method() { } }`.",
      "⚠️ **Syntax**: Check for missing `->` operator for calling methods and `::` for static calls.",
      "💬 **Suggestion**: Use prepared statements to prevent SQL injection."
    ],
    advanced: [
      "💡 **Hint**: Implement MVC pattern with separate Model, View, and Controller files.",
      "⚠️ **Syntax**: Use type hints `function(string $var): void { }`.",
      "💬 **Suggestion**: Add proper error handling and validation for all inputs."
    ]
  },

  // Python Exercises
  python: {
    beginner: [
      "💡 **Hint**: Define functions with `def function_name():` using snake_case.",
      "⚠️ **Syntax**: Python uses indentation - ensure proper spacing for code blocks.",
      "💬 **Suggestion**: Use descriptive variable names and add comments for clarity."
    ],
    intermediate: [
      "💡 **Hint**: Create classes with `class ClassName:` and `def __init__(self):`.",
      "⚠️ **Syntax**: Use `self` as first parameter in class methods.",
      "💬 **Suggestion**: Use list comprehensions `[x for x in list]` for concise code."
    ],
    advanced: [
      "💡 **Hint**: Use decorators `@decorator` and generators `yield` for abstraction.",
      "⚠️ **Syntax**: Use `async def` and `await` for asynchronous operations.",
      "💬 **Suggestion**: Add docstrings and type hints for better documentation."
    ]
  },

  // Bootstrap Exercises
  bootstrap: {
    beginner: [
      "💡 **Hint**: Use `.container`, `.row`, and `.col` classes for grid layout.",
      "⚠️ **Syntax**: Check that Bootstrap is imported and class names are correct.",
      "💬 **Suggestion**: Use responsive classes like `.col-md-6` for different screen sizes."
    ],
    intermediate: [
      "💡 **Hint**: Use `.d-flex`, `.justify-content-*`, `.align-items-*` utilities.",
      "⚠️ **Syntax**: Verify all Bootstrap class names are spelled correctly.",
      "💬 **Suggestion**: Combine Bootstrap classes for more complex layouts."
    ],
    advanced: [
      "💡 **Hint**: Customize Bootstrap by overriding variables before importing.",
      "⚠️ **Syntax**: Use SASS variables `$variable-name` in custom Bootstrap files.",
      "💬 **Suggestion**: Create custom components extending Bootstrap functionality."
    ]
  },

  // Tailwind Exercises
  tailwind: {
    beginner: [
      "💡 **Hint**: Use utility classes like `p-4`, `m-2`, `bg-blue-500` for styling.",
      "⚠️ **Syntax**: Tailwind class names follow pattern `property-value` (e.g., `text-center`).",
      "💬 **Suggestion**: Use responsive prefixes like `md:` for mobile-first design."
    ],
    intermediate: [
      "💡 **Hint**: Use `@apply` directive to create reusable component classes.",
      "⚠️ **Syntax**: Check Tailwind configuration and ensure utilities are available.",
      "💬 **Suggestion**: Combine multiple utilities for complex designs."
    ],
    advanced: [
      "💡 **Hint**: Extend Tailwind config with custom colors, spacing, and plugins.",
      "⚠️ **Syntax**: Use CSS variables `var(--custom-property)` within Tailwind.",
      "💬 **Suggestion**: Implement dark mode with `dark:` prefix and config."
    ]
  }
};

/**
 * Get AI feedback based on language and difficulty level
 * @param {string} language - Programming language (html, css, javascript, php, python, bootstrap, tailwind)
 * @param {string} level - Difficulty level (beginner, intermediate, advanced)
 * @returns {string[]} Array of feedback messages
 */
export function getHardcodedFeedback(language = 'javascript', level = 'beginner') {
  const normalizedLang = language.toLowerCase();
  const normalizedLevel = level.toLowerCase();

  // Return feedback for the specified language and level
  if (exerciseFeedback[normalizedLang] && exerciseFeedback[normalizedLang][normalizedLevel]) {
    return exerciseFeedback[normalizedLang][normalizedLevel];
  }

  // Fallback to generic feedback
  return [
    "✅ Your code looks good!",
    "💡 Keep practicing and refining your skills.",
    "🎯 Try to add more comments to explain your logic.",
    "✨ Great effort! Continue learning and improving.",
    "🔍 Review the exercise guidelines for additional hints."
  ];
}

/**
 * Get formatted feedback as a single string
 * @param {string} language - Programming language
 * @param {string} level - Difficulty level
 * @returns {string} Formatted feedback string
 */
export function getFormattedFeedback(language = 'javascript', level = 'beginner') {
  const feedbackArray = getHardcodedFeedback(language, level);
  return feedbackArray.join('\n\n');
}

/**
 * Get random feedback message
 * @param {string} language - Programming language
 * @param {string} level - Difficulty level
 * @returns {string} Single random feedback message
 */
export function getRandomFeedback(language = 'javascript', level = 'beginner') {
  const feedbackArray = getHardcodedFeedback(language, level);
  return feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
}

/**
 * Get positive feedback for correct code
 * @returns {string} Random encouragement message for correct solutions
 */
export function getCorrectFeedback() {
  return correctFeedback[Math.floor(Math.random() * correctFeedback.length)];
}
