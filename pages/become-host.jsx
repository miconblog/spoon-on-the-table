import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import Link from 'next/link';
import Layout from '../layouts/Layout';
import { Button } from 'antd';
import Markdown from 'react-markdown';

const BecomeHost = ({ loginUser }) => {

  return (
    <Layout>
      <h1>호스트가 되어 보세요!</h1>
      <div className='markdown'>
        <Markdown source={`

        호스트가 되면 어떤 이득이 있냐?
        이런저런 호스트에 대한 소개페이지...
        
     `} />

        {
          loginUser 
          ? <Link href="/dashboard/my-tables"><a className="ant-btn ant-btn-primary">테이블 시작하기</a></Link>
          : <Link href="/sign"><a className="ant-btn ant-btn-primary">가입하기</a></Link>
        }
      </div>
    </Layout>
  );
};

BecomeHost.getInitialProps = async function ({ loginUser }) {
  return {
    loginUser
  };
};

export default withRedux(initStore)(BecomeHost);
