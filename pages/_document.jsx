import stylesheet from 'antd/dist/antd.min.css';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <title>CodingNight 🤔</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='stylesheet' href='/antd/antd.min.css' />
        </Head>
        <style jsx global>{`
          #__next {
            height: 100%;

            > div { /** react-root, flex는 하위 페이지에서 결정 */
              width: 100%;
              height: 100%;
            }
          }

          /* antd override */
          .ant-form {
            min-width: 300px;
            max-width: 600px;

            &.login-form {
              max-width: 310px;
            }
  
            &.login-form-forgot {
              float: right;
            }

            .ant-input-affix-wrapper {
              font-size: 15px;
              height: 38px;
            }
          }

          .ant-btn.full-width-button {
            width: 100%;
            font-size: 15px;
            height: 38px;
          }

          /* global style */
          .dark {
            a, .logo-title {
              color: #fff; 
            }
          }
    
          .bright {
            a, .logo-title {
              color: #222;
            }
          }

          .logo-title {
            font-family: cursive;
            font-weight: bold;    
          }
    
          a { 
            display:inline-block; 
            text-align:center; 
            
            &.rm {
              margin-right: 25px;
            }
          }

        `}</style>

        <body className='coding-night'>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
