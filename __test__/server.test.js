import agent from './agent';

describe('POST /api/user/duplicate - 사용자 중복 조회', () => {
  it('중복된 유저가 있으면 200 상태를 반환한다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/duplicate',
      data: { email: 'realrap2@naver.com' }
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Sorry, it was duplicated!');
  });

  it('중복된 유저가 없으면 202 상태를 반환한다.', async () => {
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

  it('회원가입에 필요한 인자가 충분하지 않으면, 400(Bad Request) 상태를 반환한다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/create',
      data: { email: 'realrap2@naver.com' }
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('인자가 부족하다');
  });


  it('회원가입에 성공하면 201 상태를 반환한다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/user/create',
      data: { email: 'test@test.com', username: '테스트유저', password: '1' }
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('OK');
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;

    // set-cookie 
    expect(res.header).toHaveProperty('set-cookie');
    createdUserCookie = res.header['set-cookie'][0].split(';')[0];
  });


  it('앞에서 생성한 테스트 유저를 삭제한다.', async () => {

    const res = await agent({
      cookie: createdUserCookie,
      method: 'DELETE',
      url: `/api/user/${createdUserId}`
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('OK');

    // clear set-cookie.
    expect(res.header).toHaveProperty('set-cookie');
    expect(res.header['set-cookie'][0]).toMatch(/parse.session=;/);
  });


});