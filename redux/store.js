import { createStore, applyMiddleware } from 'redux';

// 리듀서
export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_LOGIN_USER':
      return ({
        ...state,
        ...{
          loginUser: payload.loginUser
        }
      });

    case 'COLLAPSE_SIDE_MENU':
      return ({
        ...state,
        ...{
          collapsed: payload
        }
      })

    default:
      return state;
  }
};

export const initStore = (initialState = {}) => {
  return createStore(
    reducer, initialState,

    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f
  );
};
