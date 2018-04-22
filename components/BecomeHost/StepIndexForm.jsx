import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Select, AutoComplete } from 'antd';
import { saveTableCache } from '../../utils/api';

const FormItem = Form.Item;
const Option = Select.Option;

class StepIndexForm extends React.Component {
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
        Router.push('/become-a-host?step=menu', '/become-a-host/menu');
      }
    });
  }
  render() {
    const {
      form: { getFieldDecorator },
      loginUser,
      cache: {
        table: {
          eventType = 'dinner',
          spoonCount = 4,
          location = ''
        }
      }
    } = this.props;
    const { loading } = this.state;

    return (
      <React.Fragment>
        <h2>{loginUser.firstName}님 안녕하세요! </h2>
        <p>회원님의 테이블 등록을 도와드릴께요!</p>

        <div>
          <strong>1단계</strong>
          <p>어떤 종류의 테이블을 만들 예정인가요?</p>

          <Form onSubmit={this.handleSubmit} >
            <FormItem style={{ marginBottom: 0, display: 'inline-block', width: 'auto' }}>
              {getFieldDecorator('eventType', {
                initialValue: eventType,
                rules: [{ required: true, message: 'Please input your username!' }]
              })(
                <Select style={{ width: 100, marginRight: 10 }}>
                  <Option value="breakfast">아침식사</Option>
                  <Option value="brunch">브런치</Option>
                  <Option value="lunch">점심</Option>
                  <Option value="dinner">저녁</Option>
                  <Option value="picnic">소풍</Option>
                </Select>
              )}
            </FormItem>
            <FormItem style={{ marginBottom: 0, display: 'inline-block', width: 'auto' }}>
              {getFieldDecorator('spoonCount', {
                initialValue: spoonCount,
                rules: [{ required: true, message: 'Please input your username!' }]
              })(
                <Select style={{ width: 160 }}>
                  <Option value={1}>최대 1명 가능</Option>
                  <Option value={2}>최대 2명 가능</Option>
                  <Option value={3}>최대 3명 가능</Option>
                  <Option value={4}>최대 4명 가능</Option>
                  <Option value={5}>최대 5명 가능</Option>
                  <Option value={6}>최대 6명 가능</Option>
                </Select>
              )}
            </FormItem>
            <FormItem style={{ marginBottom: 10 }}>
              {getFieldDecorator('location', {
                initialValue: location,
                rules: [{ required: true, message: '호스팅할 대략적인 위치를 검색해주세요.' }]
              })(
                <AutoComplete
                  dataSource={[]}
                  style={{ width: 270 }}
                  placeholder="어느 동에 사시나요? 예) 서초동"
                />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" icon={loading ? 'loading' : ''}>계속</Button>
            </FormItem>
          </Form>

        </div>
      </React.Fragment>
    );
  }
}

export default Form.create()(StepIndexForm);
