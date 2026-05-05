import { getAll } from '@/api/io/personsApiIo.js'

export default {
  namespaced: true,
  state() {
    return {
      persons: [],
    }
  },
  mutations: {
    SET_PERSONS(state, persons) {
      state.persons = persons
    },
    ADD_PERSON(state, person) {
      state.persons.push(person)
    },
    UPDATE_PERSON_BY_ID(state, { id, ...body }) {
      state.persons = state.persons.map(c =>
        c.id === id ? { ...c, ...body } : c,
      )
    },
    REMOVE_PERSON_BY_ID(state, id) {
      state.persons = state.persons.filter(person => person.id !== id)
    },
  },
  actions: {
    async loadPersons({ commit }) {
      const [err, data] = await getAll()
      if (err) {
        commit('SET_PERSONS', [])
        return
      }
      commit('SET_PERSONS', data)
    },
  },
}
