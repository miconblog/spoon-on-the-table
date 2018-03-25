const next = require('next');
const LRUCache = require('lru-cache');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const authentication = require('./express/middles/authentication');

// SSR 캐시 설정
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

app.prepare()
  .then(() => {
    const server = require('./express');

    // 상세 페이지 라우팅
    server.get('/tables/:id', authentication, (req, res) => {
      app.render(req, res, '/post', {
        id: req.params.id
      });
    });

    // 마이 페이지 라우팅
    server.get('/my/:pageName', authentication, (req, res) => {
      const { pageName } = req.params;
      const { query = {} } = req;

      if (!req.user) {
        return res.redirect('/sign')
      }

      app.render(req, res, `/my-${pageName}`, {
        pageName,
        ...query
      });
    });

    // 페이지
    server.get('/:pageName', authentication, (req, res) => {
      const { pageName } = req.params;
      const { query = {} } = req;
      app.render(req, res, `/${pageName}`, {
        pageName,
        ...query
      });
    });

    // 메인 페이지
    server.get('/', authentication, (req, res) => {
      return handle(req, res);
    });

    // 나머지 모든 라우팅
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

// eslint-disable-next-line no-unused-vars
async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
