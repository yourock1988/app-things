import { TEAPOT } from '@app-x/cmd'
import compilePlugin from '@/utils/compilePlugin.js'
import { teapotsNs } from '@/api/io/teapotsApiIo.js'

const { BC_CL } = TEAPOT

function cbInit(commit, dispatch) {
  teapotsNs.on('started', () => {
    dispatch('loadTeapots')
    // teapotSynchronizer.subscribe()
    teapotsNs.s?.on(BC_CL.ADDED, data => commit('ADD_TEAPOT', data))
    teapotsNs.s?.on(BC_CL.UPDATED, data => commit('UPDATE_TEAPOT_BY_ID', data))
    teapotsNs.s?.on(BC_CL.DELETED, data => commit('REMOVE_TEAPOT_BY_ID', data))
  })
  teapotsNs.on('stopped', () => {
    // teapotSynchronizer.unsubscribe()
    commit('SET_TEAPOTS', [])
  })
}

export default compilePlugin('teapots', () => {}, cbInit)
