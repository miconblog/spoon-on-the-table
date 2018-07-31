const Parse = require('parse/node');
const express = require('express');
const bodyParser = require('body-parser');
const requestParse = require('../../../../lib/request-parse');
const authentication = require('../../../../lib/authentication');
const ParseUser = require('../../../models/User');
const Photo = require('../../../models/Photo');
const Table = require('../../../models/Table');

const router = express.Router();

function setCookie(user, res) {
  res.cookie('auth-token', user.getSessionToken(), {
    path: '/',
    httpOnly: true,
  });
}

function duplicate(req, res) {
  requestParse(req, {
    endPoint: `/users?where={"email":"${req.body.email}"}`,
    type: 'Users',
  })
    .then(data => {
      if (data.results.length === 0) {
        return res.status(202).json({ message: 'OK, you can use it' });
      }
      return res
        .status(200)
        .json({ error: { message: 'Sorry, it was duplicated!' } });
    })
    .catch(({ error }) => res.status(500).json({ error }));
}

function createUser(req, res) {
  const { email, username, password } = req.body;
  const user = new ParseUser();

  if (!email || !username || !password) {
    res.status(400).json({ message: '인자가 부족하다' });
  } else {
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);

    user.signUp(null, {
      success(signedUser) {
        setCookie(signedUser, res);
        res.status(201).json({ message: 'OK', id: signedUser.id });
      },
      error(_, error) {
        res.status(500).json({ error });
      },
    });
  }
}

function deleteOldPhoto(photo, sessionToken) {
  return new Promise(resolve =>
    photo
      .destroy({ sessionToken })
      .then(resolve)
      .catch(resolve)
  );
}

function updateUser(req, res) {
  const { user, body } = req;
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
      return res.status(200).json(userInfo);
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
}

function deleteUser(req, res) {
  const { user } = req;

  const sessionToken = user.getSessionToken();

  user
    .destroy({ sessionToken })
    .then(async () => {
      // 파스 세션도 지워준다.
      await requestParse('/logout', 'POST', sessionToken);

      res.clearCookie('auth-token');
      return res.status(200).json({ user: user.toJSON(), message: 'OK' });
    })
    .catch(error => res.status(500).json({ error }));
}

router.post('/duplicate', bodyParser.json(), duplicate);
router.post('/create', bodyParser.json(), createUser);

// 개인정보수정은 로그인한 본인만 할 수 있음.
router.put('/:id', authentication, bodyParser.json(), updateUser);
router.delete('/:id', authentication, deleteUser);


// 프로필 사진을 가져온다.
router.get('/profile-photos', authentication, async (req, res) => {
  const pq = new Parse.Query(Photo);
  pq.equalTo('author', req.user);
  pq.containedIn('tags', ['profile']);

  let photos = [];
  try {
    const results = await pq.find();
    photos = results.map(r => r.toJSON());
  } catch (ex) {
    photos = [];
  }

  res.status(200).json({ photos });
});

// 호스팅하고 있는 테이블 목록 가져오기
router.get('/hosted-tables', authentication, async (req, res)=>{
  const pq = new Parse.Query(Table);
  pq.equalTo('host', req.user);
  pq.include('photos');

  let tables = [];
  try {
    const results = await pq.find();
    tables = results.map(r => r.toJSON());
  } catch (ex) {
    tables = [];
  }

  res.status(200).json({ tables });
});


module.exports = router;
