const Parse = require('parse/node');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const { appId, serverURL, masterKey, fileKey } = require('./env');

const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud', // Absolute path to your Cloud Code
  appId,
  masterKey, // Keep this key secret!
  fileKey,
  serverURL // Don't forget to change to https if needed
});

const dashboard = new ParseDashboard({
  apps: [{
    serverURL,
    appId,
    masterKey,
    appName: 'TableSpoon'
  }]
});

function Rest(endpoint, method, token) {
  return Parse.Cloud.httpRequest({
    url: `${serverURL}${endpoint}`,
    method,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Session-Token': token
    }
  });
}

module.exports = {
  api,
  dashboard,
  Rest
};
