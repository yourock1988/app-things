import Synchronizer from './Synchronizer.js'
import socket from './index.js'

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
