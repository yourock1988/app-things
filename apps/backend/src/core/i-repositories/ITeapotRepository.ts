import { TTeapotAddDto, TTeapotUpdateDto } from '../dtos/TTeapotDtos.js'
import Teapot from '../models/Teapot.js'

export interface ITeapotRepository {
  getAll(): Teapot[]
  getById(id: number): Teapot | null
  add(dto: TTeapotAddDto): Teapot
  updateById(id: number, dto: TTeapotUpdateDto): Teapot | null
  removeById(id: number): boolean
  emit(eventName: string | symbol, ...args: any): boolean
}
