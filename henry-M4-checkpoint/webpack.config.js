const path = require('path');

module.exports = {
  devtool: 'sourcemaps',
  entry: './react/main.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
      }
    ]
  }
};