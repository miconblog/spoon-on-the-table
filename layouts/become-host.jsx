import { MyHeader, MainFooter } from '../components';
import Head from 'next/head';
import { Layout, Divider, Progress, Row } from 'antd';
const { Footer, Sider, Content } = Layout;

const BecomeHostLayout = ({ loginUser, step, children }) => {

  return (
    <Layout className="become-a-host responsive" style={{ backgroundColor: '#fff' }}>
      <MyHeader loginUser={loginUser} />
      <Progress percent={step / 5 * 100} showInfo={false} />
      <Row className="container">
        {children}
      </Row>
    </Layout>
  )
};

export default BecomeHostLayout;