/**
 * @fileOverview agent for jest with supertest 
 */
import request from 'supertest';

export default (server) => ({ cookie, method, url, data, attach }) => {
  return new Promise((resolve) => {

    let query = request(server)[method.toLowerCase()](url)
      .set('Accept', 'application/json');

    if (cookie) {
      query.set('cookie', cookie);
    }

    if (attach) {
      Object.keys(attach).forEach((name) => {
        query.attach(name, attach[name])
      })
    } else {
      query = query.send(data);
    }

    query
      .expect('Content-Type', /json/)
      .then(({ header, status, body }) => resolve({ header, status, body }))
      .catch(ex => console.log(ex))

  }).catch((ex) => {
    throw new Error(ex);
  });
}
