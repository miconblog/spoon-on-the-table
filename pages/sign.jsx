import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';
import { checkStatus } from '../lib/utils';
const FormItem = Form.Item;

class SignForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email } = values;
        fetch('/api/user/duplicate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({ email })
        }).then(checkStatus)
          .then(function (data) {
            Router.push(`/signup?email=${email}`, '/signup');
          }).catch(function (error) {
            Router.push(`/login?email=${email}`, '/login');
          });
      }
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem style={{ marginBottom: 10 }}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '이메일을 입력해주세요!' }]
          })(
            <Input prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='email' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' className='full-width-button'>로그인 또는 가입하기</Button>
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
  <div>
    <div className='sign-page'>
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
        width: 300px;
        margin: 0 auto;
        align-self: center;
        margin-top: -100px;
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

export default Sign;