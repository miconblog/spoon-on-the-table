import express from 'express';
import ParseDashboard from 'parse-dashboard';
import {
  render
} from '@jaredpalmer/after';
import routes from './routes';

const ParseServer = require('parse-server').ParseServer;
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

// API 서버
const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/spoon-on-the-table', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Absolute path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:3000/parse' // Don't forget to change to https if needed
});

// 대쉬보드
const dashboard = new ParseDashboard({
  "apps": [{
    "serverURL": "http://localhost:3000/parse",
    "appId": "myAppId",
    "masterKey": "myMasterKey",
    "appName": "SpoonOnTheTable"
  }]
});


const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/parse', api)
  .use('/dashboard', dashboard)
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customThing: 'thing',
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;