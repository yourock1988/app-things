import { createStore } from 'vuex'

import product from './product'
import products from './products'

export default createStore({
  modules: {
    product,
    products,
  },
})
