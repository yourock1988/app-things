import { createStore } from 'vuex'
import teapotsPlugin from './plugins/teapotsPlugin.js'
import usersPlugin from './plugins/usersPlugin.js'
// import './plugins/carsPlugin.js'
import teapotsStore from './stores/teapotsStore.js'
import usersStore from './stores/usersStore.js'
import carsStore from './stores/carsStore.js'
import authStore from './stores/authStore.js'
import { carsNs } from './api/io/carsApiIo.js'

const store = createStore({
  modules: {
    teapotsStore,
    usersStore,
    carsStore,
    authStore,
  },
  plugins: [teapotsPlugin, usersPlugin],
})

carsNs.on('started', () => {
  store.dispatch('carsStore/loadCars')
  carsNs.s?.on('bc-cl:car:added', data =>
    store.commit('carsStore/ADD_CAR', data),
  )
  carsNs.s?.on('bc-cl:car:updated', data =>
    store.commit('carsStore/UPDATE_CAR_BY_ID', data),
  )
  carsNs.s?.on('bc-cl:car:deleted', data =>
    store.commit('carsStore/REMOVE_CAR_BY_ID', data),
  )
})

carsNs.on('stopped', () => {
  store.commit('carsStore/SET_CARS', [])
  carsNs.s?.removeAllListeners('bc-cl:car:added')
  carsNs.s?.removeAllListeners('bc-cl:car:updated')
  carsNs.s?.removeAllListeners('bc-cl:car:deleted')
})

export default store
