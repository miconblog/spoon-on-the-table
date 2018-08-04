import {
  makeCheckUserDuplicatedParams,
  makeRegisterUserParams,
  makeLoginUserParams,
  makeUpdateUserParams,
} from './api';
import { _getUserCache } from './api-for-ssr';

describe('API', () => {
  it('checkUserDuplicated({email})', () => {
    const email = 'test@test.com';
    const values = makeCheckUserDuplicatedParams({ email });

    expect(values).toMatchObject({
      endpoint: '/api/user/duplicate',
      params: {
        method: 'POST',
        body: JSON.stringify({ email }),
      },
    });
  });

  it('registerUser({ email, password })', () => {
    const email = 'test@test.com';
    const password = '1';
    const values = makeRegisterUserParams({ email, password });

    expect(values).toMatchObject({
      endpoint: '/api/user/create',
      params: {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          email,
          password,
        }),
      },
    });
  });

  it('loginUser({ email, password })', () => {
    const email = 'test@test.com';
    const password = '1';
    const values = makeLoginUserParams({ email, password });

    expect(values).toMatchObject({
      endpoint: '/login',
      params: {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          password,
        }),
      },
    });
  });

  it('updateUser(id, values, dispatch)', () => {
    const id = 'xyx';
    const updates = { lastName: 'YES' };
    const dispatch = () => {};
    const values = makeUpdateUserParams(id, updates, dispatch);

    expect(values).toMatchObject({
      endpoint: '/api/user/xyx',
      params: {
        method: 'PUT',
        body: JSON.stringify({ ...updates }),
      },
    });
  });

  it('saveTableCache(values, {sessionToken})', () => {
    const updates = {
      table: {
        eventType: 'dinner',
        spoonCount: 4,
        location: 'XXXX',
      },
    };
    const values = makeSaveTableCacheParams(updates);

    expect(values).toMatchObject({
      endpoint: '/api/tables/temporary',
      params: {
        method: 'PUT',
        body: JSON.stringify({ ...updates }),
      },
    });
  });

  it('getUserCache(fieldName, {sessionToken})', () => {
    const fieldName = 'table';
    const options = {};
    const values = _getUserCache(fieldName, options);

    expect(values).toMatchObject({
      endpoint: `/api/tables/temporary?field=${fieldName}`,
      params: { method: 'GET' },
    });
  });

  it('deletePhoto(id, {sessionToken})', () => {
    const id = 'photoId';
    const values = makeDeletePhotoParams(id);

    expect(values).toMatchObject({
      endpoint: `/api/file/${id}`,
      params: { method: 'DELETE' },
    });
  });

  it('addTable(values, {sessionToken})', () => {
    const values = makeAddTableParams({
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
    });

    expect(values).toMatchObject({
      endpoint: '/api/tables',
      params: {
        method: 'POST',
        body: JSON.stringify({
          title: '한식이 땡기나요? 먹어요! 한식!',
          alcohol: 'none',
          startDate: '2018-05-31T12:00:00+09:00',
          endDate: '2018-06-04T12:00:00+09:00',
          eventType: 'breakfast',
          explainTheWay: 'h',
          explainTheMenu: 'ㅇㄹ',
          minPerson: 2,
          maxPerson: 4,
          address: '대한민국 경기도 고양시 일산동구 장항동',
          geoPoint: { lat: 37.66140446015512, lng: 126.7651607844391 },
          photos: [
            { objectId: 'w4w0OGZBc8', __type: 'Pointer', className: 'Photo' },
            { objectId: 'N2D4BQGyv7', __type: 'Pointer', className: 'Photo' },
            { objectId: 'N3Pm6PRgbm', __type: 'Pointer', className: 'Photo' },
            { objectId: 'otKzFTC8YX', __type: 'Pointer', className: 'Photo' },
          ],
          price: 0,
        }),
      },
    });
  });
});
