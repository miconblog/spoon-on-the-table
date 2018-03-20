import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { MyPageLayout } from '../layouts';
import Markdown from 'react-markdown';
import { Card, Divider } from 'antd';

const MyGuests = ({loginUser}) => (
  <MyPageLayout>
    <h1>예약 관리</h1>

    <div className='markdown'>
      <Markdown source={`
        
     `} />
    </div>
  </MyPageLayout>
);

MyGuests.getInitialProps = async function ({ query, req, loginUser }) {
  return {
    loginUser
  };
};

export default withRedux(initStore)(MyGuests);
