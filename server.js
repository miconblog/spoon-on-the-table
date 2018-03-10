const express = require('express')
const next = require('next')
const LRUCache = require('lru-cache')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const parseServer = require('./lib/parse-server')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler();

// SSR 캐시 설정
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})


app.prepare()
  .then(() => {
    const server = express()

    // 정적 파일
    server.use(express.static('public'));
    server.use('/antd', express.static('node_modules/antd/dist'));

    // 쿠키 파서
    server.use(cookieParser())

    // API 서버
    server.use('/parse', parseServer.api);

    // 대쉬보드
    server.use('/dashboard', parseServer.dashboard);

    // 파스 유저 인증 및 로그인/아웃, 중복이메일 확인
    server.use(parseServer.authentication);
    server.get('/logout', parseServer.logout);
    server.post('/login', bodyParser.json(), parseServer.login);
    server.post('/api/user/duplicate', bodyParser.json(), parseServer.duplicate)
    server.post('/api/user/create', bodyParser.json(), parseServer.createUser)

    // 상세 페이지 라우팅
    server.get('/tables/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = {
        id: req.params.id
      }
      renderAndCache(req, res, actualPage, queryParams)
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


/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}