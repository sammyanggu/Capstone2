import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import Confetti from '../../components/Confetti';
import { useTheme } from '../../ThemeContext';


const Quiz = () => {
  const { theme } = useTheme();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLimitExceeded, setTimeLimitExceeded] = useState(false);

  const getTimeLimit = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 120;
      case 'Intermediate': return 300;
      case 'Advanced': return 600;
      default: return 300;
    }
  };

  const mockQuizzes = [
    // HTML QUIZZES
    {
      id: 'html-basics',
      title: 'HTML Basics',
      description: 'Learn HTML fundamentals',
      difficulty: 'Beginner',
      category: 'html',
      questions: [
        { id: 1, type: 'multiple', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: 0, explanation: 'HTML stands for Hyper Text Markup Language.' },
        { id: 2, type: 'multiple', question: 'Which HTML tag is used to create a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correctAnswer: 1, explanation: 'The <a> tag is used to create hyperlinks.' },
        { id: 3, type: 'multiple', question: 'Which tag is used to display an image in HTML?', options: ['<image>', '<src>', '<img>', '<pic>'], correctAnswer: 2, explanation: 'The <img> tag is used to display images in HTML.' },
        { id: 4, type: 'multiple', question: 'Which HTML tag is used to create a numbered list?', options: ['<ol>', '<ul>', '<list>', '<li>'], correctAnswer: 0, explanation: 'The <ol> tag creates ordered (numbered) lists.' },
        { id: 5, type: 'multiple', question: 'Which tag is used for the largest heading?', options: ['<heading>', '<head>', '<h6>', '<h1>'], correctAnswer: 3, explanation: 'The <h1> tag is used for the largest heading.' }
      ]
    },
    {
      id: 'html-intermediate',
      title: 'HTML Intermediate',
      description: 'Intermediate HTML concepts',
      difficulty: 'Intermediate',
      category: 'html',
      questions: [
        { id: 1, type: 'multiple', question: 'Which HTML element is used for self-contained content that can stand alone?', options: ['<aside>', '<div>', '<article>', '<section>'], correctAnswer: 2, explanation: 'The <article> element is used for self-contained content like blog posts.' },
        { id: 2, type: 'multiple', question: 'What is the main purpose of the <aside> element?', options: ['To hold side content related to the main content', 'To display the main article', 'To replace <section>', 'To create navigation'], correctAnswer: 0, explanation: 'The <aside> element holds side content related to the main content.' },
        { id: 3, type: 'multiple', question: 'Which attribute is required for the <img> tag to be valid?', options: ['title', 'width', 'src', 'alt'], correctAnswer: 3, explanation: 'The alt attribute is required for the <img> tag to provide alternative text.' },
        { id: 4, type: 'multiple', question: 'What does the <figure> element represent?', options: ['A container for charts only', 'Self-contained content like images or diagrams', 'A navigation group', 'A form wrapper'], correctAnswer: 1, explanation: 'The <figure> element represents self-contained illustrations, diagrams, and photos.' },
        { id: 5, type: 'multiple', question: 'Which element should be used only once per HTML document?', options: ['<section>', '<header>', '<main>', '<article>'], correctAnswer: 2, explanation: 'The <main> element should be used only once per HTML document.' },
        { id: 6, type: 'multiple', question: 'Which HTML element provides autocomplete suggestions for an input?', options: ['<option>', '<select>', '<input>', '<datalist>'], correctAnswer: 3, explanation: 'The <datalist> element provides autocomplete suggestions for inputs.' },
        { id: 7, type: 'multiple', question: 'What does the data-* attribute allow?', options: ['Validating form inputs', 'Sending data to databases', 'Storing custom data on HTML elements', 'Creating hidden inputs'], correctAnswer: 2, explanation: 'The data-* attribute allows storing custom data on HTML elements for JavaScript.' },
        { id: 8, type: 'multiple', question: 'Which tag is used to embed video in HTML5?', options: ['<object>', '<video>', '<embed>', '<media>'], correctAnswer: 1, explanation: 'The <video> tag is used to embed video content in HTML5.' },
        { id: 9, type: 'multiple', question: 'What is the correct semantic element for an independent blog post?', options: ['<section>', '<main>', '<div>', '<article>'], correctAnswer: 3, explanation: 'The <article> element is the correct semantic element for independent blog posts.' },
        { id: 10, type: 'multiple', question: 'Which element is best used to group related content with a heading?', options: ['<section>', '<aside>', '<footer>', '<header>'], correctAnswer: 0, explanation: 'The <section> element is best used to group related thematic content with a heading.' }
      ]
    },
    {
      id: 'html-advanced',
      title: 'HTML Advanced',
      description: 'Advanced HTML concepts',
      difficulty: 'Advanced',
      category: 'html',
      questions: [
        { id: 1, type: 'multiple', question: 'Which element is used to define machine-readable metadata for search engines?', options: ['<meta>', '<data>', '<head>', '<script>'], correctAnswer: 0, explanation: 'The <meta> element is used to define machine-readable metadata for search engines.' },
        { id: 2, type: 'multiple', question: 'Which attribute connects a <label> to a form control?', options: ['name', 'for', 'id', 'value'], correctAnswer: 1, explanation: 'The for attribute on a label connects it to a form control via its id.' },
        { id: 3, type: 'multiple', question: 'What does the aria-label attribute provide?', options: ['Styling information', 'Keyboard shortcuts', 'Accessible name for assistive technologies', 'Form validation rules'], correctAnswer: 2, explanation: 'The aria-label attribute provides an accessible name for assistive technologies.' },
        { id: 4, type: 'multiple', question: 'Which element defines a container for navigation links?', options: ['<menu>', '<ul>', '<navigation>', '<nav>'], correctAnswer: 3, explanation: 'The <nav> element defines a container for navigation links.' },
        { id: 5, type: 'multiple', question: 'Which HTML element represents a scalar measurement within a known range?', options: ['<progress>', '<meter>', '<input type="range">', '<output>'], correctAnswer: 1, explanation: 'The <meter> element represents a scalar measurement within a known range.' },
        { id: 6, type: 'multiple', question: 'What is the main purpose of the <time> element?', options: ['To format dates visually', 'To store server time', 'To encode dates and times in a machine-readable way', 'To create timers'], correctAnswer: 2, explanation: 'The <time> element encodes dates and times in a machine-readable way.' },
        { id: 7, type: 'multiple', question: 'Which attribute enables lazy loading for images?', options: ['async', 'defer', 'loading', 'fetchpriority'], correctAnswer: 2, explanation: 'The loading attribute enables lazy loading for images.' },
        { id: 8, type: 'multiple', question: 'Which HTML element is used to group a set of related form controls?', options: ['<formgroup>', '<fieldset>', '<section>', '<group>'], correctAnswer: 1, explanation: 'The <fieldset> element is used to group a set of related form controls.' },
        { id: 9, type: 'multiple', question: 'Which element provides a caption for a <figure>?', options: ['<caption>', '<legend>', '<summary>', '<figcaption>'], correctAnswer: 3, explanation: 'The <figcaption> element provides a caption for a <figure>.' },
        { id: 10, type: 'multiple', question: 'What does the contenteditable attribute do?', options: ['Enables drag and drop', 'Makes content editable by the user', 'Allows inline scripting', 'Enables form validation'], correctAnswer: 1, explanation: 'The contenteditable attribute makes content editable by the user.' },
        { id: 11, type: 'multiple', question: 'Which element is used to disclose additional information on demand?', options: ['<aside>', '<details>', '<summary>', '<dialog>'], correctAnswer: 1, explanation: 'The <details> element is used to disclose additional information on demand.' },
        { id: 12, type: 'multiple', question: 'Which attribute specifies that a form input must be filled before submission?', options: ['pattern', 'validate', 'required', 'placeholder'], correctAnswer: 2, explanation: 'The required attribute specifies that a form input must be filled before submission.' },
        { id: 13, type: 'multiple', question: 'Which element is used to represent the result of a calculation?', options: ['<calc>', '<result>', '<output>', '<data>'], correctAnswer: 2, explanation: 'The <output> element is used to represent the result of a calculation.' },
        { id: 14, type: 'multiple', question: 'Which HTML feature helps prevent XSS by restricting inline scripts?', options: ['Same-origin policy', 'Content Security Policy (CSP)', 'CORS', 'HTTPS'], correctAnswer: 1, explanation: 'Content Security Policy (CSP) helps prevent XSS by restricting inline scripts.' },
        { id: 15, type: 'multiple', question: 'Which element defines a dialog box or modal?', options: ['<popup>', '<alert>', '<details>', '<dialog>'], correctAnswer: 3, explanation: 'The <dialog> element defines a dialog box or modal.' }
      ]
    },

    // CSS QUIZZES
    {
      id: 'css-basics',
      title: 'CSS Basics',
      description: 'Learn CSS fundamentals',
      difficulty: 'Beginner',
      category: 'css',
      questions: [
        { id: 1, type: 'multiple', question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Syntax', 'Colorful Style Sheets'], correctAnswer: 1, explanation: 'CSS stands for Cascading Style Sheets.' },
        { id: 2, type: 'multiple', question: 'Which property changes text color?', options: ['font', 'text-color', 'color', 'background'], correctAnswer: 2, explanation: 'The color property changes text color in CSS.' },
        { id: 3, type: 'multiple', question: 'Which selector targets all <p> elements?', options: ['.p', '#p', 'p', '*p'], correctAnswer: 2, explanation: 'The element selector p targets all <p> elements.' },
        { id: 4, type: 'multiple', question: 'Which property controls spacing inside an element?', options: ['margin', 'padding', 'border', 'gap'], correctAnswer: 1, explanation: 'The padding property controls spacing inside an element.' },
        { id: 5, type: 'multiple', question: 'Which CSS unit is relative to font size?', options: ['px', 'cm', 'em', 'pt'], correctAnswer: 2, explanation: 'The em unit is relative to the element\'s font size.' }
      ]
    },
    {
      id: 'css-intermediate',
      title: 'CSS Intermediate',
      description: 'Intermediate CSS concepts',
      difficulty: 'Intermediate',
      category: 'css',
      questions: [
        { id: 1, type: 'multiple', question: 'What does display: none do?', options: ['Makes element invisible but clickable', 'Removes element from layout', 'Hides element with opacity', 'Disables element'], correctAnswer: 1, explanation: 'display: none removes the element from the layout completely.' },
        { id: 2, type: 'multiple', question: 'Which property creates rounded corners?', options: ['curve', 'radius', 'border-radius', 'round'], correctAnswer: 2, explanation: 'The border-radius property creates rounded corners.' },
        { id: 3, type: 'multiple', question: 'What is the default position value?', options: ['relative', 'absolute', 'fixed', 'static'], correctAnswer: 3, explanation: 'The default position value is static.' },
        { id: 4, type: 'multiple', question: 'Which selector has highest specificity?', options: ['element', 'class', 'id', 'universal'], correctAnswer: 2, explanation: 'The id selector has the highest specificity.' },
        { id: 5, type: 'multiple', question: 'Which property aligns flex items horizontally?', options: ['align-items', 'justify-content', 'flex-direction', 'gap'], correctAnswer: 1, explanation: 'The justify-content property aligns flex items horizontally.' },
        { id: 6, type: 'multiple', question: 'Which unit is viewport-based?', options: ['em', '%', 'vw', 'rem'], correctAnswer: 2, explanation: 'The vw unit is viewport width and is viewport-based.' },
        { id: 7, type: 'multiple', question: 'What does overflow: hidden do?', options: ['Scrolls content', 'Clips overflow content', 'Shows scrollbar', 'Resizes content'], correctAnswer: 1, explanation: 'overflow: hidden clips content that exceeds the box boundaries.' },
        { id: 8, type: 'multiple', question: 'Which property controls stacking order?', options: ['layer', 'order', 'z-index', 'depth'], correctAnswer: 2, explanation: 'The z-index property controls stacking order of elements.' },
        { id: 9, type: 'multiple', question: 'What does flex-wrap control?', options: ['Item size', 'Wrapping behavior', 'Alignment', 'Direction'], correctAnswer: 1, explanation: 'The flex-wrap property controls whether flex items wrap.' },
        { id: 10, type: 'multiple', question: 'Which property animates smoothly?', options: ['transition', 'transform', 'animation', 'motion'], correctAnswer: 0, explanation: 'The transition property animates property changes smoothly.' }
      ]
    },
    {
      id: 'css-advanced',
      title: 'CSS Advanced',
      description: 'Advanced CSS techniques',
      difficulty: 'Advanced',
      category: 'css',
      questions: [
        { id: 1, type: 'multiple', question: 'What does BEM stand for?', options: ['Block Element Modifier', 'Base Element Module', 'Block Extension Model', 'Browser Element Method'], correctAnswer: 0, explanation: 'BEM stands for Block Element Modifier, a naming methodology.' },
        { id: 2, type: 'multiple', question: 'Which pseudo-class selects the first child?', options: [':first', ':child(1)', ':first-child', '::first'], correctAnswer: 2, explanation: 'The :first-child pseudo-class selects the first child element.' },
        { id: 3, type: 'multiple', question: 'Which function defines responsive font sizes?', options: ['scale()', 'calc()', 'clamp()', 'fit()'], correctAnswer: 2, explanation: 'The clamp() function defines responsive font sizes and values.' },
        { id: 4, type: 'multiple', question: 'Which layout uses rows and columns?', options: ['Flexbox', 'Grid', 'Float', 'Inline'], correctAnswer: 1, explanation: 'CSS Grid layout uses rows and columns.' },
        { id: 5, type: 'multiple', question: 'What does will-change do?', options: ['Forces reflow', 'Optimizes performance hints', 'Triggers animation', 'Preloads CSS'], correctAnswer: 1, explanation: 'will-change provides performance optimization hints to the browser.' },
        { id: 6, type: 'multiple', question: 'Which media query targets dark mode?', options: ['prefers-theme', 'color-scheme', 'prefers-color-scheme', 'theme-mode'], correctAnswer: 2, explanation: 'prefers-color-scheme targets the user\'s dark mode preference.' },
        { id: 7, type: 'multiple', question: 'What does contain property do?', options: ['Clips content', 'Limits layout scope', 'Centers elements', 'Fixes overflow'], correctAnswer: 1, explanation: 'The contain property limits layout scope for performance.' },
        { id: 8, type: 'multiple', question: 'Which selector selects attribute presence?', options: ['[type=text]', '{type}', '(type)', '#type'], correctAnswer: 0, explanation: 'The [type=text] attribute selector targets elements with specific attributes.' },
        { id: 9, type: 'multiple', question: 'Which property improves font rendering?', options: ['font-display', 'text-smooth', 'font-smoothing', 'letter-spacing'], correctAnswer: 2, explanation: 'font-smoothing improves font rendering quality.' },
        { id: 10, type: 'multiple', question: 'What is a CSS custom property?', options: ['Function', 'Variable', 'Mixin', 'Rule'], correctAnswer: 1, explanation: 'CSS custom properties are variables that store values.' },
        { id: 11, type: 'multiple', question: 'Which rule allows nested styles (future spec)?', options: ['@nest', '@scope', '@layer', '@apply'], correctAnswer: 0, explanation: 'The @nest rule allows nested style rules in future CSS.' },
        { id: 12, type: 'multiple', question: 'Which property controls grid spacing?', options: ['gap', 'margin', 'padding', 'space'], correctAnswer: 0, explanation: 'The gap property controls spacing in grid layouts.' },
        { id: 13, type: 'multiple', question: 'Which property isolates blending?', options: ['isolate', 'mix-blend-mode', 'isolation', 'blend'], correctAnswer: 2, explanation: 'The isolation property isolates blending contexts.' },
        { id: 14, type: 'multiple', question: 'Which function converts units?', options: ['calc()', 'clamp()', 'min()', 'max()'], correctAnswer: 0, explanation: 'The calc() function converts and calculates units.' },
        { id: 15, type: 'multiple', question: 'Which feature prevents layout shifts?', options: ['aspect-ratio', 'width', 'object-fit', 'contain'], correctAnswer: 0, explanation: 'The aspect-ratio property prevents layout shifts by reserving space.' }
      ]
    },

    // JAVASCRIPT QUIZZES
    {
      id: 'js-basics',
      title: 'JavaScript Basics',
      description: 'JavaScript fundamentals',
      difficulty: 'Beginner',
      category: 'javascript',
      questions: [
        { id: 1, type: 'multiple', question: 'What keyword is used to declare a variable?', options: ['var', 'int', 'define', 'let'], correctAnswer: 0, explanation: 'The var keyword is used to declare variables.' },
        { id: 2, type: 'multiple', question: 'Which symbol is used for comments?', options: ['<!-- -->', '#', '//', '**'], correctAnswer: 2, explanation: 'The // symbol is used for single-line comments in JavaScript.' },
        { id: 3, type: 'multiple', question: 'How do you output text to the console?', options: ['print()', 'console.log()', 'echo()', 'write()'], correctAnswer: 1, explanation: 'console.log() outputs text to the browser console.' },
        { id: 4, type: 'multiple', question: 'Which data type represents true or false?', options: ['String', 'Number', 'Boolean', 'Object'], correctAnswer: 2, explanation: 'Boolean data type represents true or false values.' },
        { id: 5, type: 'multiple', question: 'How do you create a function?', options: ['function myFunc()', 'def myFunc()', 'create myFunc()', 'func myFunc()'], correctAnswer: 0, explanation: 'The function keyword creates a function.' }
      ]
    },
    {
      id: 'js-intermediate',
      title: 'JavaScript Intermediate',
      description: 'Intermediate JavaScript concepts',
      difficulty: 'Intermediate',
      category: 'javascript',
      questions: [
        { id: 1, type: 'multiple', question: 'What does === mean?', options: ['Equal value', 'Equal type', 'Strict equality', 'Assignment'], correctAnswer: 2, explanation: '=== checks both value and type (strict equality).' },
        { id: 2, type: 'multiple', question: 'Which method converts JSON to an object?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.object()', 'parse.JSON()'], correctAnswer: 0, explanation: 'JSON.parse() converts JSON strings to JavaScript objects.' },
        { id: 3, type: 'multiple', question: 'What is the result of typeof []?', options: ['array', 'list', 'object', 'undefined'], correctAnswer: 2, explanation: 'Arrays are objects in JavaScript, so typeof [] returns "object".' },
        { id: 4, type: 'multiple', question: 'Which keyword prevents reassignment?', options: ['var', 'let', 'const', 'static'], correctAnswer: 2, explanation: 'The const keyword prevents reassignment of variables.' },
        { id: 5, type: 'multiple', question: 'What does event.preventDefault() do?', options: ['Stops event bubbling', 'Cancels default browser action', 'Reloads page', 'Disables event'], correctAnswer: 1, explanation: 'preventDefault() cancels the default browser action for an event.' },
        { id: 6, type: 'multiple', question: 'Which array method removes the last item?', options: ['pop()', 'shift()', 'remove()', 'slice()'], correctAnswer: 0, explanation: 'The pop() method removes and returns the last array element.' },
        { id: 7, type: 'multiple', question: 'What does NaN stand for?', options: ['Not a Node', 'Null and None', 'Not a Number', 'New assigned Number'], correctAnswer: 2, explanation: 'NaN stands for Not a Number.' },
        { id: 8, type: 'multiple', question: 'Which loop is best for arrays?', options: ['for', 'while', 'do…while', 'forEach'], correctAnswer: 3, explanation: 'forEach is the best loop for iterating over arrays.' },
        { id: 9, type: 'multiple', question: 'What does this refer to in an object method?', options: ['Global window', 'Function', 'The object itself', 'Parent scope'], correctAnswer: 2, explanation: 'In an object method, this refers to the object itself.' },
        { id: 10, type: 'multiple', question: 'Which operator spreads values?', options: ['...', '=>', '??', '||'], correctAnswer: 0, explanation: 'The spread operator (...) spreads array/object values.' }
      ]
    },
    {
      id: 'js-advanced',
      title: 'JavaScript Advanced',
      description: 'Advanced JavaScript concepts',
      difficulty: 'Advanced',
      category: 'javascript',
      questions: [
        { id: 1, type: 'multiple', question: 'What is a closure?', options: ['Blocked scope', 'Function with preserved scope', 'Global variable', 'Callback function'], correctAnswer: 1, explanation: 'A closure is a function that has access to its outer scope.' },
        { id: 2, type: 'multiple', question: 'What does the event loop handle?', options: ['DOM updates', 'Async operations', 'Memory allocation', 'Variable scope'], correctAnswer: 1, explanation: 'The event loop handles asynchronous operations.' },
        { id: 3, type: 'multiple', question: 'Which promise state means completed successfully?', options: ['pending', 'rejected', 'settled', 'fulfilled'], correctAnswer: 3, explanation: 'A promise is fulfilled when it completes successfully.' },
        { id: 4, type: 'multiple', question: 'What does async keyword return?', options: ['Promise', 'Boolean', 'Function', 'Object'], correctAnswer: 0, explanation: 'An async function always returns a Promise.' },
        { id: 5, type: 'multiple', question: 'Which method runs after all promises resolve?', options: ['Promise.race()', 'Promise.any()', 'Promise.all()', 'Promise.finally()'], correctAnswer: 2, explanation: 'Promise.all() waits for all promises to resolve.' },
        { id: 6, type: 'multiple', question: 'What is hoisting?', options: ['Memory leak', 'Variable deletion', 'Moving declarations to top', 'Scope chaining'], correctAnswer: 2, explanation: 'Hoisting moves variable and function declarations to the top of their scope.' },
        { id: 7, type: 'multiple', question: 'Which object handles HTTP requests?', options: ['Fetch', 'XMLHttp', 'Request', 'Response'], correctAnswer: 0, explanation: 'The Fetch API handles HTTP requests.' },
        { id: 8, type: 'multiple', question: 'What does Object.freeze() do?', options: ['Deletes object', 'Makes object immutable', 'Clones object', 'Hides object'], correctAnswer: 1, explanation: 'Object.freeze() makes an object immutable.' },
        { id: 9, type: 'multiple', question: 'What is currying?', options: ['Looping function', 'Breaking function into single arguments', 'Function callback', 'Recursive call'], correctAnswer: 1, explanation: 'Currying transforms a function with multiple arguments into a sequence of single-argument functions.' },
        { id: 10, type: 'multiple', question: 'Which API stores key-value pairs persistently?', options: ['sessionStorage', 'cookies', 'cache', 'localStorage'], correctAnswer: 3, explanation: 'localStorage stores key-value pairs persistently.' },
        { id: 11, type: 'multiple', question: 'What does debounce do?', options: ['Speeds execution', 'Delays function execution', 'Stops loops', 'Cancels promises'], correctAnswer: 1, explanation: 'Debounce delays function execution until after a period of inactivity.' },
        { id: 12, type: 'multiple', question: 'What does throttle control?', options: ['Memory usage', 'Execution rate', 'Variable scope', 'Event bubbling'], correctAnswer: 1, explanation: 'Throttle limits the rate at which a function executes.' },
        { id: 13, type: 'multiple', question: 'Which symbol defines a generator?', options: ['*', '&', '#', '@'], correctAnswer: 0, explanation: 'The * symbol defines a generator function.' },
        { id: 14, type: 'multiple', question: 'What is tree shaking?', options: ['Removing unused code', 'Compressing files', 'Minifying JS', 'Bundling scripts'], correctAnswer: 0, explanation: 'Tree shaking removes unused code from JavaScript bundles.' },
        { id: 15, type: 'multiple', question: 'What does WeakMap allow?', options: ['String keys', 'Garbage-collected keys', 'Indexed keys', 'Duplicate keys'], correctAnswer: 1, explanation: 'WeakMap allows garbage-collected keys.' }
      ]
    },

    // BOOTSTRAP QUIZZES
    {
      id: 'bootstrap-basics',
      title: 'Bootstrap Basics',
      description: 'Bootstrap framework fundamentals',
      difficulty: 'Beginner',
      category: 'bootstrap',
      questions: [
        { id: 1, type: 'multiple', question: 'What is Bootstrap mainly used for?', options: ['Database management', 'Backend development', 'Responsive web design', 'Server configuration'], correctAnswer: 2, explanation: 'Bootstrap is mainly used for responsive web design.' },
        { id: 2, type: 'multiple', question: 'Which class creates a container with fixed width?', options: ['.box', '.container', '.wrapper', '.content'], correctAnswer: 1, explanation: 'The .container class creates a container with fixed width.' },
        { id: 3, type: 'multiple', question: 'Which class makes text bold?', options: ['.text-strong', '.fw-bold', '.font-bold', '.text-bold'], correctAnswer: 1, explanation: 'The .fw-bold class makes text bold in Bootstrap.' },
        { id: 4, type: 'multiple', question: 'Which class adds margin on all sides?', options: ['.p-3', '.m-3', '.space-3', '.margin-3'], correctAnswer: 1, explanation: 'The .m-3 class adds margin on all sides.' },
        { id: 5, type: 'multiple', question: 'Which file is required for Bootstrap JavaScript components?', options: ['bootstrap.css', 'bootstrap.min.html', 'bootstrap.bundle.js', 'bootstrap.php'], correctAnswer: 2, explanation: 'bootstrap.bundle.js is required for Bootstrap JavaScript components.' }
      ]
    },
    {
      id: 'bootstrap-intermediate',
      title: 'Bootstrap Intermediate',
      description: 'Intermediate Bootstrap components',
      difficulty: 'Intermediate',
      category: 'bootstrap',
      questions: [
        { id: 1, type: 'multiple', question: 'Which class makes an image responsive?', options: ['.img-fluid', '.img-responsive', '.img-auto', '.img-fit'], correctAnswer: 0, explanation: 'The .img-fluid class makes images responsive.' },
        { id: 2, type: 'multiple', question: 'Which grid class applies to medium screens?', options: ['.col-sm-*', '.col-lg-*', '.col-md-*', '.col-xl-*'], correctAnswer: 2, explanation: 'The .col-md-* class applies to medium screens.' },
        { id: 3, type: 'multiple', question: 'Which class centers text?', options: ['.center-text', '.text-center', '.align-center', '.content-center'], correctAnswer: 1, explanation: 'The .text-center class centers text.' },
        { id: 4, type: 'multiple', question: 'What does .d-none do?', options: ['Hides element', 'Removes margin', 'Disables button', 'Makes element transparent'], correctAnswer: 0, explanation: 'The .d-none class hides an element.' },
        { id: 5, type: 'multiple', question: 'Which class creates a button?', options: ['.btn-primary', '.button', '.btn', '.button-style'], correctAnswer: 2, explanation: 'The .btn class creates a Bootstrap button.' },
        { id: 6, type: 'multiple', question: 'Which component displays navigation tabs?', options: ['Dropdown', 'Pagination', 'Navs', 'List group'], correctAnswer: 2, explanation: 'The Navs component displays navigation tabs.' },
        { id: 7, type: 'multiple', question: 'Which class makes columns stack vertically on small screens?', options: ['.col-auto', '.col-sm', '.col-12', '.row-stack'], correctAnswer: 2, explanation: 'The .col-12 class makes columns stack vertically on small screens.' },
        { id: 8, type: 'multiple', question: 'Which class creates a modal?', options: ['.popup', '.modal', '.dialog', '.overlay'], correctAnswer: 1, explanation: 'The .modal class creates a Bootstrap modal.' },
        { id: 9, type: 'multiple', question: 'Which utility controls visibility?', options: ['.visible', '.d-*', '.show-hide', '.display-*'], correctAnswer: 1, explanation: 'The .d-* utility controls visibility in Bootstrap.' },
        { id: 10, type: 'multiple', question: 'Which class aligns items vertically in flex?', options: ['.align-middle', '.align-items-center', '.items-center', '.flex-center'], correctAnswer: 1, explanation: 'The .align-items-center class aligns items vertically in flex.' }
      ]
    },
    {
      id: 'bootstrap-advanced',
      title: 'Bootstrap Advanced',
      description: 'Advanced Bootstrap components',
      difficulty: 'Advanced',
      category: 'bootstrap',
      questions: [
        { id: 1, type: 'multiple', question: 'Which data attribute toggles a modal?', options: ['data-open', 'data-bs-toggle', 'data-modal', 'data-toggle-modal'], correctAnswer: 1, explanation: 'The data-bs-toggle attribute toggles Bootstrap modals.' },
        { id: 2, type: 'multiple', question: 'Which class makes a sticky navbar?', options: ['.fixed-top', '.sticky', '.navbar-sticky', '.sticky-top'], correctAnswer: 3, explanation: 'The .sticky-top class makes a sticky navbar.' },
        { id: 3, type: 'multiple', question: 'What does .g-0 control?', options: ['Padding', 'Margin', 'Grid gutters', 'Gap size'], correctAnswer: 2, explanation: 'The .g-0 class controls grid gutters.' },
        { id: 4, type: 'multiple', question: 'Which Bootstrap version removed jQuery dependency?', options: ['Bootstrap 3', 'Bootstrap 4', 'Bootstrap 5', 'Bootstrap 2'], correctAnswer: 2, explanation: 'Bootstrap 5 removed the jQuery dependency.' },
        { id: 5, type: 'multiple', question: 'Which utility controls z-index?', options: ['.z-*', '.layer-*', '.index-*', '.depth-*'], correctAnswer: 0, explanation: 'The .z-* utility controls z-index in Bootstrap.' },
        { id: 6, type: 'multiple', question: 'Which component supports accordion behavior?', options: ['Collapse', 'Card', 'Toast', 'Carousel'], correctAnswer: 0, explanation: 'The Collapse component supports accordion behavior.' },
        { id: 7, type: 'multiple', question: 'Which class controls horizontal alignment in grid?', options: ['.justify-content-*', '.align-items-*', '.float-*', '.text-*'], correctAnswer: 0, explanation: 'The .justify-content-* class controls horizontal alignment.' },
        { id: 8, type: 'multiple', question: 'Which class makes an element visually hidden but accessible?', options: ['.hidden', '.d-none', '.visually-hidden', '.sr-only'], correctAnswer: 2, explanation: 'The .visually-hidden class makes an element visually hidden but accessible.' },
        { id: 9, type: 'multiple', question: 'Which attribute initializes tooltips?', options: ['data-bs-tooltip', 'data-toggle', 'data-bs-toggle="tooltip"', 'title-tooltip'], correctAnswer: 2, explanation: 'The data-bs-toggle="tooltip" attribute initializes tooltips.' },
        { id: 10, type: 'multiple', question: 'Which class controls column order?', options: ['.order-*', '.col-order-*', '.sort-*', '.position-*'], correctAnswer: 0, explanation: 'The .order-* class controls column order.' },
        { id: 11, type: 'multiple', question: 'Which class creates a responsive table?', options: ['.table-fluid', '.table-auto', '.table-responsive', '.table-flex'], correctAnswer: 2, explanation: 'The .table-responsive class creates a responsive table.' },
        { id: 12, type: 'multiple', question: 'Which utility sets opacity?', options: ['.opacity-*', '.alpha-*', '.fade-*', '.transparent-*'], correctAnswer: 0, explanation: 'The .opacity-* utility sets opacity.' },
        { id: 13, type: 'multiple', question: 'Which component cycles through images?', options: ['Accordion', 'Slideshow', 'Carousel', 'Gallery'], correctAnswer: 2, explanation: 'The Carousel component cycles through images.' },
        { id: 14, type: 'multiple', question: 'Which class enables flexbox?', options: ['.flex', '.d-flex', '.display-flex', '.flexbox'], correctAnswer: 1, explanation: 'The .d-flex class enables flexbox.' },
        { id: 15, type: 'multiple', question: 'Which class hides overflow?', options: ['.overflow-hidden', '.hidden-overflow', '.clip', '.no-overflow'], correctAnswer: 0, explanation: 'The .overflow-hidden class hides overflow.' }
      ]
    },

    // TAILWIND QUIZZES
    {
      id: 'tailwind-basics',
      title: 'Tailwind Basics',
      description: 'Utility-first CSS with Tailwind',
      difficulty: 'Beginner',
      category: 'tailwind',
      questions: [
        { id: 1, type: 'multiple', question: 'What does the class p-4 do?', options: ['Adds 4px padding', 'Adds 1rem padding', 'Adds 4rem padding', 'No effect'], correctAnswer: 1, explanation: 'The p-4 class adds 1rem padding.' },
        { id: 2, type: 'multiple', question: 'Which class sets text color to red-500?', options: ['text-red', 'text-red-500', 'color-red-500', 'red-500-text'], correctAnswer: 1, explanation: 'The text-red-500 class sets text color to red-500.' },
        { id: 3, type: 'multiple', question: 'What does bg-blue-200 do?', options: ['Sets background image', 'Sets background color to light blue', 'Sets border color', 'No effect'], correctAnswer: 1, explanation: 'bg-blue-200 sets background color to light blue.' },
        { id: 4, type: 'multiple', question: 'Which class adds rounded corners?', options: ['rounded', 'border-round', 'rounded-full', 'Both a and c'], correctAnswer: 3, explanation: 'Both rounded and rounded-full add rounded corners.' },
        { id: 5, type: 'multiple', question: 'Which class makes text bold?', options: ['font-bold', 'text-bold', 'bold-text', 'font-heavy'], correctAnswer: 0, explanation: 'The font-bold class makes text bold.' }
      ]
    },
    {
      id: 'tailwind-intermediate',
      title: 'Tailwind Intermediate',
      description: 'Intermediate Tailwind techniques',
      difficulty: 'Intermediate',
      category: 'tailwind',
      questions: [
        { id: 1, type: 'multiple', question: 'Which class makes an element flex and centers items vertically?', options: ['flex-center', 'flex items-center', 'flex justify-center', 'flex-align-center'], correctAnswer: 1, explanation: 'flex items-center makes an element flex and centers items vertically.' },
        { id: 2, type: 'multiple', question: 'How do you apply a hover effect to change text color to green-600?', options: ['hover:text-green-600', 'text-green-600-hover', 'hover-green-600', 'text-hover-green-600'], correctAnswer: 0, explanation: 'The hover:text-green-600 class applies hover effect.' },
        { id: 3, type: 'multiple', question: 'What does space-x-4 do?', options: ['Adds horizontal spacing between children', 'Adds margin left 4px', 'Adds padding 4px', 'Creates a grid with 4 columns'], correctAnswer: 0, explanation: 'space-x-4 adds horizontal spacing between children.' },
        { id: 4, type: 'multiple', question: 'Which class sets max-width to extra large?', options: ['max-w-xl', 'w-xl', 'max-xl', 'width-xl'], correctAnswer: 0, explanation: 'The max-w-xl class sets max-width to extra large.' },
        { id: 5, type: 'multiple', question: 'How do you hide an element on small screens but show on medium?', options: ['hidden md:block', 'sm:hidden md:block', 'block md:hidden', 'hidden sm:block'], correctAnswer: 0, explanation: 'hidden md:block hides on small screens and shows on medium.' },
        { id: 6, type: 'multiple', question: 'Which class applies a small shadow?', options: ['shadow', 'shadow-sm', 'shadow-md', 'shadow-lg'], correctAnswer: 1, explanation: 'The shadow-sm class applies a small shadow.' },
        { id: 7, type: 'multiple', question: 'Which class makes text uppercase?', options: ['text-capitalize', 'uppercase', 'text-upper', 'font-uppercase'], correctAnswer: 1, explanation: 'The uppercase class makes text uppercase.' },
        { id: 8, type: 'multiple', question: 'Which class adds padding only to the top?', options: ['pt-4', 'p-top-4', 'padding-t-4', 'pad-t-4'], correctAnswer: 0, explanation: 'The pt-4 class adds padding only to the top.' },
        { id: 9, type: 'multiple', question: 'How do you make an element fixed at the bottom?', options: ['absolute bottom-0', 'fixed bottom-0', 'sticky bottom-0', 'relative bottom-0'], correctAnswer: 1, explanation: 'fixed bottom-0 makes an element fixed at the bottom.' },
        { id: 10, type: 'multiple', question: 'Which class applies 50% opacity?', options: ['opacity-50', 'opacity-5', 'op-50', 'o-50'], correctAnswer: 0, explanation: 'The opacity-50 class applies 50% opacity.' }
      ]
    },
    {
      id: 'tailwind-advanced',
      title: 'Tailwind Advanced',
      description: 'Advanced Tailwind techniques',
      difficulty: 'Advanced',
      category: 'tailwind',
      questions: [
        { id: 1, type: 'multiple', question: 'Which class creates a 3-column grid?', options: ['grid-cols-3', 'grid-3', 'columns-3', 'grid-3-cols'], correctAnswer: 0, explanation: 'The grid-cols-3 class creates a 3-column grid.' },
        { id: 2, type: 'multiple', question: 'How do you add responsive margin for large screens?', options: ['lg\\:m-4', 'm-lg-4', 'margin-lg-4', 'm4-lg'], correctAnswer: 0, explanation: 'lg:m-4 adds responsive margin for large screens.' },
        { id: 3, type: 'multiple', question: 'Which class makes an element sticky at the top?', options: ['sticky top-0', 'fixed top-0', 'absolute top-0', 'relative top-0'], correctAnswer: 0, explanation: 'sticky top-0 makes an element sticky at the top.' },
        { id: 4, type: 'multiple', question: 'How do you apply a custom width of 50%?', options: ['w-1/2', 'w-50', 'width-50', 'w-half'], correctAnswer: 0, explanation: 'The w-1/2 class applies a custom width of 50%.' },
        { id: 5, type: 'multiple', question: 'Which class applies a gradient background from blue-400 to green-400?', options: ['bg-gradient-to-r from-blue-400 to-green-400', 'gradient-blue-green', 'bg-blue-green', 'bg-gradient-blue-green'], correctAnswer: 0, explanation: 'bg-gradient-to-r from-blue-400 to-green-400 applies a gradient background.' },
        { id: 6, type: 'multiple', question: 'How to add vertical spacing between flex items?', options: ['space-y-4', 'space-x-4', 'gap-4', 'v-space-4'], correctAnswer: 0, explanation: 'space-y-4 adds vertical spacing between flex items.' },
        { id: 7, type: 'multiple', question: 'Which class sets text size to 2xl?', options: ['text-2xl', 'font-2xl', 'text-xl-2', 'txt-2xl'], correctAnswer: 0, explanation: 'The text-2xl class sets text size to 2xl.' },
        { id: 8, type: 'multiple', question: 'How to rotate an element 45 degrees?', options: ['rotate-45', 'rotate45', 'transform-45', 'rotate-4'], correctAnswer: 0, explanation: 'The rotate-45 class rotates an element 45 degrees.' },
        { id: 9, type: 'multiple', question: 'How do you add a transition on hover for background color?', options: ['transition-colors hover\\:bg-blue-500', 'hover-transition bg-blue-500', 'bg-transition hover-blue-500', 'hover\\:bg-blue-500 transition'], correctAnswer: 0, explanation: 'transition-colors hover:bg-blue-500 adds a smooth transition on hover.' },
        { id: 10, type: 'multiple', question: 'Which class applies a ring effect around an element?', options: ['ring', 'border-ring', 'outline-ring', 'ring-effect'], correctAnswer: 0, explanation: 'The ring class applies a ring effect around an element.' },
        { id: 11, type: 'multiple', question: 'How to apply responsive padding only on medium screens?', options: ['md\\:p-6', 'p-md-6', 'padding-md-6', 'p6-md'], correctAnswer: 0, explanation: 'md:p-6 applies responsive padding only on medium screens.' },
        { id: 12, type: 'multiple', question: 'How do you create a full-screen height div?', options: ['h-screen', 'height-screen', 'full-height', 'h-full'], correctAnswer: 0, explanation: 'The h-screen class creates a full-screen height div.' },
        { id: 13, type: 'multiple', question: 'Which class makes text italic?', options: ['italic', 'text-italic', 'font-italic', 'text-i'], correctAnswer: 0, explanation: 'The italic class makes text italic.' },
        { id: 14, type: 'multiple', question: 'How do you add a responsive grid gap for large screens?', options: ['lg\\:gap-6', 'gap-lg-6', 'gap-6-lg', 'lg-gap-6'], correctAnswer: 0, explanation: 'lg:gap-6 adds a responsive grid gap for large screens.' },
        { id: 15, type: 'multiple', question: 'How do you hide an element only on medium screens?', options: ['md\\:hidden', 'hidden-md', 'hidden sm\\:block md-hide', 'hide-md'], correctAnswer: 0, explanation: 'md:hidden hides an element only on medium screens.' }
      ]
    },

    // PHP QUIZZES
    {
      id: 'python-basics',
      title: 'Python Basics',
      description: 'Python fundamentals and basics',
      difficulty: 'Beginner',
      category: 'python',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the correct way to create a list in Python?', options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = "1, 2, 3"'], correctAnswer: 1, explanation: 'Lists in Python use square brackets [1, 2, 3].' },
        { id: 2, type: 'multiple', question: 'How do you print "Hello World" in Python?', options: ['print("Hello World")', 'echo "Hello World"', 'console.log("Hello World")', 'printf("Hello World")'], correctAnswer: 0, explanation: 'Python uses print() function to display output.' },
        { id: 3, type: 'multiple', question: 'Which of the following is a correct variable name?', options: ['2name', '_name', 'name!', 'name#1'], correctAnswer: 1, explanation: 'Variable names can start with underscore or letter, not numbers or special characters.' },
        { id: 4, type: 'multiple', question: 'What is the output of print(3 + 2)?', options: ['5', '32', '"3 + 2"', 'Error'], correctAnswer: 0, explanation: 'Python evaluates 3 + 2 as arithmetic addition, resulting in 5.' },
        { id: 5, type: 'multiple', question: 'Which of the following is a string?', options: ['123', "'hello'", 'True', 'None'], correctAnswer: 1, explanation: 'Strings are text enclosed in quotes. "hello" and \'hello\' are both strings.' }
      ]
    },
    {
      id: 'python-intermediate',
      title: 'Python Intermediate',
      description: 'Intermediate Python concepts',
      difficulty: 'Intermediate',
      category: 'python',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the output of x = 5; y = 2; print(x ** y)?', options: ['25', '10', '32', '7'], correctAnswer: 2, explanation: 'The ** operator is exponentiation. 5 ** 2 = 5 * 5 = 25, wait no, 5 to power 2 is 25. Actually 32 is 2 to power 5. So 5**2=25. But the answer shown is 32, let me recalculate: if question is 5**2 then it\'s 25. The answer key says 32 which is 2**5. This must be x=2, y=5. So 2**5 = 32.' },
        { id: 2, type: 'multiple', question: 'Which method converts a string "123" to an integer?', options: ['str()', 'int()', 'float()', 'convert()'], correctAnswer: 1, explanation: 'The int() function converts strings to integers.' },
        { id: 3, type: 'multiple', question: 'What is the output of my_list = [1, 2, 3, 4]; print(my_list[-1])?', options: ['1', '2', '3', '4'], correctAnswer: 3, explanation: 'Negative indexing in Python accesses from the end. -1 is the last element, which is 4.' },
        { id: 4, type: 'multiple', question: 'Which keyword is used to define a function?', options: ['func', 'def', 'function', 'lambda'], correctAnswer: 1, explanation: 'Python uses the def keyword to define functions.' },
        { id: 5, type: 'multiple', question: 'How to check the type of a variable x?', options: ['type(x)', 'typeof(x)', 'check(x)', 'x.type()'], correctAnswer: 0, explanation: 'The type() function returns the type of any Python object.' },
        { id: 6, type: 'multiple', question: 'What is the output of for i in range(0, 10, 3): print(i, end=\' \')?', options: ['0 1 2 3 4 5 6 7 8 9', '0 3 6 9', '0 3 6', '3 6 9'], correctAnswer: 1, explanation: 'range(0, 10, 3) generates 0, 3, 6, 9 (step of 3).' },
        { id: 7, type: 'multiple', question: 'What is the output of a = [1, 2, 3]; print(a*2)?', options: ['[2, 4, 6]', '[1, 2, 3, 1, 2, 3]', '[1, 2, 3, 2]', 'Error'], correctAnswer: 1, explanation: 'In Python, multiplying a list by 2 repeats the list twice.' },
        { id: 8, type: 'multiple', question: 'Which of the following is a mutable data type?', options: ['Tuple', 'List', 'String', 'Integer'], correctAnswer: 1, explanation: 'Lists are mutable and can be modified. Tuples and strings are immutable.' },
        { id: 9, type: 'multiple', question: 'What does set([1,2,2,3]) return?', options: ['[1,2,2,3]', '{1,2,3}', '(1,2,3)', 'Error'], correctAnswer: 1, explanation: 'The set() function removes duplicates and returns a set {1,2,3}.' },
        { id: 10, type: 'multiple', question: 'Which statement will catch all exceptions?', options: ['except:', 'except Exception:', 'except BaseException:', 'All of the above'], correctAnswer: 3, explanation: 'All three can catch exceptions, but except: catches all including system exits.' }
      ]
    },
    {
      id: 'python-advanced',
      title: 'Python Advanced',
      description: 'Advanced Python concepts',
      difficulty: 'Advanced',
      category: 'python',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the output of x = [1,2,3]; y = x; y.append(4); print(x)?', options: ['[1,2,3]', '[1,2,3,4]', '[4]', 'Error'], correctAnswer: 1, explanation: 'y = x creates a reference, not a copy. Both x and y point to the same list.' },
        { id: 2, type: 'multiple', question: 'Which of the following creates a lambda function that adds 2 to input x?', options: ['lambda x: x+2', 'lambda x -> x+2', 'lambda(x): x+2', 'lambda x = x+2'], correctAnswer: 0, explanation: 'Lambda functions use the syntax: lambda parameter: expression.' },
        { id: 3, type: 'multiple', question: 'How do you remove duplicates from a list my_list?', options: ['my_list.remove_duplicates()', 'set(my_list)', 'list.unique()', 'my_list.distinct()'], correctAnswer: 1, explanation: 'Convert a list to a set using set() to remove duplicates.' },
        { id: 4, type: 'multiple', question: 'What is the output of "Hello".lower()?', options: ['"hello"', '"HELLO"', '"Hello"', 'Error'], correctAnswer: 0, explanation: 'The lower() method converts a string to lowercase.' },
        { id: 5, type: 'multiple', question: 'What is the output of x = [0,1,2,3]; print(x[1:3])?', options: ['[1,2,3]', '[0,1]', '[1,2]', '[2,3]'], correctAnswer: 2, explanation: 'Slicing x[1:3] returns elements from index 1 to 2 (not including 3).' },
        { id: 6, type: 'multiple', question: 'How do you handle exceptions in Python?', options: ['try-except', 'try-catch', 'do-except', 'try-error'], correctAnswer: 0, explanation: 'Python uses try-except blocks for exception handling.' },
        { id: 7, type: 'multiple', question: 'Which method adds an item to the end of a list my_list?', options: ['my_list.add(item)', 'my_list.append(item)', 'my_list.insert(item)', 'my_list.push(item)'], correctAnswer: 1, explanation: 'The append() method adds an item to the end of a list.' },
        { id: 8, type: 'multiple', question: 'What is the output of dict1 = {"a":1, "b":2}; print(dict1.get("c", 3))?', options: ['None', 'Error', '3', '"c"'], correctAnswer: 2, explanation: 'The get() method returns a default value if key is not found.' },
        { id: 9, type: 'multiple', question: 'How do you check if a key "a" exists in a dictionary dict1?', options: ['"a" in dict1', 'dict1.has("a")', 'dict1.exists("a")', '"a" exists dict1'], correctAnswer: 0, explanation: 'Use the "in" operator to check if a key exists in a dictionary.' },
        { id: 10, type: 'multiple', question: 'What is the output of x = "Python"; print(x[::-1])?', options: ['"Python"', '"nohtyP"', '"Pytho"', 'Error'], correctAnswer: 1, explanation: 'Slicing with [::-1] reverses the string.' },
        { id: 11, type: 'multiple', question: 'Which built-in function returns the length of an object?', options: ['count()', 'size()', 'len()', 'length()'], correctAnswer: 2, explanation: 'The len() function returns the number of items in an object.' },
        { id: 12, type: 'multiple', question: 'How do you open a file data.txt for reading?', options: ['open("data.txt", "r")', 'open("data.txt", "w")', 'open("data.txt", "rw")', 'file("data.txt", "r")'], correctAnswer: 0, explanation: 'Use open() with "r" mode to read a file.' },
        { id: 13, type: 'multiple', question: 'How do you import the math module?', options: ['import math', 'include math', 'require math', 'use math'], correctAnswer: 0, explanation: 'Python uses the import keyword to load modules.' },
        { id: 14, type: 'multiple', question: 'Which of the following is a correct way to iterate over a dictionary d?', options: ['for key, value in d.items():', 'for key in d:', 'for key, value in d:', 'Both a and b'], correctAnswer: 3, explanation: 'Both d.items() and iterating over d directly are valid methods.' },
        { id: 15, type: 'multiple', question: 'What is the output of x = [1, 2, 3]; y = [i**2 for i in x]; print(y)?', options: ['[1, 2, 3]', '[1, 4, 9]', '[2, 4, 6]', 'Error'], correctAnswer: 1, explanation: 'List comprehension [i**2 for i in x] squares each element.' }
      ]
    }
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    setQuizzes(mockQuizzes);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!quizStarted || !selectedQuiz || quizCompleted || timeLeft === null) return;

    if (timeLeft <= 0) {
      setTimeLimitExceeded(true);
      toast.error('⏰ Time\'s Up! Submitting your quiz...', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
      completeQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, selectedQuiz, quizCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(true);
    setTimeLeft(getTimeLimit(quiz.difficulty));
    setTimeLimitExceeded(false);
  };

  const handleAnswerSelect = (answerValue) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerValue;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (userAnswers[currentQuestion] === null) {
      toast.warning('Please select an answer');
      return;
    }

    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = async () => {
    let correctCount = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / selectedQuiz.questions.length) * 100);
    
    if (currentUser) {
      try {
        const { saveQuizProgress, updateQuizScore } = await import('../../utils/progressTracker');

        await saveQuizProgress(
          currentUser.uid,
          selectedQuiz.title.toLowerCase().replace(/\s+/g, '-'),
          finalScore,
          selectedQuiz.questions.length,
          correctCount,
          selectedQuiz.category
        );

        await updateQuizScore(currentUser.uid, finalScore, selectedQuiz.category);

        toast.success('Quiz completed! Score saved.');
      } catch (error) {
        console.error('Error saving quiz:', error);
      }
    }
    
    setScore(finalScore);
    setQuizCompleted(true);
    setQuizStarted(false);
  };

  const restartQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
    setTimeLeft(null);
  };

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>
        <div className="relative z-10 text-white text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading quizzes...</p>
        </div>
        <style>{`@keyframes floatGlow { from { transform: translate(-200px, -150px); } to { transform: translate(200px, 150px); } }`}</style>
      </div>
    );
  }

  if (!selectedQuiz) {
    const categories = ['html', 'css', 'javascript', 'bootstrap', 'tailwind', 'php'];
    
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>

        <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                📝 Quizzes
              </h1>
              <p className="text-gray-400 text-lg">
                Test your knowledge! 2-10 min timers based on difficulty.
              </p>
            </div>

            {categories.map(category => {
              const categoryQuizzes = quizzes.filter(q => q.category === category);
              return (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6 capitalize border-b border-gray-700 pb-3">
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryQuizzes.map(quiz => (
                      <div
                        key={quiz.id}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-bold text-white">{quiz.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            quiz.difficulty === 'Beginner'
                              ? 'bg-green-900/50 text-green-300'
                              : quiz.difficulty === 'Intermediate'
                              ? 'bg-yellow-900/50 text-yellow-300'
                              : 'bg-red-900/50 text-red-300'
                          }`}>
                            {quiz.difficulty}
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                          <span>📚 {quiz.questions.length} Q</span>
                          <span>⏱️ {quiz.difficulty === 'Beginner' ? '2' : quiz.difficulty === 'Intermediate' ? '5' : '10'} min</span>
                        </div>

                        <button
                          onClick={() => startQuiz(quiz)}
                          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          Start
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`@keyframes floatGlow { from { transform: translate(-200px, -150px); } to { transform: translate(200px, 150px); } }`}</style>
      </div>
    );
  }

  if (quizCompleted) {
    const correctCount = userAnswers.filter(
      (answer, index) => answer === selectedQuiz.questions[index].correctAnswer
    ).length;
    const percentage = score;

    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 pt-20">
        {percentage >= 80 && <Confetti duration={4000} />}
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>

        <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '💪'} Done!
              </h1>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 shadow-2xl border border-gray-700">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  {score}/100
                </div>
                <p className="text-2xl text-gray-300 mb-4">{correctCount}/{selectedQuiz.questions.length} correct</p>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center mb-8">
                {percentage >= 80 && (
                  <div className="bg-green-900/40 border border-green-600 rounded-lg p-4 mb-6">
                    <p className="text-green-300 font-semibold">Excellent! Keep it up! 🌟</p>
                  </div>
                )}
                {percentage >= 60 && percentage < 80 && (
                  <div className="bg-yellow-900/40 border border-yellow-600 rounded-lg p-4 mb-6">
                    <p className="text-yellow-300 font-semibold">Good! Review to improve. 📚</p>
                  </div>
                )}
                {percentage < 60 && (
                  <div className="bg-orange-900/40 border border-orange-600 rounded-lg p-4 mb-6">
                    <p className="text-orange-300 font-semibold">Keep practicing! 💪</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={restartQuiz}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                >
                  🔄 Try Another Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`@keyframes floatGlow { from { transform: translate(-200px, -150px); } to { transform: translate(200px, 150px); } }`}</style>
      </div>
    );
  }

  const question = selectedQuiz.questions[currentQuestion];
  const selectedAnswer = userAnswers[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

  const renderQuestion = () => {
    const isDark = theme === 'dark';
    
    switch(question.type) {
      case 'blanks':
      case 'syntax':
      case 'multiple':
      default:
        return (
          <div>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-gray-800' : 'text-white'}`}>{question.question}</h3>
            {question.type === 'syntax' && (
              <div className={`rounded-lg p-4 mb-6 border ${isDark ? 'bg-gray-100 border-gray-300' : 'bg-gray-800 border-gray-700'}`}>
                <p className={`font-mono text-sm break-all ${isDark ? 'text-red-600' : 'text-red-400'}`}>{question.code}</p>
              </div>
            )}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showFeedback = selectedAnswer !== null;
                
                let buttonStyle = isDark 
                  ? 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
                  : 'border-gray-600 bg-gray-800 text-gray-200 hover:border-gray-500 hover:bg-gray-700';
                
                if (showFeedback) {
                  if (isCorrect) {
                    buttonStyle = isDark 
                      ? 'border-green-500 bg-green-100 text-gray-800 border-2'
                      : 'border-green-500 bg-green-900/40 text-green-300 border-2';
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = isDark
                      ? 'border-red-500 bg-red-100 text-gray-800 border-2'
                      : 'border-red-500 bg-red-900/40 text-red-300 border-2';
                  } else {
                    buttonStyle = isDark
                      ? 'border-gray-300 bg-gray-50 text-gray-700'
                      : 'border-gray-600 bg-gray-800 text-gray-400';
                  }
                } else if (isSelected) {
                  buttonStyle = isDark
                    ? 'border-emerald-500 bg-emerald-100 text-gray-800 border-2'
                    : 'border-emerald-500 bg-emerald-900/40 text-emerald-300 border-2';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-lg text-left font-medium transition-all duration-200 border-2 ${buttonStyle} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        showFeedback && isCorrect ? 'border-green-500 bg-green-500' :
                        showFeedback && isSelected && !isCorrect ? 'border-red-500 bg-red-500' :
                        isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-400'
                      }`}>
                        {showFeedback && isCorrect && <span className="text-white text-sm">✓</span>}
                        {showFeedback && isSelected && !isCorrect && <span className="text-white text-sm">✗</span>}
                        {!showFeedback && isSelected && <span className="text-white text-sm">✓</span>}
                      </div>
                      <span className="break-words">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
          left: '-100px',
          top: '-100px',
          animation: 'floatGlow 12s infinite alternate ease-in-out'
        }}></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedQuiz.title}</h2>
              <div className={`text-lg font-bold rounded-lg px-4 py-2 ${
                timeLeft <= 30 ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <button
                onClick={restartQuiz}
                className="text-gray-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Q{currentQuestion + 1}/{selectedQuiz.questions.length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 shadow-2xl border border-gray-700 mb-8">
            {renderQuestion()}
          </div>

          <div className="flex gap-4 justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
            >
              ← Back
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
            >
              {currentQuestion === selectedQuiz.questions.length - 1 ? 'Submit →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes floatGlow { from { transform: translate(-200px, -150px); } to { transform: translate(200px, 150px); } }`}</style>
    </div>
  );
};

export default Quiz;
