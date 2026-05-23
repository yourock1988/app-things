import type IAccount from '../src/_domain/IAccount.ts'

declare module 'socket.io' {
  interface Socket {
    // headersAuth: { sessionid: string }
    headersAuth: any
    account: IAccount | null
    nickname: string
  }
}
