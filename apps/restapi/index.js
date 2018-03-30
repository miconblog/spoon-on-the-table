const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/api');
const user = require('./routes/api/user');

// 쿠키 파서
app.use(cookieParser());

// 파스 유저 인증 및 로그인/아웃, 중복이메일 확인
app.get('/logout', user.logout);
app.post('/login', bodyParser.json(), user.login);

app.use('/api', api);

module.exports = app;
