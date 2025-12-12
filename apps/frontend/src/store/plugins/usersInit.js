import socket from '@/api/ws/index.js'

export default function usersInit(mutatorName, commit) {
  window.console.log('plugin Мутация:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    window.console.log('PLUGIN SUBSCRIBE SOCKET')
    socket.on('bc-cl:user:added', data => commit('ADD_USER', data))
    socket.on('bc-cl:user:updated', data => commit('UPDATE_USER_BY_ID', data))
    socket.on('bc-cl:user:deleted', data => commit('REMOVE_USER_BY_ID', data))
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    window.console.log('PLUGIN UNSUBSCRIBE SOCKET')
    socket.removeAllListeners('bc-cl:user:added')
    socket.removeAllListeners('bc-cl:user:updated')
    socket.removeAllListeners('bc-cl:user:deleted')
  }
}
