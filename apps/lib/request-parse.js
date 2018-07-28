/**
 * 호출에 대한 에러는 더 상위레벨에서 에러를 잡는다!
 */

const rp = require('request-promise');
const { appId, serverURL } = require('./env');

module.exports = function(req, options) {
  const {
    endPoint, type = 'Object', method = 'GET', body = {},
  } = options;
  const params = {
    method,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Session-Token': req.cookies['auth-token'],
    },
    body,
    json: true,
  };

  switch (type) {
  case 'Users':
    params.uri = `${serverURL}${endPoint}`;

    break;

  case 'Sessions':
    break;

  case 'Roles':
    break;

  case 'Files':
    break;

  case 'Analytics':
    break;

  case 'Push':
    break;

  case 'Installations':
    break;

  case 'Cloud':
    break;

  case 'Schemas':
    break;

  case 'Hooks':
    break;

  case 'Trigger':
    break;

  default:
    params.uri = `${serverURL}/classes/${endPoint}`;
    break;
  }

  return rp(params);
};
