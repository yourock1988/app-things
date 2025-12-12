import SocketError from './SocketError.js'

export type TAckFn<T> = (error: SocketError | null, result?: T) => void
