const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

//const extractPlugin = new ExtractTextPlugin({
//  filename: 'main.css'
//});

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300
  },
  devtool: "inline-source-map",
  context: __dirname + '/src/routes',
  entry: {
      index: './index.js'
    },
  output: {
    path: __dirname + '/../public/js',
    filename: '[name].build.js'
  },
  devServer: {
    contentBase: __dirname + '/src/routes',
    compress: true,
    port: 3001,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules)/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader'
      }
    ]
  },
//  plugins: [
//    extractPlugin,
//    new webpack.HotModuleReplacementPlugin()
//  ]

};