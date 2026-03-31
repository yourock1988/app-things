import initNamespace from './initNamespace.js'
import Synchronizer from './Synchronizer.js'

export const socket = initNamespace('/teapot')

socket.open()
// socket.close()

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
