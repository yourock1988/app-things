import type {
  TPersonAddDto,
  TPersonUpdateDto,
} from '../../_domain/TPersonDtos.ts'
import type IPerson from '../../_domain/IPerson.ts'
import type IPersonService from '../../_domain/IPersonService.ts'
import type IPersonRepository from './IPersonRepository.ts'

export default class PersonService implements IPersonService {
  private readonly personRepository: IPersonRepository

  constructor(personRepository: IPersonRepository) {
    this.personRepository = personRepository
  }

  getAll(): IPerson[] {
    const persons = this.personRepository.getAll()
    return persons
  }

  getById(id: number): IPerson | null {
    const person = this.personRepository.getById(id)
    return person
  }

  add(dto: TPersonAddDto): IPerson {
    const person = this.personRepository.add(dto)
    return person
  }

  updateById(id: number, dto: TPersonUpdateDto): IPerson | null {
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
