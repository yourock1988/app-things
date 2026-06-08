import type Teapot from './Teapot.ts'

export default class TeapotOnline {
  private map: Map<number, Teapot>

  // походу нужно инжектировать репозиторий сюда, но я хз
  constructor() {
    this.map = new Map()
  }

  isOnlineById(id: number): boolean {
    return this.map.has(id)
  }

  getAll(): MapIterator<Teapot> {
    return this.map.values()
  }

  getById(id: number): Teapot | null {
    return this.map.get(id) ?? null
  }

  join(teapot: Teapot): boolean {
    if (this.isOnlineById(teapot.id)) return false
    // eslint-disable-next-line no-param-reassign
    teapot.isOnline = true
    this.map.set(teapot.id, teapot)
    return true
  }

  leaveById(id: number): boolean {
    // при выходе нужно сохранить состояние в базу данных
    const teapot = this.getById(id)
    if (!teapot) return false
    teapot.isOnline = false
    return this.map.delete(id)
  }
}
