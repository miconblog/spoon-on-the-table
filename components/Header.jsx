import Link from 'next/link'
import { Layout, Row, Col } from 'antd'

const { Header } = Layout;

export default () => (
  <Header>
    <Row type="flex" justify="space-between">
      <Col>
        <Link href="/"><h1>TableSpoon</h1></Link>
      </Col>
      <Col>
        <Link href="/"><a className="rm">도움말</a></Link>
        <Link href="/"><a className="rm">테이블 등록</a></Link>
        <Link href="/sign"><a>회원가입/로그인</a></Link>
      </Col>

      <style jsx>{`
      h1 {
        color: #fff;
        font-family: cursive;
        font-weight: bold;    
      }
      a { 
        color: #fff; 
        display:inline-block; 
        text-align:center; 
        
        &.rm {
          margin-right: 25px;
        }
      }
    `}</style>
    </Row>
  </Header>
)