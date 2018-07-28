import fs from 'fs';
import { resolve } from 'path';
import withServer from '../../../../lib/supertest-with-server';
import restapi from '../../../../restapi';
import parseapp from '../../../../parse';

const agent = withServer(restapi);
const path1 = resolve(
  __dirname,
  '../../../../next/public/assets/images/test-image.jpg',
);
const path2 = resolve(
  __dirname,
  '../../../../next/public/assets/images/test-10m.jpg',
);
const path3 = resolve(
  __dirname,
  '../../../../next/public/assets/images/default-user-image.png',
);
const path4 = resolve(
  __dirname,
  '../../../../next/public/assets/images/test-pdf-file.pdf',
);
const path5 = resolve(
  __dirname,
  '../../../../next/public/assets/images/test-word-file',
);

jest.setTimeout(10 * 10 * 1000);
let sessionCookie = '';
let test_server = null;

beforeAll((done) => {
  test_server = parseapp.listen(9000, async () => {
    const res = await agent({
      method: 'POST',
      url: '/login',
      json: false,
      data: { username: 'miconblog@gmail.com', password: '1' },
    });
    sessionCookie = res.header['set-cookie'][0].split(';')[0];
    done();
  });
});
afterAll(async (done) => {
  const res = await agent({
    cookie: sessionCookie,
    method: 'GET',
    url: '/logout',
    json: false,
  });
  test_server.close(done);
});

describe('POST /api/file/upload - 유효성 검사', () => {
  it('인증된 유저가 아니면 업로드를 할 수 없다.', async () => {
    const res = await agent({
      method: 'POST',
      url: '/api/file/upload',
      isAPI: false,
    });

    expect(res.status).toBe(403);
  });

  it('첨부 파일이 없으면 400 에러를 반환한다.', async () => {
    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
    });

    expect(res.status).toBe(400);
  });

  it('첨부 파일이 이미지가 아니면 415 에러를 반환한다.', async () => {
    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      field: {
        from: 'profile',
      },
      attach: {
        file: path4,
      },
    });

    expect(res.status).toBe(415);
  });

  it('확장자가 없는 첨부 파일은 올릴수 없다. 415 에러를 반환한다.', async () => {
    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      field: {
        from: 'somewhere',
      },
      attach: {
        file: path5,
      },
    });
    expect(res.status).toBe(415);
  });

  it('이미지가 있어도 type 필드가 지정되지 않으면 400 에러를 반환한다.', async () => {
    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      attach: {
        file: path3,
      },
    });
    expect(res.status).toBe(400);
  });

  it('지원하는 필드값이 아니면 400 에러를 반환한다.', async () => {
    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      field: {
        from: 'somewhere',
      },
      attach: {
        file: path1,
      },
    });
    expect(res.status).toBe(400);
  });
});

describe('프로필 페이지에서 사진 업로드 결과', () => {
  /**
   * 업로드 조건,
   * 1. 인증된 유저
   * 2. 첨부파일
   * 3. from 필드: 어디서 업로드하는지를 나타낸다.
   * 사진을 업로드하면 Photo 에 저장한다.
   */
  let json;
  beforeAll(async () => {
    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      field: {
        from: 'profile',
      },
      attach: {
        file: path3,
      },
    });
    json = res.body;
  });

  it('key 필드가 있어야한다 ', () => expect(json).toHaveProperty('key'));
  it('size 필드가 있어야한다 ', () => expect(json).toHaveProperty('size'));
  it('image 필드가 있어야한다 ', () => expect(json).toHaveProperty('image'));
  it('image 값은 /profile/:hash 형태다.', () => expect(json.image).toMatch(/profile\//));
  it('테스트가 끝나면 업로드된 파일을 삭제한다.', async () => {
    const res = await agent({
      cookie: sessionCookie,
      method: 'DELETE',
      url: `/api/file/${json.id}`,
    });

    expect(res.body.id).toMatch(json.id);
    expect(res.body.message).toMatch('OK');
  });
});
