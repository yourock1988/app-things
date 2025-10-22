import { createServer } from 'node:http'
import { Server } from 'socket.io'

export const appIo = createServer()
export const sv = new Server(appIo)
