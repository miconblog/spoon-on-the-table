import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class IntroduceForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
        <FormItem>
          <strong>miconblog@gmail.com</strong>
        </FormItem>

        <FormItem>
          {getFieldDecorator('about', {
            rules: [{ message: 'introduce yourself' }],
          })(<TextArea rows={4} />)}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(IntroduceForm);
