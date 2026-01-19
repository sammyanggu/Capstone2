/**
 * Language-Specific AI Feedback System
 * Provides customized feedback templates for each programming language
 * Ensures diverse and relevant feedback that doesn't repeat across languages
 */

// HTML-Specific Feedback Templates
const htmlFeedback = {
  beginner: {
    syntaxErrors: [
      "⚠️ **HTML Syntax Error**: All opening tags must have closing tags. Every `<tag>` needs a corresponding `</tag>`.",
      "⚠️ **Tag Not Closed**: You have an unclosed tag. Check your `<p>`, `<div>`, `<section>` tags are properly closed.",
      "⚠️ **Invalid Nesting**: Tags are nested incorrectly. Block elements like `<div>` should contain inline elements like `<span>`."
    ],
    hints: [
      "💡 **HTML Structure**: Use `<h1>` for main headings, `<h2>-<h6>` for subheadings, and `<p>` for paragraphs.",
      "💡 **Semantic Tags**: Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` for meaningful structure.",
      "💡 **Lists**: Use `<ul>` for unordered lists and `<ol>` for ordered lists with `<li>` items."
    ],
    suggestions: [
      "✨ **Accessibility**: Add `alt` text to all images: `<img src='...' alt='description'>` for screen readers.",
      "✨ **Best Practice**: Use semantic HTML tags instead of generic `<div>` tags for better SEO and readability.",
      "✨ **Validation**: Check your HTML structure using online validators to catch hidden issues early."
    ]
  },
  intermediate: {
    syntaxErrors: [
      "⚠️ **Attribute Error**: Attributes must be quoted. Use `<img src=\"image.jpg\">` not `<img src=image.jpg>`.",
      "⚠️ **Form Structure**: Forms need proper `<label>` elements connected to `<input>` fields using `for` and `id` attributes.",
      "⚠️ **Table Markup**: Table structure should be: `<table><thead><tr><th>` for headers and `<tbody><tr><td>` for data."
    ],
    hints: [
      "💡 **Form Elements**: Use `<input type=\"text\">`, `<input type=\"email\">`, `<textarea>`, `<select>` for different field types.",
      "💡 **Label Association**: Connect labels properly: `<label for=\"userId\"><input id=\"userId\" type=\"text\"></label>`.",
      "💡 **Data Attributes**: Use `data-*` attributes to store custom data: `<div data-id=\"123\">` for JavaScript access."
    ],
    suggestions: [
      "✨ **Form Validation**: Add `required`, `pattern`, `minlength` attributes for client-side validation.",
      "✨ **Accessibility**: Use `aria-label` and `aria-describedby` for complex forms and interactive elements.",
      "✨ **Meta Tags**: Add metadata in `<head>`: viewport, charset, description for better page display."
    ]
  },
  advanced: {
    syntaxErrors: [
      "⚠️ **SVG Nesting**: SVG elements need proper namespaces and valid XML structure within HTML.",
      "⚠️ **Microdata Syntax**: Schema.org microdata requires correct attribute syntax: `itemscope`, `itemtype`, `itemprop`.",
      "⚠️ **Custom Elements**: Web components must be hyphenated: `<my-component>` not `<mycomponent>`."
    ],
    hints: [
      "💡 **Web Components**: Create reusable elements with `<template>` and custom element definitions.",
      "💡 **Microdata**: Use schema.org markup (`itemscope`, `itemtype`, `itemprop`) for rich search results.",
      "💡 **Accessibility (WCAG)**: Use `aria-live` for dynamic content, `role` attributes for complex widgets."
    ],
    suggestions: [
      "✨ **Performance**: Use `<link rel=\"preload\">` and `<link rel=\"prefetch\">` for resource optimization.",
      "✨ **PWA Integration**: Add `<link rel=\"manifest\">` for web app manifest and `<meta name=\"theme-color\">`.",
      "✨ **SEO Enhancement**: Implement Open Graph (`og:*`) and Twitter Card (`twitter:*`) meta tags for social sharing."
    ]
  }
};

