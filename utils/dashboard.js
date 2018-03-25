const server = require('../server');
const request = require('supertest');
const ps = require('../lib/parse-server');

server.listen(4040, (err) => {
  if (err) throw err;
  console.info('> Ready on http://localhost:4040/dashboard');
});