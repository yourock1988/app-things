export default class Car {
  /* eslint-disable lines-between-class-members */
  private readonly id: number
  private readonly type: string
  private readonly brand: string
  private readonly model: string
  private readonly price: number
  private readonly engine: string
  private readonly hasTurbo: boolean
  private readonly hp: number
  public readonly personId: number
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

  toJSON() {
    return { ...this, isRunning: this.isRunning() }
  }
}
