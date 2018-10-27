/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Button } from 'antd';
import omit from 'lodash/omit';
import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import moment from 'moment';

import 'react-dates/initialize';
import './DateRangePicker.less';

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      // startDate: props.initialStartDate,
      // endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    const { onDatesChange } = this.props;

    // this.setState({ startDate, endDate });
    onDatesChange(startDate, endDate);
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  onClear() {
    const { onClear } = this.props;
    this.setState({
      focusedInput: START_DATE,
    });
    onClear();
  }

  render() {
    const { focusedInput } = this.state;
    const { onApplay, startDate, endDate } = this.props;

    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'onApplay',
      'onClear',
    ]);

    return (
      <div className="DateRangePicker">
        <DayPickerRangeController
          {...props}
          isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
          hideKeyboardShortcutsPanel
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
        <div className="btn-group">
          <Button onClick={this.onClear}>삭제</Button>
          <Button onClick={onApplay}>적용</Button>
        </div>
      </div>
    );
  }
}

export default DateRangePicker;
