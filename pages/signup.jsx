import Link from 'next/link'
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';
import { checkStatus } from '../lib/utils'
const FormItem = Form.Item;

class RegisterForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { email, password } = values;

        fetch('/api/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            username: email,
            email,
            password
          })
        }).then(checkStatus)
          .then(function (user) {
            
            console.log( user );
            location.replace('/')

          }).catch(function (error) {
            console.log('가입 실패...', error);
          })

      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <label className="field-label">이메일 주소<span>*</span></label>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true }],
          })(
            <Input disabled prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
          )}
        </FormItem>

        <label className="field-label">비밀번호<span>*</span></label>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        <p className="desc">SpoonTable에 가입함으로써 <a target="_blank" href="/privacy">개인정보 이용약관</a>에 동의합니다.</p>
        <FormItem>
          <Button type="primary" htmlType="submit" className="full-width-button">회원 가입</Button>
        </FormItem>

        <style jsx>{`
          .field-label {
            display: block;
            font-size: 15px;
            font-weight: bold;
            color: #4a4a4a;
            margin-bottom: 7px;

            span {
              display: 'inline-block';
              margin-left: 2px;
              color: #d0021b;
            }
          }

          .desc {
            font-size: 12px;
            color: #777777;
            margin: 25px 0 7px 0;
          }
        `}</style>
      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create({
  mapPropsToFields(props) {
    return {
      email: Form.createFormField({ value: props.email })
    };
  }
})(RegisterForm);

const Signup = (props) => (
  <div>
    <div className="sign-page">
      <div className="logo">
        <Link href="/"><a><h1>TableSpoon</h1></a></Link>
        <p>어서오세요! 이제 거의 다 끝나갑니다.</p>
      </div>
      <WrappedRegisterForm {...props} />
    </div>

    <style jsx>{`
      .sign-page {
        padding-top: 50px;
        width: 310px;
        margin: 0 auto;
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

Signup.getInitialProps = ({ query, res }) => {

  const { email } = query;
  if (!email) {
    res.redirect('/sign');
  }

  return {
    email
  }
}

export default Signup;