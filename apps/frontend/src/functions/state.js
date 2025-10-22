function state(namespace, storeName, mutationName, isDispatch = false) {
  const command = isDispatch ? 'dispatch' : 'commit'
  return {
    get() {
      return this.$store.state[namespace][storeName]
    },
    set(newValue) {
      this.$store[command](`${namespace}/${mutationName}`, newValue)
    },
  }
}

export default state
