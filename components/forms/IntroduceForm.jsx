import React from 'react';
import Link from 'next/link';
import { Form, Input, Icon, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class IntroduceForm extends React.Component {
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
        <FormItem>
          <strong>
            miconblog@gmail.com
          </strong>
        </FormItem>

        <FormItem>
          {getFieldDecorator('about', {
            rules: [
              { message: 'introduce yourself' },
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

export default Form.create()(IntroduceForm);
