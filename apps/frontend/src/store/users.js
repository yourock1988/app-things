import * as apiUsers from '@/api/ws/users'

const socket = apiUsers.default

export const usersInit = store => {
  socket.on('connect', () => store.dispatch('users/readUsers'))
  socket.on('user:added-bc', d => store.commit('users/ADD_USER', d))
}

export default {
  namespaced: true,

  state() {
    return {
      users: [],
      user: null,
      err: null,
    }
  },

  getters: {},

  mutations: {
    SET_ERR(state, err) {
      state.err = err
    },

    UNSET_ERR(state) {
      state.err = null
    },

    ADD_USER(state, user) {
      state.users.push(user)
    },

    SET_USERS(state, users) {
      state.users = users
    },

    SET_USER_BY_ID(state, user) {
      state.user = user
    },

    UPDATE_USER_BY_ID(state, payload) {
      const { id, dto } = payload
      const findedUser = state.users.find(user => user.id === id)
      if (findedUser) Object.assign(findedUser, dto)
    },

    REMOVE_USER_BY_ID(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    },
  },

  actions: {
    async createUser({ commit }, user) {
      try {
        const createdUser = await apiUsers.add(user)
        commit('ADD_USER', createdUser)
        global.console.log('createUser: OK', user)
      } catch (e) {
        global.console.log('createUser: ERR', user, e.code)
        commit('SET_ERR', e.details)
        setTimeout(() => commit('UNSET_ERR'), 5000)
      }
    },

    async readUsers({ commit }) {
      const readedUsers = await apiUsers.getAll()
      commit('SET_USERS', readedUsers)
    },

    async readUserById({ commit }, id) {
      try {
        const readedUser = await apiUsers.getById(id)
        commit('SET_USER_BY_ID', readedUser)
        global.console.log('readUserById: OK')
      } catch (e) {
        global.console.log('readUserById: ERR', id, e.code)
        commit('SET_ERR', e)
        setTimeout(() => commit('UNSET_ERR'), 5000)
      }
    },

    async updateUserById({ commit }, { id, user }) {
      try {
        const dto = await apiUsers.updateById(id, user)
        commit('UPDATE_USER_BY_ID', { id, dto })
        global.console.log('update: OK')
      } catch (e) {
        global.console.log('update: ERR', id, e.code)
        if (e.code === 404) {
          setTimeout(() => commit('REMOVE_USER_BY_ID', id), 1500)
        }
        if (e.code === 400) {
          commit('UPDATE_USER_BY_ID', { id, dto: { ...user, err: e.details } })
          setTimeout(
            () => commit('UPDATE_USER_BY_ID', { id, dto: { err: null } }),
            5000
          )
        }
      }
    },

    async deleteUserById({ commit }, id) {
      try {
        await apiUsers.removeById(id)
        commit('REMOVE_USER_BY_ID', id)
        global.console.log('delete: OK')
      } catch (e) {
        global.console.log('delete: ERR', id, e.code)
        setTimeout(() => commit('REMOVE_USER_BY_ID', id), 1500)
      }
    },
  },
}
