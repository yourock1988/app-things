import initNamespace from './initNamespace.js'
import ack from './ack.js'

export const carsNs = initNamespace('/cars')

carsNs.open()
// carsNs.close()

export function getAll() {
  return new Promise(res => carsNs.emit('car:getAll', '', '', ack(res)))
}

export function getById(id) {
  return new Promise(res => carsNs.emit('car:getById', id, '', ack(res)))
}

export function add(dto) {
  return new Promise(res => carsNs.emit('car:add', '', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res => carsNs.emit('car:updateById', id, dto, ack(res)))
}

export function removeById(id) {
  return new Promise(res => carsNs.emit('car:removeById', id, '', ack(res)))
}
