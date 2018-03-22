import React from 'react';
import Link from 'next/link';
import { Form, Input, Icon, Select, Row, Col, Button, notification } from 'antd';
import { checkStatus } from '../../lib/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class InfoForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { loginUser } = this.props;
        const { prefix, lastName, firstName, phone } = values;

        console.log('Received values of form: ', loginUser, values);

        fetch(`/api/user/${loginUser.objectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            lastName,
            firstName,
            fullName: `${firstName} ${lastName}`,
            phone: `${prefix}#${phone}`
          })
        }).then(checkStatus)
          .then(res => res.json())
          .then(function (user) {
            notification.success({
              message: '프로필 정보 수정',
              description: '정상적으로 수정되었습니다.',
            });
          }).catch(function (error) {
            console.log('수정 실패...', error);
          });
      }
    });
  }
  render() {
    const { loginUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '82',
    })(
      <Select style={{ width: 70 }}>
        <Option value="82">+82</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
        <FormItem>
          가입한 이메일 주소는 <strong>{loginUser.email}</strong> 입니다.
        </FormItem>

        <Row type="flex" justify="space-between">
          <Col>
            <FormItem label="성">
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'last name' }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem label="이름">
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'first name' }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem label="휴대전화">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'phone number' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem style={{ paddingTop: '50px' }}>
          <Button className="full-width-button" type="primary" htmlType="submit">저장</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields({ loginUser: { firstName, lastName, phone } }) {

    let match = null;
    if( phone ){
      match = phone.split('#');
    }

    return {
      firstName: Form.createFormField({ value: firstName }),
      lastName: Form.createFormField({ value: lastName }),
      prefix: Form.createFormField({ value: match[0] }),
      phone: Form.createFormField({ value: match[1] })
    };
  }
})(InfoForm);
