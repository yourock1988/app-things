import type {
  TPersonAddDto,
  TPersonUpdateDto,
} from '../../_domain/TPersonDtos.js'
import IPerson from '../../_domain/IPerson.js'

export default interface IPersonRepository {
  getAll(): IPerson[]
  getById(id: number): IPerson | null
  add(dto: TPersonAddDto): IPerson
  updateById(id: number, dto: TPersonUpdateDto): IPerson | null
  removeById(id: number): boolean
}
