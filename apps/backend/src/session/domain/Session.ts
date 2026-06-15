import type ISession from '../../_domain/ISession.ts'

export default class Session implements ISession {
  /* eslint-disable lines-between-class-members */
  readonly id: number
  readonly sessionId: string
  readonly nickname: string
  readonly createdAt: number
  readonly updatedAt: number
  /* eslint-enable lines-between-class-members */

  constructor(
    id: number,
    sessionId: string,
    nickname: string,
    createdAt: number,
    updatedAt: number,
  ) {
    this.id = id
    this.sessionId = sessionId
    this.nickname = nickname
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  toJSON(): Session {
    return { ...this }
  }
}
