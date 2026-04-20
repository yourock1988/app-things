export default {
  namespaced: true,
  state() {
    return {
      sessions: [],
    }
  },
  mutations: {
    SUBSCRIBE() {},
    UNSUBSCRIBE() {},
    SET_SESSIONS(state, sessions) {
      state.sessions = sessions
    },
    ADD_SESSION(state, session) {
      state.sessions.push(session)
    },
    UPDATE_SESSION_BY_ID(state, { id, ...body }) {
      state.sessions = state.sessions.map(c =>
        c.id === id ? { ...c, ...body } : c,
      )
    },
    REMOVE_SESSION_BY_ID(state, id) {
      state.sessions = state.sessions.filter(session => session.id !== id)
    },
  },
}
