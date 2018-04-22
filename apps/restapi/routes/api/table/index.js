const Parse = require('parse/node');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cloudReq = require('../../../../lib/request-parse-cloud');
const authentication = require('../../../../lib/authentication');
const UserCache = require('../../../models/UserCache');

async function getUserCache(req, res) {
  const { user, params: { id }, query: { field } } = req;
  const sessionToken = user.getSessionToken();

  // UserCache를 member로 조회해서 일단 있는지 확인 
  const q = new Parse.Query(UserCache);
  q.equalTo('member', user);
  let cache = await q.first();

  // 캐시가 없으면 항상 생성한다.
  if (!cache) {
    cache = new UserCache();
    cache.set('member', user);
    await cache.save();
  }

  // 특정 필드만 가져오고 싶을땐 쿼리를 지정한다.
  if (field) {
    return res.json({ data: cache.toJSON([field]) })
  }
  return res.json({ data: cache.toJSON() })
}

async function saveUserTableCache(req, res) {

  const { user, body: { table, test = false } } = req;

  // UserCache를 member로 조회해서 일단 있는지 확인 
  const query = new Parse.Query(UserCache);
  query.equalTo('member', user);

  const cache = await query.first();
  cache.set('table', table);

  test && cache.set('test', test);

  await cache.save();

  res.json({ data: cache.toJSON() })
}

// 개인정보수정은 로그인한 본인만 할 수 있음.
router.get('/temporary', authentication, getUserCache);
router.put('/temporary', authentication, bodyParser.json(), saveUserTableCache);

module.exports = {
  router
}