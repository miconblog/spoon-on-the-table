import { About, SiteMap } from '../components'
import Layout from '../layouts/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { Button, Divider } from 'antd'
import TableList from '../components/TableList'
import { initStore } from '../redux/store'
import withRedux from '../redux/withRedux'

const Index = (props) => (
  <Layout>

    <TableList {...props} />

    <Divider />

    <About />

    <Divider />

    <SiteMap />

  </Layout>
)

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  const size = 3;
  const rows = [];
  const MAX_ROWS = Math.ceil(data.length / size);
  let index = 0, resIndex = 0;

  for (let i = 0; i < MAX_ROWS; ++i) {
    rows.push(data.slice(i * size, (i + 1) * size))
  }

  return {
    rows
  }
}

// Redux 스토어를 Index.props에 주입한다.
export default withRedux(initStore)(Index)

