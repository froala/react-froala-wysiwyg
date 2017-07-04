var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    basic: './src/basic.jsx',
    edit_inline: './src/edit_inline.jsx',
    full_editor: './src/full_editor.jsx',
    two_way_binding: './src/two_way_binding.jsx',
    manual_initialization: './src/manual_initialization.jsx',
    init_on_image: './src/init_on_image.jsx',
    init_on_button: './src/init_on_button.jsx',
    init_on_link: './src/init_on_link.jsx',
    init_on_input: './src/init_on_input.jsx'
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react','es2015', 'stage-2']
        }
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader?root=."
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },

  resolve: {
    alias: {
      "react-froala-wysiwyg": '../../dist'
    },
    modulesDirectories: ['node_modules']
  },

  output: {
    path: 'dist/',
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    new CopyWebpackPlugin([{ from: './src/index.html'}, {from: './src/image.jpg'} ])
  ]
};