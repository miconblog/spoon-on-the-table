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
    params,
  );

  console.log('fetch Promise...', endpoint, values);

  return fetch(endpoint, values)
    .then(checkStatus)
    .then(res => res.json())
    .catch(ex => {
      console.log('fetch...error', ex);
    });
}

// 이메일 중복확인
export function makeCheckUserDuplicatedParams({ email }) {
  return {
    endpoint: '/api/user/duplicate',
    params: {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  };
}
export function checkUserDuplicated(params) {
  return fetchPromise(makeCheckUserDuplicatedParams(params)).then(
    json => !!json.error
  );
}

// 회원가입
export function makeRegisterUserParams({ email, password }) {
  return {
    endpoint: '/api/user/create',
    params: {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        email,
        password,
      }),
    },
  };
}
export function registerUser(params) {
  return fetchPromise(makeRegisterUserParams(params))
    .then(json => !!json.error)
    .catch(() => {
      notification.success({
        message: '회원가입 실패!',
        description: '새로고침후 다시해보세요!',
      });
    });
}

// 로그인
export function makeLoginUserParams({ email, password }) {
  return {
    endpoint: `/api/login?username=${email}&password=${password}`,
    params: {
      method: 'GET',
    },
  };
}
export function loginUser(params) {
  return fetchPromise(makeLoginUserParams(params)).then(json => {
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
  }).then(json => {
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

export function makeUpdateUserParams(id, values) {
  return {
    endpoint: `/api/user/${id}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ ...values }),
    },
  };
}

// 유저 정보 업데이트 (인증필요)
export function updateUser(id, values, dispatch) {
  return fetchPromise(makeUpdateUserParams(id, values))
    .then(user => {
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

export function makeSaveTableCacheParams(values) {
  return {
    endpoint: '/api/tables/temporary',
    params: {
      method: 'PUT',
      body: JSON.stringify({ ...values }),
    },
  };
}
// 테이블 임시저장 (인증필요)
export function saveTableCache(values, options) {
  return fetchPromise(makeSaveTableCacheParams(values), options);
}

export function makeDeletePhotoParams(id) {
  return {
    endpoint: `/api/file/${id}`,
    params: {
      method: 'DELETE',
    },
  };
}
// 사진 삭제 (인증필요)
export function deletePhoto(id, options) {
  return fetchPromise(makeDeletePhotoParams(id), options);
}

export function makeAddTableParams() {
  return {
    endpoint: '/api/tables',
    params: {
      method: 'POST',
    },
  };
}
// 테이블 생성 (인증필요)
export function addTable(options) {
  const params = makeAddTableParams();
  return fetchPromise(params, options);
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
    options,
  );
}

export function loadUserHostedTables(options) {
  return fetchPromise(
    {
      endpoint: '/api/user/hosted-tables',
      params: {
        method: 'GET',
      },
    },
    options,
  );
}

export function loadTables() {
  return fetchPromise({
    endpoint: '/api/tables',
    params: {
      method: 'GET',
    },
  });
}
