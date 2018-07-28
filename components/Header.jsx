import React from 'react';
import { connect } from 'react-redux';
import { Layout, Avatar, Row, Col } from 'antd';
import TableSpoonLogo from './TableSpoonLogo';
import PrefetchLink from './PrefetchLink';

const { Header } = Layout;

const HeaderWithRedux = ({ loginUser }) => (
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
);

export default connect(state => ({
  loginUser: state.loginUser,
}))(HeaderWithRedux);
