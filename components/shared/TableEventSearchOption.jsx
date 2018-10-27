import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Switch, Icon } from 'antd';
import DateRangePicker from './DateRangePicker';
import './TableEventSearchOption.less';
import 'moment/locale/ko';

moment.locale('ko');

class TableEventSearchOption extends React.Component {
  state = {
    openDate: false,
    startDate: null,
    endDate: null,
    strDateRange: '날짜',
  };

  handleDatesChange = (startDate, endDate) => {
    if (startDate && endDate) {
      return this.setState({
        startDate,
        endDate,
        strDateRange: `${startDate.format('L')} ~ ${endDate.format('L')}`,
      });
    }

    return this.setState({
      startDate,
      strDateRange: `${startDate.format('L')}`,
    });
  };

  handleClearDates = () => {
    this.setState({
      startDate: null,
      endDate: null,
      strDateRange: '날짜',
    });
  };

  handleApplayDates = () => {
    this.setState({
      openDate: false,
    });
  };

  render() {
    const { sticky = false, onChangeMapSwitch = null } = this.props;
    const { openDate, startDate, endDate, strDateRange } = this.state;

    return (
      <div className={`TableEventSearchOption ${sticky ? 'sticky' : ''}`}>
        <div className="options">
          <div className="btn-group">
            <Button onClick={() => this.setState({ openDate: !openDate })}>
              {strDateRange}
            </Button>
            <Button>메뉴</Button>
            <Button>인원</Button>
            <Button>언어</Button>
          </div>

          {openDate && <div className="ly-dimmed" />}

          <div className="ly-calendar">
            {openDate && (
              <DateRangePicker
                noBorder
                transitionDuration={0}
                startDate={startDate}
                endDate={endDate}
                numberOfMonths={2}
                onDatesChange={this.handleDatesChange}
                onApplay={this.handleApplayDates}
                onClear={this.handleClearDates}
              />
            )}
          </div>
        </div>
        <div className="map-switch">
          <span className="desc">지도 보기</span>
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            defaultChecked={false}
            onChange={onChangeMapSwitch}
          />
        </div>
      </div>
    );
  }
}


function mapStateToProps (state) {
  const { showMarkerMap } = state;
  return { sticky: showMarkerMap };
}

export default connect(mapStateToProps)(TableEventSearchOption);
