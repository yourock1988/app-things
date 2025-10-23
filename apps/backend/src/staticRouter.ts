import { fileURLToPath } from 'node:url'
import express from 'express'
import path from 'node:path'

const staticRouter = express()
const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const isDevDir = dirName.includes('build')
const baseDir = path.join(dirName, '..', '..')

const staticDir = isDevDir
  ? path.join(baseDir, 'apps', 'backend', 'static')
  : path.join(baseDir, 'dist', 'server', 'static')

// global.console.log('__dirname :>> ', dirName)
// global.console.log('isDevDir :>> ', isDevDir)
// global.console.log('baseDir :>> ', baseDir)
// global.console.log('staticDir :>> ', staticDir)

// let x: number = 's'

// console.log('F')

// let a1 = path.join(baseDir, 'dist', 'server', 'static')
// console.log('====', path.join(a1, '..', '..', 'client'))

staticRouter.use('/static', express.static(staticDir))

if (!isDevDir) {
  const clientDir = path.join(staticDir, '..', '..', 'client')
  global.console.log('clientDir :>> ', clientDir)
  staticRouter.use('/assets', express.static(path.join(clientDir, 'assets')))
  // staticRouter.use('/products', express.static(clientDir))
  // staticRouter.use('/product', express.static(clientDir))
  // staticRouter.use('/cart', express.static(clientDir))
}

export default staticRouter
