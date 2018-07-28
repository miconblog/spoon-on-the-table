import React from 'react';
import { Layout, Progress } from 'antd';
import { MyHeader } from '../components';

const { Content } = Layout;

const BecomeHostLayout = ({ loginUser, step, children }) => (
  <Layout className="BecomeHostLayout responsive" style={{ backgroundColor: '#fff' }}>
    <MyHeader loginUser={loginUser} />
    <Progress percent={step / 5 * 100} showInfo={false} />
    <Content className="container">
      {children}
    </Content>
  </Layout>
);

export default BecomeHostLayout;
