import React from 'react';
import { Layout, Row, Col, Avatar } from 'antd';
import HomeFooter from '../components/HomeFooter';
import TableSpoonLogo from '../components/TableSpoonLogo';
import PrefetchLink from '../components/PrefetchLink';
import './HomeLayout.less';

const { Content, Header } = Layout;

const HomeLayout = ({ loginUser, children }) => {
  console.log('HomeLayout', loginUser);
  return (
    <Layout className="HomeLayout">
      <Header className="header">
        <TableSpoonLogo />
        <Row className="nav" type="flex" justify="space-between">
          <Col>
            {!loginUser && <PrefetchLink href="/#about">소개</PrefetchLink>}
          </Col>
          <Col>
            <PrefetchLink href="/become-a-host">호스팅하기</PrefetchLink>
          </Col>
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
