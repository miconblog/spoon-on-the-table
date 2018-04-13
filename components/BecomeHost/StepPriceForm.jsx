import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Select, Divider, Row, Col } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class StepPriceForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields(async (err, values) => {
      if (!err) {
        console.log(JSON.stringify(values));

        // TODO: 서버에 일단 저장
        Router.push('/become-a-host/calendar')
      }
    });
  }
  render() {
    const { form: { getFieldDecorator }, loginUser } = this.props;
    const { loading } = this.state;

    return (
      <div className="StepMenuForm">
        <strong>4단계</strong>
        <p>가격을 정해주세요.</p>

        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            {getFieldDecorator('price', {
              initialValue: 0,
              rules: [{ required: true}]
            })(
              <Input placeholder='가격은 얼마로 할까요?' />
            )}
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <Link href="/become-a-host/location"><a className="ant-btn ant-type-ghost">이전</a></Link>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">다음</Button>
              </Col>
            </Row>
          </FormItem>


        </Form>
      </div>
    );
  }
}

export default Form.create()(StepPriceForm);
