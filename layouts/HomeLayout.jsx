import React from 'react';
import { Layout, Row, Col, Avatar, Menu, Dropdown, Icon } from 'antd';
import HomeFooter from '../components/HomeFooter';
import TableSpoonLogo from '../components/TableSpoonLogo';
import PrefetchLink from '../components/PrefetchLink';
import './HomeLayout.less';

const { Content, Header } = Layout;

const HostMenus = (
  <Menu className="host-menu">
    <Menu.Item key="0">
      <PrefetchLink href="/become-a-host">테이블 이벤트 만들기</PrefetchLink>
    </Menu.Item>
    <Menu.Item key="1">
      <PrefetchLink href="/host/tables">테이블 이벤트 관리</PrefetchLink>
    </Menu.Item>
  </Menu>
);

const HomeLayout = ({ loginUser, children }) => {
  return (
    <Layout className="HomeLayout">
      <Header className="header">
        <TableSpoonLogo />
        <Row className="nav" type="flex" justify="space-between">
          {!loginUser && (
            <Col>
              <PrefetchLink href="/#about">소개</PrefetchLink>
            </Col>
          )}
          <Dropdown
            trigger={['click']}
            overlay={HostMenus}
            placement="bottomRight"
          >
            <Col className="item dropdown">
              <span className="ant-dropdown-link">
                호스트 <Icon type="down" />
              </span>
            </Col>
          </Dropdown>
          <Col>
            {loginUser ? (
              <PrefetchLink href="/users/edit">
                <Avatar src={loginUser.photo.image} />
              </PrefetchLink>
            ) : (
              <PrefetchLink href="/sign">가입/로그인</PrefetchLink>
            )}
          </Col>
        </Row>
      </Header>
      <Content>{children}</Content>
      <HomeFooter
        style={{
          backgroundColor: '#fff',
          borderTop: '1px solid #e8e8e8',
        }}
      />
    </Layout>
  );
};

export default HomeLayout;
