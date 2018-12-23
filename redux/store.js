/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */

import { createStore } from 'redux';

// 리듀서
export const reducer = (state, { type, payload }) => {
  switch (type) {
  case 'UPDATE_LOGIN_USER':
    return {
      ...state,
      loginUser: { ...state.loginUser, ...payload.loginUser },
    };

  case 'COLLAPSE_SIDE_MENU':
    return {
      ...state,
      ...{
        collapsed: payload,
      },
    };

  case 'SHOW_MARKER_MAP':
    return {
      ...state,
      ...{
        showMarkerMap: payload,
      },
    };

  default:
    return state;
  }
};

export const initStore = function(initialState = {}) {
  return createStore(
    reducer,
    initialState,
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__
          && window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  );
};
