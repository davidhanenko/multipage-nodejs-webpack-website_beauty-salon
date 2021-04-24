/* eslint-disable no-undef */

const { resolve, basename } = require('path')
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env')
})

module.exports = {
  entry: {
    index: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/index.js']
      : './client/js/index.js',
    service: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/service.js']
      : './client/js/service.js',
    gallery: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/gallery.js']
      : './client/js/gallery.js',
    about: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/about.js']
      : './client/js/about.js',
    admin: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/admin/admin.js']
      : './client/js/admin/admin.js',
    admin_login: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/admin/login.js']
      : './client/js/admin/login.js',
    admin_register: isDev
      ? [
          'webpack-hot-middleware/client?reload=true',
          './client/js/admin/register.js'
        ]
      : './client/js/admin/register.js',
    admin_service: isDev
      ? [
          'webpack-hot-middleware/client?reload=true',
          './client/js/admin/services.js'
        ]
      : './client/js/admin/services.js',
    admin_price: isDev
      ? [
          'webpack-hot-middleware/client?reload=true',
          './client/js/admin/prices.js'
        ]
      : './client/js/admin/prices.js',
    admin_contacts: isDev
      ? [
          'webpack-hot-middleware/client?reload=true',
          './client/js/admin/contacts.js'
        ]
      : './client/js/admin/contacts.js',
    admin_about: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/admin/about.js']
      : './client/js/admin/about.js',
    admin_gallery: isDev
      ? [
          'webpack-hot-middleware/client?reload=true',
          './client/js/admin/gallery.js'
        ]
      : './client/js/admin/gallery.js',
    admin_header: isDev
      ? [
          'webpack-hot-middleware/client?reload=true',
          './client/js/admin/header.js'
        ]
      : './client/js/admin/header.js',
    admin_popup: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/admin/popup.js']
      : './client/js/admin/popup.js',
    errors: isDev
      ? [
          'webpack-hot-middleware/client?reload=true',
          './client/js/errors/errors.js'
        ]
      : './client/js/errors/errors.js',
    404: isDev
      ? ['webpack-hot-middleware/client?reload=true', './client/js/errors/404.js']
      : './client/js/errors/404.js'
  },
  target: 'web',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|lib|libs/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src', ':data-background']
            }
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src', ':data-background']
            }
          },
          {
            loader: 'ejs-webpack-loader',
            options: {
              production: process.env.ENV === 'production'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts'
            }
          },
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:5].[ext]',
              limit: 1000,
              outputPath: 'imgs'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: process.env.NODE_ENV !== 'production',
              pngquant: {
                quality: [0.65, 0.9]
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/index.ejs',
      filename: 'views/index.ejs',
      chunks: isDev ? ['index'] : ['index', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/our_services/atms.ejs',
      filename: 'views/our_services/atms.ejs',
      chunks: isDev ? ['service'] : ['service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/our_services/microdermabrasion.ejs',
      filename: 'views/our_services/microdermabrasion.ejs',
      chunks: isDev ? ['service'] : ['service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/our_services/chemical-peel.ejs',
      filename: 'views/our_services/chemical-peel.ejs',
      chunks: isDev ? ['service'] : ['service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/our_services/permanent-makeup.ejs',
      filename: 'views/our_services/permanent-makeup.ejs',
      chunks: isDev ? ['service'] : ['service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/our_services/ipl-laser.ejs',
      filename: 'views/our_services/ipl-laser.ejs',
      chunks: isDev ? ['service'] : ['service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/our_services/multifunctional-facials.ejs',
      filename: 'views/our_services/multifunctional-facials.ejs',
      chunks: isDev ? ['service'] : ['service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/gallery.ejs',
      filename: 'views/gallery.ejs',
      chunks: isDev ? ['gallery'] : ['gallery', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/about.ejs',
      filename: 'views/about.ejs',
      chunks: isDev ? ['about'] : ['about', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/prices/price-new.ejs',
      filename: 'views/admin/prices/price-new.ejs',
      chunks: isDev ? ['admin_price'] : ['admin_price', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/admin/our_services/service-new.ejs',
      filename: 'views/admin/our_services/service-new.ejs',
      chunks: isDev
        ? ['admin_service']
        : ['admin_service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/admin.ejs',
      filename: 'views/admin/admin.ejs',
      chunks: isDev ? ['admin'] : ['admin', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/login/login.ejs',
      filename: 'views/admin/login/login.ejs',
      chunks: isDev ? ['admin_login'] : ['admin_login', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/login/register.ejs',
      filename: 'views/admin/login/register.ejs',
      chunks: isDev
        ? ['admin_register']
        : ['admin_register', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/popup/popup.ejs',
      filename: 'views/admin/popup/popup.ejs',
      chunks: isDev ? ['admin_popup'] : ['admin_popup', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/admin/popup/popup-message.ejs',
      filename: 'views/admin/popup/popup-message.ejs',
      chunks: isDev ? ['admin_popup'] : ['admin_popup', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/our_services/atms.ejs',
      filename: 'views/admin/our_services/atms.ejs',
      chunks: isDev
        ? ['admin_service']
        : ['admin_service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/admin/our_services/microdermabrasion.ejs',
      filename: 'views/admin/our_services/microdermabrasion.ejs',
      chunks: isDev
        ? ['admin_service']
        : ['admin_service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/admin/our_services/chemical-peel.ejs',
      filename: 'views/admin/our_services/chemical-peel.ejs',
      chunks: isDev
        ? ['admin_service']
        : ['admin_service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/admin/our_services/permanent-makeup.ejs',
      filename: 'views/admin/our_services/permanent-makeup.ejs',
      chunks: isDev
        ? ['admin_service']
        : ['admin_service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/admin/our_services/ipl-laser.ejs',
      filename: 'views/admin/our_services/ipl-laser.ejs',
      chunks: isDev
        ? ['admin_service']
        : ['admin_service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template:
        '!!ejs-webpack-loader!./client/views/admin/our_services/multifunctional-facials.ejs',
      filename: 'views/admin/our_services/multifunctional-facials.ejs',
      chunks: isDev
        ? ['admin_service']
        : ['admin_service', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/prices/prices.ejs',
      filename: 'views/admin/prices/prices.ejs',
      chunks: isDev ? ['admin_price'] : ['admin_price', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/contacts/contacts.ejs',
      filename: 'views/admin/contacts/contacts.ejs',
      chunks: isDev
        ? ['admin_contacts']
        : ['admin_contacts', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/gallery/gallery.ejs',
      filename: 'views/admin/gallery/gallery.ejs',
      chunks: isDev
        ? ['admin_gallery']
        : ['admin_gallery', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/about/about.ejs',
      filename: 'views/admin/about/about.ejs',
      chunks: isDev ? ['admin_about'] : ['admin_about', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/admin/partials/header.ejs',
      filename: 'views/admin/partials/header.ejs',
      chunks: isDev ? ['admin_about'] : ['admin_about', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/errors/404.ejs',
      filename: 'views/errors/404.ejs',
      chunks: isDev ? ['404'] : ['404', 'manifest', 'vendors']
    }),
    new HtmlWebPackPlugin({
      template: '!!ejs-webpack-loader!./client/views/errors/errors.ejs',
      filename: 'views/errors/errors.ejs',
      chunks: isDev ? ['errors'] : ['errors', 'manifest', 'vendors']
    }),

    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,
      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'index.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,
      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'about.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,
      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'atms.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,
      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'chemical-peel.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,
      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'permanent-makeup.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,

      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'mictodermabrasion.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,

      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'ipl-laser.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,

      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'multifunctional-facials.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './client/imgs/favicon.png',
      developerURL: null,

      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'gallery.ejs'
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    })
  ]
}
