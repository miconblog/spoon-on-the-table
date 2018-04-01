import React from 'react';
import { connect, Provider } from 'react-redux';

const __NEXT_REDUX_STORE__ = Symbol('__NEXT_REDUX_STORE__');

// https://github.com/iliakan/detect-node
const checkServer = () => Object.prototype.toString.call(global.process) === '[object process]';

const getOrCreateStore = (initStore, initialState) => {
  // Always make a new store if server
  if (checkServer() || typeof window === 'undefined') {
    return initStore(initialState);
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
};

export default (...args) => (Component) => {
  // First argument is initStore, the rest are redux connect arguments and get passed
  const [initStore, ...connectArgs] = args;

  /**
   * 반환할 HoC 컴포넌트 
   * 
   * @param {*} props - getInitialProps 에서 반환하는 정보
   * store - 리덕스 스토어 인스턴스
   * initialProps - 컴포넌트 초기값
   * initialState - 스토어 초기값
   */
  const ComponentWithRedux = (props) => {
    const { store, initialProps, initialState } = props;

    // Connect page to redux with connect arguments
    const ConnectedComponent = connect.apply(null, connectArgs)(Component);

    /** 
     * Wrap with redux Provider with store
     * Create connected page with initialProps
     * 
     * 아래와 같이 Provider로 원본 컴포넌트를 감싸서 반환하면 스토어와 연결된다. 
     *   <Provider store={store}>
     *     <ConnectedComponent {...initialProps} />
     *   </Provider>
     */
    return React.createElement(
      Provider, {
        store: store && store.dispatch ? store : getOrCreateStore(initStore, initialState)
      },
      React.createElement(ConnectedComponent, initialProps)
    );
  };

  /**
   * Next.js 가 호출한 static getInitialProps 함수 재정의
   * 전역으로 사용할 인증(loginUser) 객체를 리덕스 스토어(store)에 저장한다. 
   * 
   * @param {*} context - Next.js 가 주입하는 정보
   * pathname - path section of URL
   * query - query string section of URL parsed as an object
   * asPath - String of the actual path (including the query) shows in the browser
   * req - HTTP request object (server only)
   * res - HTTP response object (server only)
   * jsonPageRes - Fetch Response object (client only)
   * err - Error object if any error is encountered during the rendering
   */
  ComponentWithRedux.getInitialProps = async (context) => {
    const isServer = checkServer();

    // 스토어 객체에 인증정보를 같이 넣는다.
    const { req } = context;
    let loginUser = null;

    if (isServer && req.user) {
      // for server
      try {
        await req.user.get('photo').fetch();
        loginUser = req.user.toJSON();
      } catch (ex) {
        loginUser = req.user.toJSON();
        loginUser.photo = {
          image: "/assets/images/default-user-image.png"
        }
      }
    } else {
      // for client..
      loginUser = store && store.getState().loginUser;
    }

    // 프로필 이미지가 없으면 샘플을 넣어준다.
    if (loginUser && !loginUser.photo) {
      loginUser.photo = {
        image: "/assets/images/default-user-image.png"
      }
    }

    // 인증 객체를 스토어에 넣어서 초기화 한다.
    const store = getOrCreateStore(initStore, { loginUser });

    // 원본 getInitialProps 를 직접 호출해서 디폴트로 props로 주입할 initialProps 값을 얻어온다.
    const initialProps = Component.getInitialProps ? await Component.getInitialProps({ ...context, isServer, store }) : {};

    // HOC 컴포넌트는 원본이 먼저 동작한 후에 반환된다. for Client
    return {
      store,
      initialState: store.getState(),
      initialProps
    };
  };

  return ComponentWithRedux;
};
