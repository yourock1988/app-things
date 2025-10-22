const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackVueConfig = require('./vue')
const PATHS = require('./paths')

module.exports = merge(webpackVueConfig, {
  resolve: {
    alias: {
      '@': PATHS.src,
      '~': path.join(PATHS.src, 'components'),
    },
  },

  performance: {
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
    hints: false,
  },

  stats: 'minimal',
  infrastructureLogging: { level: 'error' },

  target: ['web', 'es5'],

  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    publicPath: '/',
    clean: true,
  },

  entry: {
    app: path.join(PATHS.src, 'index.js'),
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { extends: path.join(PATHS.configBabel, 'web.json') },
        },
      },

      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: ['autoprefixer', 'cssnano'] },
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[contenthash][ext]',
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[contenthash][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.public, 'index.html'),
      favicon: path.join(PATHS.public, 'favicon.png'),
      filename: 'index.html',
      title: 'Vue App',
    }),

    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(PATHS.src, 'assets', 'html'), to: 'assets/html/' },
      ],
    }),
  ],
})
