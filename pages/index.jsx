import Layout from '../lib/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { Card, Button, Row, Col } from 'antd'

const EventCard = ({ show }) => (
  <Col key={show.id} span={8}>
    <Card
      style={{ width: 300, margin:'0 auto' }}
      cover={<img src={show.image.medium} />}
    >
      <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
        <a>{show.name}</a>
      </Link>
    </Card>
  </Col>
);

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <div>
      {props.rows.map( (cols, idx) => {

        return (
          <Row key={idx} type="flex" justify="space-between" gutter={16} style={{marginBottom:'10px'}}>
            {cols.map((data) => (<EventCard key={data.show.id} {...data} />))}
          </Row>
        )

      })}
    </div>

    <style jsx>{`
      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>

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
    rows.push(data.slice(i*size, (i+1)*size))
  }

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data,
    rows
  }
}

export default Index

