import { io } from 'socket.io-client'
import Synchronizer from './Synchronizer.js'

const { APP_WEBSOCK } = process.env
const namespace = '/teapot'

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

init()
socket.open()

const eventsDict = {
  turnOff: 'cl:teapot-turn_off',
  turnOn: 'cl:teapot-turn_on',
  drain: 'cl:teapot-drain',
  show: 'cl:teapot-show',
}

const eventsList = [
  'bc-cl:teapot-turned_off',
  'bc-cl:teapot-turned_on',
  'bc-cl:teapot-drained',
  'bc-sv:teapot-ready',
]

export default new Synchronizer(socket, eventsDict, eventsList)
