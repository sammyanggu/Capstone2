/**
 * Task-Specific AI Feedback System
 * Provides customized feedback based on the exact exercise task/question
 * Each exercise gets tailored hints and guidance specific to its learning objectives
 */

/**
 * HTML Exercise Feedback - Task-Specific
 */
const htmlExerciseFeedback = {
  'beginner-0': {
    name: 'Basic HTML Structure',
    syntaxErrors: [
      "⚠️ Missing opening tag: Every HTML element needs both `<tag>` and `</tag>`.",
      "⚠️ Incorrect tag nesting: Block elements like `<p>` should not contain block elements like `<div>`.",
      "⚠️ Missing DOCTYPE: Start with `<!DOCTYPE html>` for valid HTML5."
    ],
    hints: [
      "💡 Use `<h1>` for the main heading of your page.",
      "💡 Use `<p>` for paragraph text content.",
      "💡 Remember to close both tags: `<p>text</p>`"
    ],
    requirements: [
      "✅ Must have `<h1>` heading",
      "✅ Must have `<p>` paragraph",
      "✅ Proper HTML5 structure with DOCTYPE"
    ]
  },
  'beginner-1': {
    name: 'HTML Lists',
    syntaxErrors: [
      "⚠️ List syntax error: Use `<ul>` for unordered lists and `<ol>` for ordered lists.",
      "⚠️ Missing `<li>` tags: List items must be wrapped in `<li>` tags.",
      "⚠️ Incorrect nesting: `<li>` items must be inside `<ul>` or `<ol>` tags."
    ],
    hints: [
      "💡 Start with `<ul>` tag for a bulleted list.",
      "💡 Each item goes inside `<li>` tags: `<li>Item name</li>`",
      "💡 Close the list with `</ul>` tag."
    ],
    requirements: [
      "✅ Must use `<ul>` or `<ol>` tag",
      "✅ Must have at least 3 `<li>` items",
      "✅ Proper nesting of list elements"
    ]
  },
  'beginner-2': {
    name: 'HTML Tables',
    syntaxErrors: [
      "⚠️ Table structure error: Use `<table><tr><td>` in correct order.",
      "⚠️ Missing `<tr>`: Table rows must be wrapped in `<tr>` tags.",
      "⚠️ Missing `<td>` or `<th>`: Table cells need these tags."
    ],
    hints: [
      "💡 Start with `<table>` to create the table.",
      "💡 Use `<tr>` for table rows.",
      "💡 Use `<td>` for data cells and `<th>` for header cells.",
      "💡 Structure: `<table><tr><td>content</td></tr></table>`"
    ],
    requirements: [
      "✅ Must have `<table>` element",
      "✅ Must have at least 2 rows with `<tr>`",
      "✅ Must have cells with `<td>` or `<th>`"
    ]
  },
  'intermediate-0': {
    name: 'HTML Forms',
    syntaxErrors: [
      "⚠️ Form element missing: Wrap inputs in `<form>` tags.",
      "⚠️ Input labeling error: Use `<label for=\"id\">` connected to `<input id=\"id\">`.",
      "⚠️ Missing required attributes: `<input>` needs `type` and `name` attributes."
    ],
    hints: [
      "💡 Create form with: `<form action=\"/submit\" method=\"POST\">`",
      "💡 Add labels: `<label for=\"username\">Username:</label>`",
      "💡 Add input: `<input type=\"text\" id=\"username\" name=\"username\">`",
      "💡 Add button: `<button type=\"submit\">Submit</button>`"
    ],
    requirements: [
      "✅ Must have `<form>` element",
      "✅ Must have `<label>` for each input",
      "✅ Inputs must have `name` attribute",
      "✅ Must have submit button"
    ]
  },
  'intermediate-1': {
    name: 'HTML Links and Navigation',
    syntaxErrors: [
      "⚠️ Link syntax error: Use `<a href=\"url\">link text</a>`.",
      "⚠️ Missing `href` attribute: All links need a destination URL.",
      "⚠️ Incorrect navigation structure: Use `<nav>` wrapper with `<ul>` and `<li>`."
    ],
    hints: [
      "💡 Create navigation: `<nav><ul><li><a href=\"#\">Link</a></li></ul></nav>`",
      "💡 Use relative paths for internal pages: `href=\"/page\"`",
      "💡 Use full URLs for external sites: `href=\"https://example.com\"`",
      "💡 Use `href=\"#section\"` to link to specific sections"
    ],
    requirements: [
      "✅ Must use `<nav>` for navigation section",
      "✅ Must have at least 3 links",
      "✅ All links must have `href` attributes",
      "✅ Proper semantic structure"
    ]
  },
  'advanced-0': {
    name: 'Semantic HTML Structure',
    syntaxErrors: [
      "⚠️ Missing semantic tags: Should use `<header>`, `<nav>`, `<main>`, `<footer>`.",
      "⚠️ Article structure error: Use `<article>` for self-contained content.",
      "⚠️ Section misuse: `<section>` should group related content together."
    ],
    hints: [
      "💡 Structure: `<header>` → `<nav>` → `<main>` → `<footer>`",
      "💡 Use `<header>` for page header with logo and site name.",
      "💡 Use `<nav>` for navigation menu.",
      "💡 Use `<main>` for main page content.",
      "💡 Use `<article>` for blog posts or independent content.",
      "💡 Use `<footer>` for footer with copyright and links."
    ],
    requirements: [
      "✅ Must have `<header>` element",
      "✅ Must have `<nav>` with links",
      "✅ Must have `<main>` for content",
      "✅ Must have `<footer>` element",
      "✅ Proper semantic structure throughout"
    ]
  }
};

