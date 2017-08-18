
var path = require('path');
var webpack = require('webpack');
var  HtmlWebpackPlugin = require('html-webpack-plugin');

const OUPUT_PATH = path.resolve(__dirname,'bin', 'Scripts');

module.exports = {
  entry: './src/app.jsx',
  output: { path: OUPUT_PATH, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
       { test: /\.css$/, loader: 
        "style-loader!css-loader" },
         {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Infra CNC View',
      filename: './../index.html',
      template: 'src/index.html'
    })
  ]
};
