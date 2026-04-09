export default {
  namespaced: true,
  state() {
    return {
      teapots: [],
    }
  },
  mutations: {
    SUBSCRIBE() {},
    UNSUBSCRIBE() {},
    SET_TEAPOTS(state, teapots) {
      state.teapots = teapots
    },
    ADD_TEAPOT(state, teapot) {
      state.teapots.push(teapot)
    },
    UPDATE_TEAPOT_BY_ID(state, { id, ...body }) {
      state.teapots = state.teapots.map(c =>
        c.id === id ? { ...c, ...body } : c,
      )
    },
    REMOVE_TEAPOT_BY_ID(state, id) {
      state.teapots = state.teapots.filter(teapot => teapot.id !== id)
    },
  },
}
