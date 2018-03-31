const Parse = require('parse/node');
const cloudReq = require('./request-parse-cloud');
const { MSG } = require('./restapi/errors');

function authentication(req, res, next) {

  const session = req.cookies['parse.session'];
  const token = session ? JSON.parse(session).token : null;

  if (!token) {
    return next(new Error(MSG.NEED_AUTHENTICATION))
  }

  cloudReq('/users/me', 'GET', token)
    .then(function (userData) {
      req.user = Parse.Object.fromJSON(userData.data);
      next();
    })
    .then(null, function () {
      res.clearCookie('parse.session');
      next();
    });
}

module.exports = authentication;