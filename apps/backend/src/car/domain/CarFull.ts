import type IPerson from '../../_domain/IPerson.ts'
import type Car from './Car.ts'

export default class CarFull {
  /* eslint-disable lines-between-class-members */
  private readonly id!: number
  private readonly type!: string
  private readonly brand!: string
  private readonly model!: string
  private readonly price!: number
  private readonly engine!: string
  private readonly hasTurbo!: boolean
  private readonly hp!: number
  private readonly personId!: number
  private readonly person: IPerson
  /* eslint-enable lines-between-class-members */

  constructor(car: Car, person: IPerson) {
    const carJson = car.toJSON()
    Object.assign(this, carJson)
    // this.id = carJson.id
    // this.type = carJson.type
    // this.brand = carJson.brand
    // this.model = carJson.model
    // this.price = carJson.price
    // this.engine = carJson.engine
    // this.hasTurbo = carJson.hasTurbo
    // this.hp = carJson.hp
    // this.personId = carJson.personId
    this.person = person
  }

  // eslint-disable-next-line class-methods-use-this
  isRunning(): boolean {
    return Math.random() > 0.5
  }

  run(): boolean {
    return this.person.isOnline && this.isRunning()
  }

  toJSON() {
    return { ...this, isRunning: this.isRunning() }
  }
}
