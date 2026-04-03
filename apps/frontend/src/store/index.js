import { createStore } from 'vuex'
import usersPlugin from './plugins/usersPlugin.js'
import carsPlugin from './plugins/carsPlugin.js'
import usersStore from './stores/usersStore.js'
import carsStore from './stores/carsStore.js'
import authStore from './stores/authStore.js'

export default createStore({
  modules: {
    usersStore,
    carsStore,
    authStore,
  },
  plugins: [usersPlugin, carsPlugin],
})