// CSS-Specific Feedback Templates
const cssFeedback = {
  beginner: {
    syntaxErrors: [
      "⚠️ **CSS Syntax**: Missing semicolon at end of property! Use `color: red;` with semicolon.",
      "⚠️ **Selector Error**: Incorrect selector syntax. Use `.classname` for classes and `#idname` for IDs.",
      "⚠️ **Property Value**: The CSS value is invalid. Check property names match standard CSS properties."
    ],
    hints: [
      "💡 **Colors**: Use color names (`red`, `blue`), hex (`#FF0000`), rgb (`rgb(255, 0, 0)`), or hsl values.",
      "💡 **Units**: CSS values need units: `px` for pixels, `%` for percentage, `em` for relative sizing.",
      "💡 **Selectors**: Target elements with `element`, `.class`, `#id`, `[attribute]` selectors."
    ],
    suggestions: [
      "✨ **Class Usage**: Use multiple classes for flexibility: `<div class=\"box highlight\">` for easier styling.",
      "✨ **Font Styling**: Use `font-size`, `font-weight`, `font-family`, `text-align` together for text control.",
      "✨ **Spacing**: Use `margin` for outer space and `padding` for inner space around elements."
    ]
  },
  intermediate: {
    syntaxErrors: [
      "⚠️ **Flexbox Property**: Unknown property for flex layout. Use `display: flex;` with `justify-content` and `align-items`.",
      "⚠️ **Media Query Syntax**: Media query needs parentheses: `@media (max-width: 768px) { }` not `@media max-width: 768px`.",
      "⚠️ **Pseudo-class Error**: Pseudo-classes need colon `:hover`, `:focus`, `:active` syntax."
    ],
    hints: [
      "💡 **Flexbox**: Use `display: flex;` with `flex-direction`, `justify-content`, `align-items`, `gap` for layouts.",
      "💡 **Grid System**: Use `display: grid;` with `grid-template-columns: 1fr 1fr` for two-column layouts.",
      "💡 **Transitions**: Add smooth animations: `transition: all 0.3s ease;` on hover or focus states."
    ],
    suggestions: [
      "✨ **Responsive Design**: Use mobile-first approach with `@media (min-width: 768px)` for larger screens.",
      "✨ **CSS Variables**: Define reusable values: `--primary-color: #3498db;` then use `var(--primary-color)`.",
      "✨ **Accessibility**: Maintain color contrast (4.5:1), use focus states for keyboard navigation."
    ]
  },
  advanced: {
    syntaxErrors: [
      "⚠️ **CSS Grid**: Invalid grid template syntax. Use `grid-template-areas` or `grid-template-columns/rows` correctly.",
      "⚠️ **Animation Keyframes**: `@keyframes` must have proper `from`, `to`, or `0%`, `100%` declarations.",
      "⚠️ **CSS Custom Properties**: Variable scope issue. Custom properties are inherited like normal properties."
    ],
    hints: [
      "💡 **CSS Grid Advanced**: Use `grid-auto-flow`, `grid-auto-rows`, `auto-fit`, `minmax()` for responsive grids.",
      "💡 **Animations**: Combine `@keyframes`, `animation-name`, `animation-duration`, `animation-timing-function` together.",
      "💡 **Filter Effects**: Use `filter: blur()`, `filter: brightness()`, `filter: drop-shadow()` for visual effects."
    ],
    suggestions: [
      "✨ **Performance**: Use `transform` and `opacity` for animations instead of `left/top` for hardware acceleration.",
      "✨ **CSS Architecture**: Organize with BEM methodology: `.block__element--modifier` for maintainability.",
      "✨ **Modern CSS**: Use `clamp()` for responsive sizing, `aspect-ratio` for consistent proportions."
    ]
  }
};

