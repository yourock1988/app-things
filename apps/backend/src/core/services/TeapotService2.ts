import EventEmitter from 'node:events'
import { ITeapotRepository } from '../i-repositories/ITeapotRepository.js'
import { TTeapotAddDto, TTeapotUpdateDto } from '../dtos/TTeapotDtos.js'
import Teapot from '../models/Teapot.js'

export default class TeapotService extends EventEmitter {
  constructor(readonly teapotRepository: ITeapotRepository) {
    super()
  }

  getAll(): Teapot[] {
    const teapots = this.teapotRepository.getAll()
    return teapots
  }

  getById(id: number): Teapot | null {
    const teapot = this.teapotRepository.getById(id)
    return teapot
  }

  add(dto: TTeapotAddDto): Teapot {
    const teapot = this.teapotRepository.add(dto)
    this.emit('teapot:added', teapot)
    return teapot
  }

  updateById(id: number, dto: TTeapotUpdateDto): Teapot | null {
    const teapot = this.teapotRepository.updateById(id, {
      ...dto,
      temperature: dto.temperature + 1,
    })
    return teapot
  }

  removeById(id: number): boolean {
    return this.teapotRepository.removeById(id)
  }
}
