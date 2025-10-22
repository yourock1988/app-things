const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
      vuex$: 'vuex/dist/vuex.esm-bundler.js',
      'vue-router$': 'vue-router/dist/vue-router.esm-bundler.js',
    },
  },

  module: {
    rules: [{ test: /\.vue$/, loader: 'vue-loader' }],
  },

  plugins: [
    new VueLoaderPlugin(),

    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    }),
  ],
}
