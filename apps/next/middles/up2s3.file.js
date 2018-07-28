const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const save2file = upload.single('file');
const s3upload = require('./lib/s3-upload');

function up2s3(req, res, next) {
  const {
    file,
    file: { originalname, filename, path, mimetype, size },
  } = req;

  fs.readFile(path, (err, data) => {
    if (err) {
      throw err;
    }

    const base64data = new Buffer(data, 'binary');

    try {
      s3upload(filename, base64data, (resp) => {
        req.s3 = { ...resp, size, mimetype, originalname };

        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }

        next();
      });
    } catch (ex) {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
      next();
    }
    // s3upload.on('httpUploadProgress', (progress) => {
    //   console.log('httpUploadProgress', progress)
    // })
  });
}

module.exports = (req, res, next) => save2file(req, res, () => up2s3(req, res, next));
