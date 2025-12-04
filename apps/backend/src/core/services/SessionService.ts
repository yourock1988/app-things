import EventEmitter from 'node:events'
import { ISessionRepository } from '../i-repositories/ISessionRepository.js'
import { TSessionAddDto, TSessionUpdateDto } from '../dtos/TSessionDtos.js'
import Session from '../models/Session.js'

export default class SessionService extends EventEmitter {
  constructor(readonly sessionRepository: ISessionRepository) {
    super()
  }

  getAll(): Session[] {
    const sessions = this.sessionRepository.getAll()
    // sessions.forEach(session => session.sayHello('all'))
    return sessions
  }

  getById(id: number): Session | null {
    const session = this.sessionRepository.getById(id)
    // session?.sayHello('only')
    return session
  }

  add(dto: TSessionAddDto): Session {
    const session = this.sessionRepository.add(dto)
    // session.sayHello('new')
    this.emit('session:added', session)
    return session
  }

  updateById(id: number, dto: TSessionUpdateDto): Session | null {
    const session = this.sessionRepository.updateById(id, { ...dto })
    // session?.sayHello('upd')
    return session
  }

  removeById(id: number): boolean {
    return this.sessionRepository.removeById(id)
  }
}
