// const Parse = require('parse/node');
// const s3 = require('../../../lib/aws-s3');

/**
 * 사진을 지우기 전에 S3 서버에 이미지도 같이 지운다.
 * 사진을 지운 후에는 사진 객체가 지워졌기 때문에 키값을 얻어올 수 없고, objectId 만 알수있다.
 * 그러므로 S3 이미지 삭제는 사진 객체가 지워지기전에 실행되야한다.
 */
Parse.Cloud.beforeDelete('Photo', async (request, response) => {
  await s3.deleteFile(request.object.get('key'));
  response.success();
});
