
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const PATHS = {
  index: path.join(__dirname, 'src', 'ripple.vue'),
  dist: path.join(__dirname, 'dist'),
  src: path.join(__dirname, 'src')
};

let vueConfig = {
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}

let commonConfig = {
  resolve: {
    extensions: ['.js', '.vue']
  },
  // resolveLoader: {
  //   modules: [path.join(__dirname, 'node_modules')]
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: PATHS.src,
        options: vueConfig
      }
      // {
      //   test: /\.styl$/,
      //   loader: ExtractTextPlugin.extract({
      //     loader: ['css-loader', 'stylus-loader']
      //   })
      //   include: PATHS.src
      // }
    ]
  },
  plugins: [
    new ExtractTextPlugin("ripple.css")
  ]
};

let config;

switch(process.env.npm_lifecycle_event) {
  case 'dev':
    config = merge(
      commonConfig,
      {
        entry: {
          index: path.join(__dirname, 'example', 'index.js'),
        },
        output: {
          path: path.join(__dirname, 'example'),
          publicPath: '/example/',
          filename: '[name].js'
        },
        devtool: 'eval-source-map',
        devServer: {
          historyApiFallback: true,
          noInfo: true
        }
      }
    );
    break;

  case 'build':
    vueConfig.loaders = {
      stylus: ExtractTextPlugin.extract({
        loader: 'css-loader?sourceMap!stylus-loader',
        fallbackLoader: 'vue-style-loader'
      })
    }
    
    config = merge(
      commonConfig,
      {
        entry: {
          index: PATHS.index
        },
        output: {
          path: PATHS.dist,
          filename: 'ripple.js',
          library: 'VueHaruRipple',
          libraryTarget: 'umd'
        },
        devtool: 'source-map',
        externals: {
          vue: 'Vue'
        }
      }
    )
    break;
}

module.exports = config