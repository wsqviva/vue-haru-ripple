
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';

const PATHS = {
  index: path.join(__dirname, 'src', 'ripple.vue'),
  dist: path.join(__dirname, 'dist'),
  src: path.join(__dirname, 'src')
};

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
        loader: 'babel',
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        include: PATHS.src
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("ripple.css"),
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
        vue: {
          autoprefixer: {
            browsers: ['last 2 versions']
          },
          loaders: {
            stylus: ExtractTextPlugin.extract('css!stylus')
          }
        },
        devtool: 'source-map',
        externals: {
          vue: 'Vue'
        }
      }
    )
    break;
}

export default config;
