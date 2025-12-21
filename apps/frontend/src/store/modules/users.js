export default {
  namespaced: true,
  state() {
    return {
      users: [],
    }
  },
  mutations: {
    SUBSCRIBE() {},
    UNSUBSCRIBE() {},
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
}
