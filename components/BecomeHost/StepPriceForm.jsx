import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Divider, Row, Col } from 'antd';
import { saveTableCache } from '../../utils/api';

const FormItem = Form.Item;

class StepPriceForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, loginUser, cache } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        await saveTableCache({ table: { ...cache.table, ...values } }, loginUser.sessionToken);
        Router.push('/become-a-host?step=calendar', '/become-a-host/calendar');
      }
    });
  }

  handleGoBack = (e) =>{
    e.preventDefault();
    Router.push('/become-a-host?step=location', '/become-a-host/location');
  }

  render() {
    const {
      form: { getFieldDecorator },
      loginUser,
      cache: {
        table: {
          price = '0',
        }
      }
    } = this.props;
    const { loading } = this.state;

    console.log( this.props.cache.table)

    return (
      <div className="StepMenuForm">
        <strong>4단계</strong>
        <p>가격을 정해주세요.</p>

        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            {getFieldDecorator('price', {
              initialValue: price,
              rules: [{ required: true}]
            })(
              <Input placeholder='가격은 얼마로 할까요?' />
            )}
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <a onClick={this.handleGoBack} href="/become-a-host/location" className="ant-btn ant-type-ghost">이전</a>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" icon={loading ? 'loading' : ''}>계속</Button>
              </Col>
            </Row>
          </FormItem>


        </Form>
      </div>
    );
  }
}

export default Form.create()(StepPriceForm);
