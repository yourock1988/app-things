export default class SocketError extends Error {
  public data: object

  constructor(
    readonly code: number,
    readonly cause: string,
    readonly message: string,
    readonly details?: object,
  ) {
    super(message, { cause })
    this.data = {
      code,
      cause,
    }
  }

  toJSON() {
    return {
      code: this.code,
      cause: this.cause,
      message: this.message,
      details: this.details ?? this.code, // дыбилизм
    }
  }
}
