import type ISession from '../../_domain/ISession.js'

export default class Session implements ISession {
  /* eslint-disable lines-between-class-members */
  private readonly id: number
  private readonly sessionId: string
  public readonly nickname: string
  private readonly createdAt: number
  private readonly updatedAt: number
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

  toJSON() {
    return { ...this }
  }
}
