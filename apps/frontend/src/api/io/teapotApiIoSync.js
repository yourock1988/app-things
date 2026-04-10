import { TEAPOT } from '@app-x/cmd'
import initNamespace from '@/utils/initNamespace.js'
import Synchronizer from '@/utils/Synchronizer.js'

const { CL } = TEAPOT

export const socket = initNamespace('/teapots')

socket.open()
// socket.close()

const eventsDict = {
  turnOff: CL.TURN_OFF,
  turnOn: CL.TURN_ON,
  drain: CL.TURN_DRAIN,
  show: CL.SHOW,
}

const eventsList = [
  'bc-cl:teapot-turned_off',
  'bc-cl:teapot-turned_on',
  'bc-cl:teapot-drained',
  'bc-sv:teapot-ready',
]

export default new Synchronizer(socket, eventsDict, eventsList)
