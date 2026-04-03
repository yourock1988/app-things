import { usersNs } from '@/api/io/users.js'
import compilePlugin from '@/utils/compilePlugin.js'

export default compilePlugin('users', (mutatorName, commit) => {
  window.console.log('PLUGIN USERS:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    usersNs.on('bc-cl:user:added', data => commit('ADD_USER', data))
    usersNs.on('bc-cl:user:updated', data => commit('UPDATE_USER_BY_ID', data))
    usersNs.on('bc-cl:user:deleted', data => commit('REMOVE_USER_BY_ID', data))
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    usersNs.removeAllListeners('bc-cl:user:added')
    usersNs.removeAllListeners('bc-cl:user:updated')
    usersNs.removeAllListeners('bc-cl:user:deleted')
  }
})
