import React from 'react';
import Link from 'next/link';
import updateUser from './updateUser';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

class PasswordForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { resetFields } = this.props.form;

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {

        const { loginUser: { objectId } } = this.props;
        const { password } = values;
        const user = await updateUser(objectId, { password });
        resetFields(['password', 'confirm'])
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('입력한 비밀번호와 일치하지 않습니다.');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="PasswordForm" onSubmit={this.handleSubmit}>
        <FormItem label="비밀번호">
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem label="한번 더 입력해주세요">
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem style={{ paddingTop: '50px' }}>
          <Button className="full-width-button" type="primary" htmlType="submit">저장</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(PasswordForm);
