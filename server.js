const isDevelopment = process.env.NODE_ENV !== 'production';
const isTesting = process.env.NODE_ENV === 'test';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ps = require('./lib/parse-server');
const server = express();

// 정적 파일
server.use(express.static('public'));
server.use('/antd', express.static('node_modules/antd/dist'));

// 쿠키 파서
server.use(cookieParser());

// API 서버
server.use('/parse', ps.api);

// 개발모드일때만 대시보드 ON
if (isDevelopment && !isTesting) {
  server.use('/dashboard', ps.dashboard);
}

// 파스 유저 인증 및 로그인/아웃, 중복이메일 확인
server.get('/logout', ps.logout);
server.post('/login', bodyParser.json(), ps.login);
server.post('/api/user/duplicate', bodyParser.json(), ps.duplicate);
server.post('/api/user/create', bodyParser.json(), ps.createUser);

// 개인정보수정은 로그인한 본인만 할 수 있음.
server.put('/api/user/:id', ps.authentication, bodyParser.json(), ps.updateUser);
server.delete('/api/user/:id', ps.authentication, ps.deleteUser);

module.exports = server;
