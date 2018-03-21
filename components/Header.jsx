import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Layout, Avatar, Row, Col } from 'antd';
import TableSpoonLogo from './TableSpoonLogo';

const { Header } = Layout;

const HeaderWithRedux = ({ loginUser }) => (
  <Header>
    <Row type='flex' justify='space-between' style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Col>
        <TableSpoonLogo />
      </Col>
      <Col>
        <Link prefetch href='/#about'><a className='rm'>소개</a></Link>
        <a className='rm'
          onMouseEnter={() => {
            Router.prefetch('/become-host');
            console.log('prefetching /become-host!');
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            Router.push('/become-host');
          }}
        >호스팅하기</a>
        {loginUser
          ? <Link prefetch href='/my/profile'><a className="rm">{loginUser.email}</a></Link>
          : <Link prefetch href='/sign'><a>회원가입/로그인</a></Link>
        }
        {
          loginUser
            ? <Avatar
              src={loginUser.profileImage} />
            : false
        }
      </Col>

      <style jsx>{`
      h1 {
        color: #fff;
        font-family: cursive;
        font-weight: bold;    
      }
      a { 
        color: #fff; 
        display:inline-block; 
        text-align:center; 
        
        &.rm {
          margin-right: 25px;
        }
      }
    `}</style>
    </Row>
  </Header>
);

export default connect((state) => {
  return {
    loginUser: state.loginUser
  };
})(HeaderWithRedux);
