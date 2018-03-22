import React from 'react';
import Link from 'next/link';
import { Form, Input, Icon, Select, Row, Col, Button, notification } from 'antd';
import { checkStatus } from '../../lib/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class PasswordForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { resetFields } = this.props.form;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        const { loginUser } = this.props;
        const { password } = values;

        fetch(`/api/user/${loginUser.objectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            password
          })
        }).then(checkStatus)
          .then(res => res.json())
          .then(user => {

            notification.success({
              message: '비밀번호 변경',
              description: '정상적으로 변경 되었습니다.',
            });
            resetFields(['password', 'confirm'])

          }).catch(function (error) {
            console.log('수정 실패...', error);
          });
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
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
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
