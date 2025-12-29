import EventEmitter from 'node:events'
import RangeVo from '../vos/RangeVo.js'

export default class Teapot extends EventEmitter {
  constructor(
    public readonly id: number,
    public temperature: number,
    public ongoing: 'idle' | 'boiling' = 'idle',
    private intervalId: NodeJS.Timeout | undefined = undefined,
    private readonly range: RangeVo = new RangeVo(0, 100),
  ) {
    super()
  }

  private ready() {
    global.console.log('!!ready')
    this.turnOff()
    this.emit('ready')
  }

  private boil() {
    this.temperature = this.range.calc(this.temperature + 1)
    if (this.temperature === this.range.max) this.ready()
    global.console.log(this.ongoing, this.temperature)
  }

  public turnOn() {
    global.console.log('!!turnOn')
    this.ongoing = 'boiling'
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.boil.bind(this), 100)
  }

  public turnOff() {
    global.console.log('!!turnOff')
    this.ongoing = 'idle'
    clearInterval(this.intervalId)
    this.intervalId = undefined
    global.console.log(this.ongoing, this.temperature)
  }

  public turnDrain() {
    global.console.log('!!turnDrain')
    this.turnOff()
    this.temperature = 0
    global.console.log(this.ongoing, this.temperature)
  }

  public toJSON() {
    const { id, temperature, ongoing } = this
    return { id, temperature, ongoing }
  }
}
