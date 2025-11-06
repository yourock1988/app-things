import * as apiUsers from '@/api/ws/users'

const socket = apiUsers.default

export const usersInit = store => {
  store.subscribe(mutation => {
    console.log('plugin Мутация:', mutation.type, mutation.payload)
    if (mutation.type === 'users/SET_USERS') {
      console.log('PLUGIN SUBSCRIBE SOCKET')
      socket.on('bc-cl:user:added', data =>
        store.commit('users/ADD_USER', data)
      )
      socket.on('bc-cl:user:updated', ({ id, ...dto }) =>
        store.commit('users/UPDATE_USER_BY_ID', { id, dto })
      )
      socket.on('bc-cl:user:deleted', id =>
        store.commit('users/REMOVE_USER_BY_ID', id)
      )
    }
    if (mutation.type === 'users/RESET_USERS') {
      console.log('PLUGIN UNSUBSCRIBE SOCKET')
      socket.removeAllListeners('bc-cl:user:added')
      socket.removeAllListeners('bc-cl:user:updated')
      socket.removeAllListeners('bc-cl:user:deleted')
    }
  })
}

export default {
  namespaced: true,

  // plugins: [usersInit], ???

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
      console.log('ADD_USER')
      state.users.push(user)
    },

    SET_USERS(state, users) {
      console.log('SET_USERS')
      state.users = users
    },

    RESET_USERS(state) {
      console.log('RESET_USERS')
      state.users = []
    },

    SET_USER_BY_ID(state, user) {
      state.user = user
    },

    UPDATE_USER_BY_ID(state, payload) {
      console.log('UPDATE_USER_BY_ID')
      const { id, dto } = payload
      const findedUser = state.users.find(user => user.id === id)
      if (findedUser) Object.assign(findedUser, dto)
    },

    REMOVE_USER_BY_ID(state, id) {
      console.log('REMOVE_USER_BY_ID')
      state.users = state.users.filter(user => user.id !== id)
    },
  },

  actions: {
    async createUser({ commit }, user) {
      try {
        const createdUser = await apiUsers.add(user)
        commit('ADD_USER', createdUser)
      } catch (e) {
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
      } catch (e) {
        commit('SET_ERR', e)
        setTimeout(() => commit('UNSET_ERR'), 5000)
      }
    },

    async updateUserById({ commit }, { id, user }) {
      try {
        const dto = await apiUsers.updateById(id, user)
        commit('UPDATE_USER_BY_ID', { id, dto })
      } catch (e) {
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
      } catch (e) {
        setTimeout(() => commit('REMOVE_USER_BY_ID', id), 1500)
      }
    },
  },
}
