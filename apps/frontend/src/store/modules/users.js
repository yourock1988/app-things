import * as apiUsers from '@/api/ws/users.js'

export default {
  namespaced: true,
  state() {
    return {
      users: [],
      err: null,
    }
  },
  mutations: {
    SUBSCRIBE() {},
    UNSUBSCRIBE() {},
    SET_ERR(state, err) {
      state.err = err
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
    SET_USERS(state, users) {
      state.users = users
    },
    UPDATE_USER_BY_ID(state, { id, ...body }) {
      state.users = state.users.map(c => (c.id === id ? { ...c, ...body } : c))
    },
    REMOVE_USER_BY_ID(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    },
  },
  actions: {
    async createUser({ commit }, user) {
      const [err, data] = await apiUsers.add(user)
      if (err) {
        commit('SET_ERR', err.details)
      } else {
        commit('ADD_USER', data)
        commit('SET_ERR', null)
      }
    },
    async readUsers({ commit }) {
      const [, data] = await apiUsers.getAll()
      commit('SET_USERS', data)
      commit('SET_ERR', null)
    },
    async updateUserById({ commit }, { id, user }) {
      const [err, data] = await apiUsers.updateById(id, user)
      if (err) commit('UPDATE_USER_BY_ID', { id, err: err.details })
      else commit('UPDATE_USER_BY_ID', { id, ...data, err: null })
      commit('SET_ERR', null)
    },
    async deleteUserById({ commit }, id) {
      await apiUsers.removeById(id)
      commit('REMOVE_USER_BY_ID', id)
      commit('SET_ERR', null)
    },
  },
}
