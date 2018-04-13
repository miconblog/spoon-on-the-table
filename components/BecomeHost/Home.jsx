import Link from 'next/link';
import Markdown from 'react-markdown';

export default () => (
  <React.Fragment>
    <h1>호스트가 되어 보세요!</h1>
    <div className='markdown'>
      <Markdown source={`

      호스트가 되면 어떤 이득이 있냐?
      이런저런 호스트에 대한 소개페이지...
      
    `} />
      <Link href="/sign"><a className="ant-btn ant-btn-primary">가입하기</a></Link>
    </div>
  </React.Fragment>
)