const express = require('express');
const router = express.Router();
const authentication = require('../../../../authentication');
const up2s3 = require('../../../middles/up2s3.direct');

function uploadFile(req, res) {

  const { Location, key, size, mimetype, filename, originalname } = req.s3;


  res.status(200).json({ image: Location, key, filename, size, mimetype, originalname })
}

router.post('/upload', authentication, up2s3, uploadFile);
module.exports = {
  router
}