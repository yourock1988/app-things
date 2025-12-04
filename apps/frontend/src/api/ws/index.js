import { io } from 'socket.io-client'

const { APP_WEBSOCK } = process.env

const socket = io(APP_WEBSOCK, {
  transports: ['websocket'],
  autoConnect: false,
})

export default socket
