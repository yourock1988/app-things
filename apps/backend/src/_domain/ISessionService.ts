import type { TSessionAddDto, TSessionUpdateDto } from './TSessionDtos.js'
import type ISession from './ISession.js'

export default interface ISessionService {
  getAll(): ISession[]

  getById(id: number): ISession | null

  getBySessionId(sessionId: string): ISession | null

  add(dto: TSessionAddDto): ISession | null

  updateById(id: number, dto: TSessionUpdateDto): ISession | null

  removeById(id: number): boolean

  on(type: string, listener: (arg: any) => void): this

  emit(eventName: string | symbol, ...args: any): boolean
}
