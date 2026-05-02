import EventEmitter from 'node:events'
import { ISessionRepository } from './ISessionRepository.js'
import {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../_domain/TSessionDtos.js'
import Session from './Session.js'

export default class SessionService extends EventEmitter {
  constructor(readonly sessionRepository: ISessionRepository) {
    super()
  }

  getAll(): Session[] {
    const sessions = this.sessionRepository.getAll()
    return sessions
  }

  getById(id: number): Session | null {
    const session = this.sessionRepository.getById(id)
    return session
  }

  add(dto: TSessionAddDto): Session {
    const session = this.sessionRepository.add(dto)
    this.emit('session:added', session)
    return session
  }

  updateById(id: number, dto: TSessionUpdateDto): Session | null {
    const session = this.sessionRepository.updateById(id, { ...dto })
    return session
  }

  removeById(id: number): boolean {
    return this.sessionRepository.removeById(id)
  }

  getBySessionId(sessionId: string): Session | null {
    const session = this.sessionRepository.getBySessionId(sessionId)
    return session
  }
}
