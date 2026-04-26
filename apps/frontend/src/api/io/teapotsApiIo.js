import { TEAPOT } from '@app-x/cmd'
import Synchronizer from '@/utils/Synchronizer.js'
import { ioNamespaces } from '@/utils/IoNamespaces.js'
import sendEvent from '@/utils/sendEvent.js'

const { CL, BC_CL, BC_SV } = TEAPOT
export const teapotsNs = ioNamespaces.add('/teapots')

export function getAll() {
  return sendEvent(teapotsNs, CL.GET_ALL)
}
export function getById(id) {
  return sendEvent(teapotsNs, CL.GET_BY_ID, id)
}
export function add(dto) {
  return sendEvent(teapotsNs, CL.ADD, '', dto)
}
export function updateById(id, dto) {
  return sendEvent(teapotsNs, CL.UPD_BY_ID, id, dto)
}
export function removeById(id) {
  return sendEvent(teapotsNs, CL.DEL_BY_ID, id)
}

const eventsDict = {
  getById: CL.GET_BY_ID,
  show: CL.SHOW,
  join: CL.JOIN,
  leave: CL.LEAVE,
  turnOn: CL.TURN_ON,
  turnOff: CL.TURN_OFF,
  drain: CL.TURN_DRAIN,
}

const eventsList = [
  BC_CL.JOINED,
  BC_CL.LEAVED,
  BC_CL.TURNED_ON,
  BC_CL.TURNED_OFF,
  BC_CL.TURNED_DRAIN,
  BC_SV.BOILED,
]

export default class TeapotSynchronizer extends Synchronizer {
  constructor(teapotId) {
    super(teapotsNs, eventsDict, eventsList, teapotId)
  }
}
