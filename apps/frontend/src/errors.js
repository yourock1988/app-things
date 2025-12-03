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

export class HttpStatusError extends Error {
  constructor(message) {
    super(JSON.stringify(message))
    this.name = this.constructor.name
  }

  get msg() {
    return JSON.parse(this.message)
  }
}
