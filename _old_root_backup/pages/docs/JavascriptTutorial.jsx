import React from 'react';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';

export default function JavascriptTutorial() {
  return (
    <div className="min-h-screen bg-slate-900 flex pt-28">
      <aside className="hidden md:block w-64 pr-8 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-20 bg-slate-900 border-r border-slate-800">
        <nav className="pt-12">
          <ul className="flex flex-col gap-2 text-fuchsia-200 text-base">
            <li><a href="#home" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JavaScript Home</a></li>
            <li><a href="#intro" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Introduction</a></li>
            <li><a href="#syntax" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Syntax</a></li>
            <li><a href="#variables" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Variables</a></li>
            <li><a href="#operators" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Operators</a></li>
            <li><a href="#functions" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Functions</a></li>
            <li><a href="#events" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Events</a></li>
            <li><a href="#dom" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS DOM</a></li>
            <li><a href="#objects" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Objects</a></li>
            <li><a href="#arrays" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Arrays</a></li>
            <li><a href="#loops" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Loops</a></li>
            <li><a href="#conditionals" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Conditionals</a></li>
            <li><a href="#date" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Date</a></li>
            <li><a href="#math" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Math</a></li>
            <li><a href="#string" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS String</a></li>
            <li><a href="#number" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS Number</a></li>
            <li><a href="#json" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">JS JSON</a></li>
          </ul>
        </nav>
      </aside>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl flex-1 pt-28 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-fuchsia-600 pb-6" id="home">
            <h1 className="text-4xl font-bold text-fuchsia-400 mb-2">JavaScript Fundamentals</h1>
            <p className="text-lg text-fuchsia-200">Learn the basics of JavaScript and try out code live below!</p>
          </header>
          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Introduction</h2>
            <p className="text-slate-200 mb-4">JavaScript is a programming language that lets you add interactivity to web pages.</p>
          </section>
          <section id="syntax" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Syntax</h2>
            <LiveHtmlEditor initialCode={`<script>\ndocument.body.innerHTML = '<h1>Hello JavaScript!</h1><p>This is JS in action.</p>'\n<\/script>`} />
            <p className="text-slate-200 mb-4">JavaScript syntax includes statements, variables, and functions. Each statement typically ends with a semicolon, and code blocks are enclosed in curly braces.</p>
          </section>

          <section id="variables" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Variables</h2>
            <p className="text-slate-200 mb-4">Variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const.</p>
            <LiveHtmlEditor initialCode={`<script>
let name = "John";
const age = 25;
var city = "New York";

document.body.innerHTML = \`
  <h2>Variable Examples:</h2>
  <p>Name: \${name}</p>
  <p>Age: \${age}</p>
  <p>City: \${city}</p>
\`;
<\/script>`} />
          </section>

          <section id="operators" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Operators</h2>
            <p className="text-slate-200 mb-4">Operators perform operations on variables and values. JavaScript has arithmetic, comparison, and logical operators.</p>
            <LiveHtmlEditor initialCode={`<script>
let x = 5;
let y = 3;

document.body.innerHTML = \`
  <h2>Operator Examples:</h2>
  <p>Addition: \${x + y}</p>
  <p>Subtraction: \${x - y}</p>
  <p>Multiplication: \${x * y}</p>
  <p>Division: \${x / y}</p>
  <p>Greater than?: \${x > y}</p>
\`;
<\/script>`} />
          </section>

          <section id="functions" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Functions</h2>
            <p className="text-slate-200 mb-4">Functions are blocks of code designed to perform specific tasks. They can take parameters and return values.</p>
            <LiveHtmlEditor initialCode={`<script>
function calculateArea(width, height) {
  return width * height;
}

function greet(name) {
  return "Hello, " + name + "!";
}

document.body.innerHTML = \`
  <h2>Function Examples:</h2>
  <p>\${greet("Alice")}</p>
  <p>Area of 5x3 rectangle: \${calculateArea(5, 3)}</p>
\`;
<\/script>`} />
          </section>

          <section id="events" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Events</h2>
            <p className="text-slate-200 mb-4">Events are actions that can be detected by JavaScript. Common events include clicks, key presses, and form submissions.</p>
            <LiveHtmlEditor initialCode={`<div id="demo">
  <button onclick="changeText()">Click me!</button>
  <p id="display">Click the button to change this text.</p>
</div>

<script>
function changeText() {
  document.getElementById("display").innerHTML = "Text changed!";
}
<\/script>`} />
          </section>

          <section id="dom" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript DOM Manipulation</h2>
            <p className="text-slate-200 mb-4">The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree of objects that can be modified with JavaScript.</p>
            
            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">1. Selecting Elements</h3>
            <LiveHtmlEditor initialCode={`<div id="selectors-demo">
  <h3>Finding DOM Elements</h3>
  <p class="highlight">First highlighted paragraph</p>
  <p class="highlight">Second highlighted paragraph</p>
  <p>Regular paragraph</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>

<script>
// Different ways to select elements
const byId = document.getElementById("selectors-demo");
const byClass = document.getElementsByClassName("highlight");
const byTag = document.getElementsByTagName("p");
const byQuery = document.querySelector(".highlight");
const byQueryAll = document.querySelectorAll(".highlight");

// Demonstrate the selections
console.log("Selected by ID:", byId);
console.log("Selected by class:", byClass);
console.log("Selected by tag:", byTag);
console.log("Selected by query:", byQuery);
console.log("Selected by queryAll:", byQueryAll);
<\/script>`} />

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">2. Creating and Modifying Elements</h3>
            <LiveHtmlEditor initialCode={`<div id="modification-demo">
  <h3>DOM Modification</h3>
  <div id="content"></div>
  <button onclick="createElements()">Create Elements</button>
  <button onclick="modifyElements()">Modify Elements</button>
  <button onclick="removeElements()">Remove Elements</button>
</div>

<script>
function createElements() {
  const content = document.getElementById("content");
  
  // Create new element
  const newDiv = document.createElement("div");
  newDiv.id = "newDiv";
  
  // Add text content
  const text = document.createTextNode("This is a new div");
  newDiv.appendChild(text);
  
  // Add some styling
  newDiv.style.backgroundColor = "#8b5cf6";
  newDiv.style.color = "white";
  newDiv.style.padding = "10px";
  newDiv.style.margin = "10px 0";
  newDiv.style.borderRadius = "4px";
  
  // Add to document
  content.appendChild(newDiv);
}

function modifyElements() {
  const div = document.getElementById("newDiv");
  if (div) {
    // Modify text content
    div.textContent = "Modified content!";
    
    // Add/modify attributes
    div.setAttribute("class", "modified");
    
    // Change styles
    div.style.backgroundColor = "#ec4899";
    
    // Add event listener
    div.addEventListener("click", () => {
      alert("Div clicked!");
    });
  }
}

function removeElements() {
  const div = document.getElementById("newDiv");
  if (div) {
    div.remove();
  }
}
<\/script>`} />

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">3. Event Handling</h3>
            <LiveHtmlEditor initialCode={`<div id="events-demo">
  <h3>Event Handling Demo</h3>
  <button id="btn1">Click Me (onclick)</button>
  <button id="btn2">Click Me (addEventListener)</button>
  <div id="mouseArea" style="width: 200px; height: 100px; background: #8b5cf6; margin: 10px 0; border-radius: 4px;"></div>
  <input type="text" id="textInput" placeholder="Type something...">
  <p id="eventOutput">Events will be logged here</p>
</div>

<script>
// Method 1: onclick property
document.getElementById("btn1").onclick = function() {
  logEvent("Button 1 clicked (onclick)");
};

// Method 2: addEventListener
document.getElementById("btn2").addEventListener("click", function() {
  logEvent("Button 2 clicked (addEventListener)");
});

// Mouse events
const mouseArea = document.getElementById("mouseArea");
mouseArea.addEventListener("mouseover", () => logEvent("Mouse over"));
mouseArea.addEventListener("mouseout", () => logEvent("Mouse out"));
mouseArea.addEventListener("mousemove", (e) => {
  const pos = \`Mouse position: \${e.offsetX}, \${e.offsetY}\`;
  logEvent(pos);
});

// Keyboard events
document.getElementById("textInput").addEventListener("keyup", function(e) {
  logEvent(\`Key pressed: \${e.key}\`);
});

function logEvent(text) {
  const output = document.getElementById("eventOutput");
  output.textContent = text;
}
<\/script>`} />

            <div className="mt-6 space-y-4">
              <h3 className="text-xl text-fuchsia-300">Key DOM Concepts:</h3>
              <ul className="list-disc pl-6 text-slate-200">
                <li>Selection Methods:
                  <ul className="list-disc pl-6 mt-2">
                    <li><code className="bg-slate-700 px-1 rounded">getElementById()</code> - Finds element by ID</li>
                    <li><code className="bg-slate-700 px-1 rounded">getElementsByClassName()</code> - Finds elements by class</li>
                    <li><code className="bg-slate-700 px-1 rounded">getElementsByTagName()</code> - Finds elements by tag</li>
                    <li><code className="bg-slate-700 px-1 rounded">querySelector()</code> - Finds first matching element</li>
                    <li><code className="bg-slate-700 px-1 rounded">querySelectorAll()</code> - Finds all matching elements</li>
                  </ul>
                </li>
                <li>Modification Methods:
                  <ul className="list-disc pl-6 mt-2">
                    <li><code className="bg-slate-700 px-1 rounded">createElement()</code> - Creates new element</li>
                    <li><code className="bg-slate-700 px-1 rounded">appendChild()</code> - Adds child element</li>
                    <li><code className="bg-slate-700 px-1 rounded">removeChild()</code> - Removes child element</li>
                    <li><code className="bg-slate-700 px-1 rounded">setAttribute()</code> - Sets attribute value</li>
                    <li><code className="bg-slate-700 px-1 rounded">innerHTML</code> - Changes element content</li>
                  </ul>
                </li>
                <li>Event Handling:
                  <ul className="list-disc pl-6 mt-2">
                    <li><code className="bg-slate-700 px-1 rounded">addEventListener()</code> - Attaches event handler</li>
                    <li><code className="bg-slate-700 px-1 rounded">removeEventListener()</code> - Removes event handler</li>
                    <li>Common events: click, submit, keyup, mouseover, load</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section id="arrays" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Arrays</h2>
            <p className="text-slate-200 mb-4">Arrays are used to store multiple values in a single variable. They can hold different types of data and offer many built-in methods for manipulation.</p>
            
            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">1. Array Basics</h3>
            <LiveHtmlEditor initialCode={`<div id="array-demo">
  <h3>Array Basics</h3>
  <div id="output1"></div>
</div>

<script>
// Different ways to create arrays
const array1 = [1, 2, 3, 4, 5];
const array2 = new Array(6, 7, 8, 9, 10);
const array3 = Array.from("Hello"); // Creates array from string

// Accessing elements
const firstElement = array1[0];
const lastElement = array1[array1.length - 1];

// Modifying elements
array1[2] = 30;

// Display results
document.getElementById("output1").innerHTML = \`
  <p>Array 1: [\${array1.join(", ")}]</p>
  <p>Array 2: [\${array2.join(", ")}]</p>
  <p>Array 3: [\${array3.join(", ")}]</p>
  <p>First element: \${firstElement}</p>
  <p>Last element: \${lastElement}</p>
\`;
<\/script>`} />

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">2. Array Methods</h3>
            <LiveHtmlEditor initialCode={`<div id="array-methods">
  <h3>Common Array Methods</h3>
  <div id="output2"></div>
</div>

<script>
let fruits = ["Apple", "Banana", "Orange"];
let numbers = [1, 2, 3, 4, 5];

// Adding and removing elements
fruits.push("Mango");        // Add to end
fruits.unshift("Grape");     // Add to start
fruits.pop();               // Remove from end
fruits.shift();            // Remove from start

// Combining arrays
let combined = fruits.concat(["Pear", "Peach"]);

// Finding elements
let hasOrange = fruits.includes("Orange");
let orangeIndex = fruits.indexOf("Orange");

// Slicing and splicing
let sliced = fruits.slice(1, 3);    // Extract portion
fruits.splice(1, 1, "Kiwi");       // Remove and insert

document.getElementById("output2").innerHTML = \`
  <p>Original fruits: [\${fruits.join(", ")}]</p>
  <p>Combined array: [\${combined.join(", ")}]</p>
  <p>Sliced array: [\${sliced.join(", ")}]</p>
  <p>Has Orange? \${hasOrange}</p>
  <p>Orange index: \${orangeIndex}</p>
\`;
<\/script>`} />

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">3. Array Iteration Methods</h3>
            <LiveHtmlEditor initialCode={`<div id="array-iteration">
  <h3>Array Iteration Methods</h3>
  <div id="output3"></div>
</div>

<script>
const numbers = [1, 2, 3, 4, 5];

// forEach - Execute function for each element
let forEachResult = "";
numbers.forEach(num => {
  forEachResult += num * 2 + " ";
});

// map - Create new array with results
const mapped = numbers.map(num => num * 2);

// filter - Create new array with elements that pass test
const filtered = numbers.filter(num => num > 2);

// reduce - Reduce array to single value
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// find - Find first element that passes test
const found = numbers.find(num => num > 3);

// some/every - Test if some/all elements pass test
const hasEven = numbers.some(num => num % 2 === 0);
const allPositive = numbers.every(num => num > 0);

document.getElementById("output3").innerHTML = \`
  <p>Original array: [\${numbers.join(", ")}]</p>
  <p>forEach result: \${forEachResult}</p>
  <p>map result: [\${mapped.join(", ")}]</p>
  <p>filter result: [\${filtered.join(", ")}]</p>
  <p>reduce result (sum): \${sum}</p>
  <p>find result (>3): \${found}</p>
  <p>Has even numbers? \${hasEven}</p>
  <p>All positive? \${allPositive}</p>
\`;
<\/script>`} />

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">4. Advanced Array Operations</h3>
            <LiveHtmlEditor initialCode={`<div id="advanced-arrays">
  <h3>Advanced Array Operations</h3>
  <div id="output4"></div>
</div>

<script>
// Sorting arrays
const fruits = ["banana", "apple", "orange", "mango"];
fruits.sort();  // Alphabetical sort

const nums = [23, 1, 15, 48, 7];
nums.sort((a, b) => a - b);  // Numeric sort

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// Array from iterable
const arrayFromString = Array.from("Hello");
const arrayFromSet = Array.from(new Set([1, 2, 2, 3, 3]));

// Flattening arrays
const nested = [1, [2, 3], [4, [5, 6]]];
const flattened = nested.flat();
const deepFlattened = nested.flat(Infinity);

document.getElementById("output4").innerHTML = \`
  <p>Sorted fruits: [\${fruits.join(", ")}]</p>
  <p>Sorted numbers: [\${nums.join(", ")}]</p>
  <p>Destructured colors: \${first}, \${second}, \${third}</p>
  <p>Combined arrays: [\${combined.join(", ")}]</p>
  <p>Array from string: [\${arrayFromString.join(", ")}]</p>
  <p>Array from Set: [\${arrayFromSet.join(", ")}]</p>
  <p>Flattened array: [\${flattened.join(", ")}]</p>
  <p>Deep flattened: [\${deepFlattened.join(", ")}]</p>
\`;
<\/script>`} />

            <div className="mt-6 space-y-4">
              <h3 className="text-xl text-fuchsia-300">Key Array Concepts:</h3>
              <ul className="list-disc pl-6 text-slate-200">
                <li>Basic Operations:
                  <ul className="list-disc pl-6 mt-2">
                    <li><code className="bg-slate-700 px-1 rounded">push()</code> / <code className="bg-slate-700 px-1 rounded">pop()</code> - Add/remove from end</li>
                    <li><code className="bg-slate-700 px-1 rounded">unshift()</code> / <code className="bg-slate-700 px-1 rounded">shift()</code> - Add/remove from start</li>
                    <li><code className="bg-slate-700 px-1 rounded">splice()</code> - Add/remove elements at any position</li>
                    <li><code className="bg-slate-700 px-1 rounded">slice()</code> - Extract portion of array</li>
                  </ul>
                </li>
                <li>Array Iteration:
                  <ul className="list-disc pl-6 mt-2">
                    <li><code className="bg-slate-700 px-1 rounded">forEach()</code> - Execute function for each element</li>
                    <li><code className="bg-slate-700 px-1 rounded">map()</code> - Create new array with transformed elements</li>
                    <li><code className="bg-slate-700 px-1 rounded">filter()</code> - Create new array with elements that pass test</li>
                    <li><code className="bg-slate-700 px-1 rounded">reduce()</code> - Reduce array to single value</li>
                  </ul>
                </li>
                <li>Search and Sort:
                  <ul className="list-disc pl-6 mt-2">
                    <li><code className="bg-slate-700 px-1 rounded">indexOf()</code> / <code className="bg-slate-700 px-1 rounded">lastIndexOf()</code> - Find element index</li>
                    <li><code className="bg-slate-700 px-1 rounded">find()</code> / <code className="bg-slate-700 px-1 rounded">findIndex()</code> - Find element/index by condition</li>
                    <li><code className="bg-slate-700 px-1 rounded">sort()</code> - Sort array elements</li>
                    <li><code className="bg-slate-700 px-1 rounded">includes()</code> - Check if element exists</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section id="objects" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript Objects</h2>
            <p className="text-slate-200 mb-4">Objects are containers for named values called properties and methods.</p>
            <LiveHtmlEditor initialCode={`<script>
// Create an object
let person = {
  name: "John",
  age: 30,
  city: "New York",
  greet: function() {
    return "Hello, I'm " + this.name;
  }
};

document.body.innerHTML = \`
  <h2>Object Example:</h2>
  <p>Name: \${person.name}</p>
  <p>Age: \${person.age}</p>
  <p>City: \${person.city}</p>
  <p>Greeting: \${person.greet()}</p>
\`;
<\/script>`} />
          </section>

          <section id="json" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">JavaScript JSON</h2>
            <p className="text-slate-200 mb-4">JSON (JavaScript Object Notation) is a lightweight data format used for data exchange.</p>
            <LiveHtmlEditor initialCode={`<script>
// JSON example
let jsonString = '{"name": "Alice", "age": 25, "city": "London"}';

// Parse JSON to object
let obj = JSON.parse(jsonString);

// Convert object to JSON
let newJsonString = JSON.stringify(obj);

document.body.innerHTML = \`
  <h2>JSON Example:</h2>
  <p>Original JSON: \${jsonString}</p>
  <p>Parsed name: \${obj.name}</p>
  <p>Back to JSON: \${newJsonString}</p>
\`;
<\/script>`} />
          </section>
        </div>
      </div>
    </div>
  );
}
