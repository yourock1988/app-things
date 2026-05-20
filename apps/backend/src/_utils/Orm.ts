import randId from './randId.ts'

export default class Orm<T extends { id: number }> {
  private readonly table: T[]

  constructor(table: T[]) {
    this.table = table
  }

  selectAll(): T[] {
    return this.table
  }

  selectById(id: number): T | null {
    return this.table.find(u => u.id === id) ?? null
  }

  insert(protoRecord: any): T {
    const appendedRecord = { ...protoRecord, id: randId() }
    this.table.push(appendedRecord)
    return appendedRecord
  }

  updateById(id: number, dto: any): T | null {
    const record = this.selectById(id)
    if (record) Object.assign(record, dto)
    return record
  }

  delete(id: number): boolean {
    const idx = this.table.findIndex(u => u.id === id)
    if (idx > -1) {
      this.table.splice(idx, 1)
      return true
    }
    return false
  }

  selectByPropName(propName: keyof T, nickname: string): T | null {
    return this.table.find(u => u[propName] === nickname) ?? null
  }
}
