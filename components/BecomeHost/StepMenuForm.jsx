import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Select, Divider, Row, Col } from 'antd';
import PicturesWall from './PicturesWall';
import { saveTableCache } from '../../utils/api';

const FormItem = Form.Item;
const Option = Select.Option;

class StepMenuForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, loginUser, cache } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        console.log(JSON.stringify(values));

        this.setState({ loading: true });
        await saveTableCache({ table: { ...cache.table, ...values } }, loginUser.sessionToken);
        Router.push('/become-a-host?step=location', '/become-a-host/location');
      }
    });
  }
  
  handleGoBack = (e) =>{
    e.preventDefault();
    Router.push('/become-a-host?step=index', '/become-a-host');
  }

  render() {
    const { 
      form: { getFieldDecorator }, 
      loginUser, 
      cache: { 
        table: {
          menu = '',
          alcohol = 'none'
        } 
      } 
    } = this.props;
    const { loading } = this.state;

    return (
      <div className="StepMenuForm">
        <strong>2단계</strong>
        <p>테이블에는 어떤 음식들이 올라가나요? 사진과 함께 설명을 넣어주세요.</p>

        <PicturesWall />

        <Divider />

        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            {getFieldDecorator('menu', {
              initialValue: menu,
              rules: [{ required: true, message: '설명은 반드시 입력해야합니다.' }]
            })(
              <Input.TextArea rows={5} placeholder='메뉴에 대한 설명을 자유롭게 넣어주세요.' />
            )}
          </FormItem>

          <div>
            주류가 포함되어 있나요?
            </div>
          <FormItem>
            {getFieldDecorator('alcohol', {
              initialValue: alcohol,
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Select>
                <Option value="none">주류는 포함되어 있지않습니다. (반입금지)</Option>
                <Option value="share">주류는 포함되어 있지않으나 가지고 오시면 같이 마셔야 합니다.</Option>
                <Option value="include">주류가 포함되어 있으므로 따로 가지고 오지마세요.</Option>
                <Option value="include,share">주류가 포함되어 있지만 가지고 오셔서 나눠마셔도 됩니다.</Option>
              </Select>
            )}
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <a onClick={this.handleGoBack} href="/become-a-host" className="ant-btn ant-type-ghost">이전</a>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" icon={loading ? 'loading' : ''}>다음</Button>
              </Col>
            </Row>
          </FormItem>


        </Form>
      </div>
    );
  }
}

export default Form.create()(StepMenuForm);
