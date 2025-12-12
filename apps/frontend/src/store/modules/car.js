import * as apiCars from '@/api/ws/cars.js'

export default {
  namespaced: true,

  state() {
    return {
      car: null,
      err: null,
    }
  },

  mutations: {
    SET_ERR(state, err) {
      state.err = err
    },
    SET_CAR_BY_ID(state, car) {
      state.car = car
    },
  },

  actions: {
    async readCarById({ commit }, id) {
      const [err, data] = await apiCars.getById(id)
      if (err) {
        commit('SET_ERR', err)
        commit('SET_CAR_BY_ID', {})
      } else {
        commit('SET_ERR', null)
        commit('SET_CAR_BY_ID', data)
      }
    },
  },
}
