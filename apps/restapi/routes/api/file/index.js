const Parse = require('parse/node');
const express = require('express');
const router = express.Router();
const authentication = require('../../../../authentication');
const up2s3 = require('../../../middles/up2s3.direct');

class Photo extends Parse.Object {
  constructor() {
    // Pass the ClassName to the Parse.Object constructor
    super('Photo');
  }
}

async function uploadFile(req, res) {

  const { Location, key, size, mimetype, filename, originalname } = req.s3;

  // 파일이 하나 업로드되면 무조건 Photo 객체에 추가한다.
  const photo = new Photo();
  const photoACL = new Parse.ACL(req.user);
  photoACL.setPublicReadAccess(true);
  photo.setACL(photoACL);

  await photo.save({
    key, size, author: req.user, image: Location
  });

  res.status(200).json(photo.toJSON())
}

router.post('/upload', authentication, up2s3, uploadFile);
module.exports = {
  router
}