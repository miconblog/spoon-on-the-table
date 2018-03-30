const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const save2file = upload.single('file');
const s3upload = require('./lib/s3-upload');

function deleteTempFile(path) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

function up2s3(req, res, next) {

  const { file, file: { originalname, filename, path, mimetype, size } } = req;
  const readStream = fs.createReadStream(path);

  try {
    s3upload(filename, readStream, (resp) => {
      req.s3 = { ...resp, size, mimetype, originalname };
      deleteTempFile();
      next();
    });
  } catch (ex) {
    deleteTempFile();
    next();
  }
}

module.exports = (req, res, next) => save2file(req, res, () => up2s3(req, res, next));