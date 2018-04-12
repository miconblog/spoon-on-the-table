import {
  _checkUserDuplicated,
  _registerUser,
  _loginUser,
  _updateUser
} from './api';


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
});