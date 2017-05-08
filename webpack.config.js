var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

var IS_PRODUCTION = process.env.NODE_ENV === 'production';

var ENTRY_POINTS = [
  './src/js/app'
];

var PLUGINS = [];
if (IS_PRODUCTION) {
  // Uglify in production.
  PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          except: ['$super', '$', 'exports', 'require']
      },
      sourcemap: false
    })
  );
}

module.exports = {
  entry: ENTRY_POINTS,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: 'bundle.js',
    // the actual location of file in build
    path: '/public/build',
    // the path used to reference the asset in the browser
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {loader: 'babel-loader'}
        ]
      }
    ]
  },
  plugins: PLUGINS,
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  }

};
