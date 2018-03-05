import Header from '../components/Header'
import Head from 'next/head'
import stylesheet from 'antd/dist/antd.min.css'
import { Layout, Divider } from 'antd'
const { Footer, Sider, Content } = Layout;

export const HtmlHead = () => (
  <Head>
    <title>This page has a title 🤔</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </Head>
)

export default (props) => (
  <div>
    <HtmlHead />
    <Layout style={{backgroundColor:'#fff'}}>
      <Header />
      <Content style={{ padding: '10px 20px', width: '900px', margin: '0 auto' }}>
        {props.children}
      </Content>
      <Footer style={{ backgroundColor:'#fff', padding: '10px 20px', width: '900px', margin: '0 auto' }}>
        <footer>
          <h3>TableSpoon</h3>
          <div>
            <p>
              대표 이메일 boss@tablespoon.com<br />
              테이블스푼 | 대표 임꺽정 xxx-xx-xxxxx | 업체주소 is here | 통신판매업 면허번호 is here | 대표전화 000-1111-1111
            </p>
          </div>
        </footer>
      </Footer>

      <style jsx>{`
        footer {
          padding: 20px 0;
          border-top: 1px solid #e8e8e8;
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
    </Layout>
  </div>
)