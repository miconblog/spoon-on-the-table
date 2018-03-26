const isDevelopment = process.env.NODE_ENV !== 'production';
const isTesting = process.env.NODE_ENV === 'test';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const server = express();
const parse = require('./routes/parse');
const api = require('./routes/api');
const user = require('./routes/api/user');

// 정적 파일
server.use(express.static('./express/public'));
server.use('/antd', express.static('node_modules/antd/dist'));

// 쿠키 파서
server.use(cookieParser());

// API 서버
server.use('/parse', parse.api);

// 개발모드일때만 대시보드 ON
if (isDevelopment && !isTesting) {
  server.use('/dashboard', parse.dashboard);
}

// 파스 유저 인증 및 로그인/아웃, 중복이메일 확인
server.get('/logout', user.logout);
server.post('/login', bodyParser.json(), user.login);

server.use('/api', api);

module.exports = server;
