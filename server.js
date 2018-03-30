const isDevelopment = process.env.NODE_ENV !== 'production';
const isTesting = process.env.NODE_ENV === 'test';

const parseapp = require('./apps/parse');
const dashboardapp = require('./apps/dashboard');
const nextapp = require('./apps/next');

// run express with next
nextapp().then(server => {
  server.listen(3000, (err) => {
    if (err) throw err;
    console.info('> Ready on http://localhost:3000');
  });
});

// run parse-server
parseapp.listen(9000, (err) => {
  if (err) throw err;
  console.info('> run parse-server on http://localhost:9000/parse');
});

// run dashboard
if (isDevelopment && !isTesting) {
  dashboardapp.listen(4040, (err) => {
    if (err) throw err;
    console.info('> run dashboard on http://localhost:4040');
  });
}
