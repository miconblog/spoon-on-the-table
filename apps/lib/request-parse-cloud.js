const Parse = require('parse/node');
const { appId, serverURL } = require('./env');

module.exports = function (endpoint, method, token) {
  return Parse.Cloud.httpRequest({
    url: `${serverURL}${endpoint}`,
    method,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Session-Token': token
    }
  });
};
