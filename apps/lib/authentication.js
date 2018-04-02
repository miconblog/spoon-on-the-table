const Parse = require('parse/node');
const cloudReq = require('./request-parse-cloud');
const { MSG } = require('./errors');

function authentication(req, res, next) {
  //  console.log('TODO: 인증이 필요없는 페이지는 필터해야한다...-->', req.method, req.path)

  const session = req.cookies['parse.session'];
  const token = session ? JSON.parse(session).token : null;

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
      res.clearCookie('parse.session');
      next();
    });
}

module.exports = authentication;