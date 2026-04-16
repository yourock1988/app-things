import { createStore } from 'vuex'
import teapotsPlugin from './plugins/teapotsPlugin.js'
import usersPlugin from './plugins/usersPlugin.js'
import carsPlugin from './plugins/carsPlugin.js'
import teapotsStore from './stores/teapotsStore.js'
import usersStore from './stores/usersStore.js'
import carsStore from './stores/carsStore.js'
import authStore from './stores/authStore.js'

export default createStore({
  modules: {
    teapotsStore,
    usersStore,
    carsStore,
    authStore,
  },
  plugins: [teapotsPlugin, usersPlugin, carsPlugin],
})
