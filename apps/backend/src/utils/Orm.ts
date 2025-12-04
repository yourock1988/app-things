import randId from './randId.js'

export default class Orm {
  constructor(readonly table: any[]) {}

  selectAll() {
    return this.table
  }

  selectById(id: number) {
    return this.table.find(u => u.id === id) ?? null
  }

  insert(record: any) {
    // TODO: убрать randId в mapper
    const appendedRecord = { ...record, id: randId() }
    this.table.push(appendedRecord)
    return appendedRecord
  }

  updateById(id: number, dto: any) {
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

  selectByNickname(nickname: string) {
    return this.table.find(u => u.nickname === nickname) ?? null
  }

  selectBySessionId(sessionId: string) {
    return this.table.find(u => u.sessionId === sessionId) ?? null
  }
}
