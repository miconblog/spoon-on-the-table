const Parse = require('parse/node');
const Rest = require('../routes/parse').Rest;

function authentication(req, res, next) {

  const session = req.cookies['parse.session'];
  const token = session ? JSON.parse(session).token : null;

  if (!token) {
    return next();
  }

  Rest('/users/me', 'GET', token)
    .then(function (userData) {
      req.user = Parse.Object.fromJSON(userData.data);
      next();
    })
    .then(null, function () {
      res.clearCookie('parse.session');
      console.log('error... ----', req.method, req.originalUrl);
      next();
    });
}

module.exports = authentication;