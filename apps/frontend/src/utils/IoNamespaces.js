import IoNamespace from './IoNamespace.js'

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
    return this.set(namespace, new IoNamespace(namespace)).get(namespace)
  }
}

export const ioNamespaces = new IoNamespaces()
