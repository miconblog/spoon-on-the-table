import {
  _checkUserDuplicated,
  _registerUser,
  _loginUser,
  _updateUser,
  _saveTableCache,
  _deletePhoto,
} from './api';
import {
  _getUserCache
} from './api-for-ssr';


describe('API', () => {

  it('checkUserDuplicated({email})', () => {

    const email = 'test@test.com';
    const values = _checkUserDuplicated({ email });

    expect(values).toMatchObject({
      endpoint: '/api/user/duplicate',
      params: {
        method: 'POST',
        body: JSON.stringify({ email })
      }
    });


  })

  it('registerUser({ email, password })', () => {

    const email = 'test@test.com';
    const password = '1';
    const values = _registerUser({ email, password })

    expect(values).toMatchObject({
      endpoint: '/api/user/create',
      params: {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          email,
          password
        })
      }
    })
  })

  it('loginUser({ email, password })', () => {

    const email = 'test@test.com';
    const password = '1';
    const values = _loginUser({ email, password })

    expect(values).toMatchObject({
      endpoint: '/login',
      params: {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          password
        })
      }
    })
  })

  it('updateUser(id, values, dispatch)', () => {

    const id = 'xyx';
    const updates = { lastName: 'YES' };
    const dispatch = () => { }
    const values = _updateUser(id, updates, dispatch)

    expect(values).toMatchObject({
      endpoint: '/api/user/xyx',
      params: {
        method: 'PUT',
        body: JSON.stringify({ ...updates })
      }
    })
  })

  it('saveTableCache(values, {sessionToken})', () => {
    const updates = {
      table: {
        eventType: 'dinner',
        spoonCount: 4,
        location: 'XXXX'
      }
    };
    const values = _saveTableCache(updates)

    expect(values).toMatchObject({
      endpoint: '/api/tables/temporary',
      params: {
        method: 'PUT',
        body: JSON.stringify({ ...updates })
      }
    })
  })

  it('getUserCache(fieldName, {sessionToken})', () => {

    const fieldName = 'table';
    const options = {};
    const values = _getUserCache(fieldName, options)

    expect(values).toMatchObject({
      endpoint: `/api/tables/temporary?field=${fieldName}`,
      params: { method: 'GET' }
    })
  })

  it('deletePhoto(id, {sessionToken})', () => {

    const id = 'photoId'
    const values = _deletePhoto(id)

    expect(values).toMatchObject({
      endpoint: `/api/file/${id}`,
      params: { method: 'DELETE' }
    })
  })

});