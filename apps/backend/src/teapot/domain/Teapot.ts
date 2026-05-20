import EventEmitter from 'node:events'
import type RangeVo from './RangeVo.ts'

export default class Teapot extends EventEmitter {
  /* eslint-disable lines-between-class-members */
  private static range: RangeVo | null
  static inject(range: RangeVo) {
    Teapot.range = range
  }
  readonly id: number
  temperature: number
  readonly accountId: number
  ongoing: 'idle' | 'boiling' = 'idle'
  isOnline: boolean = false
  private intervalId: NodeJS.Timeout | undefined = undefined
  /* eslint-enable lines-between-class-members */

  constructor(id: number, temperature: number, accountId: number) {
    super()
    this.id = id
    this.temperature = temperature
    this.accountId = accountId
  }

  private ready() {
    // global.console.log(this.id, 'ready!!')
    this.turnOff()
    this.emit('ready')
  }

  private boil() {
    this.temperature = Teapot.range?.calc(this.temperature + 1) ?? 0
    if (Teapot.range?.isMax(this.temperature)) this.ready()
    // global.console.log(this.id, this.ongoing, this.temperature)
  }

  public turnOn() {
    // global.console.log(this.id, 'turnOn!!')
    if (!this.isOnline) return false
    if (this.ongoing === 'boiling' || this.temperature === 100) return false
    this.ongoing = 'boiling'
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.boil.bind(this), 100)
    return true
  }

  public turnOff() {
    // global.console.log(this.id, 'turnOff!!')
    if (!this.isOnline) return false
    if (this.ongoing === 'idle') return false
    this.ongoing = 'idle'
    clearInterval(this.intervalId)
    this.intervalId = undefined
    // global.console.log(this.id, this.ongoing, this.temperature)
    return true
  }

  public turnDrain() {
    // global.console.log(this.id, 'turnDrain!!')
    if (!this.isOnline) return false
    if (this.temperature === 0 && this.ongoing === 'idle') return false
    this.turnOff()
    this.temperature = 0
    // global.console.log(this.id, this.ongoing, this.temperature)
    return true
  }

  get isBoiled() {
    return this.temperature === 100 && this.ongoing === 'idle'
  }

  get isBoiling() {
    return this.ongoing === 'boiling'
  }

  public toJSON() {
    const { id, temperature, ongoing, isOnline, accountId } = this
    return { id, temperature, ongoing, isOnline, accountId }
    // TODO: accountId пока тут для тестов. потом нужно убрать
  }
}
