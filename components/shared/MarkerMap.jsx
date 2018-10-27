import React from 'react';
import withGoogleSDK from '../withGoogleSDK';

class MarkerMap extends React.Component {
  componentWillUnmount() {
    const { sdk } = this.props;

    sdk.event.clearInstanceListeners(this.marker);
    sdk.event.clearInstanceListeners(this.map);

    this.marker = null;
    this.map = null;
    this.node = null;
  }

  onLoad = (node) => {
    // refs는 unload 될때도 호출되므로 node는 null 이 될수도 있다.
    if (!node) {
      return null;
    }

    const { mapCenter, sdk } = this.props;

    this.map = new sdk.Map(node, {
      fullscreenControl: false,
      zoom: 15,
      center: mapCenter,
    });

    this.marker = new sdk.Marker({
      position: mapCenter,
      map: this.map,
      draggable: true,
    });
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }} ref={this.onLoad} />
    );
  }
}

export default withGoogleSDK(MarkerMap);
