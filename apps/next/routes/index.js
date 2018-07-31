const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const apiRouter = require('./api');
const imageRouter = require('./image');
const errors = require('../../lib/errors');

const router = express.Router();

function errorHandler(err, req, res, next) {
  console.log('----', err);

  if (err.message) {
    const { code, message } = errors[err.message];
    return res.status(code).json({ message });
  }

  return next(err);
}

// GZIP
router.use(compression());

// 쿠키 파서
router.use(cookieParser());

// NOTICE: nginx가 있다면 정적 파일을 서빙하는 주체는 바뀔수 있다.
router.use(express.static('./apps/next/public'));
router.use('/antd', express.static('node_modules/antd/dist'));

router.use('/api', apiRouter);
router.use('/image/:photoId', imageRouter);
router.use(errorHandler);

module.exports = router;
