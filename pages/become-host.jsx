import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import Link from 'next/link';
import { HomeLayout } from '../layouts';
import { Button } from 'antd';
import Markdown from 'react-markdown';

const BecomeHost = ({ loginUser }) => {

  return (
    <HomeLayout>
      <h1>호스트가 되어 보세요!</h1>
      <div className='markdown'>
        <Markdown source={`

        호스트가 되면 어떤 이득이 있냐?
        이런저런 호스트에 대한 소개페이지...
        
     `} />

        {
          loginUser
            ? <Link href="/my/tables"><a className="ant-btn ant-btn-primary">테이블 시작하기</a></Link>
            : <Link href="/sign"><a className="ant-btn ant-btn-primary">가입하기</a></Link>
        }
      </div>
    </HomeLayout>
  );
};

BecomeHost.getInitialProps = async function ({ store }) {
  return {
    loginUser: store.getState().loginUser
  };
};

// High Ordered Componet 고차함수: (컴포넌트)=>랩핑컴포넌트
export default withRedux(initStore)(BecomeHost);
