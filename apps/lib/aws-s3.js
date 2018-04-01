const AWS = require('aws-sdk');
const s3 = new AWS.S3();
AWS.config.update({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});

function upload(filename, file) {
  return new Promise((resolve, reject) => {

    s3.upload({
      Bucket: '4hrs-media',
      ACL: 'public-read',
      Key: `tablespoon/${filename}`,
      Body: file,
    }, (err, resp) => err ? reject(err) : resolve(resp))

  });
}

function deleteObject(Key) {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: '4hrs-media',
      Key
    }, (err, resp) => err ? reject(err) : resolve(resp))
  });
}

module.exports = {
  upload,
  deleteObject
};