// JavaScript-Specific Feedback Templates
const javascriptFeedback = {
  beginner: {
    syntaxErrors: [
      "⚠️ **Function Syntax**: Incorrect function declaration. Use `function name() { }` or `const name = () => { }`.",
      "⚠️ **Missing Parentheses**: Function calls need parentheses: `myFunction()` not `myFunction`.",
      "⚠️ **Variable Declaration**: Use `const` by default, `let` for loop variables, avoid `var`."
    ],
    hints: [
      "💡 **Variables**: Declare with `const name = 'value';` to make your code safer and clearer.",
      "💡 **Arrays**: Create arrays with `[1, 2, 3]` and access items with index: `array[0]` gets first item.",
      "💡 **Objects**: Use objects for related data: `{ name: 'John', age: 30 }` and access with dot notation."
    ],
    suggestions: [
      "✨ **DOM Access**: Use `document.getElementById()`, `document.querySelector()` to select HTML elements.",
      "✨ **Event Listeners**: Add interactivity with `element.addEventListener('click', function)` for clicks.",
      "✨ **Logging**: Use `console.log()` to debug and understand what your code is doing."
    ]
  },
  intermediate: {
    syntaxErrors: [
      "⚠️ **Promise Chain**: `.then()` must return a value to pass to the next `.then()` in the chain.",
      "⚠️ **Async/Await**: `await` can only be used inside `async` functions. Mark the function with `async`.",
      "⚠️ **Arrow Function**: Missing arrow or wrong syntax. Use `() => { return value; }` or `() => value` for implicit return."
    ],
    hints: [
      "💡 **Array Methods**: Use `.map()` to transform, `.filter()` to select, `.reduce()` to combine array items.",
      "💡 **Destructuring**: Extract values easily: `const { name, age } = person;` or `const [first, second] = array;`.",
      "💡 **Template Literals**: Use backticks for string interpolation: `` `Hello ${name}` `` instead of concatenation."
    ],
    suggestions: [
      "✨ **Error Handling**: Wrap async code in try-catch: `try { await fetchData(); } catch(error) { }`.",
      "✨ **Callback Patterns**: Prefer `async/await` over callback functions for cleaner, more readable code.",
      "✨ **Module Import**: Use `import` for code organization: `import { function } from './module.js';`"
    ]
  },
  advanced: {
    syntaxErrors: [
      "⚠️ **Closure Issue**: Variables in closures reference the outer scope. Be careful with loops and async code.",
      "⚠️ **Prototype Chain**: Incorrect prototype inheritance. Use `Object.create()` or `class extends` properly.",
      "⚠️ **Binding Context**: `this` binding issue. Use arrow functions `() => { }` to preserve context, or `.bind()`."
    ],
    hints: [
      "💡 **Design Patterns**: Use Factory pattern for object creation, Observer for event systems, Singleton for shared instances.",
      "💡 **Performance**: Implement debouncing for frequent events and memoization for expensive calculations.",
      "💡 **Generators**: Use `function*` and `yield` for lazy evaluation and memory-efficient iterations."
    ],
    suggestions: [
      "✨ **TypeScript**: Add type safety with TypeScript interfaces and type annotations for larger projects.",
      "✨ **Testing**: Write unit tests with Jest or Vitest to catch bugs early and ensure code reliability.",
      "✨ **Code Quality**: Use ESLint and Prettier for consistent formatting and catching potential issues."
    ]
  }
};

