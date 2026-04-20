import { carsNs } from '@/api/io/carsApiIo.js'
import compilePlugin from '@/utils/compilePlugin.js'

export default compilePlugin('cars', (mutatorName, commit) => {
  window.console.log('PLUGIN CARS:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    carsNs.s?.on('bc-cl:car:added', data => commit('ADD_CAR', data))
    carsNs.s?.on('bc-cl:car:updated', data => commit('UPDATE_CAR_BY_ID', data))
    carsNs.s?.on('bc-cl:car:deleted', data => commit('REMOVE_CAR_BY_ID', data))
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    carsNs.s?.removeAllListeners('bc-cl:car:added')
    carsNs.s?.removeAllListeners('bc-cl:car:updated')
    carsNs.s?.removeAllListeners('bc-cl:car:deleted')
  }
})
