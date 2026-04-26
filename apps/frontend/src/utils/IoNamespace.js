import EventEmitter from 'eventemitter3'
import { io } from 'socket.io-client'

export default class IoNamespace extends EventEmitter {
  constructor(namespace) {
    super()
    const { APP_WEBSOCK } = process.env
    this.namespace = namespace
    this.sessionid = ''
    this.url = `${APP_WEBSOCK}${namespace}`
    this.s = null
  }

  switchSession(sessionid) {
    this.sessionid = sessionid
  }

  restart() {
    const auth = { sessionid: this.sessionid }
    const options = {
      autoConnect: false,
      transports: ['websocket'],
      extraHeaders: auth,
      auth,
    }
    this.stop()
    this.s = io(this.url, options)
    this.s.on('connect', () => {
      this.emit('started')
    })
    this.s.on('connect_error', err => {
      globalThis.console.log(`${this.namespace} ${err.message}`)
    })
    this.s.on('disconnect', (reason, details) =>
      globalThis.console.log(reason, details),
    )
    this.s.open()
  }

  stop() {
    this.emit('stopped')
    this.s?.removeAllListeners()
    this.s?.close()
    this.s = null
  }
}
