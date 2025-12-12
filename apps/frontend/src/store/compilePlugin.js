export default function compilePlugin(pluginName, callback) {
  return store =>
    store.subscribe(({ type }) => {
      const [moduleName, mutatorName] = type.split('/')
      if (moduleName === pluginName) {
        // eslint-disable-next-line no-underscore-dangle
        const { commit } = store._modules.root._children[moduleName].context
        callback(mutatorName, commit)
      }
    })
}
