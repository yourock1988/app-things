import initNamespace from './initNamespace.js'
import ack from './ack.js'

export const usersNs = initNamespace('/users')

usersNs.open()
// usersNs.close()

export function getAll() {
  return new Promise(res => usersNs.emit('user:getAll', '', '', ack(res)))
}

export function getById(id) {
  return new Promise(res => usersNs.emit('user:getById', id, '', ack(res)))
}

export function add(dto) {
  return new Promise(res => usersNs.emit('user:add', '', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res => usersNs.emit('user:updateById', id, dto, ack(res)))
}

export function removeById(id) {
  return new Promise(res => usersNs.emit('user:removeById', id, '', ack(res)))
}
