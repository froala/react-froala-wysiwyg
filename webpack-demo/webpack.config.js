var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  resolve: {
    modulesDirectories: ['../node_modules', '../bower_components'],
  },
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
      {
        test: /jquery/,
        loader: 'expose?$!expose?jQuery'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?root=."
      }
    ]
  }
};