const express = require('express')
const next = require('next')
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler()

const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Absolute path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:3000/parse' // Don't forget to change to https if needed
});

const dashboard = new ParseDashboard({
  "apps": [{
    "serverURL": "http://localhost:3000/parse",
    "appId": "myAppId",
    "masterKey": "myMasterKey",
    "appName": "MyApp"
  }]
});

app.prepare()
  .then(() => {
    const server = express()

    // API 서버
    server.use('/parse', api);

    // 대쉬보드
    server.use('/dashboard', dashboard);

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = {
        id: req.params.id
      }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })