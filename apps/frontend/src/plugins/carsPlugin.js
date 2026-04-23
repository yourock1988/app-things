// import { carsNs } from '@/api/io/carsApiIo.js'
// import store from '@/store.js'

// import compilePlugin from '@/utils/compilePlugin.js'

// export default compilePlugin('cars', (mutatorName, commit, store) => {
//   window.console.log('PLUGIN CARS:', mutatorName)
//   if (mutatorName === 'UPDATE_CAR_BY_ID') {
//     carsNs.on('restarted', () => store.dispatch('carsStore/loadCars'))
//     carsNs.s?.on('bc-cl:car:added', data => commit('ADD_CAR', data))
//     carsNs.s?.on('bc-cl:car:updated', data => commit('UPDATE_CAR_BY_ID', data))
//     carsNs.s?.on('bc-cl:car:deleted', data => commit('REMOVE_CAR_BY_ID', data))
//   }
//   if (mutatorName === 'REMOVE_CAR_BY_ID') {
//     carsNs.removeAllListeners('restarted')
//     carsNs.s?.removeAllListeners('bc-cl:car:added')
//     carsNs.s?.removeAllListeners('bc-cl:car:updated')
//     carsNs.s?.removeAllListeners('bc-cl:car:deleted')
//   }
// })
