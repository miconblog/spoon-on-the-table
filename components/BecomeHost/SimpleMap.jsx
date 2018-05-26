import React from 'react';
import withGoogleSDK from '../withGoogleSDK';

class SimpleMap extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  onLoad = (node) => {

    // refs는 unload 될때도 호출되므로 node는 null 이 될수도 있다.
    if (!node) { return null }

    const { eventLocation, sdk } = this.props;

    this.map = new sdk.Map(node, {
      fullscreenControl: false,
      zoom: 15,
      center: eventLocation
    });

    this.marker = new sdk.Marker({
      position: eventLocation,
      map: this.map,
      draggable: true
    });

    this.map.addListener('rightclick', ({ latLng }) => {
      this.marker.setPosition(latLng);
      this.props.onChange({ lat: latLng.lat(), lng: latLng.lng() });
    });

    this.marker.addListener('dragend', ({ latLng }) => {
      this.props.onChange({ lat: latLng.lat(), lng: latLng.lng() });
    });
  }

  componentWillUnmount() {

    const { sdk } = this.props;

    sdk.event.clearInstanceListeners(this.marker);
    sdk.event.clearInstanceListeners(this.map);

    this.marker = null;
    this.map = null;
    this.node = null;
  }

  render() {
    return (
      <div style={{ height: '500px', width: '100%' }} ref={this.onLoad} />
    );
  }

}

export default withGoogleSDK(SimpleMap);