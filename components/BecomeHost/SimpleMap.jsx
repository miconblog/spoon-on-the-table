import React from 'react';

let sdkLoaded = false;
export default class SimpleMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loaded: false
    };
  }

  static onLoad() {
    sdkLoaded = true;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      loading: !sdkLoaded
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (!nextState.loading) {
      const { eventLocation } = nextProps;
      console.log('컴포넌트를 랜더링하지 않고 맵만 그릴꺼야!', eventLocation);

      // map.panTo(new google.maps.LatLng(eventLocation));

    }

    return false;
  }

  componentDidMount() {

    if (typeof google === 'undefined') {
      console.log('아직 구글맵이 로드되지 않았어!!');
      return;
    }

    console.log('구글맵이 이전에 로드되어 있어서 바로 지도를그린다.');
    this.initMap();
  }

  componentWillUnmount(){

    console.log('unload', this.map, this.marker, this.node);
    google.maps.event.clearInstanceListeners(this.marker);
    google.maps.event.clearInstanceListeners(this.map);
    this.marker = null;
    this.map = null;
    this.node = null;
    console.log('unload', this.map, this.marker, this.node);

  }

  handlePin

  initMap = () => {
    const { eventLocation } = this.props;

    this.map = new google.maps.Map(this.node, {
      zoom: 14,
      center: eventLocation
    });
    this.marker = new google.maps.Marker({
      position: eventLocation,
      map: this.map,
      draggable: true
    });

    this.marker.addListener('dragend', (e) => {
      console.log('change..', e);
    });

    this.map.addListener('click', ({ latLng }) => {

      console.log(latLng);

      this.marker.setPosition(latLng);

      //this.props.onChange({ lat: latLng.lat(), lng: latLng.lng() });

    });

  }

  render() {
    return (
      <div style={{ height: '350px', width: '100%' }} ref={(node) => this.node = node} />
    );
  }

}