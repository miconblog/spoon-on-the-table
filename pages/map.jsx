import { initStore } from '../redux/store'
import withRedux from '../redux/withRedux'
import Layout from '../layouts/Layout'
import Markdown from 'react-markdown'

const Map = (props) => (
  <Layout>
    <h1>지도에서 찾기</h1>
    <div className='markdown'>
      <Markdown source={`
      여기에 지도 삽입
     `} />
    </div>
  </Layout>
)

Map.getInitialProps = async function ({ query, req, store }) {
  // SSR 에서만 동작
  if (req && req.user) {
    store.dispatch({ type: 'EXIST_SESSION_USER', payload: { loginUser: req.user.toJSON() } })
  }

  return { }
}

export default withRedux(initStore)(Map)
