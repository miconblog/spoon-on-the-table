import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Calendar, Row, Col } from 'antd';
import { saveTableCache } from '../../utils/api';

const FormItem = Form.Item;

class StepCalendarForm extends React.Component {
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
        Router.push('/my/tables')
      }
    });
  }

  handleGoBack = (e) =>{
    e.preventDefault();
    Router.push('/become-a-host?step=price', '/become-a-host/price');
  }

  render() {
    const { form: { getFieldDecorator }, loginUser } = this.props;
    const { loading } = this.state;

    return (
      <div className="StepMenuForm">
        <strong>5단계</strong>
        <p>초대 가능한 모든 날짜를 지정해주세요! </p>

        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            <Calendar />
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <a onClick={this.handleGoBack} href="/become-a-host/price" className="ant-btn ant-type-ghost">이전</a>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" icon={loading ? 'loading' : ''}>등록 완료</Button>
              </Col>
            </Row>
          </FormItem>


        </Form>
      </div>
    );
  }
}

export default Form.create()(StepCalendarForm);
