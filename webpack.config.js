
var path = require('path');
var webpack = require('webpack');
var  HtmlWebpackPlugin = require('html-webpack-plugin');

const BIN_PATH = path.resolve(__dirname,'bin');

module.exports = {
  entry: './src/app.tsx',
  output: { path: BIN_PATH, filename: 'Scripts/bundle.js' },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
         { test: /\.css$/, loader: 
        "style-loader!css-loader" },
         {
        test: /\.html$/,
        loader: 'html-loader'
      },
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Infra CNC View',
      filename: './index.html',
      template: 'src/index.html'
    })
  ]
};
