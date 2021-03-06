import React from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Avatar, Menu, Dropdown, Icon, Badge } from 'antd';
import HomeFooter from '../components/HomeFooter';
import TableSpoonLogo from '../components/TableSpoonLogo';
import PrefetchLink from '../components/PrefetchLink';
import './HomeLayout.less';

const { Content, Header } = Layout;

const HostMenus = (
  <Menu className="host-menu">
    <Menu.Item key="0">
      <PrefetchLink href="/become-a-host">새로운 이벤트 만들기</PrefetchLink>
    </Menu.Item>
    <Menu.Item key="1">
      <PrefetchLink href="/host/tables">예약 관리하기</PrefetchLink>
    </Menu.Item>
  </Menu>
);

const HomeLayout = ({
  loginUser,
  children,
  hideIntro = false,
  sticky = false,
}) => {
  const isShowIntro = !loginUser && !hideIntro;
  const headerClass = sticky ? 'header sticky' : 'header';

  return (
    <Layout className="HomeLayout">
      <Header className={headerClass}>
        <TableSpoonLogo />
        <Row className="nav" type="flex" justify="space-between">
          {isShowIntro && (
            <Col>
              <a href="/#about">소개</a>
            </Col>
          )}
          {loginUser && (
            <Dropdown
              trigger={['click']}
              overlay={HostMenus}
              placement="bottomRight"
            >
              <Col className="item dropdown">
                <span className="ant-dropdown-link">
                  <Badge status="processing" /> 호스트
                </span>
              </Col>
            </Dropdown>
          )}
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
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <HomeFooter
        style={{
          backgroundColor: '#fff',
          borderTop: '1px solid #e8e8e8',
        }}
      />
    </Layout>
  );
};

function mapStateToProps (state) {
  const { showMarkerMap } = state;
  return { sticky: showMarkerMap };
}

export default connect(mapStateToProps)(HomeLayout);
