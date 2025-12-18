import socket from './index.js'
import ack from './ack.js'

export function getAll() {
  return new Promise(res => socket.emit('car:getAll', '_', ack(res)))
}

export function getById(id) {
  return new Promise(res => socket.emit('car:getById', id, ack(res)))
}

export function add(dto) {
  return new Promise(res => socket.emit('car:add', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res => socket.emit('car:updateById', id, dto, ack(res)))
}

export function removeById(id) {
  return new Promise(res => socket.emit('car:removeById', id, ack(res)))
}
