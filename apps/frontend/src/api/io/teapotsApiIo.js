import { TEAPOT } from '@app-x/cmd'
import initNamespace from '@/utils/initNamespace.js'
import ack from '@/utils/ack.js'

const { CL } = TEAPOT

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
