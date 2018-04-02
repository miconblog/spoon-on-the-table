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

export function registerUser({ email, password }) {
  fetch('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      username: email,
      email,
      password
    })
  }).then(checkStatus)
    .then(res => res.json())
    .then(json => !!json)
    .catch(error => {
      notification.success({
        message: '회원가입 실패!',
        description: '새로고침후 다시해보세요!',
      });
      console.log(error);
    });
}

export function loginUser({ email, password }) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      username: email,
      password
    })
  }).then(checkStatus)
    .then(res => res.json())
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

export function checkUserDuplicated({ email }) {
  return fetch('/api/user/duplicate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({ email })
  }).then(checkStatus)
    .then(res => res.json())
    .then(json => !!json.error)
}

export default function updateUser(id, values, dispatch) {

  return fetch(`/api/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({ ...values })
  }).then(checkStatus)
    .then(res => res.json())
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

