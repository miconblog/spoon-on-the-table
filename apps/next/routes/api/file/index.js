const Parse = require('parse/node');
const express = require('express');

const router = express.Router();
const authentication = require('../../../../lib/authentication');
const up2s3 = require('../../../middles/up2s3.direct');
const Photo = require('../../../models/Photo');

async function uploadFile(req, res) {
  const { Location, key, size, tags /* mimetype, filename, originalname */ } = req.s3;

  // 파일이 하나 업로드되면 무조건 Photo 객체에 추가한다.
  const photo = new Photo();
  const photoACL = new Parse.ACL(req.user);
  photoACL.setPublicReadAccess(true);
  photo.setACL(photoACL);

  try {
    await photo.save({
      key,
      size,
      author: req.user,
      image: Location,
      tags,
    });
  } catch (e) {
    console.error(e);
  }

  res.status(200).json(photo.toJSON());
}

async function deleteFile(req, res) {
  const {
    user,
    params: { photoId },
  } = req;
  const sessionToken = user.getSessionToken();
  const query = new Parse.Query(Photo);
  const photo = await query.get(photoId);
  await photo.destroy({ sessionToken });
  res.status(200).json({ id: photoId, message: 'OK' });
}

router.post('/upload', authentication, up2s3, uploadFile);
router.delete('/:photoId', authentication, deleteFile);
module.exports = router;
