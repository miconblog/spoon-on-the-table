import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Select, Divider, Row, Col } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class StepLocationForm extends React.Component {
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
        Router.push('/become-a-host/price')
      }
    });
  }
  render() {
    const { form: { getFieldDecorator }, loginUser } = this.props;
    const { loading } = this.state;

    return (
      <div className="StepMenuForm">
        <strong>3단계</strong>
        <p>찾아오는 손님들을 위해 정확한 위치를 지정해주세요.</p>

        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            {getFieldDecorator('explain', {
              initialValue: '',
              rules: [{ required: true, message: '설명은 반드시 입력해야합니다.' }]
            })(
              <Input.TextArea rows={5} placeholder='골목이 복잡하거나 대중교통이 있다면 자세한 설명을 남겨주세요.' />
            )}
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <Link href="/become-a-host/menu"><a className="ant-btn ant-type-ghost">이전</a></Link>
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

export default Form.create()(StepLocationForm);
