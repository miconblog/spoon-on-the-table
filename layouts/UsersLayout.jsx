import React from 'react';
import Link from 'next/link';
import { Row, Col, Layout, Icon, Menu } from 'antd';
import TableSpoonLogo from '../components/TableSpoonLogo';
import { logoutUser } from '../utils/api';
import LoginUserAvatar from '../components/LoginUserAvatar';

const { Header } = Layout;
const HeadStyle = {
  backgroundColor: '#fff',
  borderBottom: '1px solid #d4dadf',
  boxShadow: '0 1px 1px 0 rgba(116, 129, 141, 0.1)',
};

function logout({ domEvent }) {
  domEvent.preventDefault();
  domEvent.stopPropagation();

  logoutUser().then(() => {
    window.location.replace('/');
  });
}

const UsersLayout = (props) => {
  const { loginUser, children, section } = props;

  console.log('UsersLayout', props);

  return (
    <Layout className="mypage-layout">
      <Header className="bright header" style={HeadStyle}>
        <TableSpoonLogo />

        {loginUser && <LoginUserAvatar loginUser={loginUser} />}
      </Header>
      <Layout>
        <Row type="flex" justify="center" align="top">
          <Col span={4}>
            <Menu selectedKeys={[section]}>
              <Menu.Item key="profile">
                <Link prefetch href={`/users/edit/${loginUser.id}`}>
                  <a href={`/users/edit/${loginUser.id}`}>
                    <Icon type="user" /> 프로필 수정
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="media">
                <Link
                  prefetch
                  href={`/users/edit/${loginUser.id}?section=media`}
                >
                  <a href={`/users/edit/${loginUser.id}?section=media`}>
                    <Icon type="picture" /> 사진
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="verification">
                <Link
                  prefetch
                  href={`/users/edit_verification/${loginUser.id}`}
                >
                  <a href={`/users/edit_verification/${loginUser.id}`}>
                    <Icon type="key" /> 인증
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={logout}>
                <Icon type="logout" />
                <span>로그아웃</span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={9}>{children}</Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default UsersLayout;
