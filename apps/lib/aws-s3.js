const Sharp = require('sharp');
const AWS = require('aws-sdk');
const Bucket = '4hrs-media';
const s3 = new AWS.S3();

AWS.config.update({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});

function upload(filename, file) {
  return s3.upload({
    Bucket,
    ACL: 'public-read',
    Key: `tablespoon/${filename}`,
    Body: file,
  }).promise()
}

function deleteFile(Key) {
  return s3.deleteObject({ Bucket, Key }).promise()
}

function readFile(Key) {
  return s3.getObject({ Bucket, Key }).promise()
    .then(data => Sharp(data.Body)
      .resize(300, 300)
      .toFormat('png')
      .toBuffer()
    ).catch(() => {
      return null;
    })
}

module.exports = {
  upload,
  deleteFile,
  readFile
};