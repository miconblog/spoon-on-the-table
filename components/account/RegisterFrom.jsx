import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';
import { registerUser } from '../../utils/api';

const FormItem = Form.Item;

class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields(async (err, values) => {
      if (!err) {
        const { email, password } = values;
        const success = await registerUser(values);
        if (success) {
          window.location.replace('/');

          // TODO: 회원가입 되었다는 안내와 함께 메일을 발송되었음을 알리는게 좋지 않을까?
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <span className="field-label">
          이메일 주소<span>*</span>
        </span>
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

        <span className="field-label">
          비밀번호<span>*</span>
        </span>
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

        <p className="desc">
          SpoonTable에 가입함으로써{' '}
          <a target="_blank" href="/privacy">
            개인정보 이용약관
          </a>에 동의합니다.
        </p>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="full-width-button"
          >
            회원 가입
          </Button>
        </FormItem>

      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create({
  mapPropsToFields(props) {
    return {
      email: Form.createFormField({ value: props.email }),
    };
  },
})(RegisterForm);

export default WrappedRegisterForm;
