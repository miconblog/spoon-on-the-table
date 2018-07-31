import React from 'react';
import Router from 'next/router';
import { Form, Button, Select, Alert } from 'antd';
import PrefetchLink from '../PrefetchLink';
import { saveTableCache } from '../../utils/api';
import AutoAddressComplete from './AutoAddressComplete';

const FormItem = Form.Item;
const { Option } = Select;

const WelcomeHosting = ({ firstName }) => (
  <>
    <h2>{firstName}님 안녕하세요! </h2>
    <p>회원님의 테이블 등록을 도와드릴께요!</p>
  </>
);

const ProfileRequired = () => (
  <Alert
    type="info"
    message="호스트 정보가 필요합니다."
    description={
      <>
        <p>호스팅하려면 프로필 정보를 먼저 수정하셔야합니다.</p>
        <PrefetchLink href="/users/edit">내 프로필 정보 바로가기</PrefetchLink>
      </>
    }
    showIcon
    style={{ marginBottom: 30 }}
  />
);

class StepIndexForm extends React.Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
      loginUser,
      cache,
    } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        // setState 함수에 state 객체를 넘기면 상태 변경은 배치작업을 통해 몰아서 한번에 동작하기 때문에 사실 언제 실행될지 모르다.
        // 대신 콜백을 넣어주면 배치로 돌지 않고 상태를 바로 업데이트할수 있다.
        this.setState(() => ({ loading: true }));
        await saveTableCache(
          { table: { ...cache.table, ...values, step: 1 } },
          loginUser.sessionToken
        );
        Router.push('/become-a-host?step=menu', '/become-a-host/menu');
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loginUser,
      cache: {
        table: { eventType = 'dinner', maxPerson = 4, nearBy },
      },
    } = this.props;
    const { loading } = this.state;

    return (
      <React.Fragment>
        {loginUser.firstName ? (
          <WelcomeHosting {...loginUser} />
        ) : (
          <ProfileRequired />
        )}

        <div>
          <h4>어떤 종류의 테이블을 만들 예정인가요?</h4>

          <Form onSubmit={this.handleSubmit}>
            <FormItem
              style={{
                marginBottom: 0,
                display: 'inline-block',
                width: 'auto',
              }}
            >
              {getFieldDecorator('eventType', {
                initialValue: eventType,
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
            <FormItem
              style={{
                marginBottom: 0,
                display: 'inline-block',
                width: 'auto',
              }}
            >
              {getFieldDecorator('maxPerson', {
                initialValue: maxPerson,
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
              {getFieldDecorator('nearBy', {
                initialValue: nearBy,
                rules: [{ required: true, message: '주소를 검색해주세요!' }],
              })(
                <AutoAddressComplete
                  showLoading={false}
                  onSelect={(nearBy) => {
                    this.props.form.setFields({
                      nearBy: {
                        value: nearBy,
                      },
                    });
                  }}
                />
              )}
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                icon={loading ? 'loading' : ''}
                disabled={!loginUser.phone}
              >
                계속
              </Button>
            </FormItem>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default Form.create()(StepIndexForm);
