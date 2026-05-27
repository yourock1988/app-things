import { defineConfig } from 'eslint/config'
import configNodeTs from '../../packages/eslint-config/node-ts.js'

export default defineConfig({
  extends: configNodeTs,
})
