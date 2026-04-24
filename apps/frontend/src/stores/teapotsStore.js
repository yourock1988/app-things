import { getAll } from '@/api/io/teapotsApiIo.js'

export default {
  namespaced: true,
  state() {
    return {
      teapots: [],
    }
  },
  mutations: {
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
  actions: {
    async loadTeapots({ commit }) {
      const [err, data] = await getAll()
      if (err) {
        commit('SET_TEAPOTS', [])
        return
      }
      commit('SET_TEAPOTS', data)
    },
  },
}
