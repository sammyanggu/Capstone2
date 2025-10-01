import { useParams } from 'react-router-dom';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';

// JavaScript Exercise component that handles different difficulty levels
function JavascriptExercise() {
  const { level } = useParams();
  
  // Exercise content for different levels
  const exercises = {
    beginner: {
      instructions: "Write JavaScript code to display a greeting message",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Exercise</title>
</head>
<body>
  <button onclick="greet()">Say Hello</button>
  <p id="greeting"></p>
  
  <script>
    // Write your function here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Exercise</title>
</head>
<body>
  <button onclick="greet()">Say Hello</button>
  <p id="greeting"></p>
  
  <script>
    function greet() {
      const name = prompt("What's your name?");
      document.getElementById("greeting").textContent = "Hello, " + name + "!";
    }
  </script>
</body>
</html>`,
      hints: [
        "Create a function named greet()",
        "Use prompt() to get user input",
        "Update the text content using getElementById()"
      ]
    },
    intermediate: {
      instructions: "Create a simple todo list with add and remove functionality",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Todo List Exercise</title>
</head>
<body>
  <input type="text" id="todoInput" placeholder="Add todo">
  <button onclick="addTodo()">Add</button>
  <ul id="todoList"></ul>
  
  <script>
    // Write your todo list code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Todo List Exercise</title>
</head>
<body>
  <input type="text" id="todoInput" placeholder="Add todo">
  <button onclick="addTodo()">Add</button>
  <ul id="todoList"></ul>
  
  <script>
    function addTodo() {
      const input = document.getElementById("todoInput");
      const text = input.value.trim();
      
      if (text) {
        const li = document.createElement("li");
        li.textContent = text;
        li.onclick = function() {
          this.remove();
        };
        document.getElementById("todoList").appendChild(li);
        input.value = "";
      }
    }
  </script>
</body>
</html>`,
      hints: [
        "Use createElement() to create new list items",
        "Add click handlers to remove items",
        "Clear the input after adding a todo"
      ]
    },
    advanced: {
      instructions: "Create a form with validation and async submission",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Form Validation Exercise</title>
  <style>
    .error { color: red; }
  </style>
</head>
<body>
  <form id="userForm">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" required>
      <span id="emailError" class="error"></span>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" required>
      <span id="passwordError" class="error"></span>
    </div>
    <button type="submit">Submit</button>
  </form>
  <div id="status"></div>
  
  <script>
    // Write your form validation code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Form Validation Exercise</title>
  <style>
    .error { color: red; }
  </style>
</head>
<body>
  <form id="userForm">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" required>
      <span id="emailError" class="error"></span>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" required>
      <span id="passwordError" class="error"></span>
    </div>
    <button type="submit">Submit</button>
  </form>
  <div id="status"></div>
  
  <script>
    document.getElementById("userForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      
      // Reset errors
      document.getElementById("emailError").textContent = "";
      document.getElementById("passwordError").textContent = "";
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      // Validation
      let isValid = true;
      
      if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        document.getElementById("emailError").textContent = "Invalid email format";
        isValid = false;
      }
      
      if (password.length < 8) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters";
        isValid = false;
      }
      
      if (isValid) {
        // Simulate async submission
        document.getElementById("status").textContent = "Submitting...";
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          document.getElementById("status").textContent = "Form submitted successfully!";
          this.reset();
        } catch (error) {
          document.getElementById("status").textContent = "Submission failed!";
        }
      }
    });
  </script>
</body>
</html>`,
      hints: [
        "Use regular expressions for email validation",
        "Add event listeners for form submission",
        "Use async/await for form submission",
        "Show loading and success states"
      ]
    }
  };

  // Get the exercise content for the current level
  const exercise = exercises[level] || exercises.beginner;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">JavaScript Exercise - {level.charAt(0).toUpperCase() + level.slice(1)} Level</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
        <p className="mb-4">{exercise.instructions}</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Hints:</h3>
          <ul className="list-disc list-inside">
            {exercise.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      </div>
      <LiveHtmlEditor
        initialCode={exercise.initialCode}
        solution={exercise.solution}
      />
    </div>
  );
}

export default JavascriptExercise;