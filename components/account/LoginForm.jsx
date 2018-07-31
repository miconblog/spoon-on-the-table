import React from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { loginUser } from '../../utils/api';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { resetFields, validateFields },
    } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });

        try {
          const success = await loginUser(values);
          if (success) {
            window.location.replace('/');
          } else {
            resetFields(['password']);
            this.setState({ loading: false });
          }
        } catch (ex) {
          this.setState({ loading: false });
          notification.error({
            message: '서버 응답이 없습니다.',
            description: ' 잠시후에 다시 시도해주세요!',
          });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true }],
          })(
            <Input
              disabled
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            icon={loading ? 'loading' : ''}
            type="primary"
            htmlType="submit"
            className="full-width-button"
          >
            로그인
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({
  mapPropsToFields({ email }) {
    return {
      email: Form.createFormField({ value: email }),
    };
  },
})(LoginForm);

export default WrappedLoginForm;
