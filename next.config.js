const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');
const {
  ANALYZE,
} = process.env;

module.exports = {

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
      config.devtool = 'eval';
    }

    // disable soucemaps of babel-loader
    for (const r of config.module.rules) {
      if (r.loader === 'babel-loader') {
        r.options.sourceMaps = true;
      }
    }
    return config;
  },
};