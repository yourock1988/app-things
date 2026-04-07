import EventEmitter from 'node:events'
import Teapot from '../models/Teapot.js'
import { ITeapotRepository } from '../i-repositories/ITeapotRepository.js'

const teapotsOnline: Teapot[] = []

export default class TeapotService extends EventEmitter {
  constructor(readonly teapotRepository: ITeapotRepository) {
    super()
  }

  show(id: number): Teapot | null {
    let teapot = teapotsOnline.find(to => to.id === id) ?? null
    if (!teapot) {
      teapot = this.teapotRepository.getById(id)
      if (!teapot) return null
      teapotsOnline.push(teapot)
      teapot.on('ready', () => this.emit('teapot-ready', teapot))
    }
    return teapot
  }

  doTurnOn(id: number): boolean | null {
    const teapot = this.show(id)
    if (!teapot) return null
    return teapot.turnOn()
    // if (teapot.turnOn()) this.emit('teapot-turned_on', teapot)
    // else this.emit('teapot-already_turned_on', teapot)
  }

  doTurnOff(id: number): boolean | null {
    const teapot = this.show(id)
    if (!teapot) return null
    return teapot.turnOff()
    // if (teapot.turnOff()) this.emit('teapot-turned_off', teapot)
    // else this.emit('teapot-already_turned_off', teapot)
  }

  doTurnDrain(id: number): boolean | null {
    const teapot = this.show(id)
    if (!teapot) return null
    return teapot.turnDrain()
    // if (teapot.turnDrain()) this.emit('teapot-turned_drain', teapot)
    // else this.emit('teapot-already_turned_drain', teapot)
  }
}
