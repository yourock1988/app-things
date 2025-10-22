import * as apiProducts from '@/api/products'

export default {
  namespaced: true,

  state() {
    return {
      product: null,
    }
  },

  getters: {
    product(s) {
      return s.product
    },
  },

  mutations: {
    SET_PRODUCT(state, product) {
      state.product = product
    },
  },

  actions: {
    async readProductById({ commit }, id) {
      const readedProduct = await apiProducts.getProductById(id)
      commit('SET_PRODUCT', readedProduct)
    },
  },
}
