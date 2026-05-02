import EventEmitter from 'node:events'
import Teapot from './Teapot.js'

export default class TeapotOnline extends EventEmitter {
  private map: Map<number, Teapot>

  // походу нужно инжектировать репозиторий сюда, но я хз
  constructor() {
    super()
    this.map = new Map()
  }

  isOnlineById(id: number) {
    return this.map.has(id)
  }

  getAll() {
    return this.map.values()
  }

  getById(id: number) {
    return this.map.get(id) ?? null
  }

  join(teapot: Teapot) {
    if (this.isOnlineById(teapot.id)) return false
    // eslint-disable-next-line no-param-reassign
    teapot.isOnline = true
    this.map.set(teapot.id, teapot)
    return true
  }

  leaveById(id: number) {
    // при выходе нужно сохранить состояние в базу данных
    const teapot = this.getById(id)
    if (!teapot) return false
    teapot.isOnline = false
    return this.map.delete(id)
  }
}
