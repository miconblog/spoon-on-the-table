/**
 * @fileOverview agent for jest with supertest 
 */
import request from 'supertest';

export default (server) => ({ cookie, method, url, data, attach, field, json = true }) => {
  return new Promise((resolve) => {

    let query = request(server)[method.toLowerCase()](url)
      .set('Accept', 'application/json');

    if (cookie) {
      query.set('cookie', cookie);
    }

    if (field) {
      Object.keys(field).forEach((name) => {
        query.field(name, field[name])
      })
    }

    if (attach) {
      Object.keys(attach).forEach((name) => {
        query.attach(name, attach[name])
      })
    } else {
      query = query.send(data);
    }

    if (json) {
      query = query.expect('Content-Type', /json/)
    }

    query
      .then(({ header, status, body }) => resolve({ header, status, body }))
      .catch(ex => {
        throw new Error(ex);
      })

  }).catch((ex) => {
    throw new Error(ex);
  });
}
