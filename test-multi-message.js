const { streamText } = require('ai');
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
require('dotenv').config();

async function test() {
  const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const result = streamText({
      model: google('gemini-flash-latest'),
      messages: [
        { role: 'user', content: 'Salut' },
        { role: 'assistant', content: 'Bonjour' },
        { role: 'user', content: 'Je m\'appelle Mactar' }
      ]
    });
    console.log(typeof result.toUIMessageStreamResponse);
  } catch (e) {
    console.log(e);
  }
}
test();
