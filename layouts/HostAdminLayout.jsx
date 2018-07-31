import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Layout, Menu, Icon, Row, Col, Switch } from 'antd';
import './HostAdminLayout.less';

const { Header, Sider, Content } = Layout;

class HostAdminLayout extends React.PureComponent {
  state = {
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
    if (!checked) {
      router.push('/users/edit');
    }
  };

  render() {
    const { children } = this.props;
    const { collapsed } = this.state;

    return (
      <Layout className="HostAdminLayout">
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
                <img
                  src="/assets/images/logo.png"
                  alt="logo"
                />
                <h1>TableSpoon</h1>
              </a>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="calendar" />
              <span>이벤트 관리</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>예약 관리</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="logout" />
              <span>로그아웃</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="HostAdminLayout" style={{ background: '#f0f2f5' }}>
          <Header className="Header">
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <Row className="nav" type="flex" justify="space-between">
              <Col>
                <Switch defaultChecked onChange={this.handleSwitchChanged} />
              </Col>
            </Row>
          </Header>
          <Content className="Content">{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(HostAdminLayout);
