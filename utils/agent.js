/**
 * @fileOverview agent for jest with supertest 
 */
import server from '../express';
import request from 'supertest';

server.listen(3000, (err) => {
  if (err) throw err;
  console.info('> Ready on http://localhost:3000');
});

export default ({ cookie, method, url, data }) => {
  return new Promise((resolve) => {

    const query = request(server)[method.toLowerCase()](url)
      .set('Accept', 'application/json');

    if (cookie) {
      query.set('cookie', cookie);
    }

    query
      .send(data)
      .expect('Content-Type', /json/)
      .then(({ header, status, body }) => resolve({ header, status, body }))
      .catch(ex => console.log(ex))

  }).catch((ex) => {
    throw new Error(ex);
  });
}
