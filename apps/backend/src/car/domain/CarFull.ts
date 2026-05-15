import type IPerson from '../../_domain/IPerson.js'
import type Car from './Car.js'

export default class CarFull {
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
  readonly person: IPerson
  /* eslint-enable lines-between-class-members */

  constructor(car: Car, person: IPerson) {
    this.id = car.id
    this.type = car.type
    this.brand = car.brand
    this.model = car.model
    this.price = car.price
    this.engine = car.engine
    this.hasTurbo = car.hasTurbo
    this.hp = car.hp
    this.personId = car.personId
    this.person = person
  }

  // eslint-disable-next-line class-methods-use-this
  isRunning() {
    return Math.random() > 0.5
  }

  run() {
    return this.person.isOnline && this.isRunning()
  }

  toJSON() {
    return { ...this, isRunning: this.isRunning() }
  }
}
