// vue.config.js
// const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new VuetifyLoaderPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
};
