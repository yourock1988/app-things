import type {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../_domain/TSessionDtos.js'
import type Session from './Session.js'

export interface ISessionRepository {
  getAll(): Session[]
  getById(id: number): Session | null
  add(dto: TSessionAddDto): Session
  updateById(id: number, dto: TSessionUpdateDto): Session | null
  removeById(id: number): boolean
  getBySessionId(sessionId: string): Session | null
}
