export default function compilePlugin(pluginName, cbMutate, cbInit = () => {}) {
  return store => {
    const moduleName = `${pluginName}Store`
    // eslint-disable-next-line no-underscore-dangle
    const { context } = store._modules.root._children[moduleName]
    const { commit, dispatch } = context
    cbInit(commit, dispatch)
    store.subscribe(({ type }) => {
      // eslint-disable-next-line no-shadow
      const [moduleName, mutatorName] = type.split('/')
      if (moduleName.startsWith(pluginName)) {
        cbMutate(mutatorName, commit, dispatch)
      }
    })
  }
}