/**
 * CSS Exercise Feedback - Task-Specific
 */
const cssExerciseFeedback = {
  'beginner-0': {
    name: 'Basic CSS Selectors and Colors',
    syntaxErrors: [
      "⚠️ Missing semicolon: CSS properties need `;` at the end: `color: red;`",
      "⚠️ Wrong selector syntax: Use `.classname` for classes and `#idname` for IDs.",
      "⚠️ Incorrect color value: Use hex `#FF0000`, rgb `rgb(255,0,0)`, or color names like `red`."
    ],
    hints: [
      "💡 Target elements: `h1 { color: red; }` changes all h1 colors.",
      "💡 Target classes: `.heading { color: blue; }` for `<h1 class=\"heading\">`",
      "💡 Target IDs: `#title { color: green; }` for `<h1 id=\"title\">`",
      "💡 Use color names or hex values: `color: red;` or `color: #FF0000;`"
    ],
    requirements: [
      "✅ Must select HTML elements correctly",
      "✅ Must use proper color syntax",
      "✅ All CSS rules must end with semicolon",
      "✅ CSS must be in `<style>` or `.css` file"
    ]
  },
  'beginner-1': {
    name: 'CSS Spacing (Padding and Margin)',
    syntaxErrors: [
      "⚠️ Missing units: CSS values need units like `px`, `em`, `%`. Example: `padding: 10px;`",
      "⚠️ Wrong property: Use `padding` for inner space and `margin` for outer space.",
      "⚠️ Shorthand syntax error: `margin: 10px 20px;` means `top/bottom 10px, left/right 20px`."
    ],
    hints: [
      "💡 Padding adds space INSIDE the element: `padding: 20px;`",
      "💡 Margin adds space OUTSIDE the element: `margin: 10px;`",
      "💡 Use 4 values for different sides: `padding: 10px 20px 15px 25px;` (top, right, bottom, left)",
      "💡 Use 2 values: `margin: 10px 20px;` (top/bottom, left/right)"
    ],
    requirements: [
      "✅ Must use `padding` property",
      "✅ Must use `margin` property",
      "✅ All values must have units (px, em, %)",
      "✅ Proper spacing applied to elements"
    ]
  },
  'intermediate-0': {
    name: 'CSS Flexbox Layout',
    syntaxErrors: [
      "⚠️ Missing display property: Start with `display: flex;`",
      "⚠️ Wrong flex property: Use `justify-content`, `align-items`, `flex-direction`.",
      "⚠️ Flex value error: `justify-content` accepts: `flex-start`, `center`, `space-between`, etc."
    ],
    hints: [
      "💡 Basic flex: `display: flex;` + `justify-content: center;` + `align-items: center;`",
      "💡 `flex-direction: row;` arranges items horizontally (default).",
      "💡 `flex-direction: column;` arranges items vertically.",
      "💡 `justify-content` controls alignment along the main axis.",
      "💡 `align-items` controls alignment perpendicular to main axis.",
      "💡 `gap: 10px;` adds space between flex items."
    ],
    requirements: [
      "✅ Parent must have `display: flex;`",
      "✅ Must use `justify-content` property",
      "✅ Must use `align-items` property",
      "✅ Items properly centered or distributed"
    ]
  },
  'intermediate-1': {
    name: 'CSS Media Queries (Responsive)',
    syntaxErrors: [
      "⚠️ Media query syntax error: Use `@media (max-width: 768px) { }` with parentheses.",
      "⚠️ Wrong breakpoint: Common sizes are 480px (mobile), 768px (tablet), 1024px (desktop).",
      "⚠️ CSS not inside media query: Rules must be inside the `{ }` block."
    ],
    hints: [
      "💡 Mobile-first approach: Start with mobile styles, then add `@media (min-width: 768px)` for larger.",
      "💡 Hide on mobile: `@media (max-width: 480px) { .element { display: none; } }`",
      "💡 Change layout on tablet: `@media (min-width: 768px) { .col { width: 50%; } }`",
      "💡 Test with browser DevTools to see responsive changes."
    ],
    requirements: [
      "✅ Must use `@media` query",
      "✅ Must have proper breakpoint values",
      "✅ Styles must be inside media query block",
      "✅ Different styles for different screen sizes"
    ]
  },
  'advanced-0': {
    name: 'CSS Grid Layout',
    syntaxErrors: [
      "⚠️ Missing grid declaration: Start with `display: grid;`",
      "⚠️ Wrong grid template: Use `grid-template-columns: 1fr 1fr;` to define columns.",
      "⚠️ Grid syntax error: `fr` units work only in grid, use `grid-template-columns: repeat(3, 1fr);`"
    ],
    hints: [
      "💡 Grid container: `display: grid;` + `grid-template-columns: 1fr 1fr 1fr;`",
      "💡 `1fr` means 1 fraction - equal width columns.",
      "💡 Use `repeat()`: `grid-template-columns: repeat(3, 1fr);` for 3 equal columns.",
      "💡 Gap between items: `gap: 20px;` adds space around all grid cells.",
      "💡 Different column widths: `grid-template-columns: 2fr 1fr;` (2:1 ratio)"
    ],
    requirements: [
      "✅ Must use `display: grid;`",
      "✅ Must define `grid-template-columns`",
      "✅ Proper grid cell layout",
      "✅ Use `gap` for spacing between items"
    ]
  }
};

