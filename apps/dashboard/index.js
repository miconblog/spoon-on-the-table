/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const express = require('express');
const ParseDashboard = require('parse-dashboard');
const { appId, serverURL, masterKey, fileKey } = require('../lib/env');

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
    // {
    //   serverURL: 'http://rlibro.com:8081/parse',
    //   appId: 'oI9ho8CTpm5bFDliirnMFEdH3UGCzaBI8YHBtlnD',
    //   masterKey: 'tykbwLxCCZv0DCCl545JLApwQ3NwKAEPLhbMUFHs',
    //   appName: 'rlibro (production)'
    // }
  ],
});

app.use(dashboard);

module.exports = app;
