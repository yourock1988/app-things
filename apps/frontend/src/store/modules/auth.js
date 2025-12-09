import signIn from '../../api/rest/auth/signIn.js'

export default {
  namespaced: true,

  state() {
    return {
      session: null,
      err: null,
    }
  },

  getters: {},

  mutations: {
    SET_ERR(state, err) {
      state.err = err
    },

    SET_SESSION(state, session) {
      state.session = session
    },
  },

  actions: {
    async signIn({ commit }, dto) {
      const [err, data] = await signIn(dto)
      if (err) {
        commit('SET_ERR', err)
        commit('SET_SESSION', null)
      } else {
        commit('SET_ERR', null)
        commit('SET_SESSION', data)
      }
    },
  },
}
