const path = require('path')

const rootPath = path.join(__dirname, '..', '..')
const frontendPath = path.join(rootPath, 'apps', 'frontend')

const PATHS = {
  configBabel: path.join(rootPath, 'packages', 'babel-config'),
  public: path.join(frontendPath, 'public'),
  build: path.join(rootPath, 'build', 'client'),
  dist: path.join(rootPath, 'dist', 'client'),
  src: path.join(frontendPath, 'src'),
  assets: path.join(frontendPath, 'src', 'assets'),
}

module.exports = PATHS
