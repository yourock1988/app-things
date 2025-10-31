export default class SocketError extends Error {
  constructor(readonly code: number, readonly methodName: string) {
    super(code + methodName)
  }

  toJSON() {
    return {
      code: this.code,
      methodName: this.methodName,
    }
  }
}
