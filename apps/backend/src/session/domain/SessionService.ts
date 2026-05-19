import type { ISessionRepository } from './ISessionRepository.js'
import type {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../_domain/TSessionDtos.js'
import type ISessionService from '../../_domain/ISessionService.js'
import type ISession from '../../_domain/ISession.js'

export default class SessionService implements ISessionService {
  private readonly sessionRepository: ISessionRepository

  constructor(sessionRepository: ISessionRepository) {
    this.sessionRepository = sessionRepository
  }

  getAll(): ISession[] {
    const sessions = this.sessionRepository.getAll()
    return sessions
  }

  getById(id: number): ISession | null {
    const session = this.sessionRepository.getById(id)
    return session
  }

  add(dto: TSessionAddDto): ISession {
    const session = this.sessionRepository.add(dto)
    return session
  }

  updateById(id: number, dto: TSessionUpdateDto): ISession | null {
    const session = this.sessionRepository.updateById(id, { ...dto })
    return session
  }

  removeById(id: number): boolean {
    return this.sessionRepository.removeById(id)
  }

  getBySessionId(sessionId: string): ISession | null {
    const session = this.sessionRepository.getBySessionId(sessionId)
    return session
  }
}
