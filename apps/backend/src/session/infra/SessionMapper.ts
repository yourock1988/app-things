import type { ClassOf } from '../../_utils/ClassOf.js'
import type { TSessionAddDto } from '../../_domain/TSessionDtos.js'
import type { TSessionRecord } from './TSessionRecord.js'
import type TSession from '../domain/Session.js'

export default class SessionMapper {
  constructor(readonly Session: ClassOf<TSession>) {}

  toModel(record: TSessionRecord): TSession {
    return new this.Session(
      record.id,
      record.sessionId,
      record.nickname,
      record.createdAt,
      record.updatedAt,
    )
  }

  // eslint-disable-next-line class-methods-use-this
  toRecord(dto: TSessionAddDto): TSessionRecord {
    const sessionRecord: TSessionRecord = {
      id: -1,
      sessionId: crypto.randomUUID(),
      nickname: dto.nickname,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    return sessionRecord
  }
}
