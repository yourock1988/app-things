import { init } from '@/api/ws/users.js'
import compilePlugin from '../compilePlugin.js'

const socket = init()
socket.open()
// socket.close()

export default compilePlugin('users', (mutatorName, commit) => {
  window.console.log('PLUGIN USERS:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    socket.on('bc-cl:user:added', data => commit('ADD_USER', data))
    socket.on('bc-cl:user:updated', data => commit('UPDATE_USER_BY_ID', data))
    socket.on('bc-cl:user:deleted', data => commit('REMOVE_USER_BY_ID', data))
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    socket.removeAllListeners('bc-cl:user:added')
    socket.removeAllListeners('bc-cl:user:updated')
    socket.removeAllListeners('bc-cl:user:deleted')
  }
})
