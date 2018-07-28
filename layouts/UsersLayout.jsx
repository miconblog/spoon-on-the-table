import React from 'react';
import Link from 'next/link';
import { Row, Col, Layout, Icon, Menu } from 'antd';
import TableSpoonLogo from '../components/TableSpoonLogo';
import LoginUserAvatar from '../components/LoginUserAvatar';
import PrefetchLink from '../components/PrefetchLink';
import './UsersLayout.less';

const { Header } = Layout;

const UsersLayout = (props) => {
  const { loginUser, children, section } = props;

  return (
    <Layout className="UsersLayout">
      <Header className="header">
        <TableSpoonLogo />
        {loginUser && <LoginUserAvatar loginUser={loginUser} />}
      </Header>
      <Layout>
        <Row type="flex" justify="center" align="top">
          <Col span={24} md={4} lg={3}>
            <Menu selectedKeys={[section]} className="menu-list">
              <Menu.Item key="profile">
                <PrefetchLink href="/users/edit">
                  <Icon type="user" /> 프로필 수정
                </PrefetchLink>
              </Menu.Item>
              <Menu.Item key="media">
                <PrefetchLink
                  href="/users/edit?section=media"
                  as="/users/edit/media"
                >
                  <Icon type="picture" /> 사진
                </PrefetchLink>
              </Menu.Item>
              <Menu.Item key="verification">
                <PrefetchLink
                  prefetch
                  href="/users/edit?section=verification"
                  as="/users/edit/verification"
                >
                  <Icon type="key" /> 인증
                </PrefetchLink>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={24} md={14} lg={10}>
            {children}
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default UsersLayout;
