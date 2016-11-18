/* eslint-disable strict */
'use strict';

const APP_NAME = process.env.APP_NAME;

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'src', 'init', 'main.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[hash].chunk.js',
    publicPath: process.env.BASE_URL, // needs to be root
  },
  resolve: {
    root: __dirname,
    extensions: [ '', '.js', '.scss', '.css', '.json' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/init/index.html',
      NODE_ENV: process.env.NODE_ENV,
      APP_NAME,
    }),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(pkg.version),
      'process.env': {
        APP_NAME: JSON.stringify(APP_NAME),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
        AUTH0_PUB_KEY: JSON.stringify(process.env.AUTH0_PUB_KEY),
        BASE_URL: JSON.stringify(process.env.BASE_URL),
      },
    }),
    new ExtractTextPlugin('[name]-[hash].css', {
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/, /_tests_/ ],
        loader: 'babel-loader',
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|gif|jpg)$/, loader: 'url?limit=8192' },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff2' },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap'),
        exclude: /(node_modules)\/react-toolbox/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap!postcss-loader'),
        exclude: /(node_modules)\/react-toolbox/ },
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
      {
        test    : /(\.scss|\.css)$/,
        include : /(node_modules)\/react-toolbox/,
        loaders : [
          require.resolve('style-loader'),
          require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]',
          require.resolve('sass-loader') + '?sourceMap'
        ]
      }
    ],
      postcss: [autoprefixer],
      sassLoader: {
          data: '@import "theme/_config.scss";',
                 includePaths: [path.resolve(__dirname, './src/app')]
}

    ,
  },
};
