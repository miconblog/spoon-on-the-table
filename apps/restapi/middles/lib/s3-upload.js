const AWS = require('aws-sdk');
const s3 = new AWS.S3();
AWS.config.update({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});

module.exports = (filename, file, cb) => {
  s3.upload({
    Bucket: '4hrs-media',
    ACL: 'public-read',
    Key: `tablespoon/${filename}`,
    Body: file,
  }, (err, resp) => {
    if (err) {
      throw new Error(err);
    }
    cb(resp);
  })
}