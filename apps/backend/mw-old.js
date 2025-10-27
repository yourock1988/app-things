// function validateUserAddSchema(args: any, next: any) {
//   global.console.log('validateUserAddSchema')
//   const [data, ack] = args
//   if (data.nickname === 'YouROCK22') {
//     next()
//   } else {
//     ack({ errmsg: 'incorrect username' })
//   }
// }

// const middlewaresAuthorizeMap = {
//   'user:add': authorizeSocket,
// }

// socket.use(compileMiddlewares(middlewaresAuthorizeMap))

// socket.use(([event, ...args], next) => {
//   if (event === 'user:add') {
//     const [data, ack] = args
//     if (data.nickname === 'YouROCK22') {
//       next()
//     } else {
//       ack({ errmsg: 'incorrect username' })
//     }
//   }
// })
