import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Select, Divider, Row, Col } from 'antd';
import { saveTableCache } from '../../utils/api';
import SimpleMap from './SimpleMap';


const FormItem = Form.Item;
const Option = Select.Option;

class StepLocationForm extends React.Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, loginUser, cache } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        await saveTableCache({ table: { ...cache.table, ...values } }, loginUser.sessionToken);
        Router.push('/become-a-host?step=price', '/become-a-host/price');
      }
    });
  }

  handleChange = async ({ lat, lng }) => {
    const { loginUser, cache } = this.props;
    cache.table.nearBy.location = {
      lat, lng
    };

    await saveTableCache({ table: { ...cache.table } }, loginUser.sessionToken);
  }

  handleGoBack = (e) => {
    e.preventDefault();
    Router.push('/become-a-host?step=menu', '/become-a-host/menu');
  }

  render() {
    const {
      form: { getFieldDecorator },
      loginUser,
      cache: {
        table: {
          explain = '',
          nearBy
        }
      }
    } = this.props;
    const { loading } = this.state;

    return (
      <div className="StepMenuForm">
        <p>찾아오는 손님들을 위해 정확한 위치를 지정해주세요.</p>
        <SimpleMap
          eventLocation={nearBy.location}
          onChange={this.handleChange}
        />
        <Divider />
        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            {getFieldDecorator('explain', {
              initialValue: explain,
              rules: [{ required: true, message: '자세한 설명이 필요합니다.' }]
            })(
              <Input.TextArea rows={5} placeholder='골목이 복잡하거나 대중교통이 있다면 자세한 설명을 남겨주세요.' />
            )}
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <a onClick={this.handleGoBack} href="/become-a-host/menu" className="ant-btn ant-type-ghost">이전</a>
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

export default Form.create()(StepLocationForm);
