import type ISession from '../../_domain/ISession.js'

export default class Session implements ISession {
  constructor(
    readonly id: number,
    readonly sessionId: string,
    readonly nickname: string,
    readonly createdAt: number,
    readonly updatedAt: number,
  ) {}

  toJSON() {
    return { ...this }
  }
}
