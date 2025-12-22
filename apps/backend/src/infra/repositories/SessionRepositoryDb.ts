import { ISessionRepository } from '../../core/i-repositories/ISessionRepository.js'
import {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../core/dtos/TSessionDtos.js'
import { TSessionRecord } from '../types/TSessionRecord.js'
import SessionMapper from '../mappers/SessionMapper.js'
import Session from '../../core/models/Session.js'
import Orm from '../../utils/Orm.js'

export default class SessionRepositoryDb implements ISessionRepository {
  constructor(readonly orm: Orm) {}

  getAll(): Session[] {
    const records: TSessionRecord[] = this.orm.selectAll()
    return records.map(SessionMapper.toModel)
  }

  getById(id: number): Session | null {
    const record: TSessionRecord = this.orm.selectById(id)
    return record ? SessionMapper.toModel(record) : null
  }

  add(dto: TSessionAddDto): Session {
    const record = SessionMapper.toRecord(dto)
    const appendedRecord: TSessionRecord = this.orm.insert(record)
    return SessionMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TSessionUpdateDto): Session | null {
    const record: TSessionRecord = this.orm.updateById(id, dto)
    return record ? SessionMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }

  getBySessionId(sessionId: string): Session | null {
    const record: TSessionRecord = this.orm.selectBySessionId(sessionId)
    return record ? SessionMapper.toModel(record) : null
  }
}
