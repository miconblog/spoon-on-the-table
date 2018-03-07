import Link from 'next/link'
import Router from 'next/router'
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';
import Parse from '../lib/parse';

const FormItem = Form.Item;

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        Parse.Cloud.run('duplicateUser', values).then((res) => {
          console.log(res)

          if (res === 'YES') {
            // 로그인 페이지로 
            Router.push(`/login?email=${values.email}`, '/login');
          } else {
            // 가입 페이지로 
            Router.push(`/signup?email=${values.email}`, '/signup');
          }

        })

        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{ marginBottom: 10 }}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '이메일을 입력해주세요!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="full-width-button">로그인 또는 가입하기</Button>
        </FormItem>
        {/* <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem> */}
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

const SocialButtons = () => (
  <div>
    <Button
      icon="facebook"
      className="full-width-button"
      style={{ backgroundColor: '#4267b2', color: '#fff', height: '40px' }}>페이스북</Button>
  </div>
)


export default () => (
  <div>
    <div className="sign-page">
      <div className="logo">
        <Link href="/"><a><h1>TableSpoon</h1></a></Link>
        <p>전세계의 여행자들을</p>
        <p>내 식탁에서 만나는 방법!</p>
      </div>
      <WrappedNormalLoginForm />
      <Divider>OR</Divider>
      <SocialButtons />
    </div>

    <style jsx>{`
      .sign-page {
        width: 300px;
        margin: 0 auto;
        align-self: center;
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
)