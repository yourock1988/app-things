export default {
  namespaced: true,
  state() {
    return {
      session: null,
    }
  },
  mutations: {
    SET_SESSION(state, session) {
      state.session = session
    },
  },
}
