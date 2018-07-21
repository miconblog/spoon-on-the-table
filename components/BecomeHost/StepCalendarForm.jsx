import React from 'react';
import Router from 'next/router';
import { Form, Row, Col, Button } from 'antd';
import moment from 'moment';
import { saveTableCache } from '../../utils/api';
import DateRangePicker from './DateRangePicker';

const FormItem = Form.Item;

class StepCalendarForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const cache = props.cache.table;
    const startDate = cache.startDate ? moment(cache.startDate) : moment();
    const endDate = cache.endDate ? moment(cache.endDate) : startDate.add(1);

    this.state = {
      numberOfMonths: 0,
      loading: false,
      disabled: !(startDate && endDate),
      startDate,
      endDate,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions);
  };

  updateDimensions = () => {
    const w = window;
    const { documentElement } = document;
    const body = document.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

    if (width < 768) {
      this.setState({ numberOfMonths: 1 });
    } else if (width >= 768 && width < 1080) {
      this.setState({ numberOfMonths: 2 });
    } else {
      this.setState({ numberOfMonths: 3 });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
      loginUser,
      cache,
    } = this.props;
    const { startDate, endDate } = this.state;

    validateFields(async (err) => {
      if (!err) {
        this.setState({ loading: true });
        await saveTableCache(
          { table: { ...cache.table, startDate, endDate } },
          loginUser.sessionToken,
        );

        console.log('cache', cache);
        // Router.push('/my/tables')
      }
    });
  };

  handleGoBack = (e) => {
    e.preventDefault();
    Router.push('/become-a-host?step=price', '/become-a-host/price');
  };

  handleDatesChange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return this.setState({
        disabled: true,
        startDate: null,
        endDate: null,
      });
    }

    return this.setState({
      disabled: false,
      startDate: startDate.format(),
      endDate: endDate.format(),
    });
  };

  handleAddDate = () => {
    const { startDate, endDate, dates } = this.state;
    dates.push({ startDate, endDate });
    this.setState({
      startDate: null,
      endDate: null,
      dates: [...dates],
    });
  };

  render() {
    const {
      loading,
      disabled,
      numberOfMonths,
      startDate,
      endDate,
    } = this.state;

    if (!numberOfMonths) {
      return null;
    }

    return (
      <div className="StepMenuForm">
        <p>초대 가능한 날짜를 지정해주세요. 지정한 날짜 외에는 이벤트가 노출되지 않습니다.</p>

        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <DateRangePicker
            noBorder
            transitionDuration={0}
            initialStartDate={startDate}
            initialEndDate={endDate}
            onDatesChange={this.handleDatesChange}
            numberOfMonths={numberOfMonths}
          />
        </div>

        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <a
                  onClick={this.handleGoBack}
                  href="/become-a-host/price"
                  className="ant-btn ant-type-ghost"
                >
                  이전
                </a>
              </Col>
              <Col>
                <Button
                  type="primary"
                  disabled={disabled}
                  htmlType="submit"
                  icon={loading ? 'loading' : ''}
                >
                  등록 완료
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(StepCalendarForm);
