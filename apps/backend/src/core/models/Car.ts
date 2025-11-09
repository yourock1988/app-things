export default class Car {
  constructor(
    readonly id: number,
    readonly type: string,
    readonly brand: string,
    readonly model: string,
    readonly price: number,
    readonly engine: string,
    readonly hasTurbo: boolean,
    readonly hp: number
  ) {}

  // eslint-disable-next-line class-methods-use-this
  isRunning() {
    return Math.random() > 0.5
  }

  toJSON() {
    return { ...this, isRunning: this.isRunning() }
  }
}
