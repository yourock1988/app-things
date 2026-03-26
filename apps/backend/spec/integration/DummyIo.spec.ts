import { io as ioc } from 'socket.io-client'
import { createServer } from 'node:http'
import { AddressInfo } from 'node:net'
import { Server } from 'socket.io'

function waitFor(socket, event) {
  return new Promise(resolve => {
    socket.once(event, resolve)
  })
}

describe('my awesome project', () => {
  let io, serverSocket, clientSocket

  beforeEach(() => {
    return new Promise(resolve => {
      const httpServer = createServer()
      io = new Server(httpServer)
      httpServer.listen(() => {
        const { port } = httpServer.address() as AddressInfo
        clientSocket = ioc(`http://localhost:${port}`)
        io.on('connection', socket => {
          serverSocket = socket
        })
        clientSocket.on('connect', resolve)
      })
    })
  })

  afterEach(() => {
    io.close()
    clientSocket.disconnect()
  })

  it('should work', () => {
    return new Promise(resolve => {
      clientSocket.on('hello', arg => {
        expect(arg).toEqual('world')
        resolve(null)
      })
      serverSocket.emit('hello', 'world')
    })
  })

  it('should work with an acknowledgement', () => {
    return new Promise(resolve => {
      serverSocket.on('hi', cb => {
        cb('hola')
      })
      clientSocket.emit('hi', arg => {
        expect(arg).toEqual('hola')
        resolve(null)
      })
    })
  })

  it('should work with emitWithAck()', async () => {
    serverSocket.on('foo', cb => {
      cb('bar')
    })
    const result = await clientSocket.emitWithAck('foo')
    expect(result).toEqual('bar')
  })

  it('should work with waitFor()', () => {
    clientSocket.emit('baz')

    return waitFor(serverSocket, 'baz')
  })
})

// it('should work', () => {
//   return new Promise(resolve => {
//     clientSocket.on('hello', arg => {
//       expect(arg).toEqual('world')
//       resolve(null)
//     })
//     serverSocket.emit('hello', 'world')
//   })
// })

// it('should work with an acknowledgement', () => {
//   return new Promise(resolve => {
//     serverSocket.on('hi', cb => {
//       cb('hola')
//     })
//     clientSocket.emit('hi', arg => {
//       expect(arg).toEqual('hola')
//       resolve(null)
//     })
//   })
// })

// it('should work with emitWithAck()', async () => {
//   serverSocket.on('foo', cb => {
//     cb('bar')
//   })
//   const result = await clientSocket.emitWithAck('foo')
//   expect(result).toEqual('bar')
// })

// it('should work with waitFor()', () => {
//   clientSocket.emit('baz')

//   return waitFor(serverSocket, 'baz')
// })
