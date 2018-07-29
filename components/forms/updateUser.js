import { notification } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function updateUser(id, values, dispatch) {
  return fetch(`/api/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ ...values }),
  })
    .then(checkStatus)
    .then(res => res.json())
    .then((user) => {
      notification.success({
        message: '프로필 정보 수정',
        description: '정상적으로 수정되었습니다.',
      });
      dispatch
        && dispatch({ type: 'UPDATE_LOGIN_USER', payload: { loginUser: user } });
    })
    .catch((error) => {
      notification.success({
        message: '프로필 업데이트 실패!',
        description: '새로고침후 다시해보세요!',
      });
      console.log(error);
    });
}
