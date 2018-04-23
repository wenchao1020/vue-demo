
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {       //  可配置多个代理， 执行npm run dev
		    index: {          // npm run dev -- index
				    '**/*.do': {
						    target: 'http://127.0.0.1:88/index/',
						    changeOrigin: true
				    },
				    '**/*.json': {
						    target: 'http://127.0.0.2:88/paas/',
						    changeOrigin: true
				    }
		    },
      paas: {
        '**/*.do': {
          target: 'http://183.3.205.120:88/oss-paas/',
          changeOrigin: true
        },
        '**/*.json': {
          target: 'http://183.3.205.120:88/oss-paas/',
          changeOrigin: true
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  entry: {
		  index: './src/js/index.js',
    paas: './src/js/paas.js'
  }
}
