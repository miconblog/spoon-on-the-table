const Parse = require('parse/node');

Parse.Cloud.define('events', async (request, response) => {
  const query = new Parse.Query('Table');
  query.include(['photos']);
  query.find()
    .then((results) => {
      response.success(results);
    })
    .catch(() => {
      response.error({ error: { message: 'ERROR' } });
    });
});
