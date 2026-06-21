import type { Server, Namespace } from 'socket.io'
import type { TMwareIo } from '../../_pres/TMwareIo.ts'
import type PersonService from '../domain/PersonService.ts'
import type {
  TPersonAddDto,
  TPersonUpdateDto,
} from '../../_domain/TPersonDtos.ts'

export default class PersonControllerIo {
  private personNamespace: Namespace | null = null

  private io: Server | null = null

  private personService: PersonService

  constructor(personService: PersonService) {
    this.personService = personService
    // personService.on('bc-sv:person:added', (person: Person) =>
    //   this.io?.emit('person:added', person),
    // )
  }

  init(personNamespace: Namespace, io: Server): void {
    this.personNamespace = personNamespace
    this.io = io
    this.io.to('room-101').emit('foo', 'bar')
    this.personNamespace.emit('foo', 'bar')
  }

  getAll: TMwareIo = (_, args) => {
    const [, , ack] = args
    const persons = this.personService.getAll()
    ack?.(null, persons)
  }

  getById: TMwareIo = (_, args) => {
    const [{ id }, , ack] = args
    const person = this.personService.getById(+id)
    if (person) ack?.(null, person)
    else ack?.(404)
  }

  add: TMwareIo<TPersonAddDto> = (ctx, args) => {
    const [, dto, ack] = args
    const person = this.personService.add(dto).toJSON()
    ack?.(null, person)
    ctx.socket.broadcast.emit('bc-cl:person:added', person)
    // this.io.emit('bc-sv:person:added', person)
  }

  updateById: TMwareIo<TPersonUpdateDto> = (ctx, args) => {
    const [{ id }, dto, ack] = args
    const person = this.personService.updateById(id, dto)
    if (person) {
      const personJson = person.toJSON()
      ack?.(null, personJson)
      ctx.socket.broadcast.emit('bc-cl:person:updated', personJson)
    } else {
      ack?.(404)
    }
  }

  removeById: TMwareIo = (ctx, args) => {
    const [{ id }, , ack] = args
    const hasBeenExists = this.personService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit('bc-cl:person:deleted', id)
    } else {
      ack?.(404)
    }
  }
}
