import { io } from 'socket.io-client'

const socket = io('ws://localhost:7700', { transports: ['websocket'] })

export function getAll() {
  return new Promise(resolve => socket.emit('user:getAll', '_', resolve))
}

export function getById(id) {
  return new Promise(resolve => socket.emit('user:getById', id, resolve))
}

export function add(dto) {
  return new Promise(resolve => socket.emit('user:add', dto, resolve))
}

export function updateById(id, dto) {
  return new Promise(res => socket.emit('user:updateById', id, dto, res))
}

export function removeById(id) {
  return new Promise((resolve, reject) =>
    socket.emit('user:removeById', id, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export default socket
