import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Divider, Row, Col, Select, Radio, Alert } from 'antd';
import { saveTableCache } from '../../utils/api';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const times = (count) => {
  return new Array(count).fill(1).map((n, i) => n + i);
};

class StepPriceForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, loginUser, cache } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        await saveTableCache({ table: { ...cache.table, ...values } }, loginUser.sessionToken);
        Router.push('/become-a-host?step=calendar', '/become-a-host/calendar');
      }
    });
  }

  handleGoBack = (e) => {
    e.preventDefault();
    Router.push('/become-a-host?step=location', '/become-a-host/location');
  }

  render() {
    const {
      form: { getFieldDecorator },
      loginUser,
      cache: {
        table: {
          price = 0,
          maxPerson,
          minPerson=1
        }
      }
    } = this.props;
    const { loading, isFree } = this.state;

    return (
      <div className="StepMenuForm">
        <p>테이블 가격을 정해주세요!</p>

        <Form onSubmit={this.handleSubmit} >

          <Alert message="현재는 무료만 가능합니다." type="info" closeText="닫기" />
          <FormItem>
            {getFieldDecorator('price', {
              initialValue: price
            })(
              <Select>
                <Option value={0}>무료</Option>
              </Select>
            )}
          </FormItem>

          <div>
            <p><strong>{maxPerson}인용</strong> 테이블을 구성하고 있습니다.</p>
            <p>최소 몇명의 손님을 필요로 하나요?</p>
          </div>
          <FormItem>
            {getFieldDecorator('minPerson', {
              initialValue: minPerson
            })(
              <Select>
                {times(maxPerson).map((value, idx) => {
                  return <Option key={value} value={value}>{value}명</Option>
                })
                }
              </Select>
            )}
          </FormItem>

          <Alert
            message="예상 수익"
            description={(
              <>
                <p>*무료 이벤트는 수수료가 없습니다.</p>
                <p>예상 수익은 <strong>0원</strong>입니다</p>
              </>
            )}
            type="success"
            showIcon
            style={{ marginBottom: 30 }}
          />

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <a onClick={this.handleGoBack} href="/become-a-host/location" className="ant-btn ant-type-ghost">이전</a>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" icon={loading ? 'loading' : ''}>계속</Button>
              </Col>
            </Row>
          </FormItem>


        </Form>
      </div>
    );
  }
}

export default Form.create()(StepPriceForm);
