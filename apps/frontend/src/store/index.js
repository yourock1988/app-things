import { createStore } from 'vuex'
import users from './modules/users.js'
import cars from './modules/cars.js'
import usersInit from './plugins/usersInit.js'
import carsInit from './plugins/carsInit.js'
import auth from './modules/auth.js'

const store = createStore({
  modules: {
    users,
    cars,
    auth,
  },
  plugins: [usersInit, carsInit],
})

export default store
