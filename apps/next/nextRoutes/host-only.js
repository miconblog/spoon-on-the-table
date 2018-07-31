const Parse = require('parse/node');
const Table = require('../models/Table');

module.exports = nextApp => async (req, res) => {
  const { pageName } = req.params;
  const { query = {} } = req;

  if (!req.user) {
    return res.redirect('/sign');
  }

  // 조회한다.
  let tables = [];
  const pq = new Parse.Query(Table);
  pq.equalTo('host', req.user);
  pq.include(['photos']);
  try {
    const results = await pq.find();
    tables = results.map(r => r.toJSON());
  } catch (ex) {
    tables = [];
  }

  return nextApp.render(req, res, `/host/${pageName}`, {
    pageName,
    ...query,
    tables,
  });
};
