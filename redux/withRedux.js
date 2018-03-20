import React from 'react';
import { connect, Provider } from 'react-redux';

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

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

  console.log('111111');


  // 마지막에 동작하는 컴포넌트,..
  const ComponentWithRedux = (props = {}) => {
    const { store, initialProps, initialState, loginUser } = props;
    console.log('444444');

    if (loginUser) {
      initialState.loginUser = loginUser;
    }

    // Connect page to redux with connect arguments
    const ConnectedComponent = connect.apply(null, connectArgs)(Component);

    // Wrap with redux Provider with store
    // Create connected page with initialProps
    return React.createElement(
      Provider, {
        store: store && store.dispatch ? store : getOrCreateStore(initStore, initialState)
      },
      React.createElement(ConnectedComponent, initialProps)
    );
  };

  // Next.js --> getInitialProps (S)
  ComponentWithRedux.getInitialProps = async (props = {}) => {
    const isServer = checkServer();
    const store = getOrCreateStore(initStore);
    console.log('22222', isServer);


    // 스토어 객체에 인증정보를 같이 넣는다.
    const { req } = props;
    let loginUser = null;

    if (isServer && req.user) {
      // for server
      loginUser = req.user.toJSON();
      loginUser.profileImage = "https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-1/p320x320/1510494_10151938283373302_404117394_n.jpg?oh=fef97d5f281b11e85993992d276ee11f&oe=5B45B569";
    } else {
      // for client..
      loginUser = store.getState().loginUser;
    }

    // Run page getInitialProps with store and isServer + loginUser
    // 서버에서 동작: HOC 원본 컴포넌트에 스토어와 인증객체 같이 내려줌. 
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps({
        ...props,
        isServer,
        loginUser,
        store
      })
      : {};

    // HOC 컴포넌트는 원본이 먼저 동작한 후에 반환된다. for Client
    return {
      store,
      loginUser,
      initialState: store.getState(),
      initialProps
    };
  };

  return ComponentWithRedux;
};
