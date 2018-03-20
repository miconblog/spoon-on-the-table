import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { HomeLayout } from '../layouts';
import Markdown from 'react-markdown';

const Map = (props) => (
  <HomeLayout>
    <h1>지도에서 찾기</h1>
    <div className='markdown'>
      <Markdown source={`
      여기에 지도 삽입
     `} />
    </div>
  </HomeLayout>
);

Map.getInitialProps = async function ({ query, req, store }) {
  // SSR 에서만 동작
  if (req && req.user) {
    store.dispatch({ type: 'EXIST_SESSION_USER', payload: { loginUser: req.user.toJSON() } });
  }

  return {};
};

export default withRedux(initStore)(Map);
