const express = require('express')
const next = require('next')
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler();

const {
  appId,
  serverURL,
  masterKey,
  fileKey
} = require('./lib/parse_env');

const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud', // Absolute path to your Cloud Code
  appId,
  masterKey, // Keep this key secret!
  fileKey,
  serverURL // Don't forget to change to https if needed
});

const dashboard = new ParseDashboard({
  "apps": [{
    serverURL,
    appId,
    masterKey,
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

    // 상세 페이지 라우팅
    server.get('/tables/:id', (req, res) => {
      console.log('매칭???...')

      const actualPage = '/post'
      const queryParams = {
        id: req.params.id
      }
      app.render(req, res, actualPage, queryParams)
    })

    // 나머지 모든 라우팅
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