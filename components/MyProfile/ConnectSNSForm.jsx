import React from 'react';
import Link from 'next/link';
import { Form, Input, Icon, Switch, Col, Button } from 'antd';

const FormItem = Form.Item;

class ConnectSNSForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleChange = (checked) => {
    console.log(`switch to ${checked}`);
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
        <FormItem>
          <Col span={16}>
            <Button
              icon='facebook'
              className='full-width-button'
              style={{ backgroundColor: '#4267b2', color: '#fff', height: '40px' }}>페이스북 연동</Button>

          </Col>
          <Col span={4} />
          <Col span={4}>
            <Switch style={{width: '80px'}} checkedChildren="연동해제" unCheckedChildren="연동하기" onChange={this.handleChange} />
          </Col>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ConnectSNSForm);
