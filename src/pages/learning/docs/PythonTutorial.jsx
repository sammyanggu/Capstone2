import React from 'react';
import NavLi from '../../../components/NavLi';

export default function PythonTutorial() {
  const [isAsideCollapsed, setIsAsideCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-white flex pt-28">
      {/* Open button (visible when aside is closed) */}
      {isAsideCollapsed && (
        <button
          onClick={() => setIsAsideCollapsed(false)}
          className="fixed left-0 top-[4.5rem] z-30 p-2 rounded-r bg-slate-900 text-blue-700 hover:text-blue-500 transition-all duration-200 border-y border-r border-slate-800"
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
            className="absolute right-2 top-3 z-30 p-1.5 rounded bg-slate-900 text-blue-700 hover:text-blue-500 transition-colors"
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
            <NavLi href="#home">Python Home</NavLi>
            <NavLi href="#intro">Python Introduction</NavLi>
            <NavLi href="#setup">Getting Started</NavLi>
            <NavLi href="#variables">Variables & Data Types</NavLi>
            <NavLi href="#operators">Operators</NavLi>
            <NavLi href="#strings">Strings</NavLi>
            <NavLi href="#conditionals">Conditionals</NavLi>
            <NavLi href="#loops">Loops</NavLi>
            <NavLi href="#functions">Functions</NavLi>
            <NavLi href="#lists">Lists</NavLi>
            <NavLi href="#tuples">Tuples</NavLi>
            <NavLi href="#dictionaries">Dictionaries</NavLi>
            <NavLi href="#sets">Sets</NavLi>
            <NavLi href="#comments">Comments</NavLi>
            <NavLi href="#input">User Input</NavLi>
            <NavLi href="#modules">Modules & Imports</NavLi>
            <NavLi href="#exceptions">Exception Handling</NavLi>
            <NavLi href="#classes">Classes & OOP</NavLi>
            <NavLi href="#files">File Handling</NavLi>
            <NavLi href="#bestpractices">Best Practices</NavLi>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="w-full flex justify-center">
        <div className="max-w-4xl flex-1 pt-28 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-blue-600 pb-6">
            <h1 className="text-4xl font-bold text-black mb-2" id="home">Python Fundamentals</h1>
            <p className="text-lg text-black">Master the powerful and versatile Python programming language. This comprehensive guide covers everything from basic syntax to advanced object-oriented programming.</p>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Python Introduction</h2>
            <p className="text-black mb-4">Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used for web development, data science, artificial intelligence, automation, and more. Python's clean syntax makes it an excellent choice for beginners while remaining powerful for professionals.</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li><strong>Easy to Learn:</strong> Python's syntax is clear and straightforward</li>
              <li><strong>Versatile:</strong> Used in web, data science, AI, automation, and more</li>
              <li><strong>Large Community:</strong> Extensive libraries and frameworks available</li>
              <li><strong>Open Source:</strong> Free and constantly improving</li>
              <li><strong>Cross-Platform:</strong> Runs on Windows, Mac, Linux, and more</li>
            </ul>
          </section>

          {/* Getting Started */}
          <section id="setup" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Getting Started with Python</h2>
            <p className="text-black mb-4">To start writing Python code, you need to:</p>
            <ol className="list-decimal pl-6 text-black mb-4">
              <li>Download Python from <code className="bg-slate-200 text-blue-600 px-2 rounded">python.org</code></li>
              <li>Install Python on your computer</li>
              <li>Use a text editor or IDE (VS Code, PyCharm, or the online Python interpreter)</li>
            </ol>
            <p className="text-black mb-4"><strong>Your First Python Program:</strong></p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
              <pre>{`print("Hello, Python!")
print("Welcome to the world of Python!")`}</pre>
            </div>
            <p className="text-black mb-4"><strong>Output:</strong></p>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Hello, Python!
Welcome to the world of Python!`}</pre>
            </div>
          </section>

          {/* Variables & Data Types */}
          <section id="variables" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Variables & Data Types</h2>
            <p className="text-black mb-4">Variables are containers for storing data values. Python supports several data types:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Strings
name = "Alice"
print(name)

# Integers
age = 25
print(age)

# Floats
height = 5.7
print(height)

# Booleans
is_student = True
print(is_student)`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Alice
25
5.7
True`}</pre>
            </div>
            <ul className="list-disc pl-6 text-black mb-4">
              <li><strong>str</strong> - Text data (strings)</li>
              <li><strong>int</strong> - Whole numbers</li>
              <li><strong>float</strong> - Decimal numbers</li>
              <li><strong>bool</strong> - True or False</li>
              <li><strong>list</strong> - Ordered, changeable collection</li>
              <li><strong>tuple</strong> - Ordered, unchangeable collection</li>
              <li><strong>dict</strong> - Key-value pairs</li>
            </ul>
          </section>

          {/* Operators */}
          <section id="operators" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Operators</h2>
            <p className="text-black mb-4">Python supports various operators for performing operations on variables and values:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Arithmetic Operators
print(10 + 5)  # Addition
print(10 - 5)  # Subtraction
print(10 * 5)  # Multiplication
print(10 / 5)  # Division
print(10 ** 2) # Exponentiation

# Comparison Operators
print(10 > 5)   # Greater than
print(10 == 5)  # Equal to
print(10 != 5)  # Not equal to

# Logical Operators
print(True and False)  # AND
print(True or False)   # OR
print(not True)        # NOT`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`15
5
50
2.0
100
True
False
True
False
False
True
False`}</pre>
            </div>
          </section>

          {/* Strings */}
          <section id="strings" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Strings</h2>
            <p className="text-black mb-4">Strings are sequences of characters. Python provides many string methods for manipulation:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`text = "Python Programming"

# String methods
print(text.upper())        # Convert to uppercase
print(text.lower())        # Convert to lowercase
print(text.replace("Python", "Java"))  # Replace text
print(text.split())        # Split into list
print(len(text))           # Get length
print(text[0])             # Indexing
print(text[0:6])           # Slicing`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`PYTHON PROGRAMMING
python programming
Java Programming
['Python', 'Programming']
18
P
Python`}</pre>
            </div>
          </section>

          {/* Conditionals */}
          <section id="conditionals" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Conditionals</h2>
            <p className="text-black mb-4">Conditionals allow you to execute code based on conditions:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# Nested conditionals
temperature = 25
if temperature > 30:
    print("It's hot")
else:
    print("It's cool")`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`You are an adult
It's cool`}</pre>
            </div>
          </section>

          {/* Loops */}
          <section id="loops" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Loops</h2>
            <p className="text-black mb-4">Loops allow you to execute code repeatedly:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# For loop
for i in range(5):
    print(i)

# Looping through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)

# While loop
count = 0
while count < 3:
    print(count)
    count += 1

# Break and continue
for i in range(10):
    if i == 3:
        break
    print(i)`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`0
1
2
3
4
apple
banana
orange
0
1
2
0
1
2`}</pre>
            </div>
          </section>

          {/* Functions */}
          <section id="functions" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Functions</h2>
            <p className="text-black mb-4">Functions are reusable blocks of code that perform specific tasks:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Basic function
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")

# Function with return
def add(a, b):
    return a + b

result = add(5, 3)
print(result)

# Default parameters
def introduce(name, age=20):
    print(f"{name} is {age} years old")

introduce("Charlie")
introduce("Diana", 25)`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Hello, Alice!
Hello, Bob!
8
Charlie is 20 years old
Diana is 25 years old`}</pre>
            </div>
          </section>

          {/* Lists */}
          <section id="lists" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Lists</h2>
            <p className="text-black mb-4">Lists are ordered, changeable collections that can hold multiple items:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Accessing elements
print(fruits[0])      # First element
print(fruits[-1])     # Last element

# List methods
fruits.append("grape")    # Add element
fruits.remove("apple")    # Remove element
print(len(fruits))        # Get length
print(fruits.index("banana"))  # Find index

# Slicing
print(numbers[1:4])   # Get elements from index 1 to 3`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`apple
orange
3
0
[2, 3, 4]`}</pre>
            </div>
          </section>

          {/* Tuples */}
          <section id="tuples" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Tuples</h2>
            <p className="text-black mb-4">Tuples are ordered, unchangeable collections similar to lists:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Creating tuples
colors = ("red", "green", "blue")
point = (10, 20)
single = ("hello",)  # Single element tuple needs comma

# Accessing elements
print(colors[0])
print(colors[-1])

# Tuple unpacking
r, g, b = colors
print(r)
print(g)
print(b)

# Tuples are immutable (cannot be changed)
# colors[0] = "yellow"  # This would cause an error
print(len(colors))
print("green" in colors)`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`red
blue
red
green
blue
3
True`}</pre>
            </div>
          </section>

          {/* Dictionaries */}
          <section id="dictionaries" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Dictionaries</h2>
            <p className="text-black mb-4">Dictionaries store data as key-value pairs:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Creating dictionaries
person = {"name": "Alice", "age": 25, "city": "New York"}
student = {"id": 101, "grade": "A"}

# Accessing values
print(person["name"])
print(person.get("age"))

# Adding and modifying
person["email"] = "alice@example.com"
person["age"] = 26

# Removing items
del person["city"]

# Dictionary methods
print(person.keys())        # Get all keys
print(person.values())      # Get all values
print(person.items())       # Get key-value pairs
print(len(person))          # Get number of items`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Alice
25
dict_keys(['name', 'age', 'email'])
dict_values(['Alice', 26, 'alice@example.com'])
dict_items([('name', 'Alice'), ('age', 26), ('email', 'alice@example.com')])
3`}</pre>
            </div>
          </section>

          {/* Sets */}
          <section id="sets" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Sets</h2>
            <p className="text-black mb-4">Sets are unordered collections of unique elements:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Creating sets
fruits = {"apple", "banana", "orange"}
numbers = {1, 2, 3, 4, 5}
empty_set = set()  # Empty set

# Set operations
fruits.add("grape")
fruits.remove("apple")

print(len(fruits))
print("banana" in fruits)

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))         # Union
print(set1.intersection(set2))  # Intersection
print(set1.difference(set2))    # Difference`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`3
True
{1, 2, 3, 4, 5}
{3}
{1, 2}`}</pre>
            </div>
          </section>

          {/* Comments */}
          <section id="comments" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Comments</h2>
            <p className="text-black mb-4">Comments explain code and are ignored by Python:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# This is a single-line comment
