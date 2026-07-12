const { streamText } = require('ai');
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
require('dotenv').config();

async function test() {
  const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  const result = streamText({
    model: google('gemini-flash-latest'),
    prompt: 'Hello'
  });
  console.log('toDataStreamResponse type:', typeof result.toDataStreamResponse);
  console.log('toTextStreamResponse type:', typeof result.toTextStreamResponse);
  console.log('toUIMessageStreamResponse type:', typeof result.toUIMessageStreamResponse);
}
test();
