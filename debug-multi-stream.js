const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`CHUNK: ${chunk.toString()}`);
  });
  res.on('end', () => {
    console.log('END');
  });
});
req.write(JSON.stringify({
  messages: [
    { role: 'user', content: 'Salut' },
    { role: 'assistant', parts: [{ type: 'text', text: 'Bonjour' }] },
    { role: 'user', content: 'Je m\'appelle Mactar' }
  ]
}));
req.end();
