# Firebase AI Studio Integration Setup

This guide explains how to set up the Firebase Cloud Function for AI code review using Vertex AI.

## Prerequisites

- Firebase project already set up: `capstone-0630-bsit`
- Access to Firebase Console
- Cloud Functions enabled in your Firebase project

## Setup Steps

### 1. Enable Required APIs in Firebase

Go to your Firebase Console:
1. Navigate to **Build** → **Functions**
2. Ensure **Cloud Functions API** is enabled
3. Go to **Vertex AI** section (if available) or enable through Google Cloud Console

### 2. Create Cloud Function

In Firebase Console → **Functions**:

1. Click **Create function**
2. Configure:
   - **Function name**: `reviewCode`
   - **Region**: `asia-southeast1` (matches your database region)
   - **Trigger**: HTTPS
   - **Authentication**: Require authentication
   - **Runtime**: Node.js 20 (or latest)

3. **index.js** code:

```javascript
import { onCall } from "firebase-functions/v2/https";
import { VertexAI } from "@google-cloud/vertexai";

const vertexAI = new VertexAI({
  project: "capstone-0630-bsit",
  location: "asia-southeast1"
});

export const reviewCode = onCall({ region: "asia-southeast1" }, async (request) => {
  const { code, language, task } = request.data;

  if (!code) {
    throw new Error("No code provided");
  }

  try {
    const generativeModel = vertexAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `You are a code review assistant. Analyze the following ${language} code and provide constructive feedback.
${task ? `Task: ${task}` : ""}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide your feedback as a JSON array with objects containing "level" (warning, error, info, hint, or success) and "message" (string). Example:
[
  { "level": "warning", "message": "Missing semicolon on line 3" },
  { "level": "info", "message": "Consider using const instead of var" }
]

IMPORTANT: Return ONLY valid JSON array, no other text.`;

    const response = await generativeModel.generateContent(prompt);
    const responseText = response.response.text();

    // Parse JSON response
    let feedback = [];
    try {
      feedback = JSON.parse(responseText);
    } catch (e) {
      // Try to extract JSON from response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        feedback = JSON.parse(jsonMatch[0]);
      } else {
        feedback = [{ level: "info", message: responseText }];
      }
    }

    return { feedback };
  } catch (error) {
    console.error("AI Review Error:", error);
    throw new Error(`Failed to analyze code: ${error.message}`);
  }
});
```

### 3. Install Dependencies

In your Cloud Function settings, update `package.json`:

```json
{
  "name": "functions",
  "description": "Firebase Functions for AI code review",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "deploy": "firebase deploy --only functions"
  },
  "engines": {
    "node": "20"
  },
  "dependencies": {
    "@google-cloud/vertexai": "^1.1.1",
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0"
  }
}
```

### 4. Deploy Function

```bash
firebase deploy --only functions:reviewCode
```

## How It Works

1. **Frontend** (CodeFeedback.jsx) sends code to the Cloud Function
2. **Cloud Function** calls Vertex AI's Gemini API with the code
3. **Vertex AI** analyzes the code and returns intelligent feedback
4. **Feedback** is displayed in real-time in the AI Assistant panel

## Testing

1. Start your dev server: `npm run dev`
2. Navigate to an exercise page
3. Click "Show AI Demo" or type code
4. The AI Assistant panel should show intelligent feedback from Vertex AI

## Troubleshooting

- **Function not found**: Ensure function is deployed and region matches (`asia-southeast1`)
- **Authentication error**: Check that user is logged in to Firebase
- **API not enabled**: Enable Vertex AI API in Google Cloud Console
- **Quota exceeded**: Check Vertex AI quotas in Google Cloud Console

## Region Note

The function is configured for `asia-southeast1` to match your database region. If you change regions, update:
- Cloud Function region
- `firebase.js`: `getFunctions(app, 'your-region')`
