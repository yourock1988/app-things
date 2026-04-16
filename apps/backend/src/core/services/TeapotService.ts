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
    const teapot = this.teapotRepository.add(dto)
    this.emit('teapot!added', teapot)
    return teapot
  }

  updateById(id: number, dto: TTeapotUpdateDto): Teapot | null {
    if (this.teapotOnline.isOnlineById(id)) return null
    const teapot = this.teapotRepository.updateById(id, {
      ...dto,
      temperature: dto.temperature + 1,
    })
    return teapot
  }

  removeById(id: number): boolean {
    if (this.teapotOnline.isOnlineById(id)) return false
    return this.teapotRepository.removeById(id)
  }

  joinById(id: number) {
    const teapot = this.teapotRepository.getById(id)
    if (!teapot) return null
    const isJoined = this.teapotOnline.join(teapot)
    if (isJoined) {
      teapot.on('ready', () => {
        if (!teapot.isOnline) return
        const dto = TeapotMapper.toRecord2(teapot)
        this.teapotRepository.updateById(id, dto)
        this.emit('teapot!ready', teapot)
      })
    }
    return { teapot, isJoined }
  }

  leaveById(id: number) {
    // не зачем делать getById
    const teapot = this.teapotOnline.getById(id)
    if (!teapot) return null
    // возвращаем result
    const isLeaved = this.teapotOnline.leaveById(id)
    if (isLeaved) {
      const dto = TeapotMapper.toRecord2(teapot)
      this.teapotRepository.updateById(id, dto)
    }
    return { teapot, isLeaved }
  }

  show(id: number): Teapot | null {
    return this.teapotOnline.getById(id)
  }

  doTurnOn(id: number): { teapot: Teapot; isTurned: boolean } | null {
    const teapot = this.teapotOnline.getById(id)
    if (!teapot) return null
    const isTurned = teapot.turnOn()
    const dto = TeapotMapper.toRecord2(teapot)
    this.teapotRepository.updateById(id, dto)
    return { teapot, isTurned }
    // if (teapot.turnOn()) this.emit('teapot!turned_on', teapot)
    // else this.emit('teapot!already_turned_on', teapot)
  }

  doTurnOff(id: number): { teapot: Teapot; isTurned: boolean } | null {
    const teapot = this.teapotOnline.getById(id)
    if (!teapot) return null
    const isTurned = teapot.turnOff()
    const dto = TeapotMapper.toRecord2(teapot)
    this.teapotRepository.updateById(id, dto)
    return { teapot, isTurned }
    // if (teapot.turnOff()) this.emit('teapot!turned_off', teapot)
    // else this.emit('teapot!already_turned_off', teapot)
  }

  doTurnDrain(id: number): { teapot: Teapot; isTurned: boolean } | null {
    const teapot = this.teapotOnline.getById(id)
    if (!teapot) return null
    const isTurned = teapot.turnDrain()
    const dto = TeapotMapper.toRecord2(teapot)
    this.teapotRepository.updateById(id, dto)
    return { teapot, isTurned }
    // if (teapot.turnDrain()) this.emit('teapot!turned_drain', teapot)
    // else this.emit('teapot!already_turned_drain', teapot)
  }
}
