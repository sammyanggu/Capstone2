import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /api/ai-review
 * Request body: { code: string, language: string, task?: string }
 * Response: { suggestions: Array<{level, message}>, meta: {model, durationMs} }
 */
app.post('/api/ai-review', async (req, res) => {
  try {
    const { code, language, task } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        error: 'Missing required fields: code, language',
      });
    }

    // Build the prompt for Gemini
    const prompt = `You are an expert code reviewer for a beginner learning platform. 
Analyze the following ${language.toUpperCase()} code and provide constructive, beginner-friendly feedback.

${task ? `Task: ${task}\n` : ''}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide feedback in JSON format with the following structure (and ONLY return valid JSON, no markdown):
{
  "suggestions": [
    {
      "level": "error|warning|hint|info",
      "message": "Brief, actionable suggestion"
    }
  ]
}

Guidelines:
- Only return JSON, no other text
- Focus on common beginner mistakes
- Keep messages short and actionable
- Prioritize the most impactful improvements
- Use "error" for critical issues (breaking code)
- Use "warning" for significant problems
- Use "hint" for style/best practice suggestions
- Use "info" for learning tips
- Max 5-7 suggestions`;

    const startTime = Date.now();

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const durationMs = Date.now() - startTime;

    // Parse JSON response from Gemini
    let suggestions = [];
    try {
      // Try to extract JSON from response (in case Gemini adds extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        suggestions = parsed.suggestions || [];
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', responseText, parseError);
      // Fallback: return a generic suggestion
      suggestions = [
        {
          level: 'info',
          message:
            'Could not parse AI feedback. Try rephrasing your code or check your code structure.',
        },
      ];
    }

    res.json({
      suggestions,
      meta: {
        model: 'gemini-1.5-flash',
        durationMs,
      },
    });
  } catch (error) {
    console.error('AI Review Error:', error);
    res.status(500).json({
      error: 'Failed to generate AI feedback',
      details: error.message,
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✓ AI Review Server running on http://localhost:${PORT}`);
  console.log(`✓ POST /api/ai-review ready for code reviews`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️ WARNING: GEMINI_API_KEY not set in .env. AI features will not work.');
  }
});
