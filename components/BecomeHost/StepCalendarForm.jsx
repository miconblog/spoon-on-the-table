import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Calendar, Row, Col } from 'antd';

const FormItem = Form.Item;

class StepCalendarForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields(async (err, values) => {
      if (!err) {
        console.log(JSON.stringify(values));

        // TODO: 서버에 일단 저장
        Router.push('/my/tables')
      }
    });
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
                <Link href="/become-a-host/price"><a className="ant-btn ant-type-ghost">이전</a></Link>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">등록 완료</Button>
              </Col>
            </Row>
          </FormItem>


        </Form>
      </div>
    );
  }
}

export default Form.create()(StepCalendarForm);
