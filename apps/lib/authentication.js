const Parse = require('parse/node');
const cloudReq = require('./request-parse-cloud');
const { MSG } = require('./errors');

function authentication(req, res, next) {
  //  console.log('TODO: 인증이 필요없는 페이지는 필터해야한다...-->', req.method, req.path)
  const token = req.cookies['auth-token'];

  if (!token) {
    if (/^\/api/.test(req.originalUrl)) {
      return next(new Error(MSG.NEED_AUTHENTICATION))
    }
    return next()
  }

  cloudReq('/users/me', 'GET', token)
    .then(function success(userData) {
      req.user = Parse.Object.fromJSON(userData.data);
      next();
    }, function error() {
      res.clearCookie('auth-token');
      next();
    });
}

module.exports = authentication;