import { TSessionRecord } from '../../infra/repositories/TSessionRecord.js'

const sessionsTable: TSessionRecord[] = [
  {
    id: 11,
    sessionId: 'abcdef',
    nickname: 'admin',
    createdAt: 1234567890,
    updatedAt: 1234567890,
  },
  {
    id: 12,
    sessionId: 'fedcba',
    nickname: 'ooo',
    createdAt: 1234567890,
    updatedAt: 1234567890,
  },
]

export default sessionsTable
