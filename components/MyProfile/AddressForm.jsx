import React from 'react';
import Link from 'next/link';
import { Form, Input, Icon, Select, Button, Divider } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddressForm extends React.Component {
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
    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
        <FormItem
          label="Country"
          hasFeedback
        >
          {getFieldDecorator('country', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder="Please select a country">
              <Option value="korea">South Korea</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Address"
          hasFeedback
        >
          {getFieldDecorator('address', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Input />
          )}
        </FormItem>

        <Divider />

        <FormItem
          label="How to get your address, explain to your guests"
          hasFeedback
        >
          {getFieldDecorator('explain', {
            rules: [
              { message: 'Please select your country!' },
            ],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>


        <FormItem>
          <Button type="primary" htmlType="submit">저장</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AddressForm);
