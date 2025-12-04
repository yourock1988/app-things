/* eslint-disable max-classes-per-file */

export class FetchRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

export class ParseJsonError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

export class HttpEmptyError extends Error {
  constructor(cause) {
    super('HttpEmptyError', { cause })
    this.name = this.constructor.name
  }
}

export class HttpRespError extends Error {
  constructor(cause) {
    super('HttpRespError', { cause })
    this.name = this.constructor.name
  }
}
