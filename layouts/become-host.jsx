import { MyHeader } from '../components';
import Head from 'next/head';
import { Layout, Divider, Progress } from 'antd';
import Script from 'react-load-script';
import SimpleMap from '../components/BecomeHost/SimpleMap';

const { Footer, Sider, Content } = Layout;
const BecomeHostLayout = ({ loginUser, step, children }) => {
  return (
    <Layout className="become-a-host responsive" style={{ backgroundColor: '#fff' }}>
      <MyHeader loginUser={loginUser} />
      <Progress percent={step / 5 * 100} showInfo={false} />
      <Content className="container">
        {children}
      </Content>
    </Layout>
  );
};

export default BecomeHostLayout;