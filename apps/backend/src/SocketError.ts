export default class SocketError extends Error {
  constructor(
    readonly code: number,
    readonly cause: string,
    readonly message: string,
    readonly details?: object,
  ) {
    super(message, { cause })
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
