import React from 'react';
import withGoogleSDK from '../withGoogleSDK';
import { AutoComplete } from 'antd';

const Option = AutoComplete.Option;
class AutoAddressComplete extends React.Component {

  constructor(props) {
    super(props);

    this.map = new props.sdk.Geocoder();

    if( props.value ){
      this.state = {
        value: props.value.id,
        result: [props.value]
      }
    } else {
      this.state = {
        value: null,
        result: []
      }
    }
  }

  handleChange = (value) => {
    this.map.geocode({ address: value }, (res) => {

      if (!res) {
        return this.setState({ result: [] })
      }

      const result = res.map(({ formatted_address, geometry, place_id }) => {
        return {
          address: formatted_address,
          location: geometry.location.toJSON(),
          id: place_id
        }
      });
      this.setState({ result })
    });
  }

  render() {
    const { result, value } = this.state;
    const children = result.map(({ id, address }) => {
      return <Option key={id}>{address}</Option>;
    });

    return (
      <AutoComplete
        defaultValue={value}
        style={{ width: 270 }}
        placeholder="어느 동에 사시나요? 예) 서초동"
        onChange={this.handleChange}
        onSelect={(value) => {
          this.props.onSelect && this.props.onSelect(result.filter(({ id }) => id === value)[0]);
        }}
      >{children}
      </AutoComplete>
    );
  }
}

export default withGoogleSDK(AutoAddressComplete);