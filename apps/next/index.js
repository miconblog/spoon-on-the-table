const isDevelopment = process.env.NODE_ENV !== 'production';
const Parse = require('parse/node');
const express = require('express');
const next = require('next');
const { appId, serverURL } = require('../lib/env');
const authentication = require('../lib/authentication');

// Express 라우터 설정 for local API
const expressRouter = require('./routes');

// Next 라우터 설정 for SSR
const nextApp = next({ dev: isDevelopment });
const nextHandle = nextApp.getRequestHandler();
const nextUsersRouter = require('./nextRoutes/users')(nextApp);
const nextHomeRouter = require('./nextRoutes/home')(nextApp);
const nextTableDetainRouter = require('./nextRoutes/table-detail')(nextApp);
const nextCreateHostingRouter = require('./nextRoutes/create-table-hosting')(nextApp);
const nextHostOnlyRouter = require('./nextRoutes/host-only')(nextApp);

// Parse SDK 초기화
Parse.initialize(appId);
Parse.serverURL = serverURL;

module.exports = function() {
  return nextApp
    .prepare()
    .then(() => {
      const server = express();

      server.use(expressRouter);

      // 상세 페이지 라우팅
      server.get('/tables/:id', authentication, nextTableDetainRouter);

      // 일반 유저 로그인 페이지
      server.get('/users/edit/:section', authentication, nextUsersRouter);
      server.get('/users/edit', authentication, nextUsersRouter);

      // 호스트 전용
      server.get('/host/:pageName', authentication, nextHostOnlyRouter);

      // 호스팅하기 & 테이블 등록
      server.get('/become-a-host/:stepname', authentication, nextCreateHostingRouter);
      server.get('/become-a-host', authentication, nextCreateHostingRouter);

      // 메인 페이지
      server.get('/', authentication, nextHomeRouter);

      // 나머지 모든 라우팅
      server.get('*', (req, res) => nextHandle(req, res));

      return server;
    })
    .catch((ex) => {
      console.error('catch....', ex);
      process.exit(1);
    });
};
