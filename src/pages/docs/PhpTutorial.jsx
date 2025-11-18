import React from 'react';
import DocumentationEditor from '../../components/DocumentationEditor';
import NavLi from '../../components/NavLi';

export default function PhpTutorial() {
  const [isAsideCollapsed, setIsAsideCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row pt-20">
      {/* Open button (visible when aside is closed) */}
      {isAsideCollapsed && (
        <button
          onClick={() => setIsAsideCollapsed(false)}
          className="fixed left-0 top-[4.5rem] z-30 p-2 rounded-r bg-slate-900 text-emerald-700 hover:text-emerald-500 transition-all duration-200 border-y border-r border-slate-800"
          aria-label="Open menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed w-64 left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-20 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ${
          isAsideCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Close button inside aside */}
        {!isAsideCollapsed && (
          <button
            onClick={() => setIsAsideCollapsed(true)}
            className="absolute right-2 top-3 z-30 p-1.5 rounded bg-slate-900 text-emerald-700 hover:text-emerald-500 transition-colors"
            aria-label="Close menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <nav className="pt-12">
          <ul className="flex flex-col gap-1 text-slate-200 text-base">
            <li><a href="#home" className="block py-2 px-3 rounded hover:text-emerald-700 hover:bg-slate-800 transition">PHP Home</a></li>
            <li><a href="#intro" className="block py-2 px-3 rounded hover:text-emerald-700 hover:bg-slate-800 transition">PHP Introduction</a></li>
            <li><a href="#syntax" className="block py-2 px-3 rounded hover:text-emerald-700 hover:bg-slate-800 transition">PHP Syntax</a></li>
            <li><a href="#variables" className="block py-2 px-3 rounded hover:text-blue-600 hover:bg-slate-800 transition">PHP Variables</a></li>
            <li><a href="#arrays" className="block py-2 px-3 rounded hover:text-blue-600 hover:bg-slate-800 transition">PHP Arrays</a></li>
            <li><a href="#loops" className="block py-2 px-3 rounded hover:text-blue-600 hover:bg-slate-800 transition">PHP Loops</a></li>
            <li><a href="#functions" className="block py-2 px-3 rounded hover:text-blue-600 hover:bg-slate-800 transition">PHP Functions</a></li>
            <li><a href="#forms" className="block py-2 px-3 rounded hover:text-blue-600 hover:bg-slate-800 transition">PHP Forms</a></li>
            <li><a href="#database" className="block py-2 px-3 rounded hover:text-blue-600 hover:bg-slate-800 transition">PHP Database</a></li>
            <li><a href="#sessions" className="block py-2 px-3 rounded hover:text-blue-600 hover:bg-slate-800 transition">PHP Sessions</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full pt-8 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-emerald-700 pb-6" id="home">
            <div className="flex items-center gap-4 mb-4">
              <img src="/src/assets/icons/php.svg" alt="PHP Logo" className="w-16 h-16" />
              <div>
                <h1 className="text-4xl font-bold text-emerald-700">PHP Fundamentals</h1>
                <p className="text-lg text-black">Master PHP programming with practical examples!</p>
              </div>
            </div>
          </header>

          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">PHP Introduction</h2>
            <p className="text-black mb-4">PHP (Hypertext Preprocessor) is a popular server-side scripting language designed specifically for web development. It's embedded directly in HTML and executes on the server.</p>

            <h3 className="text-xl text-emerald-700 mt-6 mb-2">Key Features of PHP</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Server-side scripting</li>
              <li>Command line scripting</li>
              <li>Writing desktop applications</li>
              <li>Database support (MySQL, PostgreSQL, MongoDB, etc.)</li>
              <li>Cross-platform compatibility</li>
              <li>Free and open source</li>
            </ul>

            <h3 className="text-xl text-emerald-700 mt-6 mb-2">What You Can Build with PHP</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Dynamic websites and web applications</li>
              <li>E-commerce platforms</li>
              <li>Content Management Systems (like WordPress)</li>
              <li>RESTful APIs</li>
              <li>Database-driven applications</li>
            </ul>
          </section>

          <section id="datatypes" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Data Types</h2>
            <p className="text-black mb-4">PHP supports several data types that can be used to store different kinds of values. Understanding these types is crucial for proper data handling.</p>
            
            <div className="bg-slate-800 p-4 rounded-lg mb-6">
              <h4 className="text-emerald-700 font-bold mb-2">Basic Data Types:</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li><span className="text-yellow-400">String</span> - Text and characters</li>
                <li><span className="text-yellow-400">Integer</span> - Whole numbers</li>
                <li><span className="text-yellow-400">Float/Double</span> - Decimal numbers</li>
                <li><span className="text-yellow-400">Boolean</span> - True or false</li>
                <li><span className="text-yellow-400">Array</span> - Ordered collections</li>
                <li><span className="text-yellow-400">Object</span> - Class instances</li>
                <li><span className="text-yellow-400">NULL</span> - Special no-value type</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Type Checking</h3>
            <DocumentationEditor 
              code={`<?php
// gettype() - returns the type
$value = "Hello";
echo gettype($value);  // string

// var_dump() - returns type and value
var_dump($value);      // string(5) "Hello"

// is_type() functions
$number = 42;
echo is_int($number);      // true
echo is_string($number);   // false
echo is_array([1, 2, 3]);  // true
echo is_null(null);        // true
?>`}
            />

            <h3 className="text-xl text-black mt-6 mb-2">2. Type Casting</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Type casting
$str = "123";
$int = (int)$str;    // Convert to integer
$float = (float)$str;  // Convert to float
$bool = (bool)$str;    // Convert to boolean

// Automatic type conversion
$result = 5 + "10";     // 15 (integer)
$concat = "5" . "10";   // "510" (string)

// Type hinting (PHP 7+)
function processNumber(int $num) {
    return $num * 2;
}

// Strict types (PHP 7+)
declare(strict_types=1);
?>`}
              </pre>
            </div>
          </section>

          <section id="strings" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Strings</h2>
            <p className="text-black mb-4">Strings in PHP are sequences of characters and have many built-in functions for manipulation.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-white mb-2">Common String Operations:</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li>Concatenation with <span className="text-yellow-400">.</span> operator</li>
                <li>Length checking with <span className="text-yellow-400">strlen()</span></li>
                <li>Case modification (upper/lower)</li>
                <li>Substring extraction</li>
                <li>Search and replace</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. String Functions</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
$str = "Hello World";

// String length
echo strlen($str);          // 11

// Case modification
echo strtoupper($str);      // HELLO WORLD
echo strtolower($str);      // hello world
echo ucfirst("hello");      // Hello
echo ucwords("hello world"); // Hello World

// Finding strings
echo strpos($str, "World");  // 6
echo stripos($str, "WORLD"); // Case-insensitive

// Substring
echo substr($str, 0, 5);     // Hello
echo substr($str, 6);        // World

// Replace
echo str_replace("World", "PHP", $str); // Hello PHP
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. String Formatting</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// sprintf - formatted strings
$name = "John";
$age = 25;
echo sprintf("Name: %s, Age: %d", $name, $age);

// number_format - formatting numbers
echo number_format(1234.56); // 1,235
echo number_format(1234.56, 2); // 1,234.56

// Trimming strings
$text = "  Hello World  ";
echo trim($text);      // "Hello World"
echo ltrim($text);     // "Hello World  "
echo rtrim($text);     // "  Hello World"
?>`}
              </pre>
            </div>
          </section>

          <section id="variables" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Variables</h2>
            <p className="text-black mb-4">Variables in PHP are used to store data that can be used throughout your program. PHP variables are dynamic, meaning you don't need to declare their type.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-white mb-2">Variable Rules:</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li>Must start with a <code className="text-yellow-400">$</code> sign</li>
                <li>Must begin with a letter or underscore</li>
                <li>Can only contain alphanumeric characters (A-z, 0-9) and underscores</li>
                <li>Are case-sensitive (<code className="text-yellow-400">$color</code> vs <code className="text-yellow-400">$Color</code>)</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Variable Types</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// String
$name = "John Doe";

// Integer
$age = 25;

// Float/Double
$price = 19.99;

// Boolean
$isStudent = true;

// Array
$colors = ["red", "green", "blue"];

// Null
$empty = null;

// Check variable type
var_dump($name);    // string(8) "John Doe"
var_dump($age);     // int(25)
var_dump($price);   // float(19.99)
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. Variable Scope</h3>
            <p className="text-black mb-4">PHP has different variable scopes that determine where variables can be accessed:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Global Scope
$globalVar = "I'm global";

function testScope() {
    // Local Scope
    $localVar = "I'm local";
    
    // Access global variable inside function
    global $globalVar;
    echo $globalVar;
    
    // Alternative way using $GLOBALS array
    echo $GLOBALS['globalVar'];
}

// Static Variable
function countCalls() {
    static $count = 0;
    $count++;
    echo $count;
}

countCalls(); // Output: 1
countCalls(); // Output: 2
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">3. Constants</h3>
            <p className="text-black mb-4">Constants are like variables except their value cannot be changed after they are defined:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Define a constant
define("GREETING", "Hello world!");
define("PI", 3.14);

// Using constants
echo GREETING;  // Output: Hello world!
echo PI;        // Output: 3.14

// Predefined constants
echo PHP_VERSION;    // Shows PHP version
echo __LINE__;       // Shows current line number
echo __FILE__;       // Shows file path
?>`}
              </pre>
            </div>
          </section>

          <section id="syntax" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Syntax</h2>
            <p className="text-black mb-4">PHP code is executed on the server and the HTML result is sent back to the browser. PHP code must be written inside special PHP tags.</p>

            <h3 className="text-xl text-black mt-6 mb-2">1. Basic Syntax</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
  // This is a PHP single-line comment
  
  /*
   * This is a multi-line
   * PHP comment
   */

  // Outputting text
  echo "Hello, World!";  // Using echo
  print "Hello again!";  // Using print
  
  // Variables
  $color = "blue";
  echo "My favorite color is " . $color;
  
  // HTML inside PHP
  echo "<h1>Welcome</h1>";
  echo "<p>This is paragraph " . $color . "</p>";
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. PHP in HTML</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<!DOCTYPE html>
<html>
<head>
    <title>PHP Example</title>
</head>
<body>
    <h1><?php echo "Welcome to my website"; ?></h1>
    
    <?php if ($logged_in): ?>
        <p>Welcome back, <?= $username ?></p>
    <?php else: ?>
        <p>Please log in</p>
    <?php endif; ?>
</body>
</html>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">3. Echo vs Print</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Echo can take multiple parameters
echo "Hello ", "World", "!";  // Output: Hello World!

// Print can only take one parameter
print "Hello World!";  // Output: Hello World!

// Echo with HTML
echo "<div class='greeting'>Hello World!</div>";

// Variable interpolation
$name = "John";
echo "Hello $name";    // Variables work in double quotes
echo 'Hello $name';    // Variables don't work in single quotes
?>`}
              </pre>
            </div>

          </section>

          <section id="operators" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Operators</h2>
            <p className="text-black mb-4">PHP provides various operators for performing operations on variables and values.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-white mb-2">Types of Operators:</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li><span className="text-yellow-400">Arithmetic</span> - Math operations (+, -, *, /, %)</li>
                <li><span className="text-yellow-400">Assignment</span> - Assign values (=, +=, -=)</li>
                <li><span className="text-yellow-400">Comparison</span> - Compare values (==, ===, !=, &gt;)</li>
                <li><span className="text-yellow-400">Logical</span> - Combine conditions (&&, ||, !)</li>
                <li><span className="text-yellow-400">String</span> - Concatenate strings (.)</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Arithmetic & Assignment</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Arithmetic operators
$a = 10;
$b = 3;

echo $a + $b;  // Addition: 13
echo $a - $b;  // Subtraction: 7
echo $a * $b;  // Multiplication: 30
echo $a / $b;  // Division: 3.33...
echo $a % $b;  // Modulus: 1
echo $a ** $b; // Exponentiation: 1000

// Assignment operators
$x = 5;
$x += 3;    // Same as: $x = $x + 3
$x -= 2;    // Same as: $x = $x - 2
$x *= 4;    // Same as: $x = $x * 4
$x /= 2;    // Same as: $x = $x / 2
$x %= 3;    // Same as: $x = $x % 3
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. Comparison & Logical</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Comparison operators
$a = 5;
$b = "5";

var_dump($a == $b);   // true (equal value)
var_dump($a === $b);  // false (equal value and type)
var_dump($a != $b);   // false
var_dump($a !== $b);  // true
var_dump($a < 10);    // true
var_dump($a >= 5);    // true

// Logical operators
$x = true;
$y = false;

var_dump($x && $y);  // false (AND)
var_dump($x || $y);  // true (OR)
var_dump(!$x);       // false (NOT)
?>`}
              </pre>
            </div>
          </section>

          <section id="math" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Math</h2>
            <p className="text-black mb-4">PHP provides many built-in functions for mathematical operations.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-white mb-2">Common Math Functions:</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li><span className="text-yellow-400">min(), max()</span> - Find minimum/maximum</li>
                <li><span className="text-yellow-400">round(), ceil(), floor()</span> - Rounding numbers</li>
                <li><span className="text-yellow-400">rand()</span> - Generate random numbers</li>
                <li><span className="text-yellow-400">sqrt(), pow()</span> - Mathematical operations</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Basic Math Functions</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Basic math functions
echo abs(-7);     // Absolute value: 7
echo pow(2, 3);   // Power: 8
echo sqrt(16);    // Square root: 4
echo max(2, 3, 1, 6, 7);  // Maximum: 7
echo min(2, 3, 1, 6, 7);  // Minimum: 1

// Rounding functions
echo round(3.4);    // 3
echo round(3.5);    // 4
echo ceil(3.1);     // 4 (round up)
echo floor(3.9);    // 3 (round down)

// Random numbers
echo rand();           // Random number
echo rand(1, 100);    // Random number between 1 and 100
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. Advanced Math Functions</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Trigonometry
echo sin(0);    // Sine
echo cos(0);    // Cosine
echo tan(0);    // Tangent

// Constants
echo M_PI;      // Pi
echo M_E;       // Euler's number

// Formatting numbers
echo number_format(1234567.89, 2); // 1,234,567.89

// Check if number
var_dump(is_numeric("123"));     // true
var_dump(is_numeric("12.3"));    // true
var_dump(is_numeric("abc"));     // false
?>`}
              </pre>
            </div>
          </section>

          <section id="arrays" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Arrays</h2>
            <p className="text-black mb-4">Arrays in PHP are ordered maps that can hold multiple values of any type. They are extremely flexible and can be used as arrays, lists, dictionaries, collections, and more.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-white mb-2">Types of Arrays in PHP:</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li><span className="text-yellow-400">Indexed Arrays</span> - Arrays with numeric keys</li>
                <li><span className="text-yellow-400">Associative Arrays</span> - Arrays with named keys</li>
                <li><span className="text-yellow-400">Multidimensional Arrays</span> - Arrays containing one or more arrays</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Indexed Arrays</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Creating indexed arrays
$fruits = ["Apple", "Banana", "Orange"];
$numbers = array(1, 2, 3, 4, 5);

// Accessing elements
echo $fruits[0];     // Output: Apple
echo $numbers[2];    // Output: 3

// Adding elements
$fruits[] = "Mango"; // Adds at the end
array_push($fruits, "Grape");

// Array functions
echo count($fruits);          // Count elements
print_r(array_reverse($fruits)); // Reverse array
sort($fruits);               // Sort array
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. Associative Arrays</h3>
            <p className="text-black mb-4">Associative arrays use named keys instead of numeric indexes:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Creating associative arrays
$person = [
    "name" => "John Doe",
    "age" => 25,
    "city" => "New York"
];

// Accessing elements
echo $person["name"];  // Output: John Doe

// Adding/Modifying elements
$person["email"] = "john@example.com";
$person["age"] = 26;

// Useful functions
print_r(array_keys($person));    // Get all keys
print_r(array_values($person));  // Get all values
var_dump(array_key_exists("name", $person)); // Check key
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">3. Multidimensional Arrays</h3>
            <p className="text-black mb-4">Arrays can contain other arrays to create multi-dimensional structures:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// 2D array example
$users = [
    ["name" => "John", "age" => 25],
    ["name" => "Jane", "age" => 24],
    ["name" => "Bob", "age" => 30]
];

// Accessing elements
echo $users[0]["name"];  // Output: John

// Matrix example
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Nested loops for 2D arrays
foreach ($users as $user) {
    echo "Name: " . $user["name"] . 
         ", Age: " . $user["age"] . "<br>";
}
?>`}
              </pre>
            </div>
          </section>

          <section id="loops" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Loops</h2>
            <p className="text-black mb-4">Loops are used to execute a block of code multiple times based on a condition.</p>

            <h3 className="text-xl text-black mt-6 mb-2">1. For Loop</h3>
            <p className="text-black mb-4">The for loop is used when you know exactly how many times you want to execute a block of code. It consists of three parameters:</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>initialization - Sets a counter variable</li>
              <li>condition - Tests if the loop should continue</li>
              <li>increment/decrement - Updates the counter</li>
            </ul>
            <p className="text-black mb-4">Example: Let's count from 0 to 4 and work with arrays using for loops:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
// Basic for loop
for ($i = 0; $i < 5; $i++) {
    echo "Number: $i <br>";
}

// For loop with array
$colors = ["red", "green", "blue"];
for ($i = 0; $i < count($colors); $i++) {
    echo "Color " . ($i + 1) . ": " . $colors[$i] . "<br>";
}

// Nested for loop (creating a multiplication table)
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= 5; $j++) {
        echo $i * $j . " ";
    }
    echo "<br>";
}
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. While Loop</h3>
            <p className="text-black mb-4">The while loop executes a block of code as long as a specified condition is true. It's perfect for situations where you don't know exactly how many times the loop should run.</p>
            <p className="text-black mb-4">Common uses of while loops include:</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Reading file contents until the end</li>
              <li>Processing database results</li>
              <li>Running tasks until a condition changes</li>
            </ul>
            <p className="text-black mb-4">Here are examples of while loops in different scenarios:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
// Basic while loop
$count = 1;
while ($count <= 5) {
    echo "Count: $count <br>";
    $count++;
}

// Reading file with while loop
$file = fopen("example.txt", "r");
while (!feof($file)) {
    echo fgets($file) . "<br>";
}
fclose($file);

// While with break condition
$num = 1;
while (true) {
    if ($num > 5) {
        break;
    }
    echo "Number: $num <br>";
    $num++;
}
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">3. Do-While Loop</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
// Basic do-while loop
$i = 1;
do {
    echo "Number: $i <br>";
    $i++;
} while ($i <= 5);

// Do-while with user input simulation
$input = 1;
do {
    echo "Processing number: $input <br>";
    $input++;
} while ($input <= 5);
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">4. Foreach Loop</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
// Foreach with indexed array
$fruits = ["apple", "banana", "orange"];
foreach ($fruits as $fruit) {
    echo "Fruit: $fruit <br>";
}

// Foreach with associative array
$person = [
    "name" => "John",
    "age" => 30,
    "city" => "New York"
];
foreach ($person as $key => $value) {
    echo "$key: $value <br>";
}

// Foreach with nested arrays
$users = [
    ["name" => "John", "age" => 30],
    ["name" => "Jane", "age" => 25],
    ["name" => "Bob", "age" => 35]
];
foreach ($users as $user) {
    echo "Name: " . $user["name"] . ", Age: " . $user["age"] . "<br>";
}
?>`}
              </pre>
            </div>
          </section>

          <section id="functions" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Functions</h2>
            <p className="text-black mb-4">Functions are reusable blocks of code that perform specific tasks. They help in organizing code, preventing repetition, and making programs easier to maintain.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-white mb-2">Why Use Functions?</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li>Code Reusability - Write once, use many times</li>
                <li>Better Organization - Break down complex tasks into smaller parts</li>
                <li>Easier Maintenance - Fix issues in one place</li>
                <li>Encapsulation - Hide complex operations behind simple interfaces</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Basic Functions</h3>
            <p className="text-black mb-4">Basic functions are the foundation of PHP programming. They can take parameters (inputs) and return values (outputs). Here's how to create and use them:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
// Simple function
function sayHello($name) {
    return "Hello, $name!";
}
echo sayHello("John");  // Output: Hello, John!

// Function with default parameters
function greet($name = "Guest", $time = "day") {
    return "Good $time, $name!";
}
echo greet();  // Output: Good day, Guest!
echo greet("John", "morning");  // Output: Good morning, John!

// Function with multiple returns
function checkNumber($num) {
    if ($num > 0) {
        return "Positive";
    } elseif ($num < 0) {
        return "Negative";
    }
    return "Zero";
}
?>`}
              </pre>
            </div>

              <h3 className="text-xl text-black mt-6 mb-2">2. Advanced Functions</h3>
              <div className="bg-slate-800 p-4 rounded-lg mb-4">
                <pre className="text-white">
{`<?php
// Type declarations (PHP 7+)
function addNumbers(int $a, int $b): int {
    return $a + $b;
}

// Variable-length arguments
function sum(...$numbers) {
    return array_sum($numbers);
}
echo sum(1, 2, 3, 4, 5);  // Output: 15

// Anonymous functions (closures)
$multiply = function($a, $b) {
    return $a * $b;
};
echo $multiply(4, 5);  // Output: 20

// Arrow functions (PHP 7.4+)
$double = fn($x) => $x * 2;
echo $double(5);  // Output: 10

// Function with reference parameter
function incrementByRef(&$value) {
    $value++;
}
$num = 5;
incrementByRef($num);
echo $num;  // Output: 6
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">3. Built-in Functions</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
// String functions
$text = "Hello World";
echo strlen($text);          // Length
echo strtoupper($text);     // To uppercase
echo str_replace("World", "PHP", $text);  // Replace

// Array functions
$numbers = [1, 2, 3, 4, 5];
echo count($numbers);        // Count elements
echo max($numbers);         // Maximum value
echo min($numbers);         // Minimum value
print_r(array_reverse($numbers));  // Reverse array

// Date and Time functions
echo date("Y-m-d H:i:s");  // Current date and time
echo time();               // Unix timestamp
echo strtotime("+1 week"); // String to timestamp

// Math functions
echo rand(1, 100);        // Random number
echo round(3.7);          // Round number
echo ceil(3.3);           // Round up
echo floor(3.7);          // Round down
?>`}
              </pre>
            </div>
          </section>

          <section id="forms" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP Forms</h2>
            <p className="text-black mb-4">Forms are essential for collecting user input in web applications. PHP provides several ways to handle form data securely and process user submissions.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-white mb-2">Form Handling Concepts:</h4>
              <ul className="list-disc pl-6 text-white space-y-2">
                <li><span className="text-yellow-400">$_POST</span> - Used for secure data transmission, not visible in URL</li>
                <li><span className="text-yellow-400">$_GET</span> - Data is sent through URL parameters</li>
                <li><span className="text-yellow-400">Form Validation</span> - Checking user input for correctness</li>
                <li><span className="text-yellow-400">Sanitization</span> - Cleaning user input to prevent security issues</li>
                <li><span className="text-yellow-400">Error Handling</span> - Managing and displaying form errors</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Basic Form Handling</h3>
            <p className="text-black mb-4">When processing forms in PHP, you should always:</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Validate the form submission method (POST/GET)</li>
              <li>Sanitize all user inputs to prevent security vulnerabilities</li>
              <li>Validate required fields and data formats</li>
              <li>Provide clear feedback to users</li>
            </ul>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
// Form processing
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    if (empty($name) || empty($email)) {
        $error = "All fields are required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format";
    } else {
        // Process the valid form data
        echo "Welcome, " . htmlspecialchars($name);
    }
}
?>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
    <div>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>
    </div>
    <button type="submit">Submit</button>
</form>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. File Upload</h3>
            <p className="text-black mb-4">File uploads are handled differently from regular form data. You need to:</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Use <code className="text-yellow-400">enctype="multipart/form-data"</code> in your form</li>
              <li>Handle files through the <code className="text-yellow-400">$_FILES</code> superglobal</li>
              <li>Implement security checks for file type and size</li>
              <li>Manage file storage safely</li>
            </ul>
            
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-white">
{`<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES["fileToUpload"])) {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        // Check if file is an actual image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if($check !== false) {
                echo "File is an image - " . $check["mime"];
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }

        // Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            echo "File is too large.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && 
           $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            echo "Only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Upload file if everything is ok
        if ($uploadOk == 1) {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                echo "File uploaded successfully.";
            }
        }
    }
}
?>

