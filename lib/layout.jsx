import Header from '../components/Header'
import Head from 'next/head'
import stylesheet from 'antd/dist/antd.min.css'
import { Layout } from 'antd'
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
    <Layout>
      <Header />
      <Content style={{ padding: '10px 20px' }}>
        {props.children}
      </Content>
      <Footer>
        <div>
          <h3>SpoonTable</h3>
          <div>
            <a href="/terms">이용약관</a>
            <a href="/privacy">개인정보보호정책</a>
          </div>
        </div>
      </Footer>
    </Layout>
  </div>
)