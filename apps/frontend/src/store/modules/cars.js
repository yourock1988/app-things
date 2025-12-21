export default {
  namespaced: true,
  state() {
    return {
      cars: [],
    }
  },
  mutations: {
    SUBSCRIBE() {},
    UNSUBSCRIBE() {},
    SET_CARS(state, cars) {
      state.cars = cars
    },
    ADD_CAR(state, car) {
      state.cars.push(car)
    },
    UPDATE_CAR_BY_ID(state, { id, ...body }) {
      state.cars = state.cars.map(c => (c.id === id ? { ...c, ...body } : c))
    },
    REMOVE_CAR_BY_ID(state, id) {
      state.cars = state.cars.filter(car => car.id !== id)
    },
  },
}
