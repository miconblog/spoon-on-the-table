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

function login(req, res) {
  const { username, password } = req.body;

  Parse.User
    .logIn(username, password)
    .then((user) => {
      setCookie(user, res);
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
  query.equalTo('email', email);
  query.find()
    .then((users) => {
      if (users.length === 0) {
        res.status(202).json({ message: 'OK, you can use it' });
      } else {
        res.status(409).json({ message: 'Sorry, it was duplicated!' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
}

function createUser(req, res) {
  const { email, username, password } = req.body;
  const user = new Parse.User();

  if (!email || !username || !password) {
    return res.status(400).json({ message: '인자가 부족하다' });
  }

  user.set('username', username);
  user.set('password', password);
  user.set('email', email);

  user.signUp(null, {
    success: function (user) {
      setCookie(user, res);
      res.status(201).json({ message: 'OK', id: user.id });
    },
    error: function (user, error) {
      res.status(500).json({ error });
    }
  });
}

function updateUser(req, res) {
  const { user, params: { id }, body } = req;

  // 권한 확인
  if (!user || (user.id !== id)) {
    return res.status(401).json({ message: '권한이 없습니다.' });
  }

  user
    .save(body, {
      sessionToken: user.getSessionToken()
    })
    .then((updatedUser) => {

      // 패스워드가 변경될 경우 세션이 변경된다. 
      if (body.password) {
        setCookie(updatedUser, res);
      }

      // 유저정보를 내릴때 패스워드는 뺀다.
      const userInfo = user.toJSON();
      delete userInfo.password;

      return res.status(200).json(userInfo)
    })
    .catch((error) => {
      return res.status(500).json({ error })
    })
}

function deleteUser(req, res) {
  const { user, params: { id } } = req;

  // 권한 확인
  if (!user || (user.id !== id)) {
    return res.status(401).json({ message: '권한이 없습니다.' });
  }

  const sessionToken = user.getSessionToken();

  user
    .destroy({ sessionToken })
    .then(async () => {
      // 파스 세션도 지워준다.
      await Rest('/logout', 'POST', sessionToken)

      res.clearCookie('parse.session')
      return res.status(200).json({ user: user.toJSON(), message: 'OK' })
    })
    .catch((error) => {
      return res.status(500).json({ error })
    });
}

function setCookie(user, res) {
  var val = JSON.stringify({
    token: user.getSessionToken()
  });

  res.cookie('parse.session', val, {
    path: '/',
    httpOnly: true
  });
}

module.exports = {
  api,
  dashboard,
  authentication,
  duplicate,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout
};
