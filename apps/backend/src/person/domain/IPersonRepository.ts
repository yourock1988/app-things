import type { TPersonAddDto, TPersonUpdateDto } from './TPersonDtos.js'
import type Person from './Person.js'

export default interface IPersonRepository {
  getAll(): Person[]
  getById(id: number): Person | null
  add(dto: TPersonAddDto): Person
  updateById(id: number, dto: TPersonUpdateDto): Person | null
  removeById(id: number): boolean
}
