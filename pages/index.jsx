import { About, SiteMap } from '../components'
import Layout from '../lib/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { Button, Divider } from 'antd'
import TableList from '../components/TableList';

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
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  const size = 3;
  const rows = [];
  const MAX_ROWS = Math.ceil(data.length / size);
  let index = 0, resIndex = 0;

  for (let i = 0; i < MAX_ROWS; ++i) {
    rows.push(data.slice(i * size, (i + 1) * size))
  }

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data,
    rows
  }
}

export default Index

