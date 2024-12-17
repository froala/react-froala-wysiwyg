var path = require('path');

var froalaExternals = {
  'froala-editor': {
    root: 'froala-editor',
    commonjs2: 'froala-editor/js',
    commonjs: 'froala-editor/js',
    amd: 'froala-editor/js'
  }
};

var reactExternals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  }
};

var externals = [reactExternals,'froala-editor'];

var config = {
  entry: {
    // Array syntax to workaround https://github.com/webpack/webpack/issues/300
    'index': ['./lib/FroalaEditor.jsx'],
    'FroalaEditorA': ['./lib/FroalaEditorA.jsx'],
    'FroalaEditorButton': ['./lib/FroalaEditorButton.jsx'],
    'FroalaEditorImg': ['./lib/FroalaEditorImg.jsx'],
    'FroalaEditorInput': ['./lib/FroalaEditorInput.jsx'],
    'FroalaEditorView': ['./lib/FroalaEditorView.jsx']
  },
  module: {

    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', {
                  'targets': {
                    "ie": "11"
                  },
                  "corejs": 3,
                  "useBuiltIns": "entry"
                }],
                '@babel/preset-react']
            }
          }
        ]
      }
    ]
  },
  externals: externals,
  resolve: {
    modules: ['./node_modules']
  },
  output: {
    globalObject: 'this',
    publicPath: '',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.output.filename = '[name].src.js';
  }
  return config;
}