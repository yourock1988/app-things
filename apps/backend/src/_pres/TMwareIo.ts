import type { Socket } from 'socket.io'
// import type IAccount from '../_domain/IAccount.ts'

// export type TSocketExt = Socket & {
//   headersAuth: { sessionid: string }
//   account?: IAccount | null
//   nickname?: string
// }

type TNextFnErr = { message: string; data: number }

type TAckFnErr = null | number | { _errors: string[] }

type TAckFn = (err: TAckFnErr, data?: unknown) => void

type TCtx = { socket: Socket; eventName: string }

type TArgs<D> = [{ id: number }, D, TAckFn]

type TNextFn = (err?: TNextFnErr) => void

export type TMwareIo<D = unknown> = ((
  ctx: TCtx,
  args: TArgs<D>,
  next: TNextFn,
) => void) & {
  msg?: string
}
