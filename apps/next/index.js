const isDevelopment = process.env.NODE_ENV !== 'production';
const express = require('express');
const next = require('next');
const routesWithoutNext = require('./routes');

const nextApp = next({ dev: isDevelopment });
const nextHandle = nextApp.getRequestHandler();

const authentication = require('../lib/authentication');

module.exports = function() {
  return nextApp
    .prepare()
    .then(() => {
      const server = express();

      server.use(routesWithoutNext);

      // 상세 페이지 라우팅
      server.get('/tables/:id', authentication, (req, res) => {
        nextApp.render(req, res, '/post', {
          id: req.params.id,
        });
      });

      // 일반 유저 로그인 페이지
      server.get('/users/:pageName*', authentication, (req, res) => {
        const { pageName } = req.params;
        const { query = {} } = req;
        let userId = req.params[0];

        if (!req.user) {
          return res.redirect('/sign');
        }

        if (userId) {
          userId = userId.substr(1, userId.length);

          // 유저 아이디와 URL로 접근한 서브 아이디가 다르면 에러다! redirect!!
          if (userId !== req.user.id) {
            return res.redirect('/');
          }
        }

        console.log('/users/pageName', req.user.toJSON());

        let sectionName = query.section || 'profile';
        if (pageName === 'edit_verification') {
          sectionName = 'verification';
        }

        return nextApp.render(req, res, `/users/${pageName}`, {
          pageName,
          userId,
          ...query,
          section: sectionName,
        });
      });

      // 호스트 전용 페이지
      server.get('/host/:pageName', authentication, (req, res) => {
        const { pageName } = req.params;
        const { query = {} } = req;

        if (!req.user) {
          return res.redirect('/sign');
        }

        return nextApp.render(req, res, `/host-${pageName}`, {
          pageName,
          ...query,
        });
      });

      // 호스팅하기
      function becomeHost(req, res) {
        const { stepname } = req.params;
        const {
          query: { step = 'index' },
        } = req;

        nextApp.render(req, res, '/become-a-host', {
          step: stepname || step,
          pageName: 'become-a-host',
        });
      }
      server.get('/become-a-host', authentication, becomeHost);
      server.get('/become-a-host/:stepname', authentication, becomeHost);

      // 메인 페이지
      server.get('/', authentication, (req, res) => nextHandle(req, res));

      // 나머지 모든 라우팅
      server.get('*', (req, res) => nextHandle(req, res));

      return server;
    })
    .catch((ex) => {
      console.error('catch....', ex);
      process.exit(1);
    });
};
