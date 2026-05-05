import type { Server, Namespace } from 'socket.io'
import type PersonService from '../domain/PersonService.js'
import type Person from '../domain/Person.js'

export default class PersonControllerIo {
  private personNamespace: Namespace | null = null

  private io: Server | null = null

  private personService: PersonService

  constructor(personService: PersonService) {
    this.personService = personService
    personService.on('bc-sv:person:added', (person: Person) =>
      this.io?.emit('person:added', person),
    )
  }

  init(personNamespace: Namespace, io: Server) {
    this.personNamespace = personNamespace
    this.io = io
  }

  getAll(ctx, args) {
    const ack = args.at(2)
    const persons = this.personService.getAll()
    ack?.(null, persons)
  }

  getById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const person = this.personService.getById(+id)
    if (person) ack?.(null, person)
    else ack?.(404)
  }

  add(ctx, args) {
    const ack = args.at(2)
    const dto = args.at(1)
    const person = this.personService.add(dto).toJSON()
    ack?.(null, person)
    ctx.socket.broadcast.emit('bc-cl:person:added', person)
    // this.io.emit('bc-sv:person:added', person)
  }

  updateById(ctx, args) {
    const { id } = args.at(0)
    const dto = args.at(1)
    const ack = args.at(2)
    const person = this.personService.updateById(id, dto)
    if (person) {
      const personJson = person.toJSON()
      ack?.(null, personJson)
      ctx.socket.broadcast.emit('bc-cl:person:updated', personJson)
    } else {
      ack?.(404)
    }
  }

  removeById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const hasBeenExists = this.personService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit('bc-cl:person:deleted', id)
    } else {
      ack?.(404)
    }
  }
}
