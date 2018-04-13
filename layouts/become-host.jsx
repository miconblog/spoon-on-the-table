import { MyHeader, MainFooter } from '../components';
import Head from 'next/head';
import { Layout, Divider, Progress } from 'antd';
const { Footer, Sider, Content } = Layout;

const BecomeHostLayout = ({ loginUser, step, children }) => {

  return (
    <Layout className="become-a-host" style={{ backgroundColor: '#fff' }}>
      <MyHeader loginUser={loginUser} />
      <Progress percent={step/5 * 100} showInfo={false} />
      <Content style={{ padding: '10px 20px', width: '900px', margin: '0 auto' }}>
        {children}
      </Content>
      <MainFooter style={{ backgroundColor: '#fff', padding: '10px 20px', width: '900px', margin: '0 auto', borderTop: '1px solid #e8e8e8' }} />
    </Layout>
  )
};

export default BecomeHostLayout;