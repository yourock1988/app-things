import EventEmitter from 'node:events'
import type IPersonRepository from './IPersonRepository.js'
import type { TPersonAddDto, TPersonUpdateDto } from './TPersonDtos.js'
import type Person from './Person.js'

export default class PersonService extends EventEmitter {
  constructor(readonly personRepository: IPersonRepository) {
    super()
  }

  getAll(): Person[] {
    const persons = this.personRepository.getAll()
    return persons
  }

  getById(id: number): Person | null {
    const person = this.personRepository.getById(id)
    return person
  }

  add(dto: TPersonAddDto): Person {
    const person = this.personRepository.add(dto)
    this.emit('person:added', person)
    return person
  }

  updateById(id: number, dto: TPersonUpdateDto): Person | null {
    const person = this.personRepository.updateById(id, {
      ...dto,
      money: dto.money * 10,
    })
    return person
  }

  removeById(id: number): boolean {
    return this.personRepository.removeById(id)
  }
}
