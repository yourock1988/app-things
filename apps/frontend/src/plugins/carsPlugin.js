import compilePlugin from '@/utils/compilePlugin.js'
import { carsNs } from '@/api/io/carsApiIo.js'

function cbInit(commit, dispatch) {
  carsNs.on('started', () => {
    dispatch('loadCars')
    carsNs.s?.on('bc-cl:car:added', data => commit('ADD_CAR', data))
    carsNs.s?.on('bc-cl:car:updated', data => commit('UPDATE_CAR_BY_ID', data))
    carsNs.s?.on('bc-cl:car:deleted', data => commit('REMOVE_CAR_BY_ID', data))
  })
  carsNs.on('stopped', () => {
    commit('SET_CARS', [])
  })
}

export default compilePlugin('cars', () => {}, cbInit)
