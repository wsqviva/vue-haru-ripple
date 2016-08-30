// Karma configuration
var path = require('path');
var webpack = require('webpack');
var webpackConfig = {
  devtool: '#inline-source-map',
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        include: /src/
      }
    ]
  }
};

module.exports = function(config) {
  config.set({

    frameworks: ['mocha', 'chai'],

    files: [
      'index.js'
    ],

    preprocessors: {
      'index.js': ['babel', 'webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome', 'PhantomJS'],

    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-babel-preprocessor'),
      //require("karma-spec-reporter")
      //require("karma-chai-spies")
      //require("karma-vue-component")
    ],

    singleRun: true,

    concurrency: Infinity
  })
}
