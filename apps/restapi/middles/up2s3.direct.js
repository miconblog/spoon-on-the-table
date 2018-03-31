const crypto = require('crypto');
const Busboy = require('busboy');
const is = require('type-is');
const s3upload = require('./lib/s3-upload');
const { MSG } = require('../errors');

function getFilename(from, user) {
  const buf = crypto.randomBytes(8);

  switch (from) {
    case 'profile':
      return `${from}/${user.get('username')}/${buf.toString('hex')}`;

    default:
      return null;
  }
}

function up2s3(req, res, next) {
  if (!is(req, ['multipart'])) {
    return next(new Error(MSG.NO_ATTACHMENT));
  }

  const busboy = new Busboy({ headers: req.headers });
  let fileFrom = '';

  busboy.on('field', function (name, value) {
    if (name === 'from') { fileFrom = value };
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (!fileFrom) {
      return next(new Error(MSG.NEED_FROM_FIELD));
    }

    if (!mimetype.match(/image/)) {
      return next(new Error(MSG.UNSUPPORT_MEDIATYE));
    }

    const hashname = getFilename(fileFrom, req.user);

    if (!hashname) {
      return next(new Error(MSG.NOT_CORRECT_FROM_FIELD));
    }

    try {
      s3upload(hashname, file, (resp) => {
        req.s3 = {
          ...resp,
          size: parseInt(req.headers['content-length'], 10),
          mimetype,
          originalname: filename
        };

        next();
      });
    } catch (ex) {
      console.error(ex);
      next(new Error(MSG.UNKNOWN_S3));
    }
  });
  req.pipe(busboy)
}

module.exports = up2s3;