import EventEmitter from 'node:events'
import Teapot from '../models/Teapot.js'
import { ITeapotRepository } from '../i-repositories/ITeapotRepository.js'
import TeapotMapper from '../../infra/mappers/TeapotMapper.js'

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
      teapot.on('ready', () => {
        if (!teapot) return
        const dto = TeapotMapper.toRecord2(teapot)
        this.teapotRepository.updateById(id, dto)
        this.emit('teapot-ready', teapot)
      })
    }
    return teapot
  }

  doTurnOn(id: number): boolean | null {
    const teapot = this.show(id)
    if (!teapot) return null
    const result = teapot.turnOn()
    const dto = TeapotMapper.toRecord2(teapot)
    this.teapotRepository.updateById(id, dto)
    return result
    // if (teapot.turnOn()) this.emit('teapot-turned_on', teapot)
    // else this.emit('teapot-already_turned_on', teapot)
  }

  doTurnOff(id: number): boolean | null {
    const teapot = this.show(id)
    if (!teapot) return null
    const result = teapot.turnOff()
    const dto = TeapotMapper.toRecord2(teapot)
    this.teapotRepository.updateById(id, dto)
    return result
    // if (teapot.turnOff()) this.emit('teapot-turned_off', teapot)
    // else this.emit('teapot-already_turned_off', teapot)
  }

  doTurnDrain(id: number): boolean | null {
    const teapot = this.show(id)
    if (!teapot) return null
    const result = teapot.turnDrain()
    const dto = TeapotMapper.toRecord2(teapot)
    this.teapotRepository.updateById(id, dto)
    return result
    // if (teapot.turnDrain()) this.emit('teapot-turned_drain', teapot)
    // else this.emit('teapot-already_turned_drain', teapot)
  }
}
