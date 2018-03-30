const fs = require('fs');
const Busboy = require('busboy');
const is = require('type-is');
const s3upload = require('./lib/s3-upload');
/**
 * multipart 업로드를 가로채서 S3에 업로드해주는 미들웨어
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function up2s3(req, res, next) {

  if (!is(req, ['multipart'])) return next();

  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

    try {
      s3upload(filename, file, function (resp) {
        req.s3 = {
          ...resp,
          size: parseInt(req.headers['content-length'], 10),
          mimetype,
          originalname: filename
        };

        next();
      });
    } catch (ex) {
      throw new Error(err);
      next();
    }
  });
  req.pipe(busboy)
}

module.exports = up2s3;