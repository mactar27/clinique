const { streamText } = require('ai');
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
require('dotenv').config();

async function test() {
  const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const result = streamText({
      model: google('gemini-flash-latest'),
      prompt: 'Hello'
    });
    console.log(Object.keys(result));
  } catch (e) {
    console.log(e);
  }
}
test();