/**
 * JavaScript Exercise Feedback - Task-Specific
 */
const javascriptExerciseFeedback = {
  'beginner-0': {
    name: 'Basic Function and DOM Manipulation',
    syntaxErrors: [
      "⚠️ Function not defined: Use `function greet() { }` or `const greet = () => { }`",
      "⚠️ Missing parentheses: Function call needs `()`. Write `prompt()` not `prompt`.",
      "⚠️ Wrong DOM property: Use `textContent` or `innerHTML` to update elements."
    ],
    hints: [
      "💡 Create function: `function greet() { /* code here */ }`",
      "💡 Get user input: `const name = prompt('Enter name:');`",
      "💡 Update element: `document.getElementById('id').textContent = name;`",
      "💡 Call the function: `greet();` at the end of your code."
    ],
    requirements: [
      "✅ Must define a function named `greet`",
      "✅ Must use `prompt()` to get user input",
      "✅ Must update element using `textContent` or `innerHTML`",
      "✅ Function must be called"
    ]
  },
  'beginner-1': {
    name: 'Numbers and Math Operations',
    syntaxErrors: [
      "⚠️ Type error: Numbers from input are strings. Use `Number()` or `parseInt()` to convert.",
      "⚠️ Missing function definition: Need `function calculate() { }`",
      "⚠️ Wrong operation: Ensure you're using `+` for addition, `*` for multiplication, etc."
    ],
    hints: [
      "💡 Get numbers: `const num1 = Number(prompt('Enter first number:'));`",
      "💡 Convert to number: `Number('5')` converts string '5' to number 5.",
      "💡 Do math: `const result = num1 + num2;`",
      "💡 Display result: `alert(result);` or `document.getElementById('result').textContent = result;`"
    ],
    requirements: [
      "✅ Must define function named `calculate`",
      "✅ Must convert inputs to numbers",
      "✅ Must perform arithmetic operation",
      "✅ Must display the result"
    ]
  },
  'beginner-2': {
    name: 'String Manipulation and Arrays',
    syntaxErrors: [
      "⚠️ String method error: Use `.split('')` to split string into array of characters.",
      "⚠️ Array method missing: Use `.reverse()` to reverse array order.",
      "⚠️ Join syntax wrong: Use `.join('')` to combine array back to string (no spaces)."
    ],
    hints: [
      "💡 Split string: `'hello'.split('') → ['h','e','l','l','o']`",
      "💡 Reverse array: `['h','e','l','l','o'].reverse() → ['o','l','l','e','h']`",
      "💡 Join back: `['o','l','l','e','h'].join('') → 'olleh'`",
      "💡 Chain them: `text.split('').reverse().join('')`"
    ],
    requirements: [
      "✅ Must use `.split()` method",
      "✅ Must use `.reverse()` method",
      "✅ Must use `.join()` method",
      "✅ Text must be reversed correctly"
    ]
  },
  'intermediate-0': {
    name: 'Array Methods (map, filter, forEach)',
    syntaxErrors: [
      "⚠️ Array method syntax: `.map(item => item * 2)` needs arrow function or callback.",
      "⚠️ Filter wrong: `.filter()` returns new array, doesn't modify original.",
      "⚠️ forEach usage: `.forEach()` doesn't return anything, use `.map()` to transform."
    ],
    hints: [
      "💡 `.map()` transforms each item: `[1,2,3].map(x => x * 2) → [2,4,6]`",
      "💡 `.filter()` selects items: `[1,2,3,4].filter(x => x > 2) → [3,4]`",
      "💡 `.forEach()` loops through: `arr.forEach(item => console.log(item))`",
      "💡 Chain methods: `arr.filter(x => x > 0).map(x => x * 2)`"
    ],
    requirements: [
      "✅ Must use `.map()`, `.filter()`, or `.forEach()`",
      "✅ Must use arrow function or callback",
      "✅ Correct array transformation",
      "✅ Result should be logged or displayed"
    ]
  },
  'advanced-0': {
    name: 'Async/Await and API Calls',
    syntaxErrors: [
      "⚠️ Async function needed: Wrap async code in `async function() { }`",
      "⚠️ Missing await: Use `await` before promises: `await fetch(url)`",
      "⚠️ Error handling: Always use try-catch: `try { } catch(e) { }`"
    ],
    hints: [
      "💡 Define async function: `async function fetchData() { }`",
      "💡 Fetch data: `const response = await fetch(url);`",
      "💡 Parse JSON: `const data = await response.json();`",
      "💡 Handle errors: `try { await code } catch(error) { console.error(error) }`"
    ],
    requirements: [
      "✅ Function must be `async`",
      "✅ Must use `await` for promises",
      "✅ Must have try-catch error handling",
      "✅ Data must be fetched and processed correctly"
    ]
  }
};

