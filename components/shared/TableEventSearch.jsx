import React from 'react';
import { Divider, Input } from 'antd';
import './TableEventSearch.less';

const propTypes = {};

const defaultProps = {};

export default class TableEventSearch extends React.Component {
  render() {
    return (
      <div className="TableEventSearch">
        <Input.Search style={{ width: '320px' }} />
      </div>
    );
  }
}

TableEventSearch.propTypes = propTypes;
TableEventSearch.defaultProps = defaultProps;
