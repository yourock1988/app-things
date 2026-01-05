import EventEmitter from 'eventemitter3'

export default class Synchronizer extends EventEmitter {
  #awaitingCounter = 0

  #eventsDict

  #eventsList

  #socket

  constructor(sock, eventsDict, eventsList) {
    super()
    this.#eventsDict = eventsDict
    this.#eventsList = eventsList
    this.#socket = sock
  }

  #emitWithAck(eventName) {
    this.#awaitingCounter += 1
    return new Promise(resolve => {
      this.#socket.emit(eventName, undefined, (err, data) => {
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
    this.#eventsList.forEach(e => this.#socket.on(e, this.#applyServerState))
  }

  unsubscribe() {
    this.#eventsList.forEach(e => this.#socket.off(e, this.#applyServerState))
  }

  async sendEvent(methodName) {
    const eventName = this.#eventsDict[methodName]
    const [err, state] = await this.#emitWithAck(eventName)
    if (!err) this.#applyServerState(state, true)
  }
}
