import type {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../_domain/TSessionDtos.ts'
import type ISession from '../../_domain/ISession.ts'

export interface ISessionRepository {
  getAll(): ISession[]
  getById(id: number): ISession | null
  add(dto: TSessionAddDto): ISession
  updateById(id: number, dto: TSessionUpdateDto): ISession | null
  removeById(id: number): boolean
  getBySessionId(sessionId: string): ISession | null
}
