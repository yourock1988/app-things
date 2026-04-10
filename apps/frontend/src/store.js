import { createStore } from 'vuex'
import usersPlugin from './plugins/usersPlugin.js'
import carsPlugin from './plugins/carsPlugin.js'
import usersStore from './stores/usersStore.js'
import carsStore from './stores/carsStore.js'
import authStore from './stores/authStore.js'
import teapotsStore from './stores/teapotsStore.js'
import teapotsPlugin from './plugins/teapotsPlugin.js'

export default createStore({
  modules: {
    usersStore,
    carsStore,
    authStore,
    teapotsStore,
  },
  plugins: [usersPlugin, carsPlugin, teapotsPlugin],
})
