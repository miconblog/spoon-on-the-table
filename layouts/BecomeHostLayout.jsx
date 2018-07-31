import React from 'react';
import { withRouter } from 'next/router';
import { Layout, Row, Col, Icon, Progress } from 'antd';
import TableSpoonLogo from '../components/TableSpoonLogo';
import PrefetchLink from '../components/PrefetchLink';
import './BecomeHostLayout.less';

const { Header, Content } = Layout;
const BecomeHostLayout = ({ step, children }) => (
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
          <PrefetchLink href="/">
            <Icon type="close" /> 취소
          </PrefetchLink>
        </Col>
      </Row>
    </Header>
    <Progress percent={(step / 5) * 100} showInfo={false} />
    <Content className="container">{children}</Content>
  </Layout>
);

export default withRouter(BecomeHostLayout);
