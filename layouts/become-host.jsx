import { MyHeader, MainFooter } from '../components';
import Head from 'next/head';
import { Layout, Divider, Progress } from 'antd';
import Script from 'react-load-script';
import SimpleMap from '../components/BecomeHost/SimpleMap';

const { Footer, Sider, Content } = Layout;
const BecomeHostLayout = ({ loginUser, step, children }) => {
  const isGoogle = typeof google !== 'undefined';

  return (
    <Layout className="become-a-host responsive" style={{ backgroundColor: '#fff' }}>
      <MyHeader loginUser={loginUser} />
      <Progress percent={step / 5 * 100} showInfo={false} />
      <Content style={{ padding: '10px 20px', width: '900px', margin: '0 auto' }}>
        {children}
      </Content>
      <MainFooter style={{ backgroundColor: '#fff', padding: '10px 20px', width: '900px', margin: '0 auto', borderTop: '1px solid #e8e8e8' }} />
      {!isGoogle && <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvfz98iKE6C3TIDNBTphKG4ol5o-Mdzt4"
        onLoad={SimpleMap.onLoad}
      />}
    </Layout>
  );
};

export default BecomeHostLayout;