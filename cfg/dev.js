'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    app: [
      'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    color: [
      'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/color'
    ],
    temperature: [
      'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/temperature'
    ],
    brightness: [
      'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/brightness'
    ],
    scene: [
      'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/scene'
    ]
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