<form method="post" enctype="multipart/form-data">
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload File" name="submit">
</form>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">3. Form Validation Class</h3>
            <p className="text-black mb-4">Creating a validation class helps organize and reuse form validation logic. This approach offers several benefits:</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Centralized validation rules</li>
              <li>Consistent error handling</li>
              <li>Reusable validation methods</li>
              <li>Clean and maintainable code</li>
            </ul>
            
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-black">
{`<?php
class FormValidator {
    private $errors = [];
    private $data = [];

    public function validate($post_data) {
        // Validate name
        if (empty($post_data['name'])) {
            $this->errors['name'] = "Name is required";
        } else {
            $name = filter_var($post_data['name'], 
                FILTER_SANITIZE_STRING);
            if (strlen($name) < 2) {
                $this->errors['name'] = "Name is too short";
            } else {
                $this->data['name'] = $name;
            }
        }

        // Validate email
        if (empty($post_data['email'])) {
            $this->errors['email'] = "Email is required";
        } else {
            $email = filter_var($post_data['email'], 
                FILTER_SANITIZE_EMAIL);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->errors['email'] = "Invalid email format";
            } else {
                $this->data['email'] = $email;
            }
        }

        return empty($this->errors);
    }

    public function getErrors() {
        return $this->errors;
    }

    public function getData() {
        return $this->data;
    }
}

// Usage
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $validator = new FormValidator();
    if ($validator->validate($_POST)) {
        $data = $validator->getData();
        // Process the valid data
    } else {
        $errors = $validator->getErrors();
        // Handle errors
    }
}
?>`}
              </pre>
            </div>
          </section>

          <section id="database" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">PHP MySQL Database</h2>
            <p className="text-black mb-4">PHP with MySQL is one of the most popular combinations for web database applications. MySQL is a powerful, open-source database system that works perfectly with PHP.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-black mb-2">Why Use MySQL with PHP?</h4>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>Free and Open Source - No licensing costs</li>
                <li>Easy to Use - Simple SQL syntax and PHP functions</li>
                <li>Fast Performance - Optimized for web applications</li>
                <li>Large Community - Lots of resources and support</li>
                <li>Reliable - Used by many large companies</li>
              </ul>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">1. Database Connection</h3>
            <p className="text-black mb-4">Before you can work with MySQL, you need to establish a connection to your database. Here's how to connect using the MySQLi Object-Oriented approach:</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// MySQLi Object-Oriented
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

