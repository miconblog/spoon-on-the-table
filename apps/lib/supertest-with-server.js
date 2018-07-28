import request from 'supertest';

export default function withServer(server) {
  return function (req) {
    return new Promise((resolve) => {
      const { cookie, method, url, data, attach, field, json = true } = req;
      const app = request(server);

      let query = app[method.toLowerCase()](url).set(
        'Accept',
        'application/json',
      );

      if (cookie) {
        query.set('cookie', cookie);
      }

      if (field) {
        Object.keys(field).forEach((name) => {
          query.field(name, field[name]);
        });
      }

      if (attach) {
        Object.keys(attach).forEach((name) => {
          query.attach(name, attach[name]);
        });
      } else {
        query = query.send(data);
      }

      if (json) {
        query = query.expect('Content-Type', /json/);
      }

      query
        .then(({ header, status, body }) => resolve({ header, status, body }))
        .catch((ex) => {
          console.error(ex);
          throw new Error(ex);
        });
    }).catch((ex) => {
      throw new Error(ex);
    });
  };
}
