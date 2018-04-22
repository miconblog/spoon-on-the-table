import fetch from 'isomorphic-unfetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function fetchPromise({ endpoint, params }, options = {}) {

  const { sessionToken = null } = options;
  const headers = { 'Content-Type': 'application/json' }

  if (sessionToken) {
    headers['Cookie'] = `parse.session=${JSON.stringify({ token: sessionToken })}`;
  }

  const values = Object.assign({
    headers,
    credentials: 'same-origin',
  }, params);

  const path = 'http://localhost:3000' + endpoint

  return fetch(path, values)
    .then(checkStatus)
    .then(res => res.json())
}

// 임시저장한 정보 불러오기
export function getUserCache(fieldName, options) {
  if (!options.sessionToken) {
    throw new Error('sessionToken 이 필요합니다.')
  }
  return fetchPromise(_getUserCache(fieldName), options)
}
export function _getUserCache(fieldName) {
  return {
    endpoint: `/api/tables/temporary?field=${fieldName}`,
    params: {
      method: 'GET',
    }
  }
}