// Python-Specific Feedback Templates
const pythonFeedback = {
  beginner: {
    syntaxErrors: [
      "⚠️ **Indentation Error**: Python requires proper indentation. Use consistent spaces (4 spaces recommended) inside blocks.",
      "⚠️ **Function Definition**: Use `def function_name():` with colon and proper indentation for the function body.",
      "⚠️ **Missing Colon**: All control structures need colons: `if condition:`, `for item in list:`, `while True:`."
    ],
    hints: [
      "💡 **Print Output**: Use `print('Hello')` to display values on the console.",
      "💡 **Variables**: Assign with `name = 'John'` or `age = 25`. Python infers the type automatically.",
      "💡 **Lists**: Create with `[1, 2, 3]` and access items: `list[0]` for first, `list[-1]` for last."
    ],
    suggestions: [
      "✨ **String Methods**: Use `.upper()`, `.lower()`, `.strip()`, `.split()` for string manipulation.",
      "✨ **Comments**: Add comments with `#` to explain your code: `# This calculates the total`.",
      "✨ **Input/Output**: Use `input('Prompt: ')` to get user input and `print()` to display results."
    ]
  },
  intermediate: {
    syntaxErrors: [
      "⚠️ **Class Definition**: Use `class ClassName:` with proper indentation and `def __init__(self):` constructor.",
      "⚠️ **Self Reference**: Instance methods need `self` as first parameter: `def method(self, param):`.",
      "⚠️ **Import Statement**: Use `import module` or `from module import function` at the top of your file."
    ],
    hints: [
      "💡 **List Comprehension**: Create lists concisely: `[x*2 for x in range(10)]` instead of loops.",
      "💡 **Dictionary Access**: Use `.get()` to safely access keys: `dict.get('key', default_value)`.",
      "💡 **String Formatting**: Use f-strings: `f'Hello {name}, you are {age}'` for cleaner output."
    ],
    suggestions: [
      "✨ **Exception Handling**: Use `try-except` blocks: `try: risky_code() except Exception as e: handle_error()`.",
      "✨ **Libraries**: Use `import requests` for HTTP, `import json` for data, `import csv` for files.",
      "✨ **Function Documentation**: Add docstrings: `\"\"\"This function does X.\"\"\"` for clarity."
    ]
  },
  advanced: {
    syntaxErrors: [
      "⚠️ **Decorator Syntax**: Decorators use `@decorator_name` above function definitions.",
      "⚠️ **Async/Await**: Use `async def function():` with `await` for asynchronous operations.",
      "⚠️ **Type Hints**: Syntax is `def function(param: str) -> int:` for type annotations."
    ],
    hints: [
      "💡 **Generators**: Use `yield` in functions to create memory-efficient iterators.",
      "💡 **Context Managers**: Use `with statement:` pattern for resource management (files, connections).",
      "💡 **Metaclasses**: Advanced class creation with `class Meta(type):` for framework development."
    ],
    suggestions: [
      "✨ **Optimization**: Use `numpy` for numerical computing, `pandas` for data analysis.",
      "✨ **Testing**: Write unit tests with `pytest` to validate your code behavior.",
      "✨ **Code Style**: Follow PEP 8 guidelines using tools like `black` for formatting and `pylint` for linting."
    ]
  }
};

