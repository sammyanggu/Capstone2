/**
 * Serverless API Endpoint - OpenAI Integration
 * Handles code feedback requests and returns AI-generated hints
 * Deployed on Vercel as a serverless function
 * 
 * Endpoint: POST /api/ai_hint
 * Body: { code, language, task, level }
 * 
 * Environment: OPENAI_API_KEY (required)

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed. Use POST.',
      method: req.method 
    });
  }

  // Validate required fields
  const { code, language } = req.body;
  if (!code || !language) {
    console.warn('⚠️ Missing required fields:', { code: !!code, language: !!language });
    return res.status(400).json({ 
      error: 'Code and language are required.',
      received: { code: !!code, language: !!language }
    });
  }

  // Check for API key - try multiple sources
  let apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY is not set');
    console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('OPENAI') || k.includes('AI')));
    return res.status(500).json({ 
      error: 'API key not configured. Please set OPENAI_API_KEY environment variable.',
      received: Object.keys(process.env).filter(k => k.includes('OPENAI') || k.includes('AI')).length > 0 ? 'Found AI-related vars but OPENAI_API_KEY missing' : 'No AI env vars found'
    });
  }

  console.log(`📝 Processing ${language} code feedback (${code.length} chars)...`);

  try {


    // Build a structured system prompt for dynamic, per-exercise feedback
    const systemPrompts = {
      html: "You are an expert HTML teaching assistant. Analyze the student's HTML code for the given exercise. Respond in this format:\n\nExercise: <exercise title>\n✅ Correct: <what is correct>\n❌ Mistakes: <list mistakes>\n💡 Tip: <one actionable tip>.\nBe encouraging and keep response under 100 words.",
      css: "You are an expert CSS teaching assistant. Analyze the student's CSS code for the given exercise. Respond in this format:\n\nExercise: <exercise title>\n✅ Correct: <what is correct>\n❌ Mistakes: <list mistakes>\n💡 Tip: <one actionable tip>.\nBe encouraging and keep response under 100 words.",
      javascript: "You are an expert JavaScript teaching assistant. Analyze the student's JavaScript code for the given exercise. Respond in this format:\n\nExercise: <exercise title>\n✅ Correct: <what is correct>\n❌ Mistakes: <list mistakes>\n💡 Tip: <one actionable tip>.\nBe encouraging and keep response under 100 words.",
      python: "You are an expert Python teaching assistant. Analyze the student's Python code for the given exercise. Respond in this format:\n\nExercise: <exercise title>\n✅ Correct: <what is correct>\n❌ Mistakes: <list mistakes>\n💡 Tip: <one actionable tip>.\nBe encouraging and keep response under 100 words.",
      php: "You are an expert PHP teaching assistant. Analyze the student's PHP code for the given exercise. Respond in this format:\n\nExercise: <exercise title>\n✅ Correct: <what is correct>\n❌ Mistakes: <list mistakes>\n💡 Tip: <one actionable tip>.\nBe encouraging and keep response under 100 words.",
      bootstrap: "You are an expert Bootstrap teaching assistant. Analyze the student's Bootstrap code for the given exercise. Respond in this format:\n\nExercise: <exercise title>\n✅ Correct: <what is correct>\n❌ Mistakes: <list mistakes>\n💡 Tip: <one actionable tip>.\nBe encouraging and keep response under 100 words.",
      tailwind: "You are an expert Tailwind CSS teaching assistant. Analyze the student's Tailwind code for the given exercise. Respond in this format:\n\nExercise: <exercise title>\n✅ Correct: <what is correct>\n❌ Mistakes: <list mistakes>\n💡 Tip: <one actionable tip>.\nBe encouraging and keep response under 100 words."
    };

    const systemPrompt = systemPrompts[language.toLowerCase()] || systemPrompts.javascript;
    const exerciseTitle = req.body.exerciseTitle || req.body.task || 'Untitled Exercise';

    console.log(`🔄 Calling OpenAI SDK for ${language}...`);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Exercise Title: ${exerciseTitle}\n\nHere is the student's ${language} code:\n\n${code}\n\nRespond in the format: Exercise, ✅ Correct, ❌ Mistakes, 💡 Tip.`
          }
        ],
        max_tokens: 180,
        temperature: 0.7,
      });

      const hint = completion.choices?.[0]?.message?.content?.trim() || '';
      console.log(`✅ AI feedback generated for ${language} (${hint.length} chars)`);
      return res.status(200).json({
        hint: hint,
        language: language,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('❌ OpenAI SDK error:', err);
      return res.status(500).json({
        error: 'OpenAI SDK error',
        message: err.message,
        type: err.name
      });
    }

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
} **/
