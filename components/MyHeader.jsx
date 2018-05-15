import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import Router from 'next/router';
import Link from 'next/link';
import { Layout, Row, Col, Icon } from 'antd';
import TableSpoonLogo from './TableSpoonLogo';
import PrefetchLink from './PrefetchLink';

const { Header } = Layout;
const HeadStyle = {
  backgroundColor: '#fff',
  borderBottom: '1px solid #d4dadf',
  boxShadow: '0 1px 1px 0 rgba(116, 129, 141, 0.1)'
};

const Menus = [
  { href: '/become-a-host', title: '테이블 추가', icon:'plus' },
  { href: '/my-tables', as: '/my/tables', title: '호스트', icon:'solution' },
  { href: '/my-profile', as: '/my/profile', title: '내정보', icon:'user' },
  // { href: '/my-inbox', as: '/my/inbox', title: '메시지' },
  // { href: '/my-guests', as: '/my/guests', title: '예약관리' },
];

const MyHeaderWithRedux = ({ router }) => {
  return (
    <Header className="bright header" style={HeadStyle}>
      <Row type='flex' justify='space-between'>
        <Col>
          <TableSpoonLogo />
        </Col>
        <Col>
          {Menus.map(({ href, as, title, icon }) => {
            const style = {
              color: router.pathname === href ? 'red' : 'black'
            }

            return (
              <PrefetchLink key={title} style={style} href={href} as={as}>
                <Icon type={icon}/> {title}
              </PrefetchLink>
            )
          })}
        </Col>
      </Row>
    </Header>
  );
};

export default withRouter(connect((state) => {
  return {
    loginUser: state.loginUser
  };
})(MyHeaderWithRedux));
