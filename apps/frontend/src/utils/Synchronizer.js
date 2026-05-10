import EventEmitter from 'eventemitter3'
import sendEvent from './sendEvent.js'

export default class IoSynchronizer extends EventEmitter {
  constructor(namespace, eventsDict, eventsList, id) {
    super()
    this.awaitingCounter = 0
    this.eventsDict = eventsDict
    this.eventsList = eventsList
    this.namespace = namespace
    this.id = id
    namespace.on('started', () => {
      this.subscribe()
      this.sendEvent('getById')
    })
    namespace.on('stopped', () => {
      this.unsubscribe()
    })
  }

  async emitWithAck(eventName) {
    this.awaitingCounter += 1
    const [err, data] = await sendEvent(this.namespace, eventName, this.id, '')
    this.awaitingCounter -= 1
    return [err, data]
    // return new Promise(resolve => {
    //   this.namespace.s?.emit(eventName, this.id, '', (err, data) => {
    //     this.awaitingCounter -= 1
    //     if (err) resolve([err.details ?? err])
    //     else resolve([null, data])
    //   })
    // })
  }

  applyServerState = (state, isAck = false) => {
    if (isAck && this.awaitingCounter > 0) return
    if (this.id !== state.id) return
    this.emit('update', state)
  }

  subscribe() {
    this.eventsList.forEach(e => this.namespace.s?.on(e, this.applyServerState))
  }

  unsubscribe() {
    this.eventsList.forEach(e =>
      this.namespace.s?.off(e, this.applyServerState),
    )
  }

  async sendEvent(methodName) {
    const eventName = this.eventsDict[methodName]
    const [err, state] = await this.emitWithAck(eventName)
    if (!err) this.applyServerState(state, true)
    else this.applyServerState({ id: this.id, err }, true)
    // в идеале бы запоминать последнее состояние перед ошибкой сервера,
    // хотя нах надо...
    // FIXME: при ошибке не нужно вызывать applyServerState
    // FIXME: applyServerState только для позитивных сценариев
    // для негативных сценариев метод sendEvent должен выбрасывать ошибку [err] наружу
  }
}
