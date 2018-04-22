const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/api');
const image = require('./routes/image');
const user = require('./routes/api/user');
const errors = require('../lib/errors');

function errorHandler(err, req, res, next) {
  const { code, message } = errors[err.message];
  return res.status(code).json({ message })
}

// 쿠키 파서
app.use(cookieParser());

// 파스 유저 인증 및 로그인/아웃, 중복이메일 확인
app.get('/logout', user.logout);
app.post('/login', bodyParser.json(), user.login);

app.use('/api', api);
app.use('/image/:photoId', image);
app.use(errorHandler)

module.exports = app;
