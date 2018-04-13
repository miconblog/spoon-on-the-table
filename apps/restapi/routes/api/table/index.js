const Parse = require('parse/node');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cloudReq = require('../../../../lib/request-parse-cloud');
const authentication = require('../../../../lib/authentication');

const UserCache = Parse.Object.extend('UserCache');

async function getUserTableCache(req, res) {
  const { user, params: { id } } = req;
  const sessionToken = user.getSessionToken();

  // UserCache를 member로 조회해서 일단 있는지 확인 

  const query = new Parse.Query(UserCache);

  query.equalTo('member', user);
  let cache = await query.first();

  // 캐시가 없으면 항상 생성한다.
  if (!cache) {
    cache = new UserCache();
    cache.set('member', user);
    await cache.save();
  }

  res.json({ data: cache.toJSON() })
}

async function saveUserTableCache(req, res) {

  const { user, body: { table } } = req;

  // UserCache를 member로 조회해서 일단 있는지 확인 
  const query = new Parse.Query(UserCache);
  query.equalTo('member', user);

  const cache = await query.first();
  cache.set('table', table);
  await cache.save();

  res.json({ data: cache.toJSON() })
}

// 개인정보수정은 로그인한 본인만 할 수 있음.
router.get('/temporary', authentication, getUserTableCache);
router.put('/temporary', authentication, bodyParser.json(), saveUserTableCache);

module.exports = {
  router
}