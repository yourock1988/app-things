import socket from '@/api/ws/index.js'
import compilePlugin from '../compilePlugin.js'

export default compilePlugin('cars', (mutatorName, commit) => {
  window.console.log('PLUGIN CARS:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    socket.on('bc-cl:car:added', data => commit('ADD_CAR', data))
    socket.on('bc-cl:car:updated', data => commit('UPDATE_CAR_BY_ID', data))
    socket.on('bc-cl:car:deleted', data => commit('REMOVE_CAR_BY_ID', data))
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    socket.removeAllListeners('bc-cl:car:added')
    socket.removeAllListeners('bc-cl:car:updated')
    socket.removeAllListeners('bc-cl:car:deleted')
  }
})
