import type { TPersonAddDto, TPersonUpdateDto } from './TPersonDtos.js'
import type IPerson from './IPerson.js'

export default interface IPersonService {
  getAll(): IPerson[]

  getById(id: number): IPerson | null

  add(dto: TPersonAddDto): IPerson

  updateById(id: number, dto: TPersonUpdateDto): IPerson | null

  removeById(id: number): boolean
}
