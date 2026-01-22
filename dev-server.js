/**
 * Development API Server using Express
 * Runs the AI feedback endpoint locally for development
 * 
 * Usage: node dev-server.js
 * Runs on http://localhost:5174
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.API_PORT || 5174;

// Middleware
app.use(cors());
app.use(express.json());

console.log('🚀 Starting API development server...');
console.log(`📝 API Key status: ${process.env.OPENAI_API_KEY ? '✅ Loaded' : '❌ Missing'}`);

/**
 * AI Hint Endpoint
 * POST /api/ai_hint
 */
app.post('/api/ai_hint', async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { code, language } = req.body;

  // Validate required fields
  if (!code || !language) {
    console.warn('⚠️ Missing required fields:', { code: !!code, language: !!language });
    return res.status(400).json({
      error: 'Code and language are required.',
      received: { code: !!code, language: !!language }
    });
  }

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY is not set');
    return res.status(500).json({
      error: 'API key not configured. Please set OPENAI_API_KEY environment variable.',
    });
  }

  console.log(`📝 Processing ${language} code feedback (${code.length} chars)...`);

  try {
    // Build the system prompt based on language
    const systemPrompts = {
      html: "You are an expert HTML teaching assistant. Analyze the student's HTML code and provide ONLY ONE specific, actionable hint to help them improve. Be encouraging and focus on the most important issue. Keep response under 100 words.",
      css: "You are an expert CSS teaching assistant. Analyze the student's CSS code and provide ONLY ONE specific, actionable hint to help them improve. Be encouraging and focus on the most important issue. Keep response under 100 words.",
      javascript: "You are an expert JavaScript teaching assistant. Analyze the student's JavaScript code and provide ONLY ONE specific, actionable hint to help them improve. Be encouraging and focus on the most important issue. Keep response under 100 words.",
      python: "You are an expert Python teaching assistant. Analyze the student's Python code and provide ONLY ONE specific, actionable hint to help them improve. Be encouraging and focus on the most important issue. Keep response under 100 words.",
      php: "You are an expert PHP teaching assistant. Analyze the student's PHP code and provide ONLY ONE specific, actionable hint to help them improve. Be encouraging and focus on the most important issue. Keep response under 100 words.",
      bootstrap: "You are an expert Bootstrap teaching assistant. Analyze the student's Bootstrap code and provide ONLY ONE specific, actionable hint to help them improve. Be encouraging and focus on the most important issue. Keep response under 100 words.",
      tailwind: "You are an expert Tailwind CSS teaching assistant. Analyze the student's Tailwind code and provide ONLY ONE specific, actionable hint to help them improve. Be encouraging and focus on the most important issue. Keep response under 100 words."
    };

    const systemPrompt = systemPrompts[language.toLowerCase()] || systemPrompts.javascript;

    console.log(`🔄 Calling OpenAI API for ${language}...`);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Here is the student's ${language} code:\n\n${code}\n\nProvide ONE specific hint to help improve this code.`
          }
        ],
        max_tokens: 120,
        temperature: 0.7,
      }),
    });

    console.log(`📊 OpenAI response status: ${response.status}`);

    // Check if response is OK
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('❌ OpenAI API error response:', errorData);
      } catch (e) {
        console.error('❌ Failed to parse OpenAI error response:', e.message);
        errorData = { error: { message: 'Failed to parse error response' } };
      }

      return res.status(response.status).json({
        error: 'OpenAI API error',
        details: errorData.error?.message || `HTTP ${response.status}`,
        status: response.status
      });
    }

    let data;
    try {
      data = await response.json();
    } catch (parseErr) {
      console.error('❌ Failed to parse OpenAI response JSON:', parseErr.message);
      return res.status(500).json({
        error: 'Failed to parse AI response',
        message: parseErr.message
      });
    }

    console.log('📦 OpenAI response structure:', {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length,
      hasMessage: !!data.choices?.[0]?.message
    });

    // Extract the hint from the response
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid response format from OpenAI:', data);
      return res.status(500).json({
        error: 'Invalid response from OpenAI',
        debug: 'Missing choices[0].message',
        received: JSON.stringify(data).substring(0, 200)
      });
    }

    const hint = data.choices[0].message.content.trim();

    console.log(`✅ AI feedback generated for ${language} (${hint.length} chars)`);

    return res.status(200).json({
      hint: hint,
      language: language,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('❌ Error in AI endpoint:', {
      message: err.message,
      name: err.name,
      stack: err.stack
    });
    return res.status(500).json({
      error: 'Failed to generate hint',
      message: err.message,
      type: err.name
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', apiKeyLoaded: !!process.env.OPENAI_API_KEY });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ API server running at http://localhost:${PORT}`);
  console.log(`📍 Endpoint: POST http://localhost:${PORT}/api/ai_hint`);
  console.log(`🏥 Health check: GET http://localhost:${PORT}/health`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down API server...');
  process.exit(0);
});
