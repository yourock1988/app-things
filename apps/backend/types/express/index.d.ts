import 'express'

declare global {
  namespace Express {
    interface Request {
      locals?: any
    }
  }
}

// import * as express from 'express'

// declare global {
//   namespace Express {
//     interface Request {
//       locals: any
//     }
//   }
// }

// import * as express from 'express'

// import { Express } from 'express'

// import { Request } from 'express'

// declare global {
//   namespace Express {
//     // Под капотом это расширяет интерфейс из express-serve-static-core
//     interface Request {
//       locals: any
//     }
//   }
// }

// declare module 'express-serve-static-core' {
//   export interface Request {
//     locals?: any
//   }
// }

// export {}

// declare module 'express' {
//   interface Request {
//     locals: any
//   }
// }

// declare namespace Express {
//   export interface Request {
//     user?: {
//       id: number
//       name: string
//     }
//     locals?: any
//   }
// }

// declare module 'express-serve-static-core' {
//   interface Request {
//     locals?: any
//   }
// }

// declare module 'express-serve-static-core' {
//   interface Request {
//     locals?: any
//   }
// }

// import 'express'

// declare global {
//   namespace Express {
//     interface Request {
//       locals: any
//     }
//   }
// }

// declare module '@yourock88' {}

// import { Express } from 'express'
// import * as express from 'express'

// declare module 'express-serve-static-core' {
//   export interface Request {
//     locals?: any
//   }
// }

// import { Request } from 'express'
// import { Express } from 'express'

// import * as express from 'express'

// declare global {
//   namespace Express {
//     // Под капотом это расширяет интерфейс из express-serve-static-core
//     interface Request {
//       locals: any
//     }
//   }
// }

// declare module 'express-serve-static-core' {
//   export interface Request {
//     locals?: any
//   }
// }

// export {}
