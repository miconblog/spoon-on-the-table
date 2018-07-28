import React from 'react';
import Link from 'next/link';
import { Form, Input, Icon, Select, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Languages = ['한국어(Korean)', 'English']

class LanguageForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const children = Languages.map((language)=>{
      return (<Option key={language}>{language}</Option>)
    })
    
    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
        <FormItem>
          <strong>
            의사소통이 가능한 모든 언어를 선택하세요. <br />
            Please select all languages you can speak
          </strong>
        </FormItem>

        <FormItem
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
              {children}
            </Select>
          )}
        </FormItem>


        <FormItem>
          <Button type="primary" htmlType="submit">저장</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LanguageForm);
