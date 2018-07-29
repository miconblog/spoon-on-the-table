import React from 'react';
import { withRouter } from 'next/router'
import { Form, Icon, Input, Button, notification } from 'antd';
import { checkUserDuplicated } from '../../utils/api';

const FormItem = Form.Item;

class SignForm extends React.Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        const { email } = values;
        this.setState({ loading: true });
        const { router } = this.props;

        try {
          const success = await checkUserDuplicated(values);
          console.log('유저 매일 체크', success, email);

          if (success) {
            router.push(`/login?email=${email}`, '/login');
          } else {
            router.push(`/signup?email=${email}`, '/signup');
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
        <FormItem style={{ marginBottom: 10 }}>
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: '유효한 이메일 형식이 아닙니다.' },
              { required: true, message: '이메일을 입력해주세요!' },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
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
            로그인 또는 가입하기
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSignForm = Form.create()(SignForm);

export default withRouter(WrappedSignForm);
