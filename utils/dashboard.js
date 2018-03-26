const server = require('../express');
server.listen(4040, (err) => {
  if (err) throw err;
  console.info('> Ready on http://localhost:4040/dashboard');
});