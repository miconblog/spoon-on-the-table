const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;
const withLess = require('@zeit/next-less')

/**
 * 클래스 스타일을 만들어 컴포넌트에 삽입하는 CSS 모듈 옵션을 ON 하려면 아래 속성을 추가해야한다. 
 * {
 *   cssModules: true,
 *   cssLoaderOptions: {
 *      importLoaders: 1,
 *      localIdentName: "[local]___[hash:base64:5]",
 *    }
 * }
 */
module.exports = withLess({
  distDir: 'build', // default .next
  useFileSystemPublicRoutes: true, // default true
  onDemandEntries: {
    // 개발모드에서 페이지 랜더링 비용이 좀 비싸므로 매번 빌드하지 않고, 메모리에 일정기간 유지한다.
    maxInactiveAge: 1000 * 60 * 60 * 24,
    pagesBufferLength: 2,
  },
  webpack(config, { dev }) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
      }));
    }

    if (dev) {
      config.devtool = 'source-map';
    }

    // disable soucemaps of babel-loader
    for (const r of config.module.rules) {
      if (r.loader === 'babel-loader') {
        r.options.sourceMaps = true;
      }
    }
    return config;
  },
});