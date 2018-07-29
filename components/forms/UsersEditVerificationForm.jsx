import React from 'react';
import { Card, Row, Form, Input, Icon, Switch, Col, Button } from 'antd';
import './UsersEditVerificationForm.less';

const FormItem = Form.Item;

class UsersEditVerificationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <main className="UsersEditVerificationForm">
        <Card title="인증 현황">
          <Row type="flex" justify="space-around">
            <Col>
              <Button icon="facebook" className="btn-facebook">
                페이스북 연동
              </Button>
            </Col>
            <Col>
              <Switch
                className="sw-facebook"
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Form onSubmit={this.handleSubmit} />
        </Card>
      </main>
    );
  }
}

export default Form.create()(UsersEditVerificationForm);
