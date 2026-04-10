import { TEAPOT } from '@app-x/cmd'
import { teapotsNs } from '@/api/io/teapotsApiIo.js'
import compilePlugin from '@/utils/compilePlugin.js'

const { CL } = TEAPOT

export default compilePlugin('teapots', (mutatorName, commit) => {
  window.console.log('PLUGIN TEAPOTS:', mutatorName)
  if (mutatorName === 'SUBSCRIBE') {
    teapotsNs.on('bc-cl:teapot:added', data => commit('ADD_TEAPOT', data))
    teapotsNs.on('bc-cl:teapot:updated', data =>
      commit('UPDATE_TEAPOT_BY_ID', data),
    )
    teapotsNs.on('bc-cl:teapot:deleted', data =>
      commit('REMOVE_TEAPOT_BY_ID', data),
    )
  }
  if (mutatorName === 'UNSUBSCRIBE') {
    teapotsNs.removeAllListeners('bc-cl:teapot:added')
    teapotsNs.removeAllListeners('bc-cl:teapot:updated')
    teapotsNs.removeAllListeners('bc-cl:teapot:deleted')
  }
})
