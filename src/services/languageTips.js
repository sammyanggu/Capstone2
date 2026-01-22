/**
 * Language Tips and Quick Reference
 * Provides quick tips and reference information for each programming language
 * Can be displayed in UI as tooltips or reference panels
 */

export const languageTips = {
  html: {
    quickReference: `
HTML Quick Reference:
• Structure: <html>, <head>, <body>
• Content: <h1>-<h6>, <p>, <div>, <span>
• Lists: <ul>, <ol>, <li>
• Forms: <form>, <input>, <label>, <button>
• Semantic: <header>, <nav>, <main>, <article>, <section>, <footer>
    `.trim(),
    commonMistakes: [
      "Missing closing tags (</p>, </div>, etc.)",
      "Incorrect nesting of elements",
      "Using <b> instead of <strong> for emphasis",
      "Forgetting alt text on images",
      "Not using semantic HTML tags"
    ],
    bestPractices: [
      "Always use semantic HTML for better SEO",
      "Include alt attributes on all images",
      "Properly nest elements",
      "Use proper heading hierarchy (h1 → h6)",
      "Validate HTML with W3C validator"
    ]
  },
  
  css: {
    quickReference: `
CSS Quick Reference:
• Selectors: element, .class, #id, [attr], ::pseudo
• Properties: color, background, padding, margin, border, font-*
• Layout: display (flex, grid, block), position, float
• Responsive: @media, rem/em units, mobile-first
• Units: px, %, em, rem, vh, vw
    `.trim(),
    commonMistakes: [
      "Missing semicolons after property declarations",
      "Using wrong units (should be px, not just numbers)",
      "Incorrect selector specificity",
      "Not using responsive design",
      "Forgetting to extend colors with proper syntax (e.g., bg-blue-500)"
    ],
    bestPractices: [
      "Use flexbox or grid for layouts",
      "Follow mobile-first responsive design",
      "Use CSS variables for consistency",
      "Group related styles together",
      "Use meaningful class names"
    ]
  },
  
  javascript: {
    quickReference: `
JavaScript Quick Reference:
• Variables: const (preferred), let, var
• Functions: function name() {}, const fn = () => {}
• Arrays: [1, 2, 3], .map(), .filter(), .forEach()
• Objects: { key: value }, object.key or object['key']
• Conditionals: if, else, switch
• Loops: for, while, forEach
• Async: async/await, .then(), promises
    `.trim(),
    commonMistakes: [
      "Using var instead of const/let",
      "Not handling async/await properly",
      "Incorrect scope and closure understanding",
      "Missing return statements in functions",
      "Not catching errors in try-catch blocks"
    ],
    bestPractices: [
      "Use const by default, let only when needed",
      "Use arrow functions for consistency",
      "Always handle promises with .catch() or try-catch",
      "Use meaningful variable names",
      "Add JSDoc comments for complex functions"
    ]
  },
  
  python: {
    quickReference: `
Python Quick Reference:
• Variables: name = value (no declaration keyword)
• Functions: def function_name():
• Lists: [1, 2, 3], list methods: append, extend, pop
• Dicts: { 'key': value }, dict.get(), dict.keys()
• Loops: for item in list:, while condition:
• Conditions: if, elif, else
• Imports: import module, from module import function
    `.trim(),
    commonMistakes: [
      "Incorrect indentation (Python uses indentation for blocks)",
      "Missing colons after if/for/while/def",
      "Not using snake_case for variable names",
      "Using == for assignment instead of =",
      "Not handling exceptions with try-except"
    ],
    bestPractices: [
      "Use 4 spaces for indentation (never tabs)",
      "Follow PEP 8 style guide",
      "Use meaningful variable names in snake_case",
      "Add docstrings to functions",
      "Use list comprehensions for concise code"
    ]
  },
  
  php: {
    quickReference: `
PHP Quick Reference:
• Tags: <?php ... ?>
• Variables: $name = value
• Functions: function name() { return $value; }
• Arrays: $arr = [1, 2, 3] or array(1, 2, 3)
• Superglobals: $_GET, $_POST, $_SESSION, $_SERVER
• Output: echo, print, var_dump()
• Control: if, else, foreach, while, for
    `.trim(),
    commonMistakes: [
      "Forgetting $ prefix for variables",
      "Using = for comparison instead of ==",
      "Not checking isset() before accessing variables",
      "Not using prepared statements (SQL injection risk)",
      "Missing closing PHP tag ?>"
    ],
    bestPractices: [
      "Always use prepared statements for database queries",
      "Validate and sanitize user input",
      "Use isset() and empty() checks",
      "Use type hinting in functions",
      "Follow PSR-12 coding standards"
    ]
  },
  
  bootstrap: {
    quickReference: `
Bootstrap Quick Reference:
• Container: .container, .container-fluid
• Grid: .row, .col, .col-md-6, .col-lg-4
• Components: .btn, .card, .nav, .modal, .form-*
• Utilities: .mt-3, .p-4, .d-flex, .justify-content-*
• Colors: .btn-primary, .text-danger, .bg-info
• Spacing: m (margin), p (padding), size 0-5
    `.trim(),
    commonMistakes: [
      "Not using .container wrapper",
      "Forgetting to use .row inside .col elements",
      "Incorrect responsive class names",
      "Missing Bootstrap CSS import",
      "Not nesting columns properly"
    ],
    bestPractices: [
      "Always wrap columns in .row",
      "Use responsive classes: .col-sm-12, .col-md-6",
      "Combine utility classes for spacing",
      "Use semantic Bootstrap components",
      "Customize with Bootstrap variables"
    ]
  },
  
  tailwind: {
    quickReference: `
Tailwind Quick Reference:
• Spacing: p-4, m-4, mb-3, mt-2 (padding/margin)
• Colors: text-red-500, bg-blue-600, border-green-300
• Display: flex, grid, block, inline
• Sizing: w-full, h-screen, max-w-xl
• Text: text-lg, font-bold, text-center
• Responsive: sm:, md:, lg:, xl:, 2xl:
    `.trim(),
    commonMistakes: [
      "Using wrong color scale (bg-blue-500 not bg-blue)",
      "Not using responsive prefixes (md:, lg:)",
      "Missing @tailwind directives in CSS",
      "Not configuring content paths in tailwind.config.js",
      "Hardcoding values instead of using utilities"
    ],
    bestPractices: [
      "Use utility-first approach",
      "Configure tailwind.config.js for custom values",
      "Use @apply for component abstraction",
      "Follow mobile-first responsive design",
      "Use dark: prefix for dark mode support"
    ]
  }
};

