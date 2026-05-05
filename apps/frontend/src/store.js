import { createStore } from 'vuex'
import teapotsPlugin from './plugins/teapotsPlugin.js'
import personsPlugin from './plugins/personsPlugin.js'
import carsPlugin from './plugins/carsPlugin.js'
import teapotsStore from './stores/teapotsStore.js'
import personsStore from './stores/personsStore.js'
import carsStore from './stores/carsStore.js'
import authStore from './stores/authStore.js'

const store = createStore({
  modules: {
    teapotsStore,
    personsStore,
    carsStore,
    authStore,
  },
  plugins: [teapotsPlugin, personsPlugin, carsPlugin],
})

export default store
