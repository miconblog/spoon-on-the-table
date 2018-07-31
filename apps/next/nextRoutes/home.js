const Parse = require('parse/node');
const Table = require('../models/Table');

module.exports = nextApp => async (req, res) => {
  // 조회한다.
  let tables = [];
  const pq = new Parse.Query(Table);
  try {
    const results = await pq.find();
    tables = results.map(r => r.toJSON());
  } catch (ex) {
    console.error(ex);
    tables = [];
  }
  nextApp.render(req, res, '/', {
    tables,
  });
};
