import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Layout, Avatar, Row, Col } from 'antd';
import TableSpoonLogo from './TableSpoonLogo';
import PrefetchLink from './PrefetchLink';

const { Header } = Layout;

const HeaderWithRedux = ({ loginUser }) => (
  <Header className="dark">
    <Row type='flex' justify='space-between' style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Col>
        <TableSpoonLogo />
      </Col>
      <Col>
        <PrefetchLink href='/#about'>소개</PrefetchLink>
        <PrefetchLink href='/become-a-host'>호스팅하기</PrefetchLink>
        {loginUser
          ? <PrefetchLink href='/my-profile' as='/my/profile'>{loginUser.email}</PrefetchLink>
          : <PrefetchLink href='/sign'>회원가입/로그인</PrefetchLink>
        }
        {
          loginUser
            ? <Avatar
              src={loginUser.photo.image} />
            : false
        }
      </Col>
    </Row>
  </Header>
);

export default connect((state) => {
  return {
    loginUser: state.loginUser
  };
})(HeaderWithRedux);
