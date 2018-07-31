const Parse = require('parse/node');
const UserCache = require('../models/UserCache');

module.exports = (nextApp) => async (req, res) => {
  const {
    params: { stepname },
    query: { step = 'index' },
    user,
  } = req;

  // 임시저장된 테이블 정보가 있으면 조회해서 넣어준다.
  let cache = {};
  const pq = new Parse.Query(UserCache);
  pq.equalTo('member', user);

  try {
    const result = await pq.first({ sessionToken: user.getSessionToken() });
    cache = result.toJSON();
  } catch (ex) {
    console.error(ex);
  }

  nextApp.render(req, res, '/become-a-host', {
    step: stepname || step,
    pageName: 'become-a-host',
    cache,
  });
};