/**
 * Python Exercise Feedback - Task-Specific
 */
const pythonExerciseFeedback = {
  'beginner-0': {
    name: 'Functions and Output',
    syntaxErrors: [
      "⚠️ Indentation error: Python requires consistent indentation (4 spaces) inside functions.",
      "⚠️ Missing colon: `def function():` needs a colon `:` after parentheses.",
      "⚠️ Print syntax: Use `print('text')` not `print 'text'` (Python 3 syntax)."
    ],
    hints: [
      "💡 Define function: `def greet():\n    # code with 4-space indent`",
      "💡 Print output: `print('Hello World')`",
      "💡 Use parameters: `def greet(name):\n    print(f'Hello {name}')`",
      "💡 Don't forget indentation: Everything inside function needs 4 spaces."
    ],
    requirements: [
      "✅ Must define a function",
      "✅ Must use proper indentation (4 spaces)",
      "✅ Must have colon after function definition",
      "✅ Must use print() to output"
    ]
  },
  'beginner-1': {
    name: 'Lists and Loops',
    syntaxErrors: [
      "⚠️ Loop syntax: `for item in list:` needs colon and proper indentation.",
      "⚠️ Indentation error: Code inside loop must be indented with 4 spaces.",
      "⚠️ List syntax: Use square brackets: `[1, 2, 3]` not `(1, 2, 3)` (tuples)."
    ],
    hints: [
      "💡 Create list: `numbers = [1, 2, 3, 4, 5]`",
      "💡 Loop through: `for num in numbers:\n    print(num)`",
      "💡 Add to list: `numbers.append(6)` adds item to end.",
      "💡 Loop with range: `for i in range(5):` loops 0-4."
    ],
    requirements: [
      "✅ Must create a list",
      "✅ Must use for loop with proper syntax",
      "✅ Correct indentation inside loop",
      "✅ List items processed or displayed correctly"
    ]
  },
  'intermediate-0': {
    name: 'Classes and Objects',
    syntaxErrors: [
      "⚠️ Class definition: `class ClassName:` with capital letter and colon.",
      "⚠️ Constructor error: `def __init__(self):` must be the constructor method.",
      "⚠️ Self parameter: All instance methods need `self` as first parameter."
    ],
    hints: [
      "💡 Create class: `class Dog:\n    def __init__(self, name):\n        self.name = name`",
      "💡 Create instance: `dog = Dog('Buddy')`",
      "💡 Access attribute: `dog.name` gets the name.",
      "💡 Add method: `def bark(self):\n    print(f'{self.name} barks!')`"
    ],
    requirements: [
      "✅ Must define a class",
      "✅ Must have `__init__` constructor",
      "✅ Must include `self` parameter",
      "✅ Must create instance and use it"
    ]
  }
};

