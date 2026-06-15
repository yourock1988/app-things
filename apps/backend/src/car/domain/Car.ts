export default class Car {
  /* eslint-disable lines-between-class-members */
  readonly id: number
  readonly type: string
  readonly brand: string
  readonly model: string
  readonly price: number
  readonly engine: string
  readonly hasTurbo: boolean
  readonly hp: number
  readonly personId: number
  /* eslint-enable lines-between-class-members */

  constructor(
    id: number,
    type: string,
    brand: string,
    model: string,
    price: number,
    engine: string,
    hasTurbo: boolean,
    hp: number,
    personId: number,
  ) {
    this.id = id
    this.type = type
    this.brand = brand
    this.model = model
    this.price = price
    this.engine = engine
    this.hasTurbo = hasTurbo
    this.hp = hp
    this.personId = personId
  }

  // eslint-disable-next-line class-methods-use-this
  isRunning(): boolean {
    return Math.random() > 0.5
  }

  toJSON(): Car {
    return { ...this, isRunning: this.isRunning() }
  }
}
