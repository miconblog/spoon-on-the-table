import { notification } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function fetchPromise({ endpoint, params }, options = {}) {
  const { sessionToken = null } = options;
  const headers = { 'Content-Type': 'application/json' };

  if (sessionToken) {
    headers.Cookie = `auth-token=${sessionToken}`;
  }
  const values = Object.assign(
    {
      headers,
      credentials: 'same-origin',
    },
    params
  );

  console.log('fetch Promise...', endpoint, values);

  return fetch(endpoint, values)
    .then(checkStatus)
    .then((res) => res.json())
    .catch((ex) => {
      console.log('fetch...error', ex);
    });
}

// 이메일 중복확인
export function checkUserDuplicated({ email }) {
  return fetchPromise({
    endpoint: '/api/user/duplicate',
    params: {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  }).then((json) => !!json.error);
}

// 회원가입
export function registerUser({ email, password }) {
  return fetchPromise({
    endpoint: '/api/user/create',
    params: {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        email,
        password,
      }),
    },
  })
    .then((json) => !!json.error)
    .catch(() => {
      notification.success({
        message: '회원가입 실패!',
        description: '새로고침후 다시해보세요!',
      });
    });
}

// 로그인
export function loginUser({ email, password }) {
  return fetchPromise({
    endpoint: `/api/login?username=${email}&password=${password}`,
    params: {
      method: 'GET',
    },
  }).then((json) => {
    if (json.error) {
      notification.error({
        message: '로그인 실패!',
        description: json.error.message,
      });
      return false;
    }
    return json;
  });
}

// 로그아웃
export function logoutUser() {
  return fetchPromise({
    endpoint: '/api/logout',
    params: {
      method: 'POST',
    },
  }).then((json) => {
    if (json.error) {
      notification.error({
        message: '로그인 실패!',
        description: json.error.message,
      });
      return false;
    }
    return json;
  });
}

// 유저 정보 업데이트 (인증필요)
export function updateUser(id, values, dispatch) {
  return fetchPromise({
    endpoint: `/api/user/${id}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ ...values }),
    },
  })
    .then((user) => {
      notification.success({
        message: '프로필 정보 수정',
        description: '정상적으로 수정되었습니다.',
      });

      if (dispatch) {
        dispatch({ type: 'UPDATE_LOGIN_USER', payload: { loginUser: user } });
      }
    })
    .catch(() => {
      notification.success({
        message: '프로필 업데이트 실패!',
        description: '새로고침후 다시해보세요!',
      });
    });
}

// 테이블 임시저장 (인증필요)
export function saveTableCache(values, options) {
  return fetchPromise(
    {
      endpoint: '/api/tables/temporary',
      params: {
        method: 'PUT',
        body: JSON.stringify({ ...values }),
      },
    },
    options
  );
}

// 임시저장값 불러오기 (인증필요)
export function loadTableCache(options) {
  return fetchPromise(
    {
      endpoint: '/api/tables/temporary',
      params: {
        method: 'GET',
      },
    },
    options
  );
}

// 사진 삭제 (인증필요)
export function deletePhoto(id, options) {
  return fetchPromise(
    {
      endpoint: `/api/file/${id}`,
      params: {
        method: 'DELETE',
      },
    },
    options
  );
}

// 테이블 생성 (인증필요)
export function addTable(options) {
  return fetchPromise(
    {
      endpoint: '/api/tables',
      params: {
        method: 'POST',
      },
    },
    options
  );
}

// (유저전용) 프로필 사진 가져오기
export function loadUserProfilePhotos(options) {
  return fetchPromise(
    {
      endpoint: '/api/user/profile-photos',
      params: {
        method: 'GET',
      },
    },
    options
  );
}

// (호스트 전용) 호스트가 등록한 테이블 이벤트 불러오기
export function loadUserHostedTables(options) {
  return fetchPromise(
    {
      endpoint: '/api/user/hosted-tables',
      params: {
        method: 'GET',
      },
    },
    options
  );
}

// (일반) 등록된 테이블 이벤트 모두 불러오기
export function loadTables() {
  return fetchPromise({
    endpoint: '/api/tables',
    params: {
      method: 'GET',
    },
  });
}
