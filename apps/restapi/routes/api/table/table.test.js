import withServer from '../../../../lib/supertest-with-server';
import restapi from '../../../../restapi';
import parseapp from '../../../../parse';

const agent = withServer(restapi);
let test_server = null;

beforeAll(() => test_server = parseapp.listen(9000));
afterAll(done => test_server.close(done))

describe('GET /api/tables/temporary - 작성중인 테이블 정보를 가져온다.', () => {
  it('작성중인 정보는 로그인한 작성자만 볼 수 있다.', async () => {
    const res = await agent({
      method: 'GET',
      url: '/api/tables/temporary',
    });

    expect(res.status).toBe(403);
  });
});