// PHP-Specific Feedback Templates
const phpFeedback = {
  beginner: {
    syntaxErrors: [
      "⚠️ **PHP Tags**: Code must be inside `<?php ... ?>` tags to be executed as PHP.",
      "⚠️ **Variable Syntax**: Variables start with `$`: `$name = 'John';` not `name = 'John';`.",
      "⚠️ **Missing Semicolon**: Every statement needs a semicolon: `echo 'Hello';` not `echo 'Hello'`."
    ],
    hints: [
      "💡 **Output**: Use `echo` or `print` to output content: `echo 'Hello World';`.",
      "💡 **Variables**: Store values with `$variable = value;` and use snake_case naming.",
      "💡 **Strings**: Use single quotes `'text'` for literals or double quotes `\"Hello $name\"` for interpolation."
    ],
    suggestions: [
      "✨ **Isset Check**: Always check if variables exist: `if (isset($_POST['field'])) { }` before using them.",
      "✨ **Array Access**: Create arrays with `$arr = [1, 2, 3];` and access with `$arr[0]`.",
      "✨ **Comments**: Use `//` for single line comments or `/* */` for multiple lines."
    ]
  },
  intermediate: {
    syntaxErrors: [
      "⚠️ **Function Definition**: Use `function functionName($param) { return $value; }` with proper syntax.",
      "⚠️ **Class Syntax**: Use `class ClassName { public function method() { } }` with access modifiers.",
      "⚠️ **Object Arrow**: Use `->` for instance methods: `$object->method()` not `$object.method()`."
    ],
    hints: [
      "💡 **Array Functions**: Use `count()`, `array_push()`, `array_merge()`, `implode()` for array operations.",
      "💡 **String Functions**: Use `strlen()`, `substr()`, `str_replace()`, `strtolower()` for strings.",
      "💡 **Database Query**: Use prepared statements: `$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');`"
    ],
    suggestions: [
      "✨ **Superglobals**: Use `$_GET`, `$_POST`, `$_SESSION` for request/session data access.",
      "✨ **Error Handling**: Use `try-catch` blocks: `try { riskyCode(); } catch (Exception $e) { }`.",
      "✨ **Type Hinting**: Add parameter types: `function add(int $a, int $b): int { return $a + $b; }`."
    ]
  },
  advanced: {
    syntaxErrors: [
      "⚠️ **Namespace Syntax**: Use `namespace App\\Model;` at the top of files for organization.",
      "⚠️ **Static Method**: Call static methods with `::` not `->`: `ClassName::staticMethod()`.",
      "⚠️ **Trait Definition**: Use `trait TraitName { }` and `use TraitName;` for code reuse."
    ],
    hints: [
      "💡 **MVC Pattern**: Separate Model (database), View (HTML), Controller (logic) into different files.",
      "💡 **Composer**: Use `composer require package/name` to install libraries and manage dependencies.",
      "💡 **Async Operations**: Use libraries like `guzzle` for async HTTP requests and process management."
    ],
    suggestions: [
      "✨ **Security**: Use password hashing with `password_hash()` and verify with `password_verify()`.",
      "✨ **Design Patterns**: Implement Singleton, Factory, Observer patterns for scalable architecture.",
      "✨ **Testing**: Write unit tests with `PHPUnit` to ensure code quality and prevent regressions."
    ]
  }
};

// Bootstrap-Specific Feedback Templates
const bootstrapFeedback = {
  beginner: {
    syntaxErrors: [
      "⚠️ **Grid System**: Missing container! Use `<div class=\"container\">` or `<div class=\"container-fluid\">` as wrapper.",
      "⚠️ **Column Syntax**: Use `<div class=\"col\">` inside `<div class=\"row\">` inside a container.",
      "⚠️ **Bootstrap Classes**: Class name is incorrect. Check Bootstrap documentation for exact class names."
    ],
    hints: [
      "💡 **Container**: Wrap content in `container` (fixed width) or `container-fluid` (100% width).",
      "💡 **Grid Layout**: Use `.row` for rows and `.col` for columns. Example: `<div class=\"col-md-6\">` for half width.",
      "💡 **Components**: Use Bootstrap buttons: `<button class=\"btn btn-primary\">Click</button>`."
    ],
    suggestions: [
      "✨ **Spacing Utilities**: Use `.mt-3` (margin-top), `.p-4` (padding), `.ms-2` (margin-start) for spacing.",
      "✨ **Colors**: Use utility classes like `.text-primary`, `.bg-secondary` for consistent styling.",
      "✨ **Responsive Classes**: Use `.d-block`, `.d-sm-none`, `.d-md-block` to show/hide on different sizes."
    ]
  },
  intermediate: {
    syntaxErrors: [
      "⚠️ **Flexbox Utilities**: Use `.d-flex` with `.justify-content-center`, `.align-items-center` for alignment.",
      "⚠️ **Nav Component**: Use `<nav class=\"navbar\">` with `navbar-expand-*` for responsive navigation.",
      "⚠️ **Modal Structure**: Modal needs specific structure: `.modal`, `.modal-dialog`, `.modal-content`."
    ],
    hints: [
      "💡 **Flexbox**: Combine `d-flex`, `justify-content-between`, `align-items-center` for complex layouts.",
      "💡 **Cards**: Create cards with `.card`, `.card-header`, `.card-body`, `.card-footer` structure.",
      "💡 **Responsive Images**: Use `.img-fluid` to make images responsive and `.img-thumbnail` for borders."
    ],
    suggestions: [
      "✨ **Forms**: Use `.form-control`, `.form-label`, `.mb-3` for proper form styling.",
      "✨ **Alerts**: Use `.alert`, `.alert-info`, `.alert-danger` to show messages to users.",
      "✨ **Badges**: Use `.badge`, `.badge-primary`, `.badge-warning` for status indicators."
    ]
  },
  advanced: {
    syntaxErrors: [
      "⚠️ **SCSS Variables**: Bootstrap variables syntax: `$primary-color: #007bff;` before importing Bootstrap.",
      "⚠️ **Theme Customization**: Override Bootstrap mixins and maps before importing main Bootstrap file.",
      "⚠️ **CSS Override**: Specificity issue. Use more specific selectors or `!important` as last resort."
    ],
    hints: [
      "💡 **Custom Components**: Create custom classes extending Bootstrap: `.my-button { @extend .btn; }`.",
      "💡 **Breakpoints**: Customize with `$grid-breakpoints` map for custom responsive sizes.",
      "💡 **Theme**: Use CSS variables in Bootstrap 5 for dynamic theming: `--bs-primary: #blue;`"
    ],
    suggestions: [
      "✨ **Dark Mode**: Use `.navbar-dark`, `.bg-dark` classes and customize colors for dark theme.",
      "✨ **Accessibility**: Add `.sr-only` for screen readers and proper `.aria-*` attributes.",
      "✨ **Performance**: Purge unused CSS with PurgeCSS or use Bootstrap's PostCSS plugin."
    ]
  }
};

