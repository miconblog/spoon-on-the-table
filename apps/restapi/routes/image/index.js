const Parse = require('parse/node');
const Photo = require('../../models/Photo');
const fs = require('fs');
const s3 = require('../../../lib/aws-s3');

async function resizeImage(req, res) {

  const { photoId } = req.params;

  // 파일이 하나 업로드되면 무조건 Photo 객체에 추가한다.
  const query = new Parse.Query(Photo);
  const photo = await query.get(photoId).catch(() => { });

  res.set({ 'Content-Type': 'image/png' });
  if (photo) {
    const key = photo.get('key');
    const image = await s3.readFile(key);
    res.send(image);
  } else {
    res.send('')
  }
}

module.exports = resizeImage;