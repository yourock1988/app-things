import { TEAPOT } from '@app-x/cmd'
import { teapotsNs } from '@/api/io/teapotsApiIo.js'
import compilePlugin from '@/utils/compilePlugin.js'

const { BC_CL } = TEAPOT

export default compilePlugin('teapots', (mutatorName, commit) => {
  window.console.log('PLUGIN TEAPOTS:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    teapotsNs.on(BC_CL.ADDED, data => commit('ADD_TEAPOT', data))
    teapotsNs.on(BC_CL.UPDATED, data => commit('UPDATE_TEAPOT_BY_ID', data))
    teapotsNs.on(BC_CL.DELETED, data => commit('REMOVE_TEAPOT_BY_ID', data))
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    teapotsNs.removeAllListeners(BC_CL.ADDED)
    teapotsNs.removeAllListeners(BC_CL.UPDATED)
    teapotsNs.removeAllListeners(BC_CL.DELETED)
  }
})
