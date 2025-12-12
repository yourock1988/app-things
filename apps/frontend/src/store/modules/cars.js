import * as apiCars from '@/api/ws/cars.js'

export default {
  // plugins: [carsInit], ???
  namespaced: true,
  state() {
    return {
      cars: [],
      err: null,
    }
  },
  mutations: {
    SUBSCRIBE() {},
    UNSUBSCRIBE() {},
    SET_ERR(state, err) {
      state.err = err
    },
    ADD_CAR(state, car) {
      state.cars.push(car)
    },
    SET_CARS(state, cars) {
      state.cars = cars
    },
    UPDATE_CAR_BY_ID(state, { id, ...body }) {
      state.cars = state.cars.map(c => (c.id === id ? { ...c, ...body } : c))
    },
    REMOVE_CAR_BY_ID(state, id) {
      state.cars = state.cars.filter(car => car.id !== id)
    },
  },
  actions: {
    async createCar({ commit }, car) {
      const [err, data] = await apiCars.add(car)
      if (err) {
        commit('SET_ERR', err.details)
      } else {
        commit('ADD_CAR', data)
        commit('SET_ERR', null)
      }
    },
    async readCars({ commit }) {
      const [, data] = await apiCars.getAll()
      commit('SET_CARS', data)
      commit('SET_ERR', null)
    },
    async updateCarById({ commit }, { id, car }) {
      const [err, data] = await apiCars.updateById(id, car)
      if (err) commit('UPDATE_CAR_BY_ID', { id, err: err.details })
      else commit('UPDATE_CAR_BY_ID', { id, ...data, err: null })
      commit('SET_ERR', null)
    },
    async deleteCarById({ commit }, id) {
      await apiCars.removeById(id)
      commit('REMOVE_CAR_BY_ID', id)
      commit('SET_ERR', null)
    },
  },
}
