import type { ISessionRepository } from '../domain/ISessionRepository.js'
import type {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../_domain/TSessionDtos.js'
import type { TSessionRecord } from './TSessionRecord.js'
import type SessionMapper from './SessionMapper.js'
import type ISession from '../../_domain/ISession.js'
import type Orm from '../../_utils/Orm.js'

export default class SessionRepositoryDb implements ISessionRepository {
  private readonly orm: Orm<TSessionRecord>

  private readonly sessionMapper: SessionMapper

  constructor(orm: Orm<TSessionRecord>, sessionMapper: SessionMapper) {
    this.orm = orm
    this.sessionMapper = sessionMapper
  }

  getAll(): ISession[] {
    const records: TSessionRecord[] = this.orm.selectAll()
    return records.map(this.sessionMapper.toModel)
  }

  getById(id: number): ISession | null {
    const record = this.orm.selectById(id)
    return record ? this.sessionMapper.toModel(record) : null
  }

  add(dto: TSessionAddDto): ISession {
    const record = this.sessionMapper.toRecord(dto)
    const appendedRecord: TSessionRecord = this.orm.insert(record)
    return this.sessionMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TSessionUpdateDto): ISession | null {
    const record = this.orm.updateById(id, dto)
    return record ? this.sessionMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }

  getBySessionId(sessionId: string): ISession | null {
    // const record: TSessionRecord = this.orm.selectBySessionId(sessionId)
    const record = this.orm.selectByPropName('sessionId', sessionId)
    return record ? this.sessionMapper.toModel(record) : null
  }
}
