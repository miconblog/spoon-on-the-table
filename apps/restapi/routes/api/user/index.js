const Parse = require('parse/node');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cloudReq = require('../../../../lib/request-parse-cloud');
const authentication = require('../../../../lib/authentication');
const ParseUser = require('../../../models/User');

function login(req, res) {
  const { username, password } = req.body;

  ParseUser
    .logIn(username, password)
    .then((user) => {

      setCookie(user, res);
      res.status(202).json({ id: user.id, message: 'Login Success!' });

    }, (error) => {

      res.clearCookie('auth-token');
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
  const token = req.cookies['auth-token'];

  // 로그아웃 API를 이용하면 서버의 세션도 같이 지워준다.
  cloudReq('/logout', 'POST', token)
    .then((e) => {
      res.clearCookie('auth-token');
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.redirect('/');
    });
}

function duplicate(req, res) {
  const { email } = req.body;
  const query = new Parse.Query(ParseUser);
  query.equalTo('email', email);
  query.find()
    .then((users) => {
      if (users.length === 0) {
        res.status(202).json({ message: 'OK, you can use it' });
      } else {
        res.status(200).json({ error: { message: 'Sorry, it was duplicated!' } });
      }
    })
    .catch((error) => res.status(500).json({ error }));
}

function createUser(req, res) {
  const { email, username, password } = req.body;
  const user = new ParseUser();

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

function deleteOldPhoto(photo, sessionToken) {
  return new Promise((resolve) => photo.destroy({ sessionToken }).then(resolve).catch(resolve))
}

function updateUser(req, res) {
  const { user, params: { id }, body } = req;
  const oldPhoto = user.get('photo');
  const sessionToken = user.getSessionToken();

  user
    .save(body, { sessionToken })
    .then(async updatedUser => {

      // 패스워드가 변경될 경우 세션이 변경된다. 
      if (body.password) {
        setCookie(user, res);
      }

      // 프로필 사진이 변경되면 이전 사진은 지운다. 
      if (body.photo && oldPhoto) {
        await deleteOldPhoto(oldPhoto, sessionToken);
      }

      // 유저의 사진이 있으면 패치한다. 
      if (!body.photo && updatedUser.get('photo')) {
        await updatedUser.get('photo').fetch({ sessionToken });
      }

      // 유저정보를 내릴때 패스워드와 세션토큰은 뺀다.
      const userInfo = updatedUser.toJSON();
      return res.status(200).json(userInfo)
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ error })
    })
}

function deleteUser(req, res) {
  const { user, params: { id } } = req;

  const sessionToken = user.getSessionToken();

  user
    .destroy({ sessionToken })
    .then(async () => {
      // 파스 세션도 지워준다.
      await cloudReq('/logout', 'POST', sessionToken)

      res.clearCookie('auth-token')
      return res.status(200).json({ user: user.toJSON(), message: 'OK' })
    })
    .catch((error) => {
      return res.status(500).json({ error })
    });
}

function setCookie(user, res) {
  res.cookie('auth-token', user.getSessionToken(), {
    path: '/',
    httpOnly: true
  });
}

router.post('/duplicate', bodyParser.json(), duplicate);
router.post('/create', bodyParser.json(), createUser);

// 개인정보수정은 로그인한 본인만 할 수 있음.
router.put('/:id', authentication, bodyParser.json(), updateUser);
router.delete('/:id', authentication, deleteUser);

module.exports = {
  router,
  login,
  logout
}