import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Icon, Input, Button, Select, Alert } from 'antd';
import { saveTableCache } from '../../utils/api';
import AutoAddressComplete from './AutoAddressComplete';

const FormItem = Form.Item;
const Option = Select.Option;

const WelcomeHosting = ({ firstName }) => (
  <>
    <h2>{firstName}님 안녕하세요! </h2>
    <p>회원님의 테이블 등록을 도와드릴께요!</p>
  </>
)

const ProfileRequired = () => (
  <Alert
    type="info"
    message="호스트 정보가 필요합니다."
    description={(
      <>
        <p>호스팅하려면 프로필 정보를 먼저 수정하셔야합니다.</p>
        <Link href={'/my/profile'}><a>내 프로필 정보 바로가기</a></Link>
      </>
    )}
    showIcon
    style={{ marginBottom: 30 }}
  />
)

class StepIndexForm extends React.Component {
  state = {
    nearBy: null,
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { nearBy } = this.state;
    const { form: { validateFields }, loginUser, cache } = this.props;

    validateFields(async (err, values) => {

      if (nearBy) {
        values.nearBy = { ...nearBy };
      }

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
          nearBy
        }
      }
    } = this.props;
    const { loading } = this.state;

    console.log(loginUser, this.props.cache)
    return (
      <React.Fragment>
        {
          loginUser.firstName
            ? <WelcomeHosting {...loginUser} />
            : <ProfileRequired />
        }
        
        <div>
          <h4>어떤 종류의 테이블을 만들 예정인가요?</h4>

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
              <AutoAddressComplete
                showLoading={false}
                value={nearBy}
                onSelect={(nearBy) => this.setState({ nearBy })}
              />
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                icon={loading ? 'loading' : ''}
                disabled={!loginUser.phone}
              >계속</Button>
            </FormItem>
          </Form>

        </div>
      </React.Fragment>
    );
  }
}

export default Form.create()(StepIndexForm);
