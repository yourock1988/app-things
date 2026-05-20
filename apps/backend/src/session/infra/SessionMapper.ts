import type { TSessionAddDto } from '../../_domain/TSessionDtos.ts'
import type { TSessionRecord } from './TSessionRecord.ts'
import type TSession from '../domain/Session.ts'

export default class SessionMapper {
  private readonly Session: typeof TSession

  constructor(Session: typeof TSession) {
    this.Session = Session
  }

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
