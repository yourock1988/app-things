import type { TCarAddDto, TCarUpdateDto } from './TCarDtos.ts'
import type Car from './Car.ts'

export default interface ICarRepository {
  getAll(): Car[]
  getById(id: number): Car | null
  add(dto: TCarAddDto): Car
  updateById(id: number, dto: TCarUpdateDto): Car | null
  removeById(id: number): boolean
}
