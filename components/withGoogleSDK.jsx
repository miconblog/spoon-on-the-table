import React from 'react';

export let isCalled = false;
const appKey = 'AIzaSyCXtmdO_GLwzjMFowULioeAaDH_MD9fLTA';
const URL = `https://maps.googleapis.com/maps/api/js?key=${appKey}`;

export default function withGoogleMap(Component) {

  if(!Component) {
    throw new Error('need react component as an argument')
  }

  class ComponentWithGoogleSDK extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: !isCalled,
      };
    }

    componentDidMount() {

      // only works for client
      const scriptjs = require('scriptjs');
      if (!isCalled) {
        isCalled = true;
        scriptjs(URL, () => {
          this.setState({
            loading: false
          });
        });
      }

    }

    // TODO: SDK가 로드되기전에 컴포넌트가 unmount 되면 this.setState 호출을 막아야한다.
    componentWillUnmount() {
    }

    render() {

      const { loading } = this.state;
      const { height = 350, showLoading = true, ...props } = this.props;

      if (loading) {
        return showLoading ? (
          <div style={{ height: `${height}px`, width: '100%', display: 'flex' }}>
            <div style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>
              <span style={{ color: 'gray' }}>잠시만 기다려주세요...</span>
            </div>
          </div>
        ) : null;
      }

      const sdk = (typeof google !== 'undefined') ? google.maps : {}

      return <Component {...props} sdk={sdk} />
    }
  };

  return ComponentWithGoogleSDK;
};