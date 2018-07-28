const express = require('express');
const ParseDashboard = require('parse-dashboard');
const {
  appId, serverURL, masterKey, fileKey,
} = require('../lib/env');

const app = express();
const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL,
      appId,
      masterKey,
      fileKey,
      appName: 'TableSpoon',
    },
  ],
});

app.use(dashboard);

module.exports = app;
