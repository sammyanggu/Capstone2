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
        { id: 1, type: 'multiple', question: 'What does HTML stand for?', options: ['Home Tool Markup Language', 'Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlinks and Text Markup Language'], correctAnswer: 1, explanation: 'HTML stands for Hyper Text Markup Language.' },
        { id: 2, type: 'multiple', question: 'Which tag is used for the largest heading?', options: ['<h6>', '<h1>', '<heading>', '<head>'], correctAnswer: 1, explanation: 'The <h1> tag is used for the largest heading.' },
        { id: 3, type: 'blanks', question: 'The ___ tag is used to create hyperlinks.', template: 'The ___ tag is used to create hyperlinks.', blank: '<a>', options: ['<url>', '<a>', '<link>', '<href>'], correctAnswer: 1, explanation: 'The <a> tag creates hyperlinks with the href attribute.' },
        { id: 4, type: 'syntax', question: 'Fix the image tag:', code: '<img src="image.jpg">', correctCode: '<img src="image.jpg" alt="description" />', options: ['<img src=image.jpg />', '<img src="image.jpg" alt="description" />', '<image src="image.jpg" />', '<img>image.jpg</img>'], correctAnswer: 1, explanation: 'The img tag should be self-closing and include alt attribute.' },
        { id: 5, type: 'multiple', question: 'What is the purpose of the <meta> tag?', options: ['To link external files', 'To define a variable', 'To define metadata', 'To create a menu'], correctAnswer: 2, explanation: 'The <meta> tag specifies metadata about the HTML document.' }
      ]
    },
    {
      id: 'html-intermediate',
      title: 'HTML Intermediate',
      description: 'Intermediate HTML concepts',
      difficulty: 'Intermediate',
      category: 'html',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the difference between block and inline elements?', options: ['They are the same', 'No difference', 'Inline takes full width', 'Block takes full width, inline wraps content'], correctAnswer: 3, explanation: 'Block elements take full width, inline elements only take needed space.' },
        { id: 2, type: 'blanks', question: 'The ___ attribute specifies a unique identifier for an element.', template: 'The ___ attribute specifies a unique identifier for an element.', blank: 'id', options: ['identifier', 'class', 'name', 'id'], correctAnswer: 0, explanation: 'The id attribute provides a unique identifier for HTML elements.' },
        { id: 3, type: 'syntax', question: 'Fix the form input:', code: '<input type="email">', correctCode: '<input type="email" required>', options: ['<input type="mail">', '<input type="email" required>', '<input email>', '<input type="email" placeholder="Email">'], correctAnswer: 1, explanation: 'Email inputs should have the required attribute or proper type.' },
        { id: 4, type: 'multiple', question: 'What does the <fieldset> tag do?', options: ['Creates a field', 'Groups related form elements', 'Adds borders', 'Creates a form'], correctAnswer: 3, explanation: 'The <fieldset> tag groups related form controls.' },
        { id: 5, type: 'multiple', question: 'What is the <label> tag used for?', options: ['Associates text with form controls', 'Labeling content', 'Creating titles', 'Adding descriptions'], correctAnswer: 2, explanation: 'The <label> tag associates descriptive text with form inputs.' },
        { id: 6, type: 'blanks', question: 'The ___ attribute links a label to a form control.', template: 'The ___ attribute links a label to a form control.', blank: 'for', options: ['for', 'name', 'id', 'target'], correctAnswer: 0, explanation: 'The for attribute on label matches the id of the form element.' },
        { id: 7, type: 'syntax', question: 'Fix the textarea element:', code: '<textarea><textarea/>', correctCode: '<textarea></textarea>', options: ['<text-area></text-area>', '<textarea></textarea>', '<textarea />', '<textarea></textarea>'], correctAnswer: 1, explanation: 'Textarea uses opening and closing tags, not self-closing.' },
        { id: 8, type: 'multiple', question: 'What does the <datalist> element do?', options: ['Lists data', 'Provides autocomplete suggestions', 'Creates a form list', 'Creates a date picker'], correctAnswer: 3, explanation: 'The <datalist> element provides autocomplete suggestions for inputs.' },
        { id: 9, type: 'multiple', question: 'How do you create a multi-line text input?', options: ['<textarea></textarea>', '<input type="multiline">', '<input type="text" rows="5">', '<text-area></text-area>'], correctAnswer: 1, explanation: 'The <textarea> element creates multi-line text input fields.' },
        { id: 10, type: 'blanks', question: 'The ___ attribute prevents form submission without validation.', template: 'The ___ attribute prevents form submission without validation.', blank: 'novalidate', options: ['validate-off', 'novalidate', 'skip-validation', 'no-validate'], correctAnswer: 2, explanation: 'The novalidate attribute disables HTML5 form validation.' }
      ]
    },
    {
      id: 'html-advanced',
      title: 'HTML Advanced',
      description: 'Advanced HTML concepts',
      difficulty: 'Advanced',
      category: 'html',
      questions: [
        { id: 1, type: 'multiple', question: 'What is semantic HTML?', options: ['HTML that uses only div tags', 'HTML that is fast to load', 'HTML that looks good', 'HTML that gives meaning to content'], correctAnswer: 3, explanation: 'Semantic HTML uses tags that describe the meaning of content.' },
        { id: 2, type: 'blanks', question: 'The ___ tag represents independent, self-contained content.', template: 'The ___ tag represents independent, self-contained content.', blank: '<article>', options: ['<section>', '<main>', '<content>', '<article>'], correctAnswer: 3, explanation: 'The <article> tag is used for independent content like blog posts.' },
        { id: 3, type: 'syntax', question: 'Fix semantic HTML structure:', code: '<div><h1>Title</h1><p>Content</p></div>', correctCode: '<article><h1>Title</h1><p>Content</p></article>', options: ['<header><h1>Title</h1><p>Content</p></header>', '<section><h1>Title</h1><p>Content</p></section>', '<main><h1>Title</h1><p>Content</p></main>', '<article><h1>Title</h1><p>Content</p></article>'], correctAnswer: 3, explanation: 'Using <article> instead of <div> improves SEO and accessibility.' },
        { id: 4, type: 'multiple', question: 'What is the purpose of the <canvas> element?', options: ['To create backgrounds', 'To display text', 'To display images', 'To draw graphics via JavaScript'], correctAnswer: 3, explanation: 'The <canvas> element is used to draw graphics with JavaScript.' },
        { id: 5, type: 'multiple', question: 'What does the data attribute allow?', options: ['Creating forms', 'Validating input', 'Storing data in databases', 'Storing custom data on elements'], correctAnswer: 3, explanation: 'Data attributes store custom data on HTML elements for JavaScript.' },
        { id: 6, type: 'multiple', question: 'Which tag defines navigation links?', options: ['<header>', '<section>', '<menu>', '<nav>'], correctAnswer: 3, explanation: 'The <nav> tag represents navigation links.' },
        { id: 7, type: 'blanks', question: 'The ___ element defines a self-contained content with its own heading and footer.', template: 'The ___ element defines a self-contained content with its own heading and footer.', blank: '<section>', options: ['<aside>', '<main>', '<div>', '<section>'], correctAnswer: 3, explanation: 'The <section> element groups thematic content.' },
        { id: 8, type: 'syntax', question: 'Fix the SVG element:', code: '<svg width="100" heght="100"><circle /></svg>', correctCode: '<svg width="100" height="100"><circle /></svg>', options: ['<svg="100x100"><circle /></svg>', '<svg w="100" h="100"><circle /></svg>', '<svg width="100" height="100"><circle></circle></svg>', '<svg width="100" height="100"><circle /></svg>'], correctAnswer: 3, explanation: 'SVG attributes use "height" not "heght".' },
        { id: 9, type: 'multiple', question: 'What is the <figure> tag for?', options: ['Creating forms', 'Creating charts', 'Illustrating diagrams', 'Wrapping self-contained illustrations'], correctAnswer: 3, explanation: 'The <figure> tag wraps illustrations, diagrams, and photos.' },
        { id: 10, type: 'multiple', question: 'How do you embed video in HTML?', options: ['<media> tag', '<embed> tag', '<object> tag', '<video> tag'], correctAnswer: 3, explanation: 'The <video> tag is used to embed videos.' },
        { id: 11, type: 'blanks', question: 'The ___ element displays content only when JavaScript is disabled.', template: 'The ___ element displays content only when JavaScript is disabled.', blank: '<noscript>', options: ['<disabled>', '<nofunc>', '<nojs>', '<noscript>'], correctAnswer: 3, explanation: 'The <noscript> tag shows content when JavaScript is disabled.' },
        { id: 12, type: 'syntax', question: 'Fix the audio element:', code: '<audio controls><source src="audio.mp3" type="audio.mpeg" /></audio>', correctCode: '<audio controls><source src="audio.mp3" type="audio/mpeg" /></audio>', options: ['<audio><source src="audio.mp3" /></audio>', '<sound controls><source src="audio.mp3" /></sound>', '<audio controls src="audio.mp3"></audio>', '<audio controls><source src="audio.mp3" type="audio/mpeg" /></audio>'], correctAnswer: 3, explanation: 'The MIME type should be "audio/mpeg" not "audio.mpeg".' },
        { id: 13, type: 'multiple', question: 'What is the <footer> tag used for?', options: ['Creating borders', 'Creating footers for articles', 'Ending sections', 'Defining page footer with copyright etc'], correctAnswer: 3, explanation: 'The <footer> tag defines footer content for sections or pages.' },
        { id: 14, type: 'multiple', question: 'What does the <aside> tag represent?', options: ['A sidebar menu', 'A decoration', 'A side effect', 'Content tangentially related to main content'], correctAnswer: 3, explanation: 'The <aside> tag contains tangentially related content.' },
        { id: 15, type: 'multiple', question: 'How do you make an element invisible but keep space in layout?', options: ['opacity: 0', 'transform: scale(0)', 'display: none', 'visibility: hidden'], correctAnswer: 3, explanation: 'visibility: hidden hides element but keeps space, display: none removes space.' }
      ]
    },

    // CSS QUIZZES
    {
      id: 'css-basics',
      title: 'CSS Selectors',
      description: 'Master CSS selectors',
      difficulty: 'Intermediate',
      category: 'css',
      questions: [
        { id: 1, type: 'multiple', question: 'Which selector targets elements with a class?', options: ['#classname', ':classname', '.classname', '*classname'], correctAnswer: 2, explanation: 'The . (dot) selector targets elements with a specific class.' },
        { id: 2, type: 'blanks', question: 'To change text color, use the ___ property.', template: 'To change text color, use the ___ property.', blank: 'color', options: ['text-color', 'font-color', 'color', 'text-style'], correctAnswer: 2, explanation: 'The color property changes text color in CSS.' },
        { id: 3, type: 'syntax', question: 'Fix the background color syntax:', code: 'element { bg-color: blue; }', correctCode: 'element { background-color: blue; }', options: ['element { back-color: blue; }', 'element { background-color: blue; }', 'element { bg: blue; }', 'element { color-bg: blue; }'], correctAnswer: 1, explanation: 'The correct property is background-color, not bg-color.' },
        { id: 4, type: 'multiple', question: 'Which selector targets elements with an ID?', options: ['.id', ':id', '#id', '$id'], correctAnswer: 2, explanation: 'The # (hash) selector targets elements with a specific ID.' },
        { id: 5, type: 'multiple', question: 'What is the margin property for?', options: ['Border around element', 'Space outside element', 'Space inside element', 'Element width'], correctAnswer: 1, explanation: 'The margin property creates space outside the border.' },
        { id: 6, type: 'blanks', question: 'The ___ property adds space inside an element.', template: 'The ___ property adds space inside an element.', blank: 'padding', options: ['margin', 'padding', 'border', 'space'], correctAnswer: 1, explanation: 'Padding creates space inside the element, between content and border.' },
        { id: 7, type: 'syntax', question: 'Fix the CSS selector for paragraphs:', code: 'p, { color: red; }', correctCode: 'p { color: red; }', options: ['p > { color: red; }', 'p { color: red; }', 'p: { color: red; }', 'p- { color: red; }'], correctAnswer: 1, explanation: 'Remove the comma after p selector.' },
        { id: 8, type: 'multiple', question: 'What does the universal selector (*) do?', options: ['Selects all elements', 'Selects the first element', 'Selects last element', 'Selects by priority'], correctAnswer: 0, explanation: 'The * selector targets all elements on the page.' },
        { id: 9, type: 'multiple', question: 'How do you select a child element?', options: ['Using > symbol', 'Using + symbol', 'Using ~ symbol', 'Using + and >'], correctAnswer: 0, explanation: 'The > (child combinator) selects direct children.' },
        { id: 10, type: 'blanks', question: 'Use the ___ property to control text styling like bold or italic.', template: 'Use the ___ property to control text styling like bold or italic.', blank: 'font-weight or font-style', options: ['color', 'font-weight', 'text-transform', 'text-decoration'], correctAnswer: 1, explanation: 'font-weight controls boldness, font-style controls italics.' }
      ]
    },
    {
      id: 'css-intermediate',
      title: 'CSS Intermediate',
      description: 'Intermediate CSS concepts',
      difficulty: 'Intermediate',
      category: 'css',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the cascade in CSS?', options: ['Water flowing', 'Animation effect', 'Layout technique', 'Style priority order'], correctAnswer: 3, explanation: 'The cascade determines which style applies based on specificity and order.' },
        { id: 2, type: 'blanks', question: 'The ____ property makes an element invisible without removing space.', template: 'The ____ property makes an element invisible without removing space.', blank: 'visibility: hidden', options: ['display: none', 'opacity: 0', 'transform: scale(0)', 'visibility: hidden'], correctAnswer: 3, explanation: 'visibility: hidden hides element but keeps space in layout.' },
        { id: 3, type: 'syntax', question: 'Fix the pseudo-class syntax:', code: 'a:hover { color: red }', correctCode: 'a:hover { color: red; }', options: ['a-hover { color: red; }', 'a:on-hover { color: red; }', 'a::hover { color: red; }', 'a:hover { color: red; }'], correctAnswer: 3, explanation: 'Pseudo-classes use single colon and need semicolon at end.' },
        { id: 4, type: 'multiple', question: 'What does position: relative do?', options: ['Positions relative to viewport', 'Takes element out of flow', 'No effect', 'Positions relative to parent'], correctAnswer: 3, explanation: 'position: relative positions element relative to its normal position.' },
        { id: 5, type: 'multiple', question: 'How do you create a multi-column layout?', options: ['Using display: columns', 'Using grid', 'Using flexbox', 'Using column-count or column-width'], correctAnswer: 3, explanation: 'CSS column-count and column-width create multi-column layouts.' },
        { id: 6, type: 'blanks', question: 'The ___ property controls how text wraps in an element.', template: 'The ___ property controls how text wraps in an element.', blank: 'white-space', options: ['text-wrap', 'word-wrap', 'wrap', 'white-space'], correctAnswer: 3, explanation: 'The white-space property controls text wrapping and spacing.' },
        { id: 7, type: 'syntax', question: 'Fix the transform property:', code: 'transform: rotate(45deg', correctCode: 'transform: rotate(45deg);', options: ['transform: rotate(45);', 'transform: rotate(45deg', 'transform-rotate(45deg);', 'transform: rotate(45deg);'], correctAnswer: 3, explanation: 'Transform properties need parentheses and semicolon.' },
        { id: 8, type: 'multiple', question: 'What is the difference between margin and padding?', options: ['No difference', 'Margin is inside, padding is outside', 'They are the same', 'Margin is outside, padding is inside'], correctAnswer: 3, explanation: 'Margin is outside element, padding is inside element.' },
        { id: 9, type: 'multiple', question: 'What does the @media rule do?', options: ['Adds media', 'Plays sound', 'Controls video', 'Creates responsive styles'], correctAnswer: 3, explanation: 'The @media rule applies styles based on media queries.' },
        { id: 10, type: 'blanks', question: 'The ___ property defines how background images repeat.', template: 'The ___ property defines how background images repeat.', blank: 'background-repeat', options: ['repeat', 'repeat-bg', 'image-repeat', 'background-repeat'], correctAnswer: 3, explanation: 'background-repeat controls if and how bg images repeat.' }
      ]
    },
    {
      id: 'css-advanced',
      title: 'CSS Advanced',
      description: 'Advanced CSS techniques',
      difficulty: 'Advanced',
      category: 'css',
      questions: [
        { id: 1, type: 'multiple', question: 'What is CSS specificity?', options: ['How fast CSS loads', 'CSS file size', 'CSS syntax rules', 'Which style is applied'], correctAnswer: 3, explanation: 'Specificity determines which CSS style is applied to an element.' },
        { id: 2, type: 'blanks', question: 'The CSS Box Model includes content, ___, border, and margin.', template: 'The CSS Box Model includes content, ___, border, and margin.', blank: 'padding', options: ['space', 'gap', 'offset', 'padding'], correctAnswer: 3, explanation: 'The Box Model consists of content, padding, border, and margin.' },
        { id: 3, type: 'syntax', question: 'Fix the Flexbox syntax:', code: '.container { display: flex justify-content: center; }', correctCode: '.container { display: flex; justify-content: center; }', options: ['.container { flex: true; center: yes; }', '.container { flexbox: center; }', '.container { flex-display: center; }', '.container { display: flex; justify-content: center; }'], correctAnswer: 3, explanation: 'Properties must be separated by semicolons.' },
        { id: 4, type: 'multiple', question: 'What does z-index do?', options: ['Determines text size', 'Changes element color', 'Adds animation', 'Sets stacking order'], correctAnswer: 3, explanation: 'The z-index property determines stacking order of positioned elements.' },
        { id: 5, type: 'multiple', question: 'What is Flexbox used for?', options: ['Making elements flexible', 'Bending elements', 'Flexible animations', 'Creating flexible layouts'], correctAnswer: 3, explanation: 'Flexbox is a CSS layout module for flexible layouts.' },
        { id: 6, type: 'blanks', question: 'Use ___ to create a grid layout in CSS.', template: 'Use ___ to create a grid layout in CSS.', blank: 'display: grid', options: ['display: block', 'display: flex', 'display: inline', 'display: grid'], correctAnswer: 3, explanation: 'The display: grid property creates CSS grid layouts.' },
        { id: 7, type: 'syntax', question: 'Fix the media query:', code: '@media (max-width 768px) { }', correctCode: '@media (max-width: 768px) { }', options: ['@media max-width: 768px { }', '@media max-width = 768px { }', '@media [max-width: 768px] { }', '@media (max-width: 768px) { }'], correctAnswer: 3, explanation: 'Media queries require a colon after the property name.' },
        { id: 8, type: 'multiple', question: 'What does transform: translate() do?', options: ['Changes size', 'Rotates elements', 'Skews elements', 'Moves elements'], correctAnswer: 3, explanation: 'translate() moves an element from its current position.' },
        { id: 9, type: 'multiple', question: 'How do you create a smooth transition?', options: ['Using animations', 'Using hover', 'Using keyframes', 'Using transition property'], correctAnswer: 3, explanation: 'The transition property creates smooth property changes.' },
        { id: 10, type: 'blanks', question: 'The ___ property defines how an element behaves relative to its position.', template: 'The ___ property defines how an element behaves relative to its position.', blank: 'position', options: ['location', 'placement', 'alignment', 'position'], correctAnswer: 3, explanation: 'The position property can be static, relative, absolute, fixed, or sticky.' },
        { id: 11, type: 'syntax', question: 'Fix the gradient syntax:', code: 'background: linear-gradient(left, red, blue);', correctCode: 'background: linear-gradient(to right, red, blue);', options: ['background: linear-gradient(90deg, red, blue);', 'background: gradient(right, red, blue);', 'background: linear(red, blue);', 'background: linear-gradient(to right, red, blue);'], correctAnswer: 3, explanation: 'Modern gradient syntax uses "to direction" format.' },
        { id: 12, type: 'multiple', question: 'What does ::before pseudo-element do?', options: ['Selects before hover', 'Selects first element', 'Creates borders', 'Inserts content before element'], correctAnswer: 3, explanation: '::before inserts content before the element content.' },
        { id: 13, type: 'multiple', question: 'How do you center elements with Flexbox?', options: ['justify-content: center', 'align-items: center with justify-content', 'Using margin: auto', 'Both justify-content and align-items center'], correctAnswer: 3, explanation: 'Use both justify-content and align-items for perfect centering.' },
        { id: 14, type: 'blanks', question: 'The ___ property controls the overflow of content.', template: 'The ___ property controls the overflow of content.', blank: 'overflow', options: ['scroll', 'hidden', 'clip', 'overflow'], correctAnswer: 3, explanation: 'The overflow property handles content that exceeds box dimensions.' },
        { id: 15, type: 'multiple', question: 'What is the difference between ::before and :before?', options: ['No difference', 'Single colon is for classes', ':before is older', 'Double colon is new syntax'], correctAnswer: 3, explanation: ':: is new CSS3 syntax for pseudo-elements, : is older.' }
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
        { id: 1, type: 'multiple', question: 'What is JavaScript primarily for?', options: ['Styling web pages', 'Managing databases', 'Making web pages interactive', 'Creating server backends'], correctAnswer: 2, explanation: 'JavaScript makes web pages interactive on the client side.' },
        { id: 2, type: 'blanks', question: 'To declare a variable, use the ___ keyword.', template: 'To declare a variable, use the ___ keyword.', blank: 'let', options: ['declare', 'variable', 'let', 'var'], correctAnswer: 2, explanation: 'Modern JavaScript uses let, const, or var to declare variables.' },
        { id: 3, type: 'syntax', question: 'Fix the function syntax:', code: 'function myFunc( { return 5; }', correctCode: 'function myFunc() { return 5; }', options: ['function myFunc[] { return 5; }', 'function myFunc() { return 5; }', 'func myFunc() { return 5; }', 'function = myFunc() { return 5; }'], correctAnswer: 1, explanation: 'Function parameters go inside parentheses ().' },
        { id: 4, type: 'multiple', question: 'What does DOM stand for?', options: ['Data Object Management', 'Digital Output Module', 'Document Object Model', 'Document Orientation Model'], correctAnswer: 2, explanation: 'DOM stands for Document Object Model.' },
        { id: 5, type: 'multiple', question: 'How do you add an event listener?', options: ['element.addEvent("click", function)', 'element.addEventListener("click", function)', 'element.onEvent("click", function)', 'element.listenEvent("click", function)'], correctAnswer: 1, explanation: 'Use addEventListener to attach event listeners.' }
      ]
    },
    {
      id: 'js-intermediate',
      title: 'JavaScript Intermediate',
      description: 'Intermediate JavaScript concepts',
      difficulty: 'Intermediate',
      category: 'javascript',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the difference between == and ===?', options: ['No difference', '== checks type, === does not', '=== checks type and value', '== is for strings'], correctAnswer: 2, explanation: '=== checks both value and type, == only checks value.' },
        { id: 2, type: 'blanks', question: 'The ___ method returns a new array with elements that pass a test.', template: 'The ___ method returns a new array with elements that pass a test.', blank: 'filter', options: ['filter', 'map', 'reduce', 'find'], correctAnswer: 0, explanation: 'The filter() method creates a new array with elements that pass a condition.' },
        { id: 3, type: 'syntax', question: 'Fix the object destructuring:', code: 'const {x, y} = object', correctCode: 'const {x, y} = object;', options: ['const [x, y] = object;', 'const x, y = object;', 'const x = object.y;', 'const {x, y} = object;'], correctAnswer: 3, explanation: 'Destructuring requires curly braces for objects and a semicolon at the end.' },
        { id: 4, type: 'multiple', question: 'What is callback hell?', options: ['Too many functions', 'Async issues', 'Error handling', 'Nested callbacks'], correctAnswer: 3, explanation: 'Callback hell is deeply nested callback functions.' },
        { id: 5, type: 'multiple', question: 'How do you handle errors in Promises?', options: ['Using try/catch', 'Using .finally()', 'Using .then()', 'Using .catch()'], correctAnswer: 3, explanation: 'Use .catch() to handle Promise rejections.' },
        { id: 6, type: 'blanks', question: 'The ___ method combines all array elements into a single value.', template: 'The ___ method combines all array elements into a single value.', blank: 'reduce', options: ['map', 'filter', 'forEach', 'reduce'], correctAnswer: 3, explanation: 'The reduce() method accumulates array values into a single result.' },
        { id: 7, type: 'syntax', question: 'Fix the arrow function:', code: 'const add = (a, b) => a + b', correctCode: 'const add = (a, b) => a + b;', options: ['const add = (a, b) { return a + b; }', 'const add = a, b => a + b;', 'const add => (a, b) a + b;', 'const add = (a, b) => a + b;'], correctAnswer: 3, explanation: 'Single-line arrow functions still need semicolon at end.' },
        { id: 8, type: 'multiple', question: 'What is the difference between let and var?', options: ['No difference', 'var is block-scoped, let is function-scoped', 'They are the same', 'let is block-scoped, var is function-scoped'], correctAnswer: 3, explanation: 'let has block scope while var has function scope.' },
        { id: 9, type: 'multiple', question: 'What does JSON.stringify() do?', options: ['Parses JSON', 'Creates objects', 'Validates JSON', 'Converts objects to JSON string'], correctAnswer: 3, explanation: 'JSON.stringify() converts JavaScript objects to JSON strings.' },
        { id: 10, type: 'blanks', question: 'The ___ method calls a function for each array element.', template: 'The ___ method calls a function for each array element.', blank: 'forEach', options: ['each', 'loop', 'map', 'forEach'], correctAnswer: 3, explanation: 'forEach() executes a function for each array element.' }
      ]
    },
    {
      id: 'js-advanced',
      title: 'JavaScript Advanced',
      description: 'Advanced JavaScript concepts',
      difficulty: 'Advanced',
      category: 'javascript',
      questions: [
        { id: 1, type: 'multiple', question: 'What is a closure?', options: ['A closed function', 'A type of loop', 'A way to close connections', 'A function accessing outer scope'], correctAnswer: 3, explanation: 'A closure is a function that accesses outer scope variables.' },
        { id: 2, type: 'blanks', question: '___ is for handling asynchronous operations cleanly.', template: '___ is for handling asynchronous operations cleanly.', blank: 'async/await', options: ['Promise', 'Callback', 'setTimeout', 'async/await'], correctAnswer: 3, explanation: 'async/await handles asynchronous operations cleanly.' },
        { id: 3, type: 'syntax', question: 'Fix the async/await syntax:', code: 'async function getData( { const data = await fetch(url); }', correctCode: 'async function getData() { const data = await fetch(url); }', options: ['async getData() { const data = await fetch(url); }', 'function async getData() { const data = await fetch(url); }', 'getData async() { const data = await fetch(url); }', 'async function getData() { const data = await fetch(url); }'], correctAnswer: 3, explanation: 'The function keyword comes before async, with parentheses for parameters.' },
        { id: 4, type: 'multiple', question: 'What is the spread operator (...) for?', options: ['Creating spaces', 'Decorating code', 'Adding numbers', 'Spreading array/object elements'], correctAnswer: 3, explanation: 'The spread operator spreads array/object elements.' },
        { id: 5, type: 'multiple', question: 'What is destructuring?', options: ['Breaking things', 'Destroying variables', 'A type of error', 'Extracting values from objects/arrays'], correctAnswer: 3, explanation: 'Destructuring extracts values into separate variables.' },
        { id: 6, type: 'blanks', question: 'The ___ keyword returns a Promise in an async function.', template: 'The ___ keyword returns a Promise in an async function.', blank: 'return or await', options: ['await', 'throw', 'yield', 'return'], correctAnswer: 3, explanation: 'Using return in an async function wraps the value in a resolved Promise.' },
        { id: 7, type: 'syntax', question: 'Fix the arrow function:', code: 'const add = (a, b) => { a + b }', correctCode: 'const add = (a, b) => { return a + b; }', options: ['const add = (a, b) => a + b;', 'const add = a, b => a + b;', 'const add = (a, b) -> a + b;', 'const add = (a, b) => { return a + b; }'], correctAnswer: 3, explanation: 'Multiline arrow functions need explicit return statement.' },
        { id: 8, type: 'multiple', question: 'What does Array.map() do?', options: ['Finds elements', 'Sorts the array', 'Filters elements', 'Creates a new array with transformed elements'], correctAnswer: 3, explanation: 'map() creates a new array by applying a function to each element.' },
        { id: 9, type: 'multiple', question: 'What is the this keyword?', options: ['A loop keyword', 'A timing function', 'A null value', 'Refers to current object'], correctAnswer: 3, explanation: 'this refers to the current object context.' },
        { id: 10, type: 'blanks', question: 'The ___ method removes the last element from an array.', template: 'The ___ method removes the last element from an array.', blank: 'pop()', options: ['shift()', 'slice()', 'splice()', 'pop()'], correctAnswer: 3, explanation: 'The pop() method removes and returns the last element.' },
        { id: 11, type: 'syntax', question: 'Fix the Promise syntax:', code: 'new Promise((resolve reject) => { })', correctCode: 'new Promise((resolve, reject) => { })', options: ['new Promise(resolve reject => { })', 'Promise((resolve, reject) => { })', 'new Promise(resolve | reject => { })', 'new Promise((resolve, reject) => { })'], correctAnswer: 3, explanation: 'Promise parameters must be separated by commas.' },
        { id: 12, type: 'multiple', question: 'What is .then() used for?', options: ['Comparing values', 'Setting conditions', 'Creating timers', 'Handling Promise resolution'], correctAnswer: 3, explanation: '.then() handles what happens when a Promise resolves.' },
        { id: 13, type: 'multiple', question: 'What is event bubbling?', options: ['Events creating bubbles', 'Creating event listeners', 'Stopping events', 'Events propagating upward'], correctAnswer: 3, explanation: 'Event bubbling is when events propagate from child to parent elements.' },
        { id: 14, type: 'blanks', question: 'Use ___ to prevent default browser behavior.', template: 'Use ___ to prevent default browser behavior.', blank: 'preventDefault()', options: ['stopPropagation()', 'return false', 'stop()', 'preventDefault()'], correctAnswer: 3, explanation: 'preventDefault() stops the default action of an event.' },
        { id: 15, type: 'multiple', question: 'What is hoisting in JavaScript?', options: ['Lifting elements', 'Error handling', 'Async operations', 'Variables and functions moved to top scope'], correctAnswer: 3, explanation: 'Hoisting moves declarations to the top of their scope.' }
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
        { id: 1, type: 'multiple', question: 'What is Bootstrap?', options: ['A JavaScript library', 'A server-side language', 'A CSS framework for responsive design', 'A database tool'], correctAnswer: 2, explanation: 'Bootstrap is a CSS framework for responsive web design.' },
        { id: 2, type: 'blanks', question: 'Bootstrap uses a ___ grid system.', template: 'Bootstrap uses a ___ grid system.', blank: '12-column', options: ['10-column', '8-column', '12-column', '16-column'], correctAnswer: 2, explanation: 'Bootstrap uses a 12-column grid system.' },
        { id: 3, type: 'syntax', question: 'Fix the Bootstrap container:', code: '<div class="contaner">Content</div>', correctCode: '<div class="container">Content</div>', options: ['<div class="wrapper">Content</div>', '<div class="box">Content</div>', '<div class="container">Content</div>', '<div class="main">Content</div>'], correctAnswer: 2, explanation: 'The correct Bootstrap class is "container".' },
        { id: 4, type: 'multiple', question: 'What does "col-md-6" mean?', options: ['Medium color 6', 'A medium button', '6 units width on medium screens', 'A column division'], correctAnswer: 2, explanation: 'col-md-6 is 50% width on medium screens and above.' },
        { id: 5, type: 'multiple', question: 'Which class creates a navigation bar?', options: ['nav', 'navigation', 'navbar', 'header-nav'], correctAnswer: 2, explanation: 'The "navbar" class creates Bootstrap navigation bars.' }
      ]
    },
    {
      id: 'bootstrap-intermediate',
      title: 'Bootstrap Intermediate',
      description: 'Intermediate Bootstrap components',
      difficulty: 'Intermediate',
      category: 'bootstrap',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the purpose of the "row" class?', options: ['Creates spacing', 'Creates borders', 'Creates a horizontal group of columns', 'Creates rows of text'], correctAnswer: 2, explanation: 'The row class contains columns and aligns them horizontally.' },
        { id: 2, type: 'blanks', question: 'The ___ class applies shadow effect to elements.', template: 'The ___ class applies shadow effect to elements.', blank: 'shadow', options: ['drop', 'box-shadow', 'shade', 'shadow'], correctAnswer: 3, explanation: 'Bootstrap uses the shadow utility class for box shadows.' },
        { id: 3, type: 'syntax', question: 'Fix the button group:', code: '<div class="btn-group"><button class="btn">A</button></div>', correctCode: '<div class="btn-group" role="group"><button class="btn btn-primary">A</button></div>', options: ['<div class="button-group"><button>A</button></div>', '<div class="btn-wrap"><button class="btn">A</button></div>', '<div class="group"><button class="btn">A</button></div>', '<div class="btn-group" role="group"><button class="btn btn-primary">A</button></div>'], correctAnswer: 3, explanation: 'Button groups need role="group" and buttons need variant classes.' },
        { id: 4, type: 'multiple', question: 'What does the "d-flex" utility class do?', options: ['Displays content', 'Creates divs', 'Creates flex items', 'Applies display: flex'], correctAnswer: 3, explanation: 'The d-flex class applies display: flex to elements.' },
        { id: 5, type: 'multiple', question: 'How do you create a responsive image?', options: ['Using img tag', 'Using max-width', 'Using width attribute', 'Using img-fluid class'], correctAnswer: 3, explanation: 'The img-fluid class makes images responsive in Bootstrap.' },
        { id: 6, type: 'blanks', question: 'The ___ class creates Bootstrap spacing for margins and padding.', template: 'The ___ class creates Bootstrap spacing for margins and padding.', blank: 'm or p', options: ['space', 'gap', 'margin', 'm or p'], correctAnswer: 3, explanation: 'Bootstrap uses m- for margin and p- for padding utilities.' },
        { id: 7, type: 'syntax', question: 'Fix the form validation:', code: '<input class="form-control"><small>Error</small>', correctCode: '<input class="form-control is-invalid"><small class="invalid-feedback">Error</small>', options: ['<input class="form-control error"><small>Error</small>', '<input class="form-control invalid"><div>Error</div>', '<input class="error form-control"><span>Error</span>', '<input class="form-control is-invalid"><small class="invalid-feedback">Error</small>'], correctAnswer: 3, explanation: 'Bootstrap validation uses is-invalid and invalid-feedback classes.' },
        { id: 8, type: 'multiple', question: 'What is the purpose of the "container-lg" class?', options: ['Large container', 'Container with breakpoint', 'Large responsive container', 'Container for lg screens'], correctAnswer: 2, explanation: 'Container-lg creates a container with max-width at lg breakpoint.' },
        { id: 9, type: 'multiple', question: 'How do you create a disabled button?', options: ['Using disabled class', 'Using no-click class', 'Both disabled attribute and class', 'Using disabled attribute'], correctAnswer: 2, explanation: 'Use both disabled attribute and disabled class for proper styling.' },
        { id: 10, type: 'blanks', question: 'The ___ class creates a bordered container element.', template: 'The ___ class creates a bordered container element.', blank: 'border', options: ['box', 'frame', 'outline', 'border'], correctAnswer: 3, explanation: 'The border class adds a border in Bootstrap utilities.' }
      ]
    },
    {
      id: 'bootstrap-advanced',
      title: 'Bootstrap Advanced',
      description: 'Advanced Bootstrap components',
      difficulty: 'Advanced',
      category: 'bootstrap',
      questions: [
        { id: 1, type: 'multiple', question: 'How do you create responsive grids?', options: ['Using flexbox', 'Using CSS Grid', 'Using tables', 'Using row and col classes'], correctAnswer: 3, explanation: 'Bootstrap uses "row" and "col-*" classes for responsive grids.' },
        { id: 2, type: 'blanks', question: 'Use the ___ class for Bootstrap buttons.', template: 'Use the ___ class for Bootstrap buttons.', blank: 'btn', options: ['button', 'btn-style', 'button-class', 'btn'], correctAnswer: 3, explanation: 'The "btn" class is for Bootstrap buttons.' },
        { id: 3, type: 'syntax', question: 'Fix Bootstrap modal structure:', code: '<div class="modal"><div class="modal-content">Content</div></div>', correctCode: '<div class="modal"><div class="modal-dialog"><div class="modal-content">Content</div></div></div>', options: ['<div class="modal"><div class="modal-body">Content</div></div>', '<div class="popup"><div class="modal-content">Content</div></div>', '<div class="dialog"><div class="modal-content">Content</div></div>', '<div class="modal"><div class="modal-dialog"><div class="modal-content">Content</div></div></div>'], correctAnswer: 3, explanation: 'Modal requires modal, modal-dialog, and modal-content classes.' },
        { id: 4, type: 'multiple', question: 'What are offset classes for?', options: ['Offsetting colors', 'Offsetting text', 'Offsetting images', 'Moving columns horizontally'], correctAnswer: 3, explanation: 'Offset classes move columns to the right.' },
        { id: 5, type: 'multiple', question: 'How do you make alerts dismissible?', options: ['Add "dismissible" class', 'Use JavaScript', 'Add "close" class', 'Add "alert-dismissible" and close button'], correctAnswer: 3, explanation: 'Use "alert-dismissible" class with a close button.' },
        { id: 6, type: 'blanks', question: 'The ___ component shows a list of navigation items.', template: 'The ___ component shows a list of navigation items.', blank: 'nav or navbar', options: ['menu', 'header', 'bar', 'nav'], correctAnswer: 3, explanation: 'The nav component displays navigation items.' },
        { id: 7, type: 'syntax', question: 'Fix the form group:', code: '<div class="form-group"><input type="text"></div>', correctCode: '<div class="form-group"><label>Label</label><input type="text" class="form-control"></div>', options: ['<div class="form-group"><input type="text" required></div>', '<form class="form-group"><input type="text"></form>', '<div class="form"><input type="text"></div>', '<div class="form-group"><label>Label</label><input type="text" class="form-control"></div>'], correctAnswer: 3, explanation: 'Form groups should have labels and form-control class.' },
        { id: 8, type: 'multiple', question: 'What is the purpose of the "container-fluid" class?', options: ['Full width container', 'Flexible sized container', 'Fluid animations', 'Full-width responsive container'], correctAnswer: 3, explanation: 'container-fluid makes the container span full width.' },
        { id: 9, type: 'multiple', question: 'How do you use Bootstrap utilities?', options: ['Import utility files', 'Create custom utilities', 'Use CSS variables', 'Use utility classes directly'], correctAnswer: 3, explanation: 'Bootstrap utilities are used as CSS classes directly in HTML.' },
        { id: 10, type: 'blanks', question: 'Use the ___ class to make content display as a card.', template: 'Use the ___ class to make content display as a card.', blank: 'card', options: ['box', 'panel', 'container', 'card'], correctAnswer: 3, explanation: 'The "card" class creates Bootstrap card components.' },
        { id: 11, type: 'syntax', question: 'Fix the badge syntax:', code: '<span class="badge">New</span>', correctCode: '<span class="badge bg-primary">New</span>', options: ['<span class="badge badge-new">New</span>', '<span class="badge primary">New</span>', '<span class="label-primary">New</span>', '<span class="badge bg-primary">New</span>'], correctAnswer: 3, explanation: 'Badges require background color classes like bg-primary.' },
        { id: 12, type: 'multiple', question: 'What does the "no-gutters" class do?', options: ['Removes spacing', 'Removes padding', 'Removes borders', 'Removes gaps between columns'], correctAnswer: 3, explanation: 'The no-gutters class removes horizontal padding between columns.' },
        { id: 13, type: 'multiple', question: 'How do you create a dropdown menu?', options: ['Using nav elements', 'Using list items', 'Using menu tags', 'Using dropdown classes and JavaScript'], correctAnswer: 3, explanation: 'Dropdowns use dropdown classes with JavaScript for functionality.' },
        { id: 14, type: 'blanks', question: 'The ___ class applies spacing utilities in Bootstrap.', template: 'The ___ class applies spacing utilities in Bootstrap.', blank: 'p, m, or spacing classes', options: ['space', 'gap', 'margin', 'p or m'], correctAnswer: 3, explanation: 'p- for padding and m- for margin are spacing utilities.' },
        { id: 15, type: 'multiple', question: 'What is the purpose of the Navbar component?', options: ['Creating sidebars', 'Creating footers', 'Creating menus', 'Creating top navigation bars'], correctAnswer: 3, explanation: 'The Navbar component creates responsive top navigation bars.' }
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
        { id: 1, type: 'multiple', question: 'What is Tailwind CSS?', options: ['A component library', 'A JavaScript framework', 'A utility-first CSS framework', 'A design tool'], correctAnswer: 2, explanation: 'Tailwind is a utility-first CSS framework.' },
        { id: 2, type: 'blanks', question: 'Use the ___ prefix for padding in Tailwind.', template: 'Use the ___ prefix for padding in Tailwind.', blank: 'p', options: ['pad', 'padding', 'p', 'space'], correctAnswer: 2, explanation: 'Tailwind uses "p" for padding, like "p-4".' },
        { id: 3, type: 'syntax', question: 'Fix Tailwind class syntax:', code: '<div class="bg-blue text-white padding-4">Content</div>', correctCode: '<div class="bg-blue-500 text-white p-4">Content</div>', options: ['<div class="background-blue text-white p-4">Content</div>', '<div class="bg-blue-500 text-white p-4">Content</div>', '<div class="bg-blue color-white p-4">Content</div>', '<div class="blue white pad-4">Content</div>'], correctAnswer: 1, explanation: 'Tailwind uses "bg-blue-500", "text-white", and "p-4".' },
        { id: 4, type: 'multiple', question: 'How do you apply responsive classes?', options: ['Using media queries', 'Using CSS-in-JS', 'Using md:, lg: prefixes', 'Using mixins'], correctAnswer: 2, explanation: 'Tailwind uses prefixes like "md:", "lg:" for responsive design.' },
        { id: 5, type: 'multiple', question: 'What does "flex" do?', options: ['Makes text flexible', 'Creates flexibility', 'Applies display: flex', 'Makes elements flexible'], correctAnswer: 2, explanation: 'The "flex" class applies display: flex.' }
      ]
    },
    {
      id: 'tailwind-intermediate',
      title: 'Tailwind Intermediate',
      description: 'Intermediate Tailwind techniques',
      difficulty: 'Intermediate',
      category: 'tailwind',
      questions: [
        { id: 1, type: 'multiple', question: 'What is a utility class in Tailwind?', options: ['A class for tools', 'A reusable component', 'A helper function', 'A single-purpose CSS class'], correctAnswer: 3, explanation: 'Tailwind utility classes apply single CSS properties.' },
        { id: 2, type: 'blanks', question: 'The ___ prefix applies styles only on hover state.', template: 'The ___ prefix applies styles only on hover state.', blank: 'hover', options: ['on', 'when', 'state', 'hover'], correctAnswer: 3, explanation: 'Tailwind uses "hover:" prefix for hover state styles.' },
        { id: 3, type: 'syntax', question: 'Fix the Tailwind spacing:', code: '<div class="margin-4">Content</div>', correctCode: '<div class="m-4">Content</div>', options: ['<div class="space-4">Content</div>', '<div class="gap-4">Content</div>', '<div class="margin-4">Content</div>', '<div class="m-4">Content</div>'], correctAnswer: 3, explanation: 'Tailwind uses m- for margin, not margin-.' },
        { id: 4, type: 'multiple', question: 'How do you use the "container" class?', options: ['Wraps all content', 'Contains elements', 'Creates flex container', 'Centers content and sets max-width'], correctAnswer: 3, explanation: 'The container class centers content with responsive max-width.' },
        { id: 5, type: 'multiple', question: 'What does "justify-between" do in Tailwind Flexbox?', options: ['Justifies text', 'Aligns items', 'Creates borders', 'Distributes items with space between'], correctAnswer: 3, explanation: 'justify-between distributes flex items with equal space between them.' },
        { id: 6, type: 'blanks', question: 'The ___ prefix applies styles at specific screen sizes.', template: 'The ___ prefix applies styles at specific screen sizes.', blank: 'sm, md, lg, xl, 2xl', options: ['screen', 'breakpoint', 'size', 'sm, md, lg, xl, 2xl'], correctAnswer: 3, explanation: 'Tailwind uses sm:, md:, lg: prefixes for responsive design.' },
        { id: 7, type: 'syntax', question: 'Fix the Tailwind class ordering:', code: '<div class="p-4 bg-blue-500 text-white">Content</div>', correctCode: '<div class="text-white bg-blue-500 p-4">Content</div>', options: ['<div class="p-4 bg-blue-500 text-white">Content</div>', '<div class="bg-blue-500 p-4 text-white">Content</div>', '<div class="text-white p-4 bg-blue-500">Content</div>', '<div class="text-white bg-blue-500 p-4">Content</div>'], correctAnswer: 3, explanation: 'While order doesn\'t matter functionally, best practice is layout, appearance, text.' },
        { id: 8, type: 'multiple', question: 'How do you add custom colors to Tailwind?', options: ['In CSS files', 'In component files', 'Not possible', 'In tailwind.config.js extend'], correctAnswer: 3, explanation: 'Extend the theme in tailwind.config.js to add custom colors.' },
        { id: 9, type: 'multiple', question: 'What does "rounded" class do?', options: ['Makes round layout', 'Rounds numbers', 'Creates circles', 'Adds border-radius'], correctAnswer: 3, explanation: 'The rounded class adds border-radius to elements.' },
        { id: 10, type: 'blanks', question: 'The ___ class controls element visibility in Tailwind.', template: 'The ___ class controls element visibility in Tailwind.', blank: 'hidden or visible', options: ['display', 'opacity', 'show', 'hidden or visible'], correctAnswer: 3, explanation: 'Tailwind uses hidden and visible classes for display control.' }
      ]
    },
    {
      id: 'tailwind-advanced',
      title: 'Tailwind Advanced',
      description: 'Advanced Tailwind techniques',
      difficulty: 'Advanced',
      category: 'tailwind',
      questions: [
        { id: 1, type: 'multiple', question: 'How do you customize Tailwind?', options: ['Edit CSS files', 'Use CSS variables', 'Edit package.json', 'Create tailwind.config.js'], correctAnswer: 3, explanation: 'Customize Tailwind using tailwind.config.js.' },
        { id: 2, type: 'blanks', question: 'Dark mode is activated with the ___ prefix.', template: 'Dark mode is activated with the ___ prefix.', blank: 'dark', options: ['night', 'black', 'theme', 'dark'], correctAnswer: 3, explanation: 'Tailwind uses "dark:" prefix for dark mode.' },
        { id: 3, type: 'syntax', question: 'Fix Tailwind arbitrary values:', code: '<div class="width-500">Content</div>', correctCode: '<div class="w-[500px]">Content</div>', options: ['<div class="w-500">Content</div>', '<div class="width[500px]">Content</div>', '<div class="w-custom-500">Content</div>', '<div class="w-[500px]">Content</div>'], correctAnswer: 3, explanation: 'Tailwind uses square brackets for arbitrary values.' },
        { id: 4, type: 'multiple', question: 'What is "group" used for?', options: ['Grouping elements', 'Creating groups', 'Grouping styles', 'Styling children on parent hover'], correctAnswer: 3, explanation: 'The "group" class styles children on parent hover.' },
        { id: 5, type: 'multiple', question: 'How do you purge unused styles?', options: ['Manually remove', 'Use a separate tool', 'Automatically done', 'Configure content paths'], correctAnswer: 3, explanation: 'Configure content paths in tailwind.config.js.' },
        { id: 6, type: 'blanks', question: 'The ___ directive includes base Tailwind styles.', template: 'The ___ directive includes base Tailwind styles.', blank: '@layer base', options: ['@import', '@include', '@apply', '@layer base'], correctAnswer: 3, explanation: 'The @layer base directive adds base styles in Tailwind.' },
        { id: 7, type: 'syntax', question: 'Fix the Tailwind component definition:', code: '@component .button { @apply px-4 py-2; }', correctCode: '@layer components { .btn-blue { @apply px-4 py-2 bg-blue-500; } }', options: ['@components { .button { @apply px-4 py-2; } }', '.button { @apply px-4 py-2; }', '@define .button { @apply px-4 py-2; }', '@layer components { .btn-blue { @apply px-4 py-2 bg-blue-500; } }'], correctAnswer: 3, explanation: 'Use @layer components to define custom components.' },
        { id: 8, type: 'multiple', question: 'What does @apply do?', options: ['Applies styles', 'Applies CSS rules', 'Applies themes', 'Applies Tailwind utilities'], correctAnswer: 3, explanation: '@apply lets you apply Tailwind utilities in CSS classes.' },
        { id: 9, type: 'multiple', question: 'How do you add custom colors?', options: ['Using CSS variables', 'Using CSS files', 'Using custom classes', 'In tailwind.config.js extend theme'], correctAnswer: 3, explanation: 'Extend the theme in tailwind.config.js to add colors.' },
        { id: 10, type: 'blanks', question: 'Use ___ to make Tailwind styles persist across pages.', template: 'Use ___ to make Tailwind styles persist across pages.', blank: '@layer styles or extend config', options: ['@import', '@include', '@extend', '@layer'], correctAnswer: 3, explanation: 'Use @layer or extend the config for persistent styles.' },
        { id: 11, type: 'syntax', question: 'Fix the Tailwind responsive breakpoint:', code: '<div class="md-text-lg">Text</div>', correctCode: '<div class="md:text-lg">Text</div>', options: ['<div class="medium:text-lg">Text</div>', '<div class="md_text-lg">Text</div>', '<div class="@md:text-lg">Text</div>', '<div class="md:text-lg">Text</div>'], correctAnswer: 3, explanation: 'Tailwind breakpoints use colon syntax like "md:classname".' },
        { id: 12, type: 'multiple', question: 'What is the purpose of "gap" utility?', options: ['Space between items', 'Creates gaps in text', 'Spacing for grids', 'Space between elements in flexbox/grid'], correctAnswer: 3, explanation: 'gap creates space between flex or grid items.' },
        { id: 13, type: 'multiple', question: 'How do you use state variants like hover?', options: ['hover: prefix', 'focus: prefix', 'Using pseudo-classes', 'hover: and focus: prefixes'], correctAnswer: 3, explanation: 'Use hover:, focus:, active: prefixes for state variants.' },
        { id: 14, type: 'blanks', question: 'The ___ plugin extends Tailwind with additional utilities.', template: 'The ___ plugin extends Tailwind with additional utilities.', blank: 'plugin', options: ['extend', 'module', 'addon', 'plugin'], correctAnswer: 3, explanation: 'Use the plugin function in tailwind.config.js to add utilities.' },
        { id: 15, type: 'multiple', question: 'What is JIT mode in Tailwind?', options: ['Just-in-time compilation', 'A JavaScript mode', 'A specific feature', 'On-demand generation of classes'], correctAnswer: 3, explanation: 'JIT mode generates CSS on-demand as you write classes.' }
      ]
    },

    // PHP QUIZZES
    {
      id: 'php-basics',
      title: 'PHP Basics',
      description: 'PHP server-side programming',
      difficulty: 'Beginner',
      category: 'php',
      questions: [
        { id: 1, type: 'multiple', question: 'What does PHP stand for?', options: ['Professional Hosting Protocol', 'PHP: Hypertext Preprocessor', 'Personal Home Page', 'Personal Hosting Platform'], correctAnswer: 1, explanation: 'PHP stands for PHP: Hypertext Preprocessor.' },
        { id: 2, type: 'blanks', question: 'PHP variables are prefixed with the ___ symbol.', template: 'PHP variables are prefixed with the ___ symbol.', blank: '$', options: ['#', '$', '@', '%'], correctAnswer: 1, explanation: 'PHP variables start with $ like $name or $count.' },
        { id: 3, type: 'syntax', question: 'Fix the PHP syntax:', code: '<?php echo "Hello World"', correctCode: '<?php echo "Hello World"; ?>', options: ['<?php echo "Hello World"; >', '<?php echo "Hello World"; ?>', '<?php echo "Hello World" ?>', '<?php echo "Hello World"; ]'], correctAnswer: 1, explanation: 'PHP statements end with ; and closing ?> tag.' },
        { id: 4, type: 'multiple', question: 'How do you define a function?', options: ['def myFunc() { }', 'function myFunc() { }', 'func myFunc() { }', 'procedure myFunc() { }'], correctAnswer: 1, explanation: 'Functions use the "function" keyword.' },
        { id: 5, type: 'multiple', question: 'What is $_GET used for?', options: ['Getting function params', 'Retrieving URL parameters', 'Getting files', 'Getting database data'], correctAnswer: 1, explanation: '$_GET retrieves URL parameters.' }
      ]
    },
    {
      id: 'php-intermediate',
      title: 'PHP Intermediate',
      description: 'Intermediate PHP concepts',
      difficulty: 'Intermediate',
      category: 'php',
      questions: [
        { id: 1, type: 'multiple', question: 'What is the difference between include and require?', options: ['require generates warning, include is error', 'No difference', 'They are identical', 'include generates warning, require is error'], correctAnswer: 3, explanation: 'require causes fatal error if file not found, include is warning.' },
        { id: 2, type: 'blanks', question: 'The ___ function executes PHP code from a string.', template: 'The ___ function executes PHP code from a string.', blank: 'eval', options: ['execute', 'eval', 'run', 'exec'], correctAnswer: 1, explanation: 'The eval() function executes PHP code in a string.' },
        { id: 3, type: 'syntax', question: 'Fix the array syntax:', code: '$arr = array(1, 2, 3)', correctCode: '$arr = array(1, 2, 3);', options: ['$arr = {1, 2, 3};', '$arr = (1, 2, 3);', '$arr = [1, 2, 3];', '$arr = array(1, 2, 3);'], correctAnswer: 3, explanation: 'PHP arrays should end with semicolon.' },
        { id: 4, type: 'multiple', question: 'What is a superglobal in PHP?', options: ['A super variable', 'A global variable', 'A constant', 'A predefined variable available everywhere'], correctAnswer: 3, explanation: 'Superglobals like $_GET, $_POST are available in all scopes.' },
        { id: 5, type: 'multiple', question: 'What does the isset() function do?', options: ['Destroys a variable', 'Checks if variable exists', 'Sets a variable', 'Creates a variable'], correctAnswer: 1, explanation: 'isset() checks if a variable is set and not null.' },
        { id: 6, type: 'blanks', question: 'The ___ function removes whitespace from the beginning and end of a string.', template: 'The ___ function removes whitespace from the beginning and end of a string.', blank: 'trim', options: ['strip', 'trim', 'clean', 'remove'], correctAnswer: 1, explanation: 'The trim() function removes leading and trailing whitespace.' },
        { id: 7, type: 'syntax', question: 'Fix the string concatenation:', code: '$text = "Hello" + "World"', correctCode: '$text = "Hello" . "World";', options: ['$text = "Hello" & "World";', '$text = "Hello" | "World";', '$text = "Hello" + "World";', '$text = "Hello" . "World";'], correctAnswer: 3, explanation: 'PHP uses . (dot) for string concatenation, not +.' },
        { id: 8, type: 'multiple', question: 'What does the count() function do?', options: ['Creates arrays', 'Returns length of array', 'Counts numbers', 'Counts occurrences'], correctAnswer: 1, explanation: 'count() returns the number of elements in an array.' },
        { id: 9, type: 'multiple', question: 'What is $_POST used for?', options: ['Posting content', 'Sending data', 'Creating posts', 'Receiving form data'], correctAnswer: 3, explanation: '$_POST receives data from HTML forms submitted via POST method.' },
        { id: 10, type: 'blanks', question: 'The ___ function converts a value to a specific type.', template: 'The ___ function converts a value to a specific type.', blank: 'settype', options: ['type', 'settype', 'cast', 'convert'], correctAnswer: 1, explanation: 'settype() converts a variable to a specified type.' }
      ]
    },
    {
      id: 'php-advanced',
      title: 'PHP Advanced',
      description: 'Advanced PHP and OOP',
      difficulty: 'Advanced',
      category: 'php',
      questions: [
        { id: 1, type: 'multiple', question: 'What is OOP in PHP?', options: ['A protocol', 'A database system', 'A server type', 'A way to organize code using objects'], correctAnswer: 3, explanation: 'OOP organizes code using objects and classes.' },
        { id: 2, type: 'blanks', question: 'A ___ is a blueprint for creating objects.', template: 'A ___ is a blueprint for creating objects.', blank: 'class', options: ['method', 'function', 'variable', 'class'], correctAnswer: 3, explanation: 'A class is a template for creating objects.' },
        { id: 3, type: 'syntax', question: 'Fix the PHP class:', code: 'class MyClass ( public $name; }', correctCode: 'class MyClass { public $name; }', options: ['class MyClass: { public $name; }', 'class MyClass { var $name; }', 'class MyClass [ public $name; ]', 'class MyClass { public $name; }'], correctAnswer: 3, explanation: 'Classes use curly braces { }, not parentheses.' },
        { id: 4, type: 'multiple', question: 'What is a constructor?', options: ['Building method', 'Constructs the class', 'Destroys objects', 'Called when object is created'], correctAnswer: 3, explanation: 'A constructor (__construct) is called when an object is created.' },
        { id: 5, type: 'multiple', question: 'What is encapsulation?', options: ['Wrapping in a file', 'Creating packages', 'Encrypting code', 'Hiding details using access modifiers'], correctAnswer: 3, explanation: 'Encapsulation hides details using public, private, protected.' },
        { id: 6, type: 'blanks', question: 'The ___ keyword hides a property/method from outside the class.', template: 'The ___ keyword hides a property/method from outside the class.', blank: 'private', options: ['hidden', 'protected', 'internal', 'private'], correctAnswer: 3, explanation: 'The private keyword restricts access to class members.' },
        { id: 7, type: 'syntax', question: 'Fix the inheritance syntax:', code: 'class Child extends Parent ( }', correctCode: 'class Child extends Parent { }', options: ['class Child : Parent { }', 'class Child inherit Parent { }', 'class Child -> Parent { }', 'class Child extends Parent { }'], correctAnswer: 3, explanation: 'PHP uses "extends" keyword with curly braces for inheritance.' },
        { id: 8, type: 'multiple', question: 'What is polymorphism?', options: ['Many forms', 'Multiple inheritance', 'Many methods', 'Objects taking many forms/behaviors'], correctAnswer: 3, explanation: 'Polymorphism allows objects to take different forms.' },
        { id: 9, type: 'multiple', question: 'What is an interface?', options: ['A design pattern', 'A class type', 'A function', 'A contract defining methods'], correctAnswer: 3, explanation: 'An interface defines methods that classes must implement.' },
        { id: 10, type: 'blanks', question: 'The ___ method returns the current object instance.', template: 'The ___ method returns the current object instance.', blank: '$this', options: ['$current', '$self', '$object', '$this'], correctAnswer: 3, explanation: '$this refers to the current object instance in PHP.' },
        { id: 11, type: 'syntax', question: 'Fix the method call:', code: '$obj->method(', correctCode: '$obj->method();', options: ['$obj.method();', '$obj::method();', 'obj->methodCall()', '$obj->method();'], correctAnswer: 3, explanation: 'PHP uses -> for method calls with parentheses and semicolon.' },
        { id: 12, type: 'multiple', question: 'What are static members?', options: ['Members that change', 'Members that are fixed', 'Members that cannot change', 'Members belonging to the class not instance'], correctAnswer: 3, explanation: 'Static members belong to the class, not individual instances.' },
        { id: 13, type: 'multiple', question: 'What is a trait?', options: ['A characteristic', 'A class property', 'A function', 'A way to reuse code'], correctAnswer: 3, explanation: 'Traits allow code reuse in multiple classes.' },
        { id: 14, type: 'blanks', question: 'Use the ____ magic method to access undefined properties.', template: 'Use the ____ magic method to access undefined properties.', blank: '__get', options: ['__call', '__set', '__invoke', '__get'], correctAnswer: 3, explanation: 'The __get magic method handles undefined property access.' },
        { id: 15, type: 'multiple', question: 'What is the purpose of namespaces?', options: ['Creating spaces', 'Organizing code', 'Creating variables', 'Organizing code to avoid naming conflicts'], correctAnswer: 3, explanation: 'Namespaces organize code and avoid naming conflicts.' }
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
