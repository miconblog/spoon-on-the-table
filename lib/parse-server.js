const Parse = require('parse/node');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const { appId, serverURL, masterKey, fileKey } = require('./parse_env');

const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud', // Absolute path to your Cloud Code
  appId,
  masterKey, // Keep this key secret!
  fileKey,
  serverURL // Don't forget to change to https if needed
});

const dashboard = new ParseDashboard({
  apps: [{
    serverURL,
    appId,
    masterKey,
    appName: 'TableSpoon'
  }]
});


function Rest(endpoint, method, token) {
  return Parse.Cloud.httpRequest({
    url: `${serverURL}${endpoint}`,
    method,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Session-Token': token
    }
  });
}


// 인증 미들웨어
function authentication(req, res, next) {

  const session = req.cookies['parse.session'];
  const token = session ? JSON.parse(session)
    .token : null;

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


function login(req, res) {

  const { username, password } = req.body;

  Parse.User
    .logIn(username, password)
    .then((user) => {

      var val = JSON.stringify({
        token: user.getSessionToken()
      });

      res.cookie('parse.session', val, {
        path: '/',
        httpOnly: true
      });

      res.status(202).send('Login Success!');

    }, (error) => {

      res.clearCookie('parse.session');
      res.json({
        error: {
          message: error.message
        }
      });

    })
    .catch((ex) => {
      console.log('Exception... ', ex);
    });

}

function logout(req, res) {

  const session = req.cookies['parse.session'];
  const token = session ? JSON.parse(session).token : null;

  // 로그아웃 API를 이용하면 서버의 세션도 같이 지워준다.
  Rest('/logout', 'POST', token)
    .then((e) => {
      res.clearCookie('parse.session');
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.redirect('/');
    });
}

function duplicate(req, res) {

  const { email } = req.body;

  const query = new Parse.Query(Parse.User);
  query.equalTo("email", email);
  query.find()
    .then((users) => {
      if (users.length === 0) {
        res.status(204).send();
      } else {
        res.status(492).send('This email is duplicated!');
      }
    })
    .catch((e) => {
      res.status(500)
        .send(e);
    });
}

function createUser(req, res) {
  const { email, username, password } = req.body;
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  user.signUp(null, {
    success: function (user) {
      // Hooray! Let them use the app now.

      var val = JSON.stringify({
        token: user.getSessionToken()
      });

      res.cookie('parse.session', val, {
        path: '/',
        httpOnly: true
      });

      res.status(201).send('OK');
    },
    error: function (user, error) {

      console.error(error);
      res.send('Not Okay');

    }
  });
}

module.exports = {
  api,
  dashboard,
  authentication,
  duplicate,
  createUser,
  login,
  logout
};