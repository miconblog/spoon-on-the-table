import React from 'react';
import { Layout, Row, Col, Avatar } from 'antd';
import { MainFooter } from '../components';
import TableSpoonLogo from '../components/TableSpoonLogo';
import PrefetchLink from '../components/PrefetchLink';

const { Content, Header } = Layout;

const HomeLayout = ({ loginUser, children }) => (
  <Layout style={{ backgroundColor: '#fff' }}>
    <Header className="dark">
      <Row
        type="flex"
        justify="space-between"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <Col>
          <TableSpoonLogo />
        </Col>
        <Col>
          {!loginUser && <PrefetchLink href="/#about">소개</PrefetchLink>}
          {!loginUser && (
            <PrefetchLink href="/become-a-host">호스팅하기</PrefetchLink>
          )}
          {loginUser && (
            <PrefetchLink href="/users/edit">
              {loginUser.email} <Avatar src={loginUser.photo.image} />
            </PrefetchLink>
          )}
        </Col>
      </Row>
    </Header>
    <Content style={{ padding: '10px 20px', width: '900px', margin: '0 auto' }}>
      {children}
    </Content>
    <MainFooter
      style={{
        backgroundColor: '#fff',
        padding: '10px 20px',
        width: '900px',
        margin: '0 auto',
        borderTop: '1px solid #e8e8e8',
      }}
    />
  </Layout>
);

export default HomeLayout;
