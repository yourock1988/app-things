import { TEAPOT } from '@app-x/cmd'
import initNamespace from '@/utils/initNamespace.js'
import Synchronizer from '@/utils/Synchronizer.js'

const { CL, BC_CL, BC_SV } = TEAPOT

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
  BC_CL.TURNED_OFF,
  BC_CL.TURNED_ON,
  BC_CL.TURNED_DRAIN,
  BC_SV.BOILED,
]

export default new Synchronizer(socket, eventsDict, eventsList)
