
var path = require('path');
var webpack = require('webpack');
 

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
      }
    ]
  },
};
