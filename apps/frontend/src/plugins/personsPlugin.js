import compilePlugin from '@/utils/compilePlugin.js'
import { personsNs } from '@/api/io/personsApiIo.js'

function cbInit(commit, dispatch) {
  personsNs.on('started', () => {
    dispatch('loadPersons')
    personsNs.s?.on('bc-cl:person:added', data => commit('ADD_PERSON', data))
    personsNs.s?.on('bc-cl:person:updated', data =>
      commit('UPDATE_PERSON_BY_ID', data),
    )
    personsNs.s?.on('bc-cl:person:deleted', data =>
      commit('REMOVE_PERSON_BY_ID', data),
    )
  })
  personsNs.on('stopped', () => {
    commit('SET_PERSONS', [])
  })
}

export default compilePlugin('persons', () => {}, cbInit)
