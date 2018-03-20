import Link from 'next/link';
import { Layout, Row, Col } from 'antd';
const { Footer } = Layout;

const MainFooter = ({ style }) => (
  <Footer style={style}>
    <footer>
      <h3 style={style.h3}>TableSpoon</h3>
      <div>
        <p>
          대표 이메일 boss@tablespoon.com<br />
          테이블스푼 | 대표 임꺽정 xxx-xx-xxxxx | 업체주소 is here | 통신판매업 면허번호 is here | 대표전화 000-1111-1111
          </p>
      </div>
    </footer>
    <style jsx>{`
        footer {
          font-family: "Spoqa Han Sans,sans-serif";

          h3 {
            display: inline-block;
            font-family: cursive;
            font-size: 24px;
            font-weight: bold;
            color: #4a4a4a;
          }

          .terms {
            display: inline-block;

            a {
              margin-right: 10px;
              font-size: 12px;
              font-weight: bold;
              text-decoration: none;
              color: #c8c8c8;
              margin-left: 13px;
            }
          }

          p {
              font-size: 12px;
              font-weight: bold;
              color: #c8c8c8;
          }
        }
      `}</style>
  </Footer>
);

export default MainFooter;