import type { TPersonAddDto, TPersonUpdateDto } from './TPersonDtos.ts'
import type IPerson from './IPerson.ts'

export default interface IPersonService {
  getAll(): IPerson[]

  getById(id: number): IPerson | null

  add(dto: TPersonAddDto): IPerson

  updateById(id: number, dto: TPersonUpdateDto): IPerson | null

  removeById(id: number): boolean
}
