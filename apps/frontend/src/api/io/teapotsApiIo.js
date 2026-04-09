import initNamespace from '@/utils/initNamespace.js'
import ack from '@/utils/ack.js'

export const teapotsNs = initNamespace('/teapots')

teapotsNs.open()
// teapotsNs.close()

export function getAll() {
  return new Promise(res => teapotsNs.emit('teapot:getAll', '', '', ack(res)))
}

export function getById(id) {
  return new Promise(res => teapotsNs.emit('teapot:getById', id, '', ack(res)))
}

export function add(dto) {
  return new Promise(res => teapotsNs.emit('teapot:add', '', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res =>
    teapotsNs.emit('teapot:updateById', id, dto, ack(res)),
  )
}

export function removeById(id) {
  return new Promise(res =>
    teapotsNs.emit('teapot:removeById', id, '', ack(res)),
  )
}