// Tailwind-Specific Feedback Templates
const tailwindFeedback = {
  beginner: {
    syntaxErrors: [
      "⚠️ **Utility Class**: Class name doesn't exist. Check Tailwind documentation for correct syntax like `p-4`, `text-center`.",
      "⚠️ **Color Syntax**: Use `bg-blue-500`, `text-red-600` (not `bg-blue` or `bg-blue500`).",
      "⚠️ **Spacing Values**: Use standard scale: `p-1` (0.25rem), `p-2`, `p-4`, `p-8` up to `p-96`."
    ],
    hints: [
      "💡 **Padding/Margin**: Use `p-4` for padding, `m-4` for margin. Responsive: `md:p-8` for medium+ screens.",
      "💡 **Text Styling**: Use `text-lg`, `font-bold`, `text-center`, `text-gray-600` for text properties.",
      "💡 **Colors**: Use color names with scale: `bg-blue-500`, `text-green-700`, `border-red-300`."
    ],
    suggestions: [
      "✨ **Responsive Design**: Use prefixes: `sm:`, `md:`, `lg:`, `xl:` for responsive classes.",
      "✨ **Hover States**: Add interactivity with `hover:bg-blue-600`, `focus:outline-blue-500`.",
      "✨ **Flexbox**: Use `flex`, `justify-between`, `items-center`, `gap-4` for layouts."
    ]
  },
  intermediate: {
    syntaxErrors: [
      "⚠️ **@apply Directive**: Use `@apply` in CSS: `.button { @apply px-4 py-2 bg-blue-500; }`.",
      "⚠️ **Arbitrary Values**: Use square brackets: `w-[500px]`, `text-[#1da1f2]` for custom values.",
      "⚠️ **Group Hover**: Use `.group` and `.group-hover:text-white` for nested element interactions."
    ],
    hints: [
      "💡 **Component Classes**: Create reusable components with `@apply`: `.btn { @apply px-4 py-2 rounded; }`.",
      "💡 **Grid Layout**: Use `grid`, `grid-cols-3`, `gap-6` for grid layouts.",
      "💡 **Transitions**: Add animations: `transition`, `duration-300`, `hover:scale-110`."
    ],
    suggestions: [
      "✨ **Dark Mode**: Use `dark:` prefix: `dark:bg-gray-800`, `dark:text-white` for dark theme.",
      "✨ **Custom Spacing**: Extend Tailwind in `tailwind.config.js` with custom values.",
      "✨ **Aspect Ratio**: Use `aspect-video`, `aspect-square` for consistent proportions."
    ]
  },
  advanced: {
    syntaxErrors: [
      "⚠️ **Config Merge**: Use `extend` key in config to add custom values without overriding defaults.",
      "⚠️ **Plugin Syntax**: Plugins use `module.exports = function ({ addUtilities }) { }`.",
      "⚠️ **Nesting**: PostCSS nesting syntax differs from SCSS - check Tailwind plugin documentation."
    ],
    hints: [
      "💡 **Content Config**: Set `content: ['./src/**/*.{html,js,jsx}']` to scan all files.",
      "💡 **Custom Colors**: Add custom palette: `colors: { 'brand': '#1f2937' }` in config.",
      "💡 **Animation**: Create custom animations: `animation: { 'spin-slow': 'spin 3s linear infinite' }`"
    ],
    suggestions: [
      "✨ **Plugin Creation**: Build custom Tailwind plugins for specialized needs.",
      "✨ **Performance**: Use PurgeCSS configuration to remove unused styles in production.",
      "✨ **CSS Variables**: Combine Tailwind with CSS variables for dynamic theming and runtime changes."
    ]
  }
};

