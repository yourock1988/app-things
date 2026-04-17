import EventEmitter from 'node:events'
import RangeVo from '../vos/RangeVo.js'

export default class Teapot extends EventEmitter {
  constructor(
    public readonly id: number,
    public temperature: number,
    public ongoing: 'idle' | 'boiling' = 'idle',
    public isOnline: boolean = false,
    private intervalId: NodeJS.Timeout | undefined = undefined,
    private readonly range: RangeVo = new RangeVo(0, 100),
  ) {
    super()
  }

  private ready() {
    // global.console.log(this.id, 'ready!!')
    this.turnOff()
    this.emit('ready')
  }

  private boil() {
    this.temperature = this.range.calc(this.temperature + 1)
    if (this.temperature === this.range.max) this.ready()
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
    const { id, temperature, ongoing, isOnline } = this
    return { id, temperature, ongoing, isOnline }
  }
}
