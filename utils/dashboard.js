const server = require('../apps/dashboard');
server.listen(4040, (err) => {
  if (err) throw err;
  console.info('> Ready on http://localhost:4040');
});