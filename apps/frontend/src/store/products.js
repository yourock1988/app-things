import * as apiProducts from '@/api/products'

export default {
  namespaced: true,

  state() {
    return {
      products: [],
    }
  },

  getters: {
    filtratedCount(_, g) {
      return g.sortedProducts.length
    },

    pagesTotal(s, g) {
      return Math.ceil(g.filtratedCount / s.pageSize)
    },

    priceMin(_, g) {
      const min = Math.min(...g.searchedProducts.map(sp => sp.priceUah))
      return Number.isFinite(min) ? min : 0
    },

    priceMax(_, g) {
      const max = Math.max(...g.searchedProducts.map(sp => sp.priceUah))
      return Number.isFinite(max) ? max : Number.MAX_SAFE_INTEGER
    },
  },

  mutations: {
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },

    SET_PRODUCTS(state, products) {
      state.products = products
    },

    UPDATE_PRODUCT_BY_ID(state, id, updatableData) {
      const findedProduct = state.products.find(product => product.id === id)
      if (findedProduct) Object.assign(findedProduct, updatableData)
    },

    REMOVE_PRODUCT_BY_ID(state, id) {
      state.products = state.products.filter(product => product.id !== id)
    },
  },

  actions: {
    async createProduct({ commit }, product) {
      const createdProduct = await apiProducts.postProduct(product)
      commit('ADD_PRODUCT', createdProduct)
    },

    async readProducts({ commit, dispatch }) {
      const readedProducts = await apiProducts.getProducts()
      commit('SET_PRODUCTS', readedProducts)
      dispatch('setSearchQuery', '')
    },

    async updateProductById({ commit }, { id, product }) {
      const updatedProduct = await apiProducts.patchProductById(id, product)
      commit('UPDATE_PRODUCT_BY_ID', id, updatedProduct)
    },

    async deleteProductById({ commit }, id) {
      await apiProducts.deleteProductById(id)
      commit('REMOVE_PRODUCT_BY_ID', id)
    },
  },
}
