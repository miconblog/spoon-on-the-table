import { connect } from 'react-redux'
import Link from 'next/link'
import { Layout, Row, Col } from 'antd'

const { Header } = Layout;

const HeaderWithRedux = ({ loginUser }) => (
  <Header>
    <Row type="flex" justify="space-between" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Col>
        <Link prefetch href="/"><a><h1>TableSpoon</h1></a></Link>
      </Col>
      <Col>
        <Link href="/#about"><a className="rm">소개</a></Link>
        <Link href="/"><a className="rm">지도에서 찾기</a></Link>
        <Link href="/"><a className="rm">호스트 되기</a></Link>

        {loginUser ? <Link href="/logout"><a>{loginUser.email}</a></Link> : <Link href="/sign"><a>회원가입/로그인</a></Link>}
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

export default connect((state)=>{
  return {
    loginUser: state.loginUser
  }
})(HeaderWithRedux)