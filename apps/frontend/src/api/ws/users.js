import { io } from 'socket.io-client'

const socket = io('ws://localhost:7700', { transports: ['websocket'] })

// socket.on('connect', () => store.dispatch('users/readUsers')) ???

export function getAll() {
  return new Promise((resolve, reject) =>
    socket.emit('user:getAll', '_', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function getById(id) {
  return new Promise((resolve, reject) =>
    socket.emit('user:getById', id, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function add(dto) {
  return new Promise((resolve, reject) =>
    socket.emit('user:add', dto, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function updateById(id, dto) {
  return new Promise((resolve, reject) =>
    socket.emit('user:updateById', id, dto, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
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
