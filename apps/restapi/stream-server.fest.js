import request from 'supertest';
import server from './stream-server';

server.listen(3000, (err) => {
  if (err) throw err;
  console.info('> Ready on http://localhost:3000');
});

function agent({ method, url }) {
  return new Promise((resolve) => {

    let query = request(server)[method.toLowerCase()](url)
      .set('Accept', 'application/json');

    query
      .then(({ header, status, text, body }) => resolve({ header, status, text, body }))
      .catch(ex => console.log(ex))

  }).catch((ex) => {
    throw new Error(ex);
  });
}


describe('GET / - OK', () => {
  it('should be OK', async () => {
    const res = await agent({
      method: 'GET',
      url: '/',
    });

    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });

});
