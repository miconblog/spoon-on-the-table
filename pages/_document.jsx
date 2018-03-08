import stylesheet from 'antd/dist/antd.min.css'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <title>CodingNight 🤔</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <style jsx global>{`
          #__next {
            height: 100%;

            > div {
              height: 100%;
              display: flex;
            }
          }

          .login-form {
            max-width: 310px;
          }

          .login-form-forgot {
            float: right;
          }

          .full-width-button {
            width: 100%;
            font-size: 15px;
            height: 38px;
          }

          .ant-input-affix-wrapper {
            font-size: 15px;
            height: 38px;
          }

        `}</style>

        <body className="coding-night">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}