import React from 'react';
import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';
import { checkUserDuplicated } from '../utils/api';
import '../styles/style.less';

const FormItem = Form.Item;

class SignForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields(async (err, values) => {
      if (!err) {
        const { email } = values;
        this.setState({ loading: true });
        const success = await checkUserDuplicated(values);
        if (success) {
          Router.push(`/login?email=${email}`, '/login');
        } else {
          Router.push(`/signup?email=${email}`, '/signup');
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem style={{ marginBottom: 10 }}>
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: '유효한 이메일 형식이 아닙니다.' },
              { required: true, message: '이메일을 입력해주세요!' }
            ]
          })(
            <Input prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='email' />
          )}
        </FormItem>
        <FormItem>
          <Button icon={loading?'loading':''} type='primary' htmlType='submit' className='full-width-button'>로그인 또는 가입하기</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSignForm = Form.create()(SignForm);

const SocialButtons = () => (
  <div>
    <Button
      icon='facebook'
      className='full-width-button'
      style={{ backgroundColor: '#4267b2', color: '#fff', height: '40px' }}>페이스북</Button>
  </div>
);

const Sign = () => (
  <div className='sign-page'>
    <div>
      <div className='logo'>
        <Link href='/'><a><h1>TableSpoon</h1></a></Link>
        <p>전세계의 여행자들을</p>
        <p>내 식탁에서 만나는 방법!</p>
      </div>
      <WrappedSignForm />
      <Divider>OR</Divider>
      <SocialButtons />
    </div>

    <style jsx>{`
      .sign-page {
        display: flex;
        > div {
          align-self: center;
          width: 300px;
          margin: 0 auto;
        }
      }

      .logo {
        text-align: center;
        padding-bottom: 40px;

        h1 {
          font-size: 48px;
          font-family: cursive;
          font-weight: bold;    
        }
        p {
          color: #222;
          font-size: 18px;
          line-height: 0.5;
        }
      }
    `}</style>
  </div>
);

Sign.getInitialProps = async function ({ res, loginUser }) {

  if (loginUser) {
    res.redirect('/');
  }

  return {};
};


export default withRedux(initStore)(Sign);