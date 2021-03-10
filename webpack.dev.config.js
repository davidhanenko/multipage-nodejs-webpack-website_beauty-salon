/* eslint-disable no-undef */
const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')


const webpackBaseConfig = require('./webpack.base.config')

module.exports = merge(webpackBaseConfig, {
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/public/',
    filename: 'js/[name].[hash].js'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})