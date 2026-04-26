import { TSessionAddDto } from '../../core/dtos/TSessionDtos.js'
import { TSessionRecord } from '../types/TSessionRecord.js'
import Session from '../../core/models/Session.js'

export default class SessionMapper {
  static toModel(record: TSessionRecord): Session {
    return new Session(
      record.id,
      record.sessionId,
      record.nickname,
      record.createdAt,
      record.updatedAt,
    )
  }

  static toRecord(dto: TSessionAddDto): TSessionRecord {
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
