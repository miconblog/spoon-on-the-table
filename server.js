const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const parseServer = require('./lib/parse-server')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express()

    // 정적 파일
    server.use(express.static('public'))
    server.use('/_next', express.static('.next'))

    // 쿠키 파서
    server.use(cookieParser())

    // API 서버
    server.use('/parse', parseServer.api);

    // 대쉬보드
    server.use('/dashboard', parseServer.dashboard);

    // 파스 유저 인증 및 로그인/아웃, 중복이메일 확인
    server.use(parseServer.authentication);
    server.post('/login', bodyParser.json(), parseServer.login);
    server.get('/logout', parseServer.logout);
    server.post('/api/user/duplicate', bodyParser.json(), parseServer.duplicate)
    server.post('/api/user/create', bodyParser.json(), parseServer.createUser)

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