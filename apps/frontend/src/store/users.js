import * as apiUsers from '@/api/ws/users'

const socket = apiUsers.default

export const usersInit = store => {
  socket.on('connect', () => store.dispatch('users/readUsers'))
  socket.on('user:added-lol', d => store.commit('users/ADD_USER', d))
}

export default {
  namespaced: true,

  state() {
    return {
      users: [],
      user: null,
    }
  },

  getters: {},

  mutations: {
    ADD_USER(state, user) {
      state.users.push(user)
    },

    SET_USERS(state, users) {
      state.users = users
    },

    SET_USER_BY_ID(state, user) {
      state.user = user
    },

    UPDATE_USER_BY_ID(state, id, updatableData) {
      const findedUser = state.users.find(user => user.id === id)
      if (findedUser) Object.assign(findedUser, updatableData)
    },

    REMOVE_USER_BY_ID(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    },
  },

  actions: {
    async createUser({ commit }, user) {
      const createdUser = await apiUsers.add(user)
      commit('ADD_USER', createdUser)
    },

    async readUsers({ commit }) {
      const readedUsers = await apiUsers.getAll()
      commit('SET_USERS', readedUsers)
    },

    async readUserById({ commit }) {
      const readedUser = await apiUsers.getAll()
      commit('SET_USER_BY_ID', readedUser)
    },

    async updateUserById({ commit }, { id, user }) {
      const updatedUser = await apiUsers.updateById(id, user)
      // TODO: обработка ошибки при неправилной схеме данных
      console.log(updatedUser)
      commit('UPDATE_USER_BY_ID', id, updatedUser)
    },

    async deleteUserById({ commit }, id) {
      await apiUsers.removeById(id)
      commit('REMOVE_USER_BY_ID', id)
    },
  },
}
