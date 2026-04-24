import compilePlugin from '@/utils/compilePlugin.js'
import { usersNs } from '@/api/io/usersApiIo.js'

function cbInit(commit, dispatch) {
  usersNs.on('started', () => {
    dispatch('loadUsers')
    usersNs.s?.on('bc-cl:user:added', data => commit('ADD_USER', data))
    usersNs.s?.on('bc-cl:user:updated', data =>
      commit('UPDATE_USER_BY_ID', data),
    )
    usersNs.s?.on('bc-cl:user:deleted', data =>
      commit('REMOVE_USER_BY_ID', data),
    )
  })
  usersNs.on('stopped', () => {
    commit('SET_USERS', [])
  })
}

export default compilePlugin('users', () => {}, cbInit)
