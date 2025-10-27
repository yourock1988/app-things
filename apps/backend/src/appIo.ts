import { createServer } from 'node:http'
import { Server } from 'socket.io'

export const appIo = createServer()
export const io = new Server(appIo)
