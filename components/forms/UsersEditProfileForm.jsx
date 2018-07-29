import { connect } from 'react-redux';
import React from 'react';
import { Card, Form, Input, Select, Button, Icon } from 'antd';
import updateUser from './updateUser';
import './UsersEditProfileForm.less';

const FormItem = Form.Item;
const { Option } = Select;
const Languages = ['한국어(Korean)', 'English'];

class UsersEditProfileForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { loginUser, dispatch } = this.props;
        await updateUser(loginUser.id, values, dispatch);
      }
    });
  };

  render() {
    const { loginUser, form: { getFieldDecorator } } = this.props;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '82',
    })(
      <Select style={{ width: 70 }}>
        <Option value="82">+82</Option>
      </Select>,
    );

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <main className="UsersEditProfileForm">
        <Card title="필수정보">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="이름"
            >
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'first name' }],
              })(<Input />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="성"
            >
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'last name' }],
              })(<Input />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<span>성별 <Icon type="lock" /></span>}
            >
              {getFieldDecorator('sex', {
                rules: [{ required: true, message: '성별을 선택하세요' }],
              })(
                <Select>
                  <Option value="male">남성</Option>
                  <Option value="female">여성</Option>
                </Select>,
              )}
              <p>
            성별은 통계로 목적으로 사용되며 다른 회원들에게 절대 공개되지
            않습니다.
              </p>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<span>이메일 주소 <Icon type="lock" /></span>}
            >
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'last name' }],
                initialValue: loginUser.email,
              })(<Input />)}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label={<span>전화번호 <Icon type="lock" /></span>}
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'phone number' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label={<span>선호하는 언어 <Icon type="lock" /></span>}
              hasFeedback
            >
              {getFieldDecorator('language', {
                initialValue: ['한국어(Korean)', 'English'],
                rules: [
                  { required: true, message: 'Please select at least one language!' },
                ],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={this.handleChange}
                >
                  {Languages.map(language => (<Option key={language}>{language}</Option>))}
                </Select>,
              )}
            </FormItem>

            <FormItem style={{ paddingTop: '50px' }}>
              <Button
                className="full-width-button"
                type="primary"
                htmlType="submit"
              >
            저장
              </Button>
            </FormItem>
          </Form>
        </Card>
      </main>
    );
  }
}

const CreatedForm = Form.create({
  mapPropsToFields({
    loginUser: { firstName, lastName, phone, sex = '선택하세요' },
  }) {
    let match = [null, null];
    if (phone) {
      match = phone.split('#');
    }

    return {
      firstName: Form.createFormField({ value: firstName }),
      lastName: Form.createFormField({ value: lastName }),
      prefix: Form.createFormField({ value: match[0] }),
      phone: Form.createFormField({ value: match[1] }),
      sex: Form.createFormField({ value: sex }),
    };
  },
})(UsersEditProfileForm);

export default connect(state => ({
  loginUser: state.loginUser,
}))(CreatedForm);
