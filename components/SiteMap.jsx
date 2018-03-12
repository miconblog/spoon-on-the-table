import Link from 'next/link'
import { Button, Row, Col } from 'antd'

export default () => (
  <Row id='site-map'>
    <Col span={8}>
      <h4>테이블스푼</h4>
      <ul>
        <li>채용정보</li>
        <li>미디어</li>
        <li>정책</li>
        <li>도움말</li>
      </ul>
    </Col>

    <Col span={8}>
      <h4>호스팅하기</h4>
      <ul>
        <li>호스팅의 장점</li>
        <li>호스팅 기준</li>
        <li>책임감 있는 호스트 되기</li>
        <li>커뮤니티센터</li>
      </ul>
    </Col>

    <Col span={8}>
      <h4>기타</h4>
      <ul>
        <li>이용약관</li>
        <li>개인정보 보호정책</li>
      </ul>
    </Col>

    <style jsx>{`
      h4 {
        font-weight: bold;
      }

      ul {
        list-style: none;
        padding: 0;
      }
    `}</style>
  </Row>
)
