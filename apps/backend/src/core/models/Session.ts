export default class Session {
  constructor(
    readonly id: number,
    readonly sessionId: string,
    readonly nickname: string,
    readonly createdAt: number,
    readonly updatedAt: number
  ) {}

  toJSON() {
    return { ...this }
  }
}
