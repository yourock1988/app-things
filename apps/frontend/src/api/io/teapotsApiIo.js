import { TEAPOT } from '@app-x/cmd'
import initNamespace from '@/utils/initNamespace.js'
import ack from '@/utils/ack.js'
import Synchronizer from '@/utils/Synchronizer.js'

const { CL, BC_CL, BC_SV } = TEAPOT

export const teapotsNs = initNamespace('/teapots')

teapotsNs.open()
// teapotsNs.close()

export function getAll() {
  return new Promise(res => teapotsNs.emit(CL.GET_ALL, '', '', ack(res)))
}

export function getById(id) {
  return new Promise(res => teapotsNs.emit(CL.GET_BY_ID, id, '', ack(res)))
}

export function add(dto) {
  return new Promise(res => teapotsNs.emit(CL.ADD, '', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res => teapotsNs.emit(CL.UPD_BY_ID, id, dto, ack(res)))
}

export function removeById(id) {
  return new Promise(res => teapotsNs.emit(CL.DEL_BY_ID, id, '', ack(res)))
}

const eventsDict = {
  turnOff: CL.TURN_OFF,
  turnOn: CL.TURN_ON,
  drain: CL.TURN_DRAIN,
  show: CL.SHOW,
  join: CL.JOIN,
  leave: CL.LEAVE,
  getById: CL.GET_BY_ID,
}

const eventsList = [
  BC_CL.TURNED_OFF,
  BC_CL.TURNED_ON,
  BC_CL.TURNED_DRAIN,
  BC_SV.BOILED,
]

export default class TeapotSynchronizer extends Synchronizer {
  constructor(teapotId) {
    super(teapotsNs, eventsDict, eventsList, teapotId)
  }
}
