import type { ISessionRepository } from '../domain/ISessionRepository.js'
import type {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../_domain/TSessionDtos.js'
import type { TSessionRecord } from './TSessionRecord.js'
import type SessionMapper from './SessionMapper.js'
import type Session from '../domain/Session.js'
import type Orm from '../../_utils/Orm.js'

export default class SessionRepositoryDb implements ISessionRepository {
  constructor(
    readonly orm: Orm,
    readonly sessionMapper: SessionMapper,
  ) {}

  getAll(): Session[] {
    const records: TSessionRecord[] = this.orm.selectAll()
    return records.map(this.sessionMapper.toModel)
  }

  getById(id: number): Session | null {
    const record: TSessionRecord = this.orm.selectById(id)
    return record ? this.sessionMapper.toModel(record) : null
  }

  add(dto: TSessionAddDto): Session {
    const record = this.sessionMapper.toRecord(dto)
    const appendedRecord: TSessionRecord = this.orm.insert(record)
    return this.sessionMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TSessionUpdateDto): Session | null {
    const record: TSessionRecord = this.orm.updateById(id, dto)
    return record ? this.sessionMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }

  getBySessionId(sessionId: string): Session | null {
    const record: TSessionRecord = this.orm.selectBySessionId(sessionId)
    return record ? this.sessionMapper.toModel(record) : null
  }
}
