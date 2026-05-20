import type { TTeapotAddDto, TTeapotUpdateDto } from './TTeapotDtos.ts'
import type Teapot from './Teapot.ts'

export interface ITeapotRepository {
  getAll(): Teapot[]
  getById(id: number): Teapot | null
  add(dto: TTeapotAddDto): Teapot
  updateById(id: number, dto: TTeapotUpdateDto): Teapot | null
  removeById(id: number): boolean
}
