import React from 'react';
import { withRouter } from 'next/router';
import { Layout, Row, Col, Icon, Progress } from 'antd';
import TableSpoonLogo from '../components/TableSpoonLogo';
import PrefetchLink from '../components/PrefetchLink';
import './BecomeHostLayout.less';

const { Header, Content } = Layout;
const Menus = [
  {
    href: '/host/tables',
    as: '/host/tables',
    title: '호스트',
    icon: 'solution',
  },
];

const BecomeHostLayout = ({ router, loginUser, step, children }) => (
  <Layout className="BecomeHostLayout responsive">
    <Header className="dark">
      <TableSpoonLogo />
      <Row
        className="nav"
        type="flex"
        justify="space-between"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <Col>
          {Menus.map(({ href, as, title, icon }) => {
            const style = {
              color: router.pathname === href ? 'red' : 'black',
            };

            return (
              <PrefetchLink key={title} style={style} href={href} as={as}>
                <Icon type={icon} /> {title}
              </PrefetchLink>
            );
          })}
        </Col>
      </Row>
    </Header>
    <Progress percent={(step / 5) * 100} showInfo={false} />
    <Content className="container">{children}</Content>
  </Layout>
);

export default withRouter(BecomeHostLayout);
