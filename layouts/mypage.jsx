import { MyHeader, MainFooter } from '../components';
import Head from 'next/head';
import { Layout, Divider, Row } from 'antd';
import './mypage.less';

const { Footer, Content } = Layout;

const MyPageLayout = ({ loginUser, children }) => (
  <div className="mypage-layout">
    <MyHeader loginUser={loginUser} />
    <Row className="container">
      {children}
    </Row>
  </div>
);

MyPageLayout.getInitialProps = async function ({ query, req, store }) {
  
  console.log('MyPageLayout', query );

  return {
    loginUser: store.getState().loginUser
  };
};

export default MyPageLayout;

// width: '1000px', margin: '0 auto', backgroundColor:'#f0f2f5'