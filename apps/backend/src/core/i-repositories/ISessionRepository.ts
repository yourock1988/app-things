import { TSessionAddDto, TSessionUpdateDto } from '../dtos/TSessionDtos.js'
import Session from '../models/Session.js'

export interface ISessionRepository {
  getAll(): Session[]
  getById(id: number): Session | null
  add(dto: TSessionAddDto): Session
  updateById(id: number, dto: TSessionUpdateDto): Session | null
  removeById(id: number): boolean
  getBySessionId(sessionId: string): Session | null
}
