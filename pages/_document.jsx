import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks };
  }

  render() {
    return (
      <html>
        <Head>
          <title>CodingNight 🤔</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="stylesheet" href="/antd/antd.min.css" />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body className="coding-night">
          <Main id="test" />
          <NextScript />
        </body>
      </html>
    );
  }
}
