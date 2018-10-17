const Parse = require('parse/node');
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const authentication = require('../../../../lib/authentication');
const UserCache = require('../../../models/UserCache');
const Table = require('../../../models/Table');

async function getUserCache(req, res) {
  const {
    user,
    query: { field },
  } = req;
  const sessionToken = user.getSessionToken();

  // UserCache를 member로 조회해서 일단 있는지 확인
  const q = new Parse.Query(UserCache);
  q.equalTo('member', user);
  let cache = await q.first({
    sessionToken,
  });

  // 캐시가 없으면 항상 생성한다.
  if (!cache) {
    cache = new UserCache(req.user);
    cache.set('table', {});
    await cache.save(null, {
      sessionToken,
    });
  }

  // 특정 필드만 가져오고 싶을땐 쿼리를 지정한다.
  if (field) {
    return res.json({ data: cache.toJSON([field]) });
  }
  return res.json({ data: cache.toJSON() });
}

async function updateUserCache(req, res) {
  const {
    user,
    body: { table, tablePhotos, hasPhoto = false },
  } = req;
  const sessionToken = user.getSessionToken();

  // UserCache를 member로 조회해서 일단 있는지 확인
  const query = new Parse.Query(UserCache);
  query.equalTo('member', user);

  const cache = await query.first({ sessionToken });
  cache.set('table', table);

  if (hasPhoto) {
    cache.set('tablePhotos', tablePhotos);
  }

  await cache.save(null, {
    sessionToken,
  });

  res.json({ data: cache.toJSON() });
}

async function createTable(req, res) {
  const { user } = req;
  const sessionToken = user.getSessionToken();

  // 유저 캐시 조회
  const query = new Parse.Query(UserCache);
  query.equalTo('member', user);
  const cache = await query.first({ sessionToken });
  // 테이블 캐시 유효성 확인
  const table = cache.get('table');
  let photos = cache.get('tablePhotos');
  const isValid = [
    'title',
    'alcohol',
    'startDate',
    'endDate',
    'eventType',
    'explainTheWay',
    'explainTheMenu',
    'minPerson',
    'maxPerson',
    'nearBy',
    'price',
  ].every((attr) => typeof table[attr] !== 'undefined');

  // 테이블 정보 유효성 확인
  if (!isValid || photos.length === 0) {
    return res.json({ error: { message: 'invalid process' } });
  }

  // 사진은 최소 한장.
  photos = photos.map((p) => ({
    objectId: p.id,
    __type: 'Pointer',
    className: 'Photo',
  }));

  // 대략적인 노출 주소와 정확한 이벤트 GPS
  const {
    address,
    location: { lat, lng },
  } = table.nearBy;
  table.address = address;
  table.geoPoint = new Parse.GeoPoint([lat, lng]);
  delete table.nearBy;
  delete table.step;

  // 테이블 만들기
  const tableEvent = new Table(user);
  await tableEvent.save({ ...table, photos }, { sessionToken });

  // 테이블 캐시 삭제
  cache.set('table', {});
  cache.set('tablePhotos', []);
  await cache.save(null, { sessionToken });

  return res.json(tableEvent.toJSON());
}

async function getTables(req, res) {
  const query = new Parse.Query(Table);
  const tables = await query.find();
  res.json({ tables: tables.map((t) => t.toJSON()) });
}

// 개인정보수정은 로그인한 본인만 할 수 있음.
router.get('/', getTables);
router.post('/', authentication, createTable);
router.get('/temporary', authentication, getUserCache);
router.put('/temporary', authentication, bodyParser.json(), updateUserCache);

module.exports = router;