// Close connection when done
$conn->close();
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">2. Create Database</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-black">
{`<?php
$sql = "CREATE DATABASE myDB";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

// Create table
$sql = "CREATE TABLE Users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table Users created successfully";
}
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-black mt-6 mb-2">3. Insert Data</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-black">
{`<?php
// Prepare and bind
$stmt = $conn->prepare("INSERT INTO Users (firstname, lastname, email) 
    VALUES (?, ?, ?)");
$stmt->bind_param("sss", $firstname, $lastname, $email);

// Set parameters and execute
$firstname = "John";
$lastname = "Doe";
$email = "john@example.com";
$stmt->execute();

echo "New record created successfully";

// Insert multiple records
$stmt->bind_param("sss", $firstname, $lastname, $email);

// First record
$firstname = "Mary";
$lastname = "Moe";
$email = "mary@example.com";
$stmt->execute();

// Second record
$firstname = "Julie";
$lastname = "Dooley";
$email = "julie@example.com";
$stmt->execute();
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">4. Select Data</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Select all records
$sql = "SELECT id, firstname, lastname FROM Users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. 
             " - Name: " . $row["firstname"]. 
             " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}

// Select with WHERE clause
$stmt = $conn->prepare("SELECT * FROM Users WHERE lastname = ?");
$stmt->bind_param("s", $lastname);
$lastname = "Doe";
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo $row['firstname'] . " " . $row['lastname'];
}
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">5. Update and Delete</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Update record
$stmt = $conn->prepare("UPDATE Users SET lastname = ? WHERE id = ?");
$stmt->bind_param("si", $lastname, $id);

$lastname = "Johnson";
$id = 1;
$stmt->execute();

echo "Record updated successfully";

// Delete record
$stmt = $conn->prepare("DELETE FROM Users WHERE id = ?");
$stmt->bind_param("i", $id);

$id = 3;
$stmt->execute();

echo "Record deleted successfully";
?>`}
              </pre>
            </div>
          </section>

          <section id="oop" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">PHP Object-Oriented Programming (OOP)</h2>
            <p className="text-slate-200 mb-4">PHP supports object-oriented programming, allowing you to create and work with classes and objects.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">OOP Concepts:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Classes & Objects</span> - Blueprints and instances</li>
                <li><span className="text-yellow-400">Properties</span> - Class variables</li>
                <li><span className="text-yellow-400">Methods</span> - Class functions</li>
                <li><span className="text-yellow-400">Inheritance</span> - Extend class functionality</li>
                <li><span className="text-yellow-400">Encapsulation</span> - Data hiding and protection</li>
              </ul>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">1. Classes and Objects</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Define a class
class Car {
    // Properties
    public $brand;
    private $model;
    protected $year;

    // Constructor
    public function __construct($brand, $model, $year) {
        $this->brand = $brand;
        $this->model = $model;
        $this->year = $year;
    }

    // Method
    public function getInfo() {
        return "Car: $this->brand $this->model ($this->year)";
    }
}

// Create an object
$car = new Car("Toyota", "Camry", 2023);
echo $car->getInfo();
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">2. Inheritance</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Parent class
class Vehicle {
    protected $brand;
    
    public function __construct($brand) {
        $this->brand = $brand;
    }
    
    public function getBrand() {
        return $this->brand;
    }
}

// Child class
class ElectricCar extends Vehicle {
    private $batteryLife;
    
    public function __construct($brand, $batteryLife) {
        parent::__construct($brand);
        $this->batteryLife = $batteryLife;
    }
    
    public function getInfo() {
        return "{$this->brand} - Battery: {$this->batteryLife}kWh";
    }
}

$tesla = new ElectricCar("Tesla", 75);
echo $tesla->getInfo();
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">3. Interfaces and Abstract Classes</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Interface definition
interface Vehicle {
    public function start();
    public function stop();
}

// Abstract class
abstract class Car implements Vehicle {
    protected $brand;
    
    abstract public function getInfo();
    
    public function start() {
        return "Car starting...";
    }
    
    public function stop() {
        return "Car stopping...";
    }
}

// Concrete class
class SportsCar extends Car {
    public function __construct($brand) {
        $this->brand = $brand;
    }
    
    public function getInfo() {
        return "Sports Car: {$this->brand}";
    }
}

$ferrari = new SportsCar("Ferrari");
echo $ferrari->getInfo();
echo $ferrari->start();
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">4. Traits</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Define a trait
trait Logger {
    public function log($message) {
        echo "Logging: $message";
    }
}

trait FileHandler {
    public function saveFile($content) {
        echo "Saving file...";
    }
}

// Use traits in a class
class UserManager {
    use Logger, FileHandler;
    
    public function createUser($username) {
        $this->log("Creating user: $username");
        $this->saveFile("user_data");
    }
}

$manager = new UserManager();
$manager->createUser("john_doe");
?>`}
              </pre>
            </div>
          </section>

          <section id="sessions" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">PHP Sessions</h2>
            <p className="text-slate-200 mb-4">Sessions are used to store user information across multiple pages. Unlike cookies, session data is stored on the server, making it more secure for sensitive information.</p>
            
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Why Use Sessions?</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Security</span> - Data stored on server, not client</li>
                <li><span className="text-yellow-400">State Management</span> - Keep track of user state</li>
                <li><span className="text-yellow-400">User Authentication</span> - Manage login status</li>
                <li><span className="text-yellow-400">Shopping Carts</span> - Store user selections</li>
                <li><span className="text-yellow-400">Preferences</span> - Remember user settings</li>
              </ul>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">1. Start a PHP Session</h3>
            <p className="text-slate-200 mb-4">Always start your session at the beginning of your script before any output is sent to the browser. This allows you to access session data throughout your application.</p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Start the session
