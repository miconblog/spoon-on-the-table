import agent from '../../../utils/agent';
import fs from 'fs';
import { resolve } from 'path';

const path1 = resolve(__dirname, '../../public/assets/images/test-image.jpg');
const path2 = resolve(__dirname, '../../public/assets/images/test-10m.jpg');
const file = fs.createReadStream(path2);

jest.setTimeout(10 * 10 * 10 * 1000);


describe('POST /api/file/upload - 파일 업로드', () => {

  it('file 필드에 파일을 추가해서 업로드 할수 있다.', async () => {

    const res = await agent({
      method: 'POST',
      url: '/api/file/upload',
      attach: {
        file
      }
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('OK');
    expect(res.body).toHaveProperty('url'); //
    expect(res.body).toHaveProperty('size'); // 
    expect(res.body.size).not.toBeNull(); // 
    expect(res.body).toHaveProperty('mimetype'); // 
    expect(res.body).toHaveProperty('originalname'); //
  })

  afterAll(() => {
    const used = process.memoryUsage(); //.rss / 1024 / 1024;
    //console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

    for (let key in used) {
      console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
  })
})


