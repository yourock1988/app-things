import socket from '@/api/ws/index.js'

export default function carsInit(mutatorName, commit) {
  window.console.log('plugin Мутация:', mutatorName)
  if (mutatorName === 'SET_CARS') {
    window.console.log('PLUGIN SUBSCRIBE SOCKET')
    socket.on('bc-cl:car:added', data => commit('ADD_CAR', data))
    socket.on('bc-cl:car:updated', data => commit('UPDATE_CAR_BY_ID', data))
    socket.on('bc-cl:car:deleted', data => commit('REMOVE_CAR_BY_ID', data))
  }
  if (mutatorName === 'RESET_CARS') {
    window.console.log('PLUGIN UNSUBSCRIBE SOCKET')
    socket.removeAllListeners('bc-cl:car:added')
    socket.removeAllListeners('bc-cl:car:updated')
    socket.removeAllListeners('bc-cl:car:deleted')
  }
}
