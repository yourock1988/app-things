import SocketNamespace from './SocketNamespace.js'

export default class IoNamespaces extends Map {
  switchSession(sessionid) {
    this.values().forEach(nsp => nsp.switchSession(sessionid))
  }

  restart() {
    this.values().forEach(nsp => nsp.restart())
  }

  stop() {
    this.values().forEach(nsp => nsp.stop())
  }

  add(namespace) {
    return this.set(namespace, new SocketNamespace(namespace)).get(namespace)
  }
}

export const ioNamespaces = new IoNamespaces()

// ioNamespaces['/cars'].restart()
// ioNamespaces['/cars'].s.on()
// ioNamespaces['/cars'].s.emit()
// ioNamespaces['/cars'].s.open()
// ioNamespaces['/cars'].s.close()
// ioNamespaces['/cars'].switchSession('ffaabbcc')
// ioNamespaces['/cars'].restart()
// ioNamespaces['/cars'].stop()

// ioNamespaces.switchSession('ffaabbcc')
// ioNamespaces.restart()
// ioNamespaces.stop()

// const map = new Map()

// console.log(map.set('a', 'b'))
// console.log(map.set('c', 'd').get('c'))
