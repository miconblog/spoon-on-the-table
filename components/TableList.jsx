import Link from 'next/link'
import { Card, Row, Col } from 'antd'

const EventCard = ({ show }) => {
  return (
    <Col key={show.id} span={8}>
      <Card
        style={{ width: 280, margin: '0 auto' }}
        cover={show.image ? <img src={show.image.medium} /> : false}
      >
        <Link as={`/tables/${show.id}`} href={`/post?id=${show.id}`}>
          <a>{show.name}</a>
        </Link>
      </Card>
    </Col>
  )
};

export default ({ rows }) => (
  <div id='table-list' className='intro'>
    <h2>예약가능한 테이블</h2>
    <div>
      {rows.map((cols, idx) => {
        return (
          <Row key={idx} type='flex' justify='space-between' gutter={16} style={{ marginBottom: '10px' }}>
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
  </div>
)