print("Hello, World!")  # This is also a comment

# Multi-line comments using triple quotes

"""
This is a multi-line comment.
It can span across multiple lines.
Very useful for documentation.
"""

print("Comments help make code readable")`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Hello, World!
Comments help make code readable`}</pre>
            </div>
          </section>

          {/* User Input */}
          <section id="input" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">User Input</h2>
            <p className="text-black mb-4">Get user input using the <code className="bg-slate-200 text-blue-600 px-2 rounded">input()</code> function:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Basic input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Converting input types
age = int(input("Enter your age: "))
height = float(input("Enter your height: "))

print(f"You are {age} years old and {height} meters tall")

# Multiple inputs
first, last = input("Enter first and last name: ").split()
print(f"First: {first}, Last: {last}")`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Enter your name: Alice
Hello, Alice!
Enter your age: 25
Enter your height: 5.7
You are 25 years old and 5.7 meters tall
Enter first and last name: John Doe
First: John, Last: Doe`}</pre>
            </div>
          </section>

          {/* Modules & Imports */}
          <section id="modules" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Modules & Imports</h2>
            <p className="text-black mb-4">Modules are files containing Python code. You can import and use them in your programs:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`import math
from random import randint
from datetime import datetime

# Using math module
print(math.sqrt(16))      # Square root
print(math.pi)            # Pi constant
print(math.ceil(4.3))     # Ceiling

# Using random
print(randint(1, 10))     # Random integer

# Using datetime
now = datetime.now()
print(now)
print(now.year)
print(now.strftime("%Y-%m-%d"))`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`4.0
3.141592653589793
5
7
2026-01-08 14:30:45.123456
2026
2026-01-08`}</pre>
            </div>
          </section>

          {/* Exception Handling */}
          <section id="exceptions" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Exception Handling</h2>
            <p className="text-black mb-4">Handle errors gracefully using try-except blocks:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Basic exception handling
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(result)
except ValueError:
    print("Please enter a valid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("Calculation successful")
finally:
    print("This always runs")`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Enter a number: 5
2.0
Calculation successful
This always runs`}</pre>
            </div>
          </section>

          {/* Classes & OOP */}
          <section id="classes" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Classes & Object-Oriented Programming</h2>
            <p className="text-black mb-4">Classes are blueprints for creating objects with attributes and methods:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, I'm {self.name}")
    
    def have_birthday(self):
        self.age += 1

