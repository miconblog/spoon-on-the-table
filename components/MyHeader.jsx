import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Layout, Row, Col } from 'antd';

const { Header } = Layout;
const HeadStyle = {
  backgroundColor: '#fff',
  borderBottom: '1px solid #d4dadf',
  boxShadow: '0 1px 1px 0 rgba(116, 129, 141, 0.1)'
};

const MyHeaderWithRedux = ({ loginUser }) => (
  <Header style={HeadStyle}>
    <Row type='flex' justify='space-between'>
      <Col>
        <Link prefetch href='/'><a><h1>TableSpoon</h1></a></Link>
      </Col>
      <Col>
        <Link href='/my/profile'>
          <a className='rm'
            onMouseEnter={() => {
              Router.prefetch('/my-profile');
              console.log('prefetching /my-profile!');
            }}
          >내정보</a>
        </Link>
        <Link href='/my/inbox'>
          <a className='rm'
            onMouseEnter={() => {
              Router.prefetch('/my-inbox');
              console.log('prefetching /my-inbox!');
            }}
          >메시지</a>
        </Link>
        <Link href='/my/tables'>
          <a className='rm'
            onMouseEnter={() => {
              Router.prefetch('/my-tables');
              console.log('prefetching /my-tables!');
            }}
          >테이블관리</a></Link>
        <Link href='/my/guests'>
          <a className='rm'
            onMouseEnter={() => {
              Router.prefetch('/my-guests');
              console.log('prefetching /my-guests!');
            }}
          >예약관리</a></Link>
        <Link href='/logout'><a className='rm'>로그아웃</a></Link>
      </Col>
    </Row>

    <style jsx global>{`
      h1 {
        font-family: cursive;
        font-weight: bold;    
      }
      a { 
        display:inline-block; 
        text-align:center; 
        
        &.rm {
          margin-right: 25px;
        }
      }
    `}</style>
  </Header>
);

export default connect((state) => {
  return {
    loginUser: state.loginUser
  };
})(MyHeaderWithRedux);