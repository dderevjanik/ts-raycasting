/**
 * Main webpack config
 */
const webpack = require('webpack'),
  path = require('path');

module.exports = {
  entry: ['./src/RayCast.ts'],
  target: 'web',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname + '/dist/web'),
    publicPath: '/dist/web/',
    filename: 'raycast.min.js',
    library: 'raycast',
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader?configFile="tsconfig.json"',
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  }
};
