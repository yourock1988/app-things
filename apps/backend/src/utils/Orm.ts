import randId from './randId.js'

export default class Orm {
  constructor(readonly table: any[]) {}

  selectAll() {
    return this.table
  }

  selectById(id: number) {
    return this.table.find(u => u.id === id) ?? null
  }

  insert(dto: any) {
    const record = { ...dto, id: randId() }
    this.table.push(record)
    return record
  }

  update(dto: any) {
    const record = this.selectById(dto.id)
    if (record) Object.assign(record, dto)
    return record
  }

  delete(id: number) {
    const idx = this.table.findIndex(u => u.id === id)
    if (idx > -1) this.table.splice(idx, 1)
  }
}
