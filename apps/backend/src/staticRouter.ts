import { fileURLToPath } from 'node:url'
import express from 'express'
import path from 'node:path'

const staticRouter = express.Router()
const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const isDevDir = dirName.includes('build')
const baseDir = path.join(dirName, '..', '..')
const staticDir = isDevDir
  ? path.join(baseDir, 'apps', 'backend', 'static')
  : path.join(baseDir, 'dist', 'server', 'static')

staticRouter.use('/static', express.static(staticDir))
if (!isDevDir) {
  const clientDir = path.join(baseDir, 'dist', 'client')
  staticRouter.use('/assets', express.static(path.join(clientDir, 'assets')))
  staticRouter.use('/{*every}', express.static(path.join(clientDir)))
}

export default staticRouter
