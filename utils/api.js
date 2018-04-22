import { notification } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function fetchPromise({ endpoint, params }, sessionToken) {

  const values = Object.assign({
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `parse.session=${JSON.stringify({ token: sessionToken })}`
    },
    credentials: 'same-origin',
  }, params);

  return fetch(endpoint, values)
    .then(checkStatus)
    .then(res => res.json())
}

// 회원가입
export function registerUser(params) {
  return fetchPromise(_registerUser(params))
    .then(json => !!json.error)
    .catch(error => {
      notification.success({
        message: '회원가입 실패!',
        description: '새로고침후 다시해보세요!',
      });
      console.log(error);
    });
}
export function _registerUser({ email, password }) {
  return {
    endpoint: '/api/user/create',
    params: {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        email,
        password
      })
    }
  }
}

// 로그인
export function loginUser(params) {
  return fetchPromise(_loginUser(params))
    .then(json => {
      if (json.error) {
        notification.error({
          message: '로그인 실패!',
          description: json.error.message,
        });
        return false;
      }
      return json;
    })
}
export function _loginUser({ email, password }) {
  return {
    endpoint: '/login',
    params: {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password
      })
    }
  }
}

// 이메일 중복확인
export function checkUserDuplicated(params) {
  return fetchPromise(_checkUserDuplicated(params))
    .then(json => !!json.error)
}
export function _checkUserDuplicated({ email }) {
  return {
    endpoint: '/api/user/duplicate',
    params: {
      method: 'POST',
      body: JSON.stringify({ email })
    }
  }
}

// 유저 정보 업데이트
export function updateUser(id, values, dispatch) {
  return fetchPromise(_updateUser(id, values))
    .then(user => {
      notification.success({
        message: '프로필 정보 수정',
        description: '정상적으로 수정되었습니다.',
      });
      dispatch && dispatch({ type: 'UPDATE_LOGIN_USER', payload: { loginUser: user } })
    }).catch(error => {
      notification.success({
        message: '프로필 업데이트 실패!',
        description: '새로고침후 다시해보세요!',
      });
      console.log(error);
    });
}
export function _updateUser(id, values) {
  return {
    endpoint: `/api/user/${id}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ ...values })
    }
  }
}

// 테이블 임시저장
export function saveTableCache(values, sessionToken) {
  return fetchPromise(_saveTableCache(values), sessionToken)
}
export function _saveTableCache(values) {
  return {
    endpoint: `/api/tables/temporary`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ ...values })
    }
  }
}
