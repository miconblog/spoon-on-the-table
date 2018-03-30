const express = require('express');
const router = express.Router();
const up2s3 = require('../../../middles/up2s3.direct');

function uploadFile(req, res) {
  const { Location, size, mimetype, originalname } = req.s3;
  res.status(200).json({ message: 'OK', url: Location, size, mimetype, originalname })
}

router.post('/upload', up2s3, uploadFile);
module.exports = {
  router
}