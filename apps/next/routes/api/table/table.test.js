import withServer from '../../../../lib/supertest-with-server';
import restapi from '../../../index';
import parseapp from '../../../../parse';

const agent = withServer(restapi);
let testServer = null;
let sessionCookie = '';

beforeAll((done) => {
  testServer = parseapp.listen(9000, async () => {
    const res = await agent({
      method: 'POST',
      url: '/login',
      json: false,
      data: { username: 'miconblog@gmail.com', password: '1' },
    });

    const cookie = res.header['set-cookie'][0];
    sessionCookie = cookie.split(';')[0];

    done();
  });
});
afterAll(async (done) => {
  await agent({
    cookie: sessionCookie,
    method: 'GET',
    url: '/logout',
    json: false,
  });
  testServer.close(done);
});

describe('GET /api/tables/temporary - 작업중인 모든 캐시 정보를 가져온다.', () => {
  it('로그인 유저만 자신의 정보를 조회할 수 있다.', async () => {
    const res = await agent({
      method: 'GET',
      url: '/api/tables/temporary',
    });

    expect(res.status).toBe(403);
  });

  it('로그인 유저와 매칭되는 캐시 데이터가 반환되야한다.', async () => {
    const res = await agent({
      method: 'GET',
      url: '/api/tables/temporary',
      cookie: sessionCookie,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('table');
    expect(res.body.data.table).not.toBeUndefined();
  });
});

describe('PUT /api/tables/temporary - 작성중인 테이블 정보를 저장한다.', () => {
  it('로그인 유저만 저장할수 있다.', async () => {
    const res = await agent({
      method: 'PUT',
      url: '/api/tables/temporary',
    });

    expect(res.status).toBe(403);
  });

  it('로그인 유저와 매칭되는 임시 테이블 정보를 저장할수 있다.', async () => {
    const res = await agent({
      method: 'PUT',
      url: '/api/tables/temporary',
      cookie: sessionCookie,
      data: {
        table: {
          eventType: 'breakfast',
          maxPerson: 4,
        },
        test: '이것도 저장해봐!',
      },
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.table).not.toBeUndefined();
    expect(res.body.data.table.maxPerson).toBe(4);
    expect(res.body.data.test).toBe('이것도 저장해봐!');
  });
});

describe('작업중이 테이블 캐시 가져오기 ', () => {
  it('필드(field)를 지정하면 특정 캐시만 가져올수 있다.', async () => {
    const res = await agent({
      method: 'GET',
      url: '/api/tables/temporary?field=table',
      cookie: sessionCookie,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).toHaveProperty('table');
    expect(res.body.data.table).not.toBeUndefined();
    expect(res.body.data.table.maxPerson).toBe(4);
  });

  it('필드(field)를 지정하면 특정 캐시만 가져올수 있다.', async () => {
    const res = await agent({
      method: 'GET',
      url: '/api/tables/temporary?field=test',
      cookie: sessionCookie,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).not.toHaveProperty('table');
    expect(res.body.data).toHaveProperty('test');
  });
});

describe('POST /api/tables', () => {
  it('로그인 유저만 테이블을 생성할수있다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/tables',
      data: {
        eventType: 'breakfast',
        maxPerson: 4,
      },
    });
    expect(res.status).toBe(403);
  });

  it('테이블 생성 과정을 정상적으로 거치지 않은 테이블 정보는 만들어질 수 없다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/tables',
      cookie: sessionCookie,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('error');
  });

  it('테이블이 생성되면 캐시는 자동으로 지워진다.', async () => {
    await agent({
      method: 'PUT',
      url: '/api/tables/temporary',
      cookie: sessionCookie,
      data: {
        table: {
          title: '한식이 땡기나요? 먹어요! 한식!',
          alcohol: 'none',
          startDate: '2018-05-31T12:00:00+09:00',
          endDate: '2018-06-04T12:00:00+09:00',
          eventType: 'breakfast',
          explainTheWay: 'h',
          explainTheMenu: 'ㅇㄹ',
          minPerson: 2,
          maxPerson: 4,
          nearBy: {
            address: '대한민국 경기도 고양시 일산동구 장항동',
            id: 'ChIJk5yUbRaFfDURK4MzOzsqBos',
            location: { lat: 37.66140446015512, lng: 126.7651607844391 },
          },
          photos: [
            {
              uid: 0,
              id: 'w4w0OGZBc8',
              name: '20151110151611_IMG_0890.JPG',
              status: 'done',
              thumbUrl: '/image/w4w0OGZBc8',
            },
            {
              uid: 0,
              id: 'N2D4BQGyv7',
              name: '20151110151611_IMG_0890.JPG',
              status: 'done',
              thumbUrl: '/image/N2D4BQGyv7',
            },
            {
              uid: 0,
              id: 'N3Pm6PRgbm',
              name: '20151110151611_IMG_0890.JPG',
              status: 'done',
              thumbUrl: '/image/N3Pm6PRgbm',
            },
            {
              uid: 0,
              id: 'otKzFTC8YX',
              name: '20151110151611_IMG_0890.JPG',
              status: 'done',
              thumbUrl: '/image/otKzFTC8YX',
            },
          ],
          price: 0,
        },
        test: 'checksum',
      },
    });

    const res = await agent({
      method: 'POST',
      url: '/api/tables',
      cookie: sessionCookie,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');

    const cache = await agent({
      method: 'GET',
      url: '/api/tables/temporary',
      cookie: sessionCookie,
    });
    expect(cache.body.data.table).toMatchObject({});
    expect(cache.body.data.test).toBe('checksum');
  });
});

describe('GET /api/tables', () => {
  it('로그인 유저만 테이블을 생성할수있다.', async () => {
    const res = await agent({
      method: 'GET',
      url: '/api/tables',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('length');
  });
});