/**
 * PHP Exercise Feedback - Task-Specific
 */
const phpExerciseFeedback = {
  'beginner-0': {
    name: 'PHP Basics and Echo',
    syntaxErrors: [
      "⚠️ PHP tags: Code must be inside `<?php ... ?>` tags.",
      "⚠️ Variable syntax: Variables start with `$`: `$name = 'John';`",
      "⚠️ Missing semicolon: Each statement needs `;` at the end."
    ],
    hints: [
      "💡 Start PHP: `<?php` begins PHP code.",
      "💡 Create variable: `$variable = 'value';` with dollar sign.",
      "💡 Output: `echo 'Hello';` or `echo $variable;`",
      "💡 End PHP: `?>` closes PHP code."
    ],
    requirements: [
      "✅ Must have opening `<?php` tag",
      "✅ Variables must start with `$`",
      "✅ Must use `echo` to output",
      "✅ All statements end with semicolon"
    ]
  },
  'intermediate-0': {
    name: 'PHP Functions and Arrays',
    syntaxErrors: [
      "⚠️ Function definition: `function functionName($param) { }` with proper syntax.",
      "⚠️ Array syntax: Use `$array = [1, 2, 3];` for arrays.",
      "⚠️ Access error: Array items accessed with `$array[0]` not `$array.0`."
    ],
    hints: [
      "💡 Define function: `function add($a, $b) { return $a + $b; }`",
      "💡 Create array: `$colors = ['red', 'blue', 'green'];`",
      "💡 Loop array: `foreach ($colors as $color) { echo $color; }`",
      "💡 Array functions: `count($array)`, `array_push($array, $item)`"
    ],
    requirements: [
      "✅ Must define at least one function",
      "✅ Must create an array",
      "✅ Must use function parameters",
      "✅ Must use return statement"
    ]
  }
};

