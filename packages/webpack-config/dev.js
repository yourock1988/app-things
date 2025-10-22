const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./base')
const PATHS = require('./paths')
const Dotenv = require('dotenv-webpack')
const devPort = 9000

class DoneMessage {
  constructor(message) {
    this.message = message
  }
  apply(compiler) {
    compiler.hooks.done.tap('DoneMessage', stats => {
      if (!stats.hasErrors()) setImmediate(() => console.log(this.message))
    })
  }
}

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    static: PATHS.assets,
    port: devPort,
    open: false,
    historyApiFallback: true,
  },

  output: {
    path: PATHS.build,
  },

  plugins: [
    new Dotenv({
      path: '../../.env.dev',
    }),

    new DoneMessage(`Webpack dev server: http://localhost:${devPort}/products`),
  ],
})
