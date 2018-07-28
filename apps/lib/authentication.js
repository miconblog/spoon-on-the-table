const Parse = require('parse/node');
const requestParse = require('./request-parse');
const { MSG } = require('./errors');

function authentication(req, res, next) {
  //  console.log('TODO: 인증이 필요없는 페이지는 필터해야한다...-->', req.method, req.path)
  const sessionToken = req.cookies['auth-token'];

  if (!sessionToken) {
    if (/^\/api/.test(req.originalUrl)) {
      return next(new Error(MSG.NEED_AUTHENTICATION));
    }
    return next();
  }

  return requestParse(req, { endPoint: '/users/me', type: 'Users' }).then(
    (userData) => {
      req.user = Parse.Object.fromJSON(userData);
      next();
    },
    () => {
      res.clearCookie('auth-token');
      next();
    },
  );
}

module.exports = authentication;
