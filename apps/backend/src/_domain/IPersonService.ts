import type EventEmitter from 'node:events'
import type IPerson from './IPerson.js'
import type { TPersonAddDto, TPersonUpdateDto } from './TPersonDtos.js'

export default interface IPersonService extends EventEmitter {
  getAll(): IPerson[]

  getById(id: number): IPerson | null

  add(dto: TPersonAddDto): IPerson

  updateById(id: number, dto: TPersonUpdateDto): IPerson | null

  removeById(id: number): boolean
}