/**
 * Get quick reference for a language
 * @param {string} language - Programming language
 * @returns {string} Quick reference text
 */
export function getQuickReference(language = 'javascript') {
  const lang = language.toLowerCase();
  return languageTips[lang]?.quickReference || 'No quick reference available for this language.';
}

/**
 * Get common mistakes for a language
 * @param {string} language - Programming language
 * @returns {string[]} Array of common mistakes
 */
export function getCommonMistakes(language = 'javascript') {
  const lang = language.toLowerCase();
  return languageTips[lang]?.commonMistakes || [];
}

/**
 * Get best practices for a language
 * @param {string} language - Programming language
 * @returns {string[]} Array of best practices
 */
export function getBestPractices(language = 'javascript') {
  const lang = language.toLowerCase();
  return languageTips[lang]?.bestPractices || [];
}

/**
 * Get all language tips
 * @param {string} language - Programming language
 * @returns {object} Object with quickReference, commonMistakes, bestPractices
 */
export function getAllLanguageTips(language = 'javascript') {
  const lang = language.toLowerCase();
  return languageTips[lang] || {
    quickReference: 'Quick reference not available.',
    commonMistakes: [],
    bestPractices: []
  };
}

/**
 * Get formatted language tips as a string
 * @param {string} language - Programming language
 * @returns {string} Formatted tips string
 */
export function getFormattedLanguageTips(language = 'javascript') {
  const tips = getAllLanguageTips(language);
  const parts = [
    `📚 ${language.toUpperCase()} TIPS`,
    '─'.repeat(40),
    tips.quickReference,
    '\n❌ Common Mistakes:',
    tips.commonMistakes.map(m => `  • ${m}`).join('\n'),
    '\n✅ Best Practices:',
    tips.bestPractices.map(p => `  • ${p}`).join('\n')
  ];
  return parts.join('\n');
}

