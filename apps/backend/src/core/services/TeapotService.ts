import EventEmitter from 'node:events'
import { ITeapotRepository } from '../i-repositories/ITeapotRepository.js'
import { TTeapotAddDto, TTeapotUpdateDto } from '../dtos/TTeapotDtos.js'
import Teapot from '../models/Teapot.js'
import TeapotMapper from '../../infra/mappers/TeapotMapper.js'
import TeapotOnline from '../online/TeapotOnline.js'

export default class TeapotService extends EventEmitter {
  constructor(
    readonly teapotRepository: ITeapotRepository,
    readonly teapotOnline: TeapotOnline,
  ) {
    super()
  }

  getAll(): Teapot[] {
    const teapots = this.teapotRepository.getAll()
    const offline = teapots.filter(t => !this.teapotOnline.isOnlineById(t.id))
    return [...this.teapotOnline.getAll(), ...offline]
  }

  getById(id: number): Teapot | null {
    return this.teapotOnline.getById(id) ?? this.teapotRepository.getById(id)
  }

  add(dto: TTeapotAddDto): Teapot {
    return this.teapotRepository.add(dto)
  }

  updateById(id: number, dto: TTeapotUpdateDto): Teapot | null {
    if (this.teapotOnline.isOnlineById(id)) return null
    return this.teapotRepository.updateById(id, dto)
  }

  removeById(id: number): boolean {
    if (this.teapotOnline.isOnlineById(id)) return false
    return this.teapotRepository.removeById(id)
  }

  show(id: number): Teapot | null {
    return this.teapotOnline.getById(id)
  }

  join(teapot: Teapot) {
    const isJoined = this.teapotOnline.join(teapot)
    if (isJoined) {
      teapot.on('ready', () => {
        if (!teapot.isOnline) return
        const dto = TeapotMapper.toRecord2(teapot)
        this.teapotRepository.updateById(teapot.id, dto)
        this.emit('teapot!ready', teapot)
      })
    }
    return isJoined
  }

  leave(teapot: Teapot) {
    const isLeaved = this.teapotOnline.leaveById(teapot.id)
    if (isLeaved) {
      teapot.removeAllListeners('ready')
      teapot.turnOff() // в бд нельзя сохранять крутящиеся сущности
      const dto = TeapotMapper.toRecord2(teapot)
      this.teapotRepository.updateById(teapot.id, dto)
    }
    return isLeaved
  }

  doTurnOn(teapot: Teapot): boolean {
    const isTurned = teapot.turnOn()
    if (isTurned) {
      const dto = TeapotMapper.toRecord2(teapot)
      this.teapotRepository.updateById(teapot.id, dto)
    }
    return isTurned
  }

  doTurnOff(teapot: Teapot): boolean {
    const isTurned = teapot.turnOff()
    if (isTurned) {
      const dto = TeapotMapper.toRecord2(teapot)
      this.teapotRepository.updateById(teapot.id, dto)
    }
    return isTurned
  }

  doTurnDrain(teapot: Teapot): boolean {
    const isTurned = teapot.turnDrain()
    if (isTurned) {
      const dto = TeapotMapper.toRecord2(teapot)
      this.teapotRepository.updateById(teapot.id, dto)
    }
    return isTurned
  }
}
