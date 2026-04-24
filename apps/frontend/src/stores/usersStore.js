import { getAll } from '@/api/io/usersApiIo.js'

export default {
  namespaced: true,
  state() {
    return {
      users: [],
    }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
    UPDATE_USER_BY_ID(state, { id, ...body }) {
      state.users = state.users.map(c => (c.id === id ? { ...c, ...body } : c))
    },
    REMOVE_USER_BY_ID(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    },
  },
  actions: {
    async loadUsers({ commit }) {
      const [err, data] = await getAll()
      if (err) {
        commit('SET_USERS', [])
        return
      }
      commit('SET_USERS', data)
    },
  },
}
