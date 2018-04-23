var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  cache: true,
  entry: config.entry,
  output: {
    path: resolve('./dist/'),
    filename: 'js/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'echarts': resolve('static/lib/echarts/echarts.min.js'),
      'slider': resolve('static/lib/jquery.SuperSlide.2.1.1.js')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js',
      minChunks: 2
    }),
    new ExtractTextPlugin("css/[name].[contenthash:8].css"),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      layer: 'layui-layer'
    }),
		  new HtmlWebpackPlugin({    // 创建入口html
				  title: 'xx服务首页',
				  favicon: './favicon.ico',
				  filename: 'index.html',
				  template: 'src/ejs/index.ejs',
				  inject: true,
				  chunks: ["manifest", "vendor", "common", 'index'],
				  chunksSortMode: 'dependency'
		  }),
    new HtmlWebpackPlugin({    // 创建入口html
      title: 'xx服务',
      favicon: './favicon.ico',
      filename: 'paas.html',
      template: 'src/ejs/index.ejs',
      inject: true,
      chunks: ["manifest", "vendor", "common", 'paas'],
      chunksSortMode: 'dependency'
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../public/vendor-mainfest.json') // 指向这个json
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: ['babel-loader?cacheDirectory=true'],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        include: [resolve('src')],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        include: [resolve('src')],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            }, {
              loader: "less-loader"
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: '../'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          publicPath: '../'
        }
      }
    ]
  }
}
