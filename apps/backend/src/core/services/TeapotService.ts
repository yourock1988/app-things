import EventEmitter from 'node:events'
import Teapot from '../models/Teapot.js'

export default class TeapotService extends EventEmitter {
  constructor(readonly teapot: Teapot) {
    super()
    teapot.on('ready', () => this.emit('teapot-ready', teapot))
  }

  show() {
    return this.teapot
  }

  doTurnOn() {
    if (this.teapot.ongoing === 'boiling' || this.teapot.temperature === 100) {
      return false
      // this.emit('teapot-already_turned_on', this.teapot)
    }
    this.teapot.turnOn()
    return true
    // this.emit('teapot-turned_on', this.teapot)
  }

  doTurnOff() {
    if (this.teapot.ongoing === 'idle') {
      return false
      // this.emit('teapot-already_turned_off', this.teapot)
    }
    this.teapot.turnOff()
    return true
    // this.emit('teapot-turned_off', this.teapot)
  }

  doTurnDrain() {
    if (this.teapot.temperature === 0 && this.teapot.ongoing === 'idle') {
      return false
      // this.emit('teapot-already_turned_drain', this.teapot)
    }
    this.teapot.turnDrain()
    return true
    // this.emit('teapot-turned_drain', this.teapot)
  }
}