/**
 * Get task-specific feedback for an exercise
 * @param {string} language - Programming language (html, css, javascript, python, php)
 * @param {string} exerciseId - Exercise ID like 'beginner-0', 'intermediate-1', etc.
 * @returns {object} Task-specific feedback with hints, requirements, and syntax errors
 */
export function getTaskSpecificFeedback(language = 'javascript', exerciseId = 'beginner-0') {
  const feedbackMap = {
    html: htmlExerciseFeedback,
    css: cssExerciseFeedback,
    javascript: javascriptExerciseFeedback,
    python: pythonExerciseFeedback,
    php: phpExerciseFeedback
  };

  const langFeedback = feedbackMap[language.toLowerCase()];
  if (!langFeedback || !langFeedback[exerciseId]) {
    return null;
  }

  return langFeedback[exerciseId];
}

/**
 * Get a random hint for specific exercise
 * @param {string} language - Programming language
 * @param {string} exerciseId - Exercise ID
 * @returns {string} Random hint for this specific task
 */
export function getRandomTaskHint(language = 'javascript', exerciseId = 'beginner-0') {
  const feedback = getTaskSpecificFeedback(language, exerciseId);
  if (!feedback || !feedback.hints || feedback.hints.length === 0) {
    return '';
  }
  return feedback.hints[Math.floor(Math.random() * feedback.hints.length)];
}

/**
 * Get a random syntax error for specific exercise
 * @param {string} language - Programming language
 * @param {string} exerciseId - Exercise ID
 * @returns {string} Random syntax error for this task
 */
export function getRandomTaskSyntaxError(language = 'javascript', exerciseId = 'beginner-0') {
  const feedback = getTaskSpecificFeedback(language, exerciseId);
  if (!feedback || !feedback.syntaxErrors || feedback.syntaxErrors.length === 0) {
    return '';
  }
  return feedback.syntaxErrors[Math.floor(Math.random() * feedback.syntaxErrors.length)];
}

/**
 * Get exercise name/title
 * @param {string} language - Programming language
 * @param {string} exerciseId - Exercise ID
 * @returns {string} Exercise name
 */
export function getExerciseName(language = 'javascript', exerciseId = 'beginner-0') {
  const feedback = getTaskSpecificFeedback(language, exerciseId);
  return feedback?.name || 'Unknown Exercise';
}

/**
 * Get all requirements for an exercise
 * @param {string} language - Programming language
 * @param {string} exerciseId - Exercise ID
 * @returns {string[]} Array of requirements
 */
export function getExerciseRequirements(language = 'javascript', exerciseId = 'beginner-0') {
  const feedback = getTaskSpecificFeedback(language, exerciseId);
  return feedback?.requirements || [];
}

/**
 * Get all hints for an exercise
 * @param {string} language - Programming language
 * @param {string} exerciseId - Exercise ID
 * @returns {string[]} Array of hints
 */
export function getExerciseHints(language = 'javascript', exerciseId = 'beginner-0') {
  const feedback = getTaskSpecificFeedback(language, exerciseId);
  return feedback?.hints || [];
}

/**
 * Format all task-specific feedback for display
 * @param {string} language - Programming language
 * @param {string} exerciseId - Exercise ID
 * @returns {string} Formatted feedback string
 */
export function getFormattedTaskFeedback(language = 'javascript', exerciseId = 'beginner-0') {
  const feedback = getTaskSpecificFeedback(language, exerciseId);
  if (!feedback) return '';

  const parts = [
    `📝 Exercise: ${feedback.name}\n`,
    '📋 Requirements:\n' + feedback.requirements.map(r => `  ${r}`).join('\n'),
    '\n💡 Hints:\n' + feedback.hints.map(h => `  ${h}`).join('\n'),
    '\n⚠️ Common Syntax Errors:\n' + feedback.syntaxErrors.map(e => `  ${e}`).join('\n')
  ];

  return parts.join('\n');
}
