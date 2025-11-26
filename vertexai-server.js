import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

console.log('🚀 Starting Gemini AI Server...');

// Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDxTd_YWjdrk6eGzXbYEBX5OuINIALO58w');

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Gemini Code Review' });
});

app.post('/api/review-code', async (req, res) => {
  const { code, language, task } = req.body;

  console.log(`📝 Analyzing ${language} code (${code?.length || 0} chars)...`);

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro'
    });

    const prompt = `You are a code review assistant. Analyze the following ${language} code and provide constructive feedback.
${task ? `Task: ${task}` : ''}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide your feedback as a JSON array with objects containing "level" (warning, error, info, hint, or success) and "message" (string). Example:
[
  { "level": "error", "message": "Missing DOCTYPE declaration" },
  { "level": "warning", "message": "Images should have alt attributes" },
  { "level": "info", "message": "Consider adding a lang attribute to <html>" }
]

IMPORTANT: Return ONLY valid JSON array, no other text.`;

    const response = await model.generateContent(prompt);
    const responseText = response.response.text();

    console.log(`✅ Gemini response received`);

    // Parse JSON response
    let feedback = [];
    try {
      feedback = JSON.parse(responseText);
    } catch (e) {
      console.warn('⚠️ Failed to parse JSON, attempting extraction...');
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        feedback = JSON.parse(jsonMatch[0]);
        console.log('✅ JSON extracted successfully');
      } else {
        feedback = [{ level: 'info', message: responseText }];
      }
    }

    res.json({ feedback });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze code with Gemini API'
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n✨ Gemini AI server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API endpoint: POST http://localhost:${PORT}/api/review-code\n`);
});
