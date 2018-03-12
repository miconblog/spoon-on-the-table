import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd'
import { checkStatus } from '../lib/utils'

const FormItem = Form.Item

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values

        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            username: email,
            password
          })
        }).then(checkStatus)
          .then(function () {
            location.replace('/')
          }).catch(function (error) {
            console.log('로그인 실패...', error)
          })
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true }]

          })(
            <Input disabled prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='email' />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' className='full-width-button'>로그인</Button>
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
    )
  }
}

const WrappedLoginForm = Form.create({
  mapPropsToFields ({ email }) {
    return {
      email: Form.createFormField({ value: email })
    }
  }
})(LoginForm)

const Login = (props) => (
  <div className='Login'>
    <div className='login-page'>
      <div className='logo'>
        <Link href='/'><a><h1>TableSpoon</h1></a></Link>
        <p>비밀번호가 노출되지 않도록 주의해주세요!</p>
      </div>
      <WrappedLoginForm {...props} />
    </div>

    <style jsx>{`
      .login-page {
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

Login.getInitialProps = ({ query, res }) => {
  const { email } = query
  if (!email) {
    res.redirect('/sign')
  }

  return {
    email
  }
}

export default Login
