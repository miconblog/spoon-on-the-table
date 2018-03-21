import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Layout, Row, Col } from 'antd';
import TableSpoonLogo from './TableSpoonLogo';
import PrefetchLink from './PrefetchLink';

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
        <TableSpoonLogo />
      </Col>
      <Col>
        <PrefetchLink href='/my-profile' as='/my/profile'>내정보</PrefetchLink>
        <PrefetchLink href='/my-inbox' as='/my/inbox'>메시지</PrefetchLink>
        <PrefetchLink href='/my-tables' as='/my/tables'>테이블관리</PrefetchLink>
        <PrefetchLink href='/my-guests' as='/my/guests'>예약관리</PrefetchLink>
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