import withServer from '../../../../lib/supertest-with-server';
import restapi from '../../../../restapi';
import parseapp from '../../../../parse';

const agent = withServer(restapi);
let test_server = null;

beforeAll(() => test_server = parseapp.listen(9000));
afterAll(done => test_server.close(done))

describe('POST /api/user/duplicate - 회원 중복 조회', () => {
  it('중복된 이메일이 있으면 200 상태를 에러 메시지를 반환한다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/duplicate',
      data: { email: 'realrap2@naver.com' }
    });

    expect(res.status).toBe(200);
    expect(res.body.error.message).toBe('Sorry, it was duplicated!');
  });

  it('중복된 이메일이 없으면 202 상태를 반환한다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/duplicate',
      data: { email: 'realrap@naver.com' }
    });

    expect(res.status).toBe(202);
    expect(res.body.message).toBe('OK, you can use it');
  });

});

describe('POST /api/user/create - 회원 가입', () => {

  // 가입시키고, 수정하고, 삭제
  let createdUserId = '';
  let createdUserCookie = '';

  afterAll(async () => {
    await agent({
      cookie: createdUserCookie,
      method: 'DELETE',
      url: `/api/user/${createdUserId}`
    });
  });

  it('회원가입에 필요한 email, username, password 중 하나라도 없으면, 400(Bad Request) 상태를 반환한다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/create',
      data: { email: 'realrap2@naver.com' }
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('인자가 부족하다');
  });


  it('회원 가입에 성공하면 세션은 쿠키로 내려오고, 상태 코드는 201을 반환한다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/create',
      data: { email: 'create@test.com', username: '회원가입', password: '1' }
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('OK');
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;

    // set-cookie 
    expect(res.header).toHaveProperty('set-cookie');
    createdUserCookie = res.header['set-cookie'][0].split(';')[0];
  });

});

describe('PUT /api/user/:id - 회원 정보 수정', () => {

  let createdUserId, createdUserCookie;

  beforeAll(async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/create',
      data: { email: 'update@test.com', username: '회원정보수정', password: '1' }
    });

    createdUserId = res.body.id;
    createdUserCookie = res.header['set-cookie'][0].split(';')[0];
  });

  afterAll(async () => {
    await agent({
      cookie: createdUserCookie,
      method: 'DELETE',
      url: `/api/user/${createdUserId}`
    });
  })

  it('로그인한 유저가 아니면 회원 정보를 변경할 수 없다.', async () => {
    const res = await agent({
      method: 'PUT',
      url: `/api/user/${createdUserId}`
    });

    expect(res.status).toBe(403);
  });

  it('회원 정보를 변경한다', async () => {
    const res = await agent({
      cookie: createdUserCookie,
      method: 'PUT',
      url: `/api/user/${createdUserId}`,
      data: { firstName: 'test', fullName: 'test user' }
    });

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('test');
    expect(res.body.fullName).toBe('test user');
  });

  it('비밀번호를 변경하면 세션쿠키가 변경된다.', async () => {
    const res = await agent({
      cookie: createdUserCookie,
      method: 'PUT',
      url: `/api/user/${createdUserId}`,
      data: { password: 'change' }
    });

    expect(res.status).toBe(200);

    // 비밀번호는 유저 정보에 내려오면 안됨!
    expect(res.body).not.toHaveProperty('password');

    // set-cookie 
    expect(res.header).toHaveProperty('set-cookie');
    const newCookie = res.header['set-cookie'][0].split(';')[0];

    expect(createdUserCookie).not.toBe(newCookie);
    createdUserCookie = newCookie;
  });

  it('변경후 내려받는 유저 정보에는 비밀번호는 없어야한다.', async () => {

    const res = await agent({
      cookie: createdUserCookie,
      method: 'PUT',
      url: `/api/user/${createdUserId}`,
      data: { phone: '000-0000-0000' }
    });
    expect(res.body).not.toHaveProperty('password');
  });
})

describe('DELETE /api/user/:id - 회원 탈퇴', () => {

  let createdUserId, createdUserCookie;

  beforeAll(async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/create',
      data: { email: 'delete@test.com', username: '회원탈퇴', password: '1' }
    });

    createdUserId = res.body.id;
    createdUserCookie = res.header['set-cookie'][0].split(';')[0];
  });

  it('로그인한 유저가 아니면 회원 탈퇴를 할 수 없다.', async () => {
    const res = await agent({
      method: 'DELETE',
      url: `/api/user/${createdUserId}`
    });
    expect(res.status).toBe(403);
  });

  it('회원을 탈퇴하면 세션 쿠키도 삭제 된다.', async () => {
    const res = await agent({
      cookie: createdUserCookie,
      method: 'DELETE',
      url: `/api/user/${createdUserId}`
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('OK');

    // clear set-cookie.
    expect(res.header).toHaveProperty('set-cookie');
    expect(res.header['set-cookie'][0]).toMatch(/auth-token=;/);
  });
})