import withServer from '../../../../lib/supertest-with-server';
import restapi from '../../../../restapi';
import parseapp from '../../../../parse';

const agent = withServer(restapi);
let test_server = null;
let sessionCookie = '';

beforeAll((done) => {
  test_server = parseapp.listen(9000, async () => {
    const res = await agent({ method: 'POST', url: '/login', json: false, data: { username: 'miconblog@gmail.com', password: '1' } });
    sessionCookie = res.header['set-cookie'][0].split(';')[0];
    done();
  });
});
afterAll(async (done) => {
  const res = await agent({ cookie: sessionCookie, method: 'GET', url: '/logout', json: false });
  test_server.close(done);
})

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
      cookie: sessionCookie
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).toHaveProperty('id');
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
          spoonCount: 4,
          location: 'test'
        },
        test: '이것도 저장해봐!'
      }
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.table).not.toBeUndefined();
    expect(res.body.data.table.spoonCount).toBe(4);
    expect(res.body.data.test).toBe('이것도 저장해봐!');

  });

});

describe('작업중이 테이블 캐시 가져오기 ', () => {
  it('필드(field)를 지정하면 특정 캐시만 가져올수 있다.', async () => {

    const res = await agent({
      method: 'GET',
      url: '/api/tables/temporary?field=table',
      cookie: sessionCookie
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).toHaveProperty('table');
    expect(res.body.data.table.spoonCount).toBe(4);

  });

  it('필드(field)를 지정하면 특정 캐시만 가져올수 있다.', async () => {

    const res = await agent({
      method: 'GET',
      url: '/api/tables/temporary?field=test',
      cookie: sessionCookie
    });

    console.log(res.body.data)

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).not.toHaveProperty('table');
    expect(res.body.data).toHaveProperty('test');

  });
})