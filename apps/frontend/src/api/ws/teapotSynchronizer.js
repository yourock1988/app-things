import EventEmitter from 'eventemitter3'
import socket from './index.js'

class Synchronizer extends EventEmitter {
  #awaitingCounter = 0

  #eventsDict

  #eventsList

  #sock

  constructor(sock, eventsDict, eventsList) {
    super()
    this.#eventsDict = eventsDict
    this.#eventsList = eventsList
    this.#sock = sock
  }

  #emitWithAck(eventName) {
    this.#awaitingCounter += 1
    return new Promise(resolve => {
      this.#sock.emit(eventName, undefined, (err, data) => {
        this.#awaitingCounter -= 1
        if (err) resolve([err.details ?? err])
        else resolve([null, data])
      })
    })
  }

  #applyServerState = (state, isAck = false) => {
    if (isAck && this.#awaitingCounter > 0) return
    this.emit('update', state)
  }

  subscribe() {
    this.#eventsList.forEach(e => this.#sock.on(e, this.#applyServerState))
  }

  unsubscribe() {
    this.#eventsList.forEach(e => this.#sock.off(e, this.#applyServerState))
  }

  async sendEvent(methodName) {
    const eventName = this.#eventsDict[methodName]
    const [err, state] = await this.#emitWithAck(eventName)
    if (!err) this.#applyServerState(state, true)
  }
}

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

const teapotSynchronizer = new Synchronizer(socket, eventsDict, eventsList)

export default teapotSynchronizer
