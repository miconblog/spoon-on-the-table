import { Header, MainFooter } from '../components';
import Head from 'next/head';
import { Layout, Divider } from 'antd';
const { Footer, Sider, Content } = Layout;

const HomeLayout = ({ loginUser, children }) => (
  <div>
    <Layout style={{ backgroundColor: '#fff' }}>
      <Header loginUser={loginUser} />
      <Content style={{ padding: '10px 20px', width: '900px', margin: '0 auto' }}>
        {children}
      </Content>
      <MainFooter style={{ backgroundColor: '#fff', padding: '10px 20px', width: '900px', margin: '0 auto', borderTop: '1px solid #e8e8e8' }} />
    </Layout>
  </div>
);

export default HomeLayout;