# Creating objects
alice = Person("Alice", 25)
bob = Person("Bob", 30)

# Using methods
alice.greet()
bob.have_birthday()
print(bob.age)`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Hello, I'm Alice
31`}</pre>
            </div>
          </section>

          {/* File Handling */}
          <section id="files" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">File Handling</h2>
            <p className="text-black mb-4">Read and write files using Python:</p>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Writing to a file
with open("example.txt", "w") as file:
    file.write("Hello, Python!\\n")
    file.write("This is a test file.")

# Reading from a file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())

# Appending to a file
with open("example.txt", "a") as file:
    file.write("\\nAppended line")`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Hello, Python!
This is a test file.
Hello, Python!
This is a test file.`}</pre>
            </div>
          </section>

          {/* Best Practices */}
          <section id="bestpractices" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">Best Practices</h2>
            <p className="text-black mb-4">Follow these best practices when writing Python code:</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li><strong>Naming Conventions:</strong> Use snake_case for variables and functions, PascalCase for classes</li>
              <li><strong>Documentation:</strong> Write docstrings to explain what your functions do</li>
              <li><strong>Code Organization:</strong> Keep related code together in functions and classes</li>
              <li><strong>DRY Principle:</strong> Don't Repeat Yourself - use functions and loops</li>
              <li><strong>Error Handling:</strong> Always handle potential errors gracefully</li>
              <li><strong>PEP 8:</strong> Follow Python's style guide for consistent code</li>
              <li><strong>Testing:</strong> Write tests to verify your code works correctly</li>
              <li><strong>Comments:</strong> Write clear, concise comments explaining your logic</li>
            </ul>
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`def calculate_average(numbers):
    """
    Calculate the average of a list of numbers.
    
    Args:
        numbers: A list of numeric values
    
    Returns:
        The average of the numbers
    """
    if not numbers:
        return 0
    
    return sum(numbers) / len(numbers)

scores = [85, 90, 78, 92, 88]
average = calculate_average(scores)
print(f"Average score: {average}")`}</pre>
            </div>
            <div className="bg-slate-100 text-black p-4 rounded-lg mb-6 font-mono text-sm">
              <pre>{`Average score: 86.6`}</pre>
            </div>
          </section>

          <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Keep Learning!</h3>
            <p className="text-black">Python has much more to offer. Explore libraries like NumPy for numerical computing, Pandas for data analysis, Django for web development, and more. Practice regularly and build real projects!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
