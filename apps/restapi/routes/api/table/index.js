const Parse = require('parse/node');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cloudReq = require('../../../../lib/request-parse-cloud');
const authentication = require('../../../../lib/authentication');

function getUserTableCache(req, res) {
  const { user, params: { id } } = req;
  const sessionToken = user.getSessionToken();

  res.json({ 'result': 'OK' })
}

// 개인정보수정은 로그인한 본인만 할 수 있음.
router.get('/temporary', authentication, getUserTableCache);

module.exports = {
  router
}