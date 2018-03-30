const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const { appId, serverURL, masterKey, fileKey } = require('../env');

const parseServer = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './apps/parse/cloud', // Absolute path to your Cloud Code
  appId,
  masterKey, // Keep this key secret!
  fileKey,
  serverURL // Don't forget to change to https if needed
});

const app = express();
app.use('/parse', parseServer);

module.exports = app