session_start();

// Set session variables
$_SESSION["username"] = "John Doe";
$_SESSION["email"] = "john@example.com";
$_SESSION["loggedin"] = true;

echo "Session variables are set";
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">2. Get Session Variables</h3>
            <p className="text-slate-200 mb-4">You can access session variables from any page that starts a session. Always check if a session variable exists before using it to prevent errors:</p>
            <ul className="list-disc pl-6 text-slate-200 mb-4">
              <li>Use <code className="text-yellow-400">isset()</code> to check if a variable exists</li>
              <li>Access variables through <code className="text-yellow-400">$_SESSION</code> superglobal</li>
              <li>Session data persists until explicitly removed or session ends</li>
            </ul>
            
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Start the session
session_start();

// Echo session variables
echo "Username is " . $_SESSION["username"] . "<br>";
echo "Email is " . $_SESSION["email"] . "<br>";

// Check if session variable exists
if(isset($_SESSION["loggedin"])) {
    echo "User is logged in";
}

// Print all session variables
print_r($_SESSION);
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">3. Modify Session Variables</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
// Start the session
session_start();

// Modify a session variable
$_SESSION["username"] = "Jane Doe";

// Remove a session variable
unset($_SESSION["email"]);

// Remove all session variables
session_unset();

// Destroy the session
session_destroy();
?>`}
              </pre>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">4. Session Example - Login System</h3>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <pre className="text-slate-200">
{`<?php
session_start();

// Login page
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Verify username and password (demo only)
    if($username === "demo" && $password === "password") {
        // Set session variables
        $_SESSION["loggedin"] = true;
        $_SESSION["username"] = $username;
        $_SESSION["login_time"] = time();
        
        // Redirect to welcome page
        header("location: welcome.php");
        exit;
    } else {
        $error = "Invalid username or password";
    }
}
?>

<!-- Login Form -->
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
    Username: <input type="text" name="username" required><br>
    Password: <input type="password" name="password" required><br>
    <input type="submit" value="Login">
</form>

<?php
// Welcome page (welcome.php)
session_start();

// Check if user is logged in
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}

echo "Welcome " . $_SESSION["username"];
echo "<br><a href='logout.php'>Logout</a>";

// Logout page (logout.php)
session_start();
session_unset();
session_destroy();
header("location: login.php");
exit;
?>`}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}