/**
 * Get language-specific feedback templates
 * @param {string} language - Programming language (html, css, javascript, python, php, bootstrap, tailwind)
 * @param {string} level - Difficulty level (beginner, intermediate, advanced)
 * @param {string} type - Feedback type (syntaxErrors, hints, suggestions)
 * @returns {string[]} Array of feedback messages
 */
export function getLanguageSpecificFeedback(language = 'javascript', level = 'beginner', type = 'hints') {
  const normalizedLang = language.toLowerCase();
  const normalizedLevel = level.toLowerCase();
  
  const feedbackMap = {
    html: htmlFeedback,
    css: cssFeedback,
    javascript: javascriptFeedback,
    python: pythonFeedback,
    php: phpFeedback,
    bootstrap: bootstrapFeedback,
    tailwind: tailwindFeedback
  };

  const langFeedback = feedbackMap[normalizedLang];
  if (!langFeedback || !langFeedback[normalizedLevel]) {
    return [];
  }

  return langFeedback[normalizedLevel][type] || [];
}

/**
 * Get a random language-specific feedback message
 * @param {string} language - Programming language
 * @param {string} level - Difficulty level
 * @param {string} type - Feedback type (syntaxErrors, hints, suggestions)
 * @returns {string} Single random feedback message
 */
export function getRandomLanguageSpecificFeedback(language = 'javascript', level = 'beginner', type = 'hints') {
  const feedbackArray = getLanguageSpecificFeedback(language, level, type);
  if (feedbackArray.length === 0) return '';
  return feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
}

/**
 * Get all feedback types for a language/level combination
 * @param {string} language - Programming language
 * @param {string} level - Difficulty level
 * @returns {object} Object with syntaxErrors, hints, and suggestions arrays
 */
export function getAllLanguageSpecificFeedback(language = 'javascript', level = 'beginner') {
  return {
    syntaxErrors: getLanguageSpecificFeedback(language, level, 'syntaxErrors'),
    hints: getLanguageSpecificFeedback(language, level, 'hints'),
    suggestions: getLanguageSpecificFeedback(language, level, 'suggestions')
  };
}

/**
 * Get formatted feedback string combining multiple types
 * @param {string} language - Programming language
 * @param {string} level - Difficulty level
 * @param {string[]} types - Array of types to include ['hints', 'suggestions']
 * @returns {string} Formatted feedback string
 */
export function getFormattedLanguageSpecificFeedback(language = 'javascript', level = 'beginner', types = ['hints', 'suggestions']) {
  const feedbackParts = [];
  
  for (const type of types) {
    const feedback = getLanguageSpecificFeedback(language, level, type);
    if (feedback.length > 0) {
      const randomMsg = feedback[Math.floor(Math.random() * feedback.length)];
      feedbackParts.push(randomMsg);
    }
  }
  
  return feedbackParts.join('\n\n');
}
