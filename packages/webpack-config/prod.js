const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./base')
const PATHS = require('./paths')
const Dotenv = require('dotenv-webpack')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,

  output: {
    path: PATHS.dist,
  },

  plugins: [
    new Dotenv({
      path: '../../.env.prod',
    }),
  ],
})
