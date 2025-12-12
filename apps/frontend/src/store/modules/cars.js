import * as apiCars from '@/api/ws/cars.js'

export default {
  namespaced: true,

  // plugins: [carsInit], ???

  state() {
    return {
      cars: [],
      car: null,
      err: null,
    }
  },

  getters: {},

  mutations: {
    SUBSCRIBE() {},
    UNSUBSCRIBE() {},

    SET_ERR(state, err) {
      state.err = err
    },

    UNSET_ERR(state) {
      state.err = null
    },

    ADD_CAR(state, car) {
      window.console.log('ADD_CAR')
      state.cars.push(car)
    },

    SET_CARS(state, cars) {
      window.console.log('SET_CARS')
      state.cars = cars
    },

    RESET_CARS(state) {
      window.console.log('RESET_CARS')
      state.cars = []
    },

    SET_CAR_BY_ID(state, car) {
      state.car = car
    },

    UPDATE_CAR_BY_ID(state, { id, ...body }) {
      window.console.log('UPDATE_CAR_BY_ID')
      const findedCar = state.cars.find(c => c.id === id)
      if (findedCar) Object.assign(findedCar, body)
    },

    REMOVE_CAR_BY_ID(state, id) {
      window.console.log('REMOVE_CAR_BY_ID')
      state.cars = state.cars.filter(car => car.id !== id)
    },
  },

  actions: {
    async createCar({ commit }, car) {
      try {
        const createdCar = await apiCars.add(car)
        commit('ADD_CAR', createdCar)
      } catch (e) {
        commit('SET_ERR', e.details)
        setTimeout(() => commit('UNSET_ERR'), 5000)
      }
    },

    async readCars({ commit }) {
      const readedCars = await apiCars.getAll()
      commit('SET_CARS', readedCars)
      commit('SUBSCRIBE')
    },

    async readCarById({ commit }, id) {
      try {
        const readedCar = await apiCars.getById(id)
        commit('SET_CAR_BY_ID', readedCar)
      } catch (e) {
        commit('SET_ERR', e)
        setTimeout(() => commit('UNSET_ERR'), 5000)
      }
    },

    async updateCarById({ commit }, { id, car }) {
      try {
        const dto = await apiCars.updateById(id, car)
        commit('UPDATE_CAR_BY_ID', { id, ...dto })
      } catch (e) {
        if (e.code === 404) {
          setTimeout(() => commit('REMOVE_CAR_BY_ID', id), 1500)
        }
        if (e.code === 400) {
          commit('UPDATE_CAR_BY_ID', { id, ...car, err: e.details })
          setTimeout(() => commit('UPDATE_CAR_BY_ID', { id, err: null }), 5000)
        }
      }
    },

    async deleteCarById({ commit }, id) {
      try {
        await apiCars.removeById(id)
        commit('REMOVE_CAR_BY_ID', id)
      } catch (e) {
        setTimeout(() => commit('REMOVE_CAR_BY_ID', id), 1500)
      }
    },
  },
}
