import { io } from 'socket.io-client'

const { APP_WEBSOCK } = process.env

export default function initNamespace(namespace) {
  const socket = io(`${APP_WEBSOCK}${namespace}?foo=bar`, {
    transports: ['websocket'],
    autoConnect: false,
    auth: { sessionid: 'abcdef' },
    extraHeaders: { sessionid: 'abcdef' },
  })
  socket.on('connect_error', err => console.log(`${namespace} ${err.message}`))
  socket.on('disconnect', (reason, details) => console.log(reason, details))
  return socket
}
