import socket from './index.js'

export function getAll() {
  return new Promise((resolve, reject) =>
    socket.emit('car:getAll', '_', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function getById(id) {
  return new Promise((resolve, reject) =>
    socket.emit('car:getById', id, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function add(dto) {
  return new Promise((resolve, reject) =>
    socket.emit('car:add', dto, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function updateById(id, dto) {
  return new Promise((resolve, reject) =>
    socket.emit('car:updateById', id, dto, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function removeById(id) {
  return new Promise((resolve, reject) =>
    socket.emit('car:removeById', id, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}
