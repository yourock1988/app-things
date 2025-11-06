import { createStore } from 'vuex'
import users from './modules/users'
import usersInit from './plugins/usersInit.js'

const store = createStore({
  modules: {
    users,
  },
  plugins: [usersInit],
})

export default store
