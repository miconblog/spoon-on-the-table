const express = require('express');
const requestParse = require('../../../lib/request-parse');

const userRouter = require('./user');
const fileRouter = require('./file');
const tableRouter = require('./table');

const router = express.Router();

function setCookie(user, res) {
  res.cookie('auth-token', user.sessionToken, {
    path: '/',
    httpOnly: true,
  });
}

router.use('/user', userRouter);
router.use('/file', fileRouter);
router.use('/tables', tableRouter);
router.get('/login', (req, res) => {
  const { username, password } = req.query;

  requestParse(req, {
    endPoint: `/login?username=${username}&password=${password}`,
    type: 'Users',
  })
    .then((user) => {
      setCookie(user, res);
      res.status(202).json({ id: user.id, message: 'Login Success!' });
    })
    .catch((ex) => {
      res.clearCookie('auth-token');
      res.json({
        error: ex,
      });
    });
});
router.post('/logout', (req, res) => {
  // 로그아웃 API를 이용하면 서버의 세션도 같이 지워준다.
  requestParse(req, {
    endPoint: '/logout',
    type: 'Users',
    method: 'POST',
  })
    .then(() => {
      res.clearCookie('auth-token');
      res.json('OK');
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
