import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Row, Col, Layout, Icon, Menu, Switch } from 'antd';
import PrefetchLink from '../components/PrefetchLink';
import { logoutUser } from '../utils/api';
import './UsersLayout.less';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

class UsersLayout extends React.PureComponent {
  state = {
    current: '',
    collapsed: false,
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  handleSwitchChanged = (checked) => {
    const { router } = this.props;
    if (checked) {
      router.push('/host/tables');
    }
  };

  handleClick = (e) => {
    if (e.key === 'logout') {
      return logoutUser().then(() => {
        window.location.href = '/';
      });
    }

    return this.setState({
      current: e.key,
    });
  };

  render() {
    const {
      children,
      router: { pathname },
      section,
    } = this.props;
    const { collapsed } = this.state;

    return (
      <Layout className="UsersLayout">
        <Sider
          className="Sider"
          trigger={null}
          width={256}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">
            <Link href="/">
              <a href="/">
                <img src="/assets/images/logo2.png" alt="logo" />
                <h1>TableSpoon</h1>
              </a>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            openKeys={[pathname]}
            selectedKeys={[section]}
            onClick={this.handleClick}
          >
            <SubMenu
              key="/users/edit"
              title={
                <span>
                  <Icon type="user" />
                  <span>프로필</span>
                </span>
              }
            >
              <Menu.Item key="profile">
                <PrefetchLink href="/users/edit">정보 수정</PrefetchLink>
              </Menu.Item>
              <Menu.Item key="media">
                <PrefetchLink
                  href="/users/edit?section=media"
                  as="/users/edit/media"
                >
                  사진
                </PrefetchLink>
              </Menu.Item>
              <Menu.Item key="verification">
                <PrefetchLink
                  href="/users/edit?section=verification"
                  as="/users/edit/verification"
                >
                  인증
                </PrefetchLink>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="2">
              <Icon type="calendar" />
              <span>내 예약 관리</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="mail" />
              <span>메시지</span>
            </Menu.Item>
            <Menu.Item key="logout">
              <Icon type="logout" />
              <span>로그아웃</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="Header">
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <Row className="nav" type="flex" justify="space-between">
              <Col className="">
                <Switch onChange={this.handleSwitchChanged} />
              </Col>
            </Row>
          </Header>
          <Layout>
            <Row type="flex" justify="center" align="top">
              {children}
            </Row>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(UsersLayout);
