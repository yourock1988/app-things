import { io } from 'socket.io-client'

const socket = io('ws://localhost:7700', {
  transports: ['websocket'],
  autoConnect: false,
})

export default socket
