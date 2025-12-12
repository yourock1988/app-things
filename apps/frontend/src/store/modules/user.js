import * as apiUsers from '@/api/ws/users.js'

export default {
  namespaced: true,

  state() {
    return {
      user: null,
      err: null,
    }
  },

  mutations: {
    SET_ERR(state, err) {
      state.err = err
    },
    SET_USER_BY_ID(state, user) {
      state.user = user
    },
  },

  actions: {
    async readUserById({ commit }, id) {
      const [err, data] = await apiUsers.getById(id)
      if (err) {
        commit('SET_ERR', err)
        commit('SET_USER_BY_ID', {})
      } else {
        commit('SET_ERR', null)
        commit('SET_USER_BY_ID', data)
      }
    },
  },
}
