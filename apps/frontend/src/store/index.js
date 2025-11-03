import { createStore } from 'vuex'
import users, { usersInit } from './users'

const store = createStore({
  modules: {
    users,
  },
  plugins: [usersInit],
})

export default store
