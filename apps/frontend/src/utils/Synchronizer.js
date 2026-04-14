import EventEmitter from 'eventemitter3'

export default class IoSynchronizer extends EventEmitter {
  constructor(namespace, eventsDict, eventsList, id) {
    super()
    this.awaitingCounter = 0
    this.eventsDict = eventsDict
    this.eventsList = eventsList
    this.namespace = namespace
    this.id = id
  }

  emitWithAck(eventName) {
    this.awaitingCounter += 1
    return new Promise(resolve => {
      this.namespace.emit(eventName, this.id, '', (err, data) => {
        this.awaitingCounter -= 1
        if (err) resolve([err.details ?? err])
        else resolve([null, data])
      })
    })
  }

  applyServerState = (state, isAck = false) => {
    if (isAck && this.awaitingCounter > 0) return
    if (this.id !== state.id) return
    this.emit('update', state)
  }

  subscribe() {
    this.eventsList.forEach(e => this.namespace.on(e, this.applyServerState))
  }

  unsubscribe() {
    this.eventsList.forEach(e => this.namespace.off(e, this.applyServerState))
  }

  async sendEvent(methodName) {
    const eventName = this.eventsDict[methodName]
    const [err, state] = await this.emitWithAck(eventName)
    if (!err) this.applyServerState(state, true)
    else this.applyServerState({ ongoing: 'idle' }, true)
    // в идеале бы запоминать последнее состояние перед ошибкой сервера,
    // хотя нах надо...
  }
}
