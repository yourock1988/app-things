import socket from './index.js'
import ack from './ack.js'

export function getAll() {
  return new Promise(res => socket.emit('user:getAll', '_', ack(res)))
}

export function getById(id) {
  return new Promise(res => socket.emit('user:getById', id, ack(res)))
}

export function add(dto) {
  return new Promise(res => socket.emit('user:add', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res => socket.emit('user:updateById', id, dto, ack(res)))
}

export function removeById(id) {
  return new Promise(res => socket.emit('user:removeById', id, ack(res)))
}
