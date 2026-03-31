import { io } from 'socket.io-client'
import ack from './ack.js'

const { APP_WEBSOCK } = process.env
const namespace = '/cars'

let socket

export function init() {
  socket = io(`${APP_WEBSOCK}${namespace}?foo=bar`, {
    transports: ['websocket'],
    autoConnect: false,
    auth: { sessionid: 'abcdef' },
    extraHeaders: { sessionid: 'abcdef' },
  })
  socket.on('connect_error', err => console.log(err.message))
  socket.on('disconnect', (reason, details) => console.log(reason, details))
  return socket
}

export function getAll() {
  return new Promise(res => socket.emit('car:getAll', '', '', ack(res)))
}

export function getById(id) {
  return new Promise(res => socket.emit('car:getById', id, '', ack(res)))
}

export function add(dto) {
  return new Promise(res => socket.emit('car:add', '', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res => socket.emit('car:updateById', id, dto, ack(res)))
}

export function removeById(id) {
  return new Promise(res => socket.emit('car:removeById', id, '', ack(res)))
}
