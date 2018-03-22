import { MyHeader, MainFooter } from '../components';
import Head from 'next/head';
import { Layout, Divider } from 'antd';
const { Footer, Content } = Layout;

const MyPageLayout = ({ loginUser, children }) => (
  <Layout style={{ height: '100%' }}>
    <MyHeader loginUser={loginUser} />
    <div style={{ padding: '20px', width: '1000px', margin: '0 auto' }}>
      {children}
    </div>
  </Layout>
);

export default MyPageLayout;