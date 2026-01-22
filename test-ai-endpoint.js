/**
 * Quick test script to verify the AI endpoint works
 * Usage: node test-ai-endpoint.js
 */

const testCode = '<h1>Hello</h1>\n<p>This is a test</p>';
const testLanguage = 'html';

console.log('🧪 Testing AI endpoint...');
console.log(`Code: ${testCode}`);
console.log(`Language: ${testLanguage}\n`);

try {
  const response = await fetch('http://localhost:5174/api/ai_hint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: testCode,
      language: testLanguage,
      task: 'Add more HTML elements to make it a complete page'
    }),
  });

  console.log(`Response Status: ${response.status}`);
  
  if (!response.ok) {
    console.error('❌ Error response:');
    const errorData = await response.json();
    console.error(JSON.stringify(errorData, null, 2));
    process.exit(1);
  }

  const data = await response.json();
  console.log('\n✅ Success!');
  console.log('Response:', JSON.stringify(data, null, 2));
  process.exit(0);
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
