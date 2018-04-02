const isDevelopment = process.env.NODE_ENV !== 'production';
const express = require('express');
const next = require('next');
const app = next({ dev: isDevelopment });

const handle = app.getRequestHandler();
const authentication = require('../lib/authentication');

function route(resolve) {

  const was = require('../restapi');

  // NOTICE: nginx가 있다면 정적 파일을 서빙하는 주체는 바뀔수 있다.
  was.use(express.static('./apps/next/public'));
  was.use('/antd', express.static('node_modules/antd/dist'));

  // 상세 페이지 라우팅
  was.get('/tables/:id', authentication, (req, res) => {
    app.render(req, res, '/post', {
      id: req.params.id
    });
  });

  // 마이 페이지 라우팅
  was.get('/my/:pageName', authentication, (req, res) => {
    const { pageName } = req.params;
    const { query = {} } = req;

    if (!req.user) {
      return res.redirect('/sign')
    }

    app.render(req, res, `/my-${pageName}`, {
      pageName,
      ...query
    });
  });

  // 페이지
  was.get('/:pageName', authentication, (req, res) => {
    const { pageName } = req.params;
    const { query = {} } = req;
    app.render(req, res, `/${pageName}`, {
      pageName,
      ...query
    });
  });

  // 메인 페이지
  was.get('/', authentication, (req, res) => {
    return handle(req, res);
  });

  // 나머지 모든 라우팅
  was.get('*', (req, res) => {
    return handle(req, res);
  });

  resolve(was);
}

module.exports = () => new Promise((resolve) => {
  app.prepare()
    .then(route(resolve))
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
});