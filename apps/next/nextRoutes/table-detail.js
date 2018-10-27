const Parse = require('parse/node');
const Table = require('../models/Table');

module.exports = (nextApp) => async (req, res) => {
  const { id } = req.query;
  const { query = {} } = req;

  // 조회한다.
  const pq = new Parse.Query(Table);
  pq.include(['photos', 'host.user']);
  try {
    const result = await pq.get(id);
    const table = result.toJSON();
    table.host = result.get('host').toJSON();
    table.photos = result.get('photos').map((photo) => photo.toJSON());

    console.log('====', table);

    return nextApp.render(req, res, '/tables/show', {
      ...query,
      table,
    });
  } catch (ex) {
    console.log(ex);
    throw new Error('그런 페이지 없어!');
  }
};
