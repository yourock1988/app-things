import type { TCarAddDto, TCarUpdateDto } from './TCarDtos.js'
import type Car from './Car.js'

export default interface ICarRepository {
  getAll(): Car[]
  getById(id: number): Car | null
  add(dto: TCarAddDto): Car
  updateById(id: number, dto: TCarUpdateDto): Car | null
  removeById(id: number): boolean
}
