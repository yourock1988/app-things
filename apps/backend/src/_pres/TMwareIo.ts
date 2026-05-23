import type { Socket } from 'socket.io'
// import type IAccount from '../_domain/IAccount.ts'

// export type TSocketExt = Socket & {
//   // headersAuth?: { sessionid?: string }
//   headersAuth: { sessionid: string }
//   account?: IAccount | null
//   nickname?: string
// }

export type TMwareIoCtx = {
  socket: Socket
  eventName: string
}

export type TMwareIo = ((
  ctx: TMwareIoCtx,
  args: any[],
  next: (...params: any[]) => void,
) => void) & { msg?: string }
