import { io } from 'socket.io-client'

const { APP_WEBSOCK } = process.env

const socket = io(APP_WEBSOCK + '?foo=bar', {
  transports: ['websocket'],
  autoConnect: false,
  auth: { token: '123' },
})

export default socket
