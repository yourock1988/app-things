import { TCarAddDto, TCarUpdateDto } from '../dtos/TCarDtos.js'
import Car from '../models/Car.js'

export interface ICarRepository {
  getAll(): Car[]
  getById(id: number): Car | null
  add(dto: TCarAddDto): Car
  updateById(id: number, dto: TCarUpdateDto): Car | null
  removeById(id: number): boolean
}
