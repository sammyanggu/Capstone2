const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

console.log("🔑 Gemini API Key:", API_KEY ? `Found (${API_KEY.length} chars)` : "NOT FOUND");
console.log("🤖 Using model: gemini-1.5-flash");

// Get language-specific prompt based on file type
function getSystemPrompt(language) {
  const languagePrompts = {
    html: `You are an HTML instructor. Analyze the HTML code and provide:
1. **Errors**: Syntax errors, missing required elements
2. **Best Practices**: Semantic HTML, accessibility issues
3. **Beginner Tips**: Simple improvements for learners

Format your response as a clear, numbered list. Be encouraging.
Do NOT provide the complete solution. Just guide the student.`,

    css: `You are a CSS instructor. Analyze the CSS code and provide:
1. **Errors**: Invalid syntax or selectors
2. **CSS Quality**: Performance issues, best practices
3. **Learning Tips**: Simpler ways to achieve the same result

Format your response as a clear, numbered list. Be encouraging.
Do NOT provide the complete solution. Just guide the student.`,

    javascript: `You are a JavaScript instructor. Analyze the JavaScript code and provide:
1. **Errors**: Logic errors, syntax issues
2. **Code Quality**: Best practices, performance tips
3. **Learning Tips**: How to improve without giving the answer

Format your response as a clear, numbered list. Be encouraging.
Do NOT provide the complete solution. Just guide the student.`,

    php: `You are a PHP instructor. Analyze the PHP code and provide:
1. **Errors**: Syntax errors, logical issues
2. **PHP Best Practices**: Security, performance, standards
3. **Learning Tips**: How to improve the code

Format your response as a clear, numbered list. Be encouraging.
Do NOT provide the complete solution. Just guide the student.`,

    python: `You are a Python instructor. Analyze the Python code and provide:
1. **Errors**: Syntax errors, logical issues
2. **Python Best Practices**: PEP8, performance, patterns
3. **Learning Tips**: How to improve the code

Format your response as a clear, numbered list. Be encouraging.
Do NOT provide the complete solution. Just guide the student.`,

    bootstrap: `You are a Bootstrap instructor. Analyze the Bootstrap code and provide:
1. **Errors**: Missing classes or incorrect structure
2. **Bootstrap Best Practices**: Responsive design, accessibility
3. **Learning Tips**: How to use Bootstrap more effectively

Format your response as a clear, numbered list. Be encouraging.
Do NOT provide the complete solution. Just guide the student.`,

    tailwind: `You are a Tailwind CSS instructor. Analyze the Tailwind CSS code and provide:
1. **Errors**: Incorrect utility classes, invalid syntax
2. **Tailwind Best Practices**: Responsive design, optimization
3. **Learning Tips**: Better ways to write Tailwind classes

Format your response as a clear, numbered list. Be encouraging.
Do NOT provide the complete solution. Just guide the student.`,
  };

  return languagePrompts[language.toLowerCase()] || languagePrompts.javascript;
}

/**
 * Get AI feedback for code using Gemini API (fetch method)
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @param {string} task - The exercise task/instructions
 * @returns {Promise<string>} AI feedback text
 */
export async function getCodeReview(code, language, task) {
  if (!code || code.trim().length === 0) {
    return "Start typing your code to get AI feedback! 📝";
  }

  if (!API_KEY) {
    return "❌ Gemini API key not configured. Contact admin.";
  }

  try {
    const systemPrompt = getSystemPrompt(language);
    const userPrompt = `${systemPrompt}

Exercise Task:
${task || "No specific task provided."}

Code to Review:
\`\`\`${language}
${code}
\`\`\`

Provide clear, encouraging feedback to help the student improve their code.`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: userPrompt
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      if (data.error?.message?.includes("API_KEY_INVALID")) {
        return "❌ API key is invalid. Please contact admin.";
      }
      throw new Error(data.error?.message || "Gemini API error");
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return "⚠️ No feedback received. Try again.";
    }

    const feedback = data.candidates[0].content.parts[0].text;
    return feedback;
  } catch (error) {
    console.error("❌ Gemini Fetch Error:", error);
    return `⚠️ Feedback unavailable: ${error.message}`;
  }
}

/**
 * Check if API is configured
 * @returns {boolean}
 */
export function isGeminiConfigured() {
  return !!API_KEY;
}
