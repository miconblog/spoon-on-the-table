import fs from 'fs';
import { resolve } from 'path';
import withServer from '../../../../supertest-with-server';
import restapi from '../../../../restapi';
import parseapp from '../../../../parse';

const agent = withServer(restapi);
const path1 = resolve(__dirname, '../../../../next/public/assets/images/test-image.jpg');
const path2 = resolve(__dirname, '../../../../next/public/assets/images/test-10m.jpg');
const path3 = resolve(__dirname, '../../../../next/public/assets/images/default-user-image.png');
const path4 = resolve(__dirname, '../../../../next/public/assets/images/test-pdf-file.pdf');
const path5 = resolve(__dirname, '../../../../next/public/assets/images/test-word-file');

jest.setTimeout(10 * 10 * 1000);
let sessionCookie = '';
let test_server = null;

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

describe('POST /api/file/upload - 유효성 검사', () => {

  it('인증된 유저가 아니면 업로드를 할 수 없다.', async () => {

    const res = await agent({
      method: 'POST',
      url: '/api/file/upload',
      isAPI: false
    });

    expect(res.status).toBe(403);
  });

  it('첨부 파일이 없으면 400 에러를 반환한다.', async () => {

    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload'
    });

    expect(res.status).toBe(400);
  });

  it('첨부 파일이 이미지가 아니면 415 에러를 반환한다.', async () => {

    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      field: {
        from: 'profile'
      },
      attach: {
        file: path4
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
        from: 'somewhere'
      },
      attach: {
        file: path5
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
        file: path3
      }
    });
    expect(res.status).toBe(400);
  });

  it('지원하는 필드값이 아니면 400 에러를 반환한다.', async () => {

    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      field: {
        from: 'somewhere'
      },
      attach: {
        file: path1
      },
    });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/file/upload - 업로드 결과 확인', () => {
  /**
  * 업로드 조건, 
  * 1. 인증된 유저만 파일을 올릴수 있다. 
  * 2. 인증된 유저의 소유로 파일이 관리되야한다. 
  * 3. S3에 업로드 되는 키값은 /타입/유저/랜덤바이트 형식으로 저장된다. 
  *   ex) 프로필이미지 /users/:userId/randombyte
  *   ex) 테이블이미지 /tables/:tableId/randombyte
  * 
  */

  it('프로필 페이지에서 파일은 이미지다.', async () => {

    const res = await agent({
      cookie: sessionCookie,
      method: 'POST',
      url: '/api/file/upload',
      field: {
        from: 'profile'
      },
      attach: {
        file: path3
      }
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('image'); // S3 링크
    expect(res.body.image).not.toBeFalsy();
    expect(res.body.image).toMatch(/miconblog/);
    expect(res.body).toHaveProperty('size');  // 이미지 크기 
    expect(res.body.size).not.toBeFalsy();
    expect(res.body).toHaveProperty('key'); // 
    expect(res.body).toHaveProperty('mimetype'); // 
    expect(res.body).toHaveProperty('originalname'); //
  })

  // afterAll(() => {
  //   const used = process.memoryUsage(); //.rss / 1024 / 1024;
  //   //console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

  //   for (let key in used) {
  //     console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  //   }
  // })
})