import { TCarAddDto, TCarUpdateDto } from './TCarDtos.js'
import Car from './Car.js'

export interface ICarRepository {
  getAll(): Car[]
  getById(id: number): Car | null
  add(dto: TCarAddDto): Car
  updateById(id: number, dto: TCarUpdateDto): Car | null
  removeById(id: number): boolean
}
