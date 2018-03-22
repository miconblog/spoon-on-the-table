import React from 'react';
import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { MyPageLayout } from '../layouts';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Markdown from 'react-markdown';
import { Layout, Card, Icon, Divider, Menu, Row, Col } from 'antd';
import { 
  InfoForm, PasswordForm, PhotoForm, 
  AddressForm, BankAccountForm, ConnectSNSForm, 
  LanguageForm, IntroduceForm 
} from '../components/MyProfile';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class MyProfile extends React.Component {

  static getInitialProps = async ({ query, isServer, req, store, pathname, asPath }) => {
    let { menu = 'info' } = query;

    // 여기서 반환한 것은 컴포넌트의 props에 꼽혀야된다.
    return {
      menu,
      loginUser: store.getState().loginUser
    };
  }

  handleSelect = (e) => {
    this.setState({ menu: e.key });
    Router.push(`/my-profile?menu=${e.key}`, `/my/profile?menu=${e.key}`);
  }

  render() {
    const { menu } = this.props;

    let component = InfoForm;
    switch (menu) {
      case 'password':
        component = PasswordForm;
        break;
      case 'photo':
        component = PhotoForm;
        break;
      case 'address':
        component = AddressForm;
        break;
      case 'bank':
        component = BankAccountForm;
        break;
      case 'sns':
        component = ConnectSNSForm;
        break;
      case 'language':
        component = LanguageForm;
        break;
      case 'about':
        component = IntroduceForm;
        break;    
    }

    return (
      <MyPageLayout>
        <Row type="flex">
          <Col style={{ backgroundColor: 'transparent', width: '200px' }}>
            <Menu
              mode="inline"
              selectedKeys={[menu]}
              style={{ backgroundColor: 'transparent' }}
              onSelect={this.handleSelect}
            >
              <Menu.Item key="info">
                <Icon type="user" />
                <span>개인정보</span>
              </Menu.Item>
              <Menu.Item key="password">
                <Icon type="lock" />
                <span>비밀번호 변경</span>
              </Menu.Item>
              <Menu.Item key="photo">
                <Icon type="picture" />
                <span>대표 사진</span>
              </Menu.Item>
              <Menu.Item key="address">
                <Icon type="environment-o" />
                <span>주소</span>
              </Menu.Item>
              <Menu.Item key="bank">
                <Icon type="bank" />
                <span>계좌 연결</span>
              </Menu.Item>
              <Menu.Item key="sns">
                <Icon type="cloud-o" />
                <span>소셜 연동</span>
              </Menu.Item>
              <Menu.Item key="language">
                <Icon type="global" />
                <span>사용 언어</span>
              </Menu.Item>
              <Menu.Item key="about">
                <Icon type="form" />
                <span>자기 소개</span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={10}>
            {React.createElement(component, this.props)}
          </Col>
        </Row>
      </MyPageLayout>
    )
  }
};

export default withRedux(initStore)(MyProfile);
