/* eslint-disable no-param-reassign */

import type { Socket } from 'socket.io'
import CoR from './CoR.ts'
// eslint-disable-next-line boundaries/dependencies
import type { TMwareIo } from '../_pres/TMwareIo.ts'

type TChain = { on<D>(eventName: string, ...handlers: TMwareIo<D>[]): TChain }

export default function listen(socket: Socket): TChain {
  return {
    on(eventName, ...handlers) {
      const ctx = {
        socket,
        eventName,
      }
      socket.on(eventName, (...args) => {
        args[0] = { id: args[0] }
        CoR(...handlers)(ctx, args)
      })
      return this
    },
  }
}
