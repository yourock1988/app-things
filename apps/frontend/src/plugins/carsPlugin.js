import { carsNs } from '@/api/io/cars.js'
import compilePlugin from '@/utils/compilePlugin.js'

export default compilePlugin('cars', (mutatorName, commit) => {
  window.console.log('PLUGIN CARS:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    carsNs.on('bc-cl:car:added', data => commit('ADD_CAR', data))
    carsNs.on('bc-cl:car:updated', data => commit('UPDATE_CAR_BY_ID', data))
    carsNs.on('bc-cl:car:deleted', data => commit('REMOVE_CAR_BY_ID', data))
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    carsNs.removeAllListeners('bc-cl:car:added')
    carsNs.removeAllListeners('bc-cl:car:updated')
    carsNs.removeAllListeners('bc-cl:car:deleted')
  }
})
