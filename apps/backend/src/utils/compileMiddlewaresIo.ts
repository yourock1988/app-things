export default function compileMiddlewaresIo(middlewaresMap: any) {
  return function ([event, ...args]: any[], next: any) {
    global.console.log('hi, i am compiled middleware')
    if (middlewaresMap[event]) middlewaresMap[event](args, next)
    else next()
  }
}
