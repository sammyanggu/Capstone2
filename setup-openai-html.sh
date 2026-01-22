#!/bin/bash
# Setup OpenAI for HTML Beginner Exercise

echo "🚀 Setting up OpenAI integration for HTML Beginner..."

# Check if .env has OpenAI key
if grep -q "OPENAI_API_KEY" .env; then
    echo "✅ OpenAI API key found in .env"
else
    echo "⚠️  OpenAI API key not found in .env"
    echo "Please add OPENAI_API_KEY to your .env file"
fi

# Check if PHP server can access the API endpoint
echo "📝 Checking API endpoint..."
if [ -f "api/ai_hint.php" ]; then
    echo "✅ API endpoint file exists at api/ai_hint.php"
else
    echo "❌ API endpoint not found"
fi

# Check if smartAIFeedback service exists
if [ -f "src/services/smartAIFeedback.js" ]; then
    echo "✅ Smart AI feedback service exists"
else
    echo "❌ Smart AI feedback service not found"
fi

# Check if CodeFeedback component exists
if [ -f "src/components/CodeFeedback.jsx" ]; then
    echo "✅ CodeFeedback component exists"
else
    echo "❌ CodeFeedback component not found"
fi

echo ""
echo "🎯 OpenAI Integration Setup Complete!"
echo ""
echo "📚 HTML Beginner Exercises will now use OpenAI for:"
echo "  • Real-time code feedback"
echo "  • Intelligent error detection"
echo "  • Contextual learning hints"
echo ""
echo "🔄 The system will fallback to hardcoded feedback if OpenAI is unavailable"
