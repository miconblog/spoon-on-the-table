import React from 'react';
import Link from 'next/link';
import withRedux from '../redux/withRedux';
import { initStore } from '../redux/store';
import { MyPageLayout } from '../layouts';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Markdown from 'react-markdown';
import { Layout, Card, Icon, Divider, Menu, Row, Col } from 'antd';
import {
  InfoForm, PasswordForm,
  AddressForm, BankAccountForm, ConnectSNSForm,
  LanguageForm, IntroduceForm
} from '../components/MyProfile';

const { Content, Sider } = Layout;

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

    let component;
    switch (menu) {
      case 'password':
        component = PasswordForm;
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
      default:
        component = InfoForm;
    }

    return (
      <MyPageLayout>
        <SideMenu
          selectedKey={menu}
          onSelect={this.handleSelect}
        />
      </MyPageLayout>
    )
  }
};

export default withRedux(initStore)(MyProfile);
