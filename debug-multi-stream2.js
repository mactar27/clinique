const { streamText } = require('ai');
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
require('dotenv').config();

async function test() {
  const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  const messages = [
    { role: 'user', content: 'Salut' },
    { role: 'assistant', parts: [{ type: 'text', text: 'Bonjour' }] },
    { role: 'user', content: 'Je m\'appelle Mactar' }
  ];
  
  const coreMessages = messages.map(m => ({
    role: m.role,
    content: m.content || (m.parts && m.parts.map(p => p.text).join('')) || ""
  }));

  try {
    const result = streamText({
      model: google('gemini-flash-latest'),
      messages: coreMessages
    });
    console.log(typeof result.toUIMessageStreamResponse);
  } catch (e) {
    console.log("ERROR", e);
  }
}
test();
