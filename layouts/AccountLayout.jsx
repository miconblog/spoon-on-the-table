import React from 'react';
import { withRouter } from 'next/router';
import { Layout } from 'antd';
import './AccountLayout.less';

const { Header, Content } = Layout;

const AccountLayout = ({ children }) => (
  <Layout className="AccountLayout" style={{ backgroundColor: '#fff' }}>
    {children}
  </Layout>
);

export default withRouter(AccountLayout);
