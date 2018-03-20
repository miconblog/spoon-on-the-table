import { MyHeader, MainFooter } from '../components';
import Head from 'next/head';
import { Layout, Divider } from 'antd';
const { Footer, Content } = Layout;

const MyPageLayout = ({ loginUser, children }) => (
  <div>
    <Layout>
      <MyHeader loginUser={loginUser} />
      <Layout>
        <Content style={{ padding: '10px 20px', width: '1000px', margin: '0 auto' }}>
          {children}
        </Content>
      </Layout>
      {/* <MainFooter style={{ backgroundColor: '#000', color: '#000', padding: '20px', h3: { color: '#fff' } }} /> */}
    </Layout>
  </div>
);

export default MyPageLayout;