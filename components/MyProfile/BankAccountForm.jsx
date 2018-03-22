import React from 'react';
import Link from 'next/link';
import { Form, Input, Icon, Select, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class BankAccountForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        }
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
        <FormItem>
          <strong>
            수익이 발생할 경우 연결된 은행 계좌로 입금해드립니다.
          </strong>
        </FormItem>

        <FormItem
          label="은행계좌"
        >
          {getFieldDecorator('account', {
            rules: [{ required: true, message: 'Please input your account number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">저장</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(BankAccountForm);
