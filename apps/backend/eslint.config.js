import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'
import { defineConfig } from 'eslint/config'
import { importX, createNodeResolver } from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import path from 'node:path'

const { dirname } = import.meta
const ts = path.join(dirname, 'tsconfig.json')

const ignoreConfig = {
  ignores: [
    'out/**',
    'spec/**',
    'dist/**',
    'build/**',
    'node_modules/**',
    'eslint.config.js',
  ],
}

const typescriptConfig = {
  files: ['**/*.ts', '**/*.d.ts'],
  extends: [...tseslint.configs.recommended],
  languageOptions: {
    parser: tsParser,
    parserOptions: { project: ts },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    // 'no-console': 'warn',
    // '@typescript-eslint/explicit-function-return-type': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': 'error',
    // '@typescript-eslint/max-params': ['error', { max: 1 }],
  },
}

const importConfig = {
  files: ['**/*.ts'],
  extends: [importX.flatConfigs.recommended, importX.flatConfigs.typescript],
  settings: {
    'import-x/resolver-next': [
      createTypeScriptImportResolver({ project: ts }),
      createNodeResolver(),
    ],
  },
  rules: {
    // 'import-x/no-cycle': ['error', { maxDepth: 2 }],
    'import-x/no-self-import': 'error',
    'import-x/no-dynamic-require': 'warn',
    'import-x/no-nodejs-modules': 'warn',
    'import-x/no-named-as-default': 'warn',
  },
}

const boundariesSettings = [
  { type: 'src_ts', pattern: 'src/*.ts', mode: 'file' },
  { type: '_controller', pattern: 'src/_controllers/**' },
  { type: '_repository', pattern: 'src/_repositories/**' },
  { type: '_service', pattern: 'src/_services/**' },
  {
    type: 'repository',
    pattern: 'src/*/repositories/**',
    capture: ['entity'],
  },
  {
    type: 'controller',
    pattern: 'src/*/controllers/**',
    capture: ['entity'],
  },
  { type: 'service', pattern: 'src/*/services/**', capture: ['entity'] },
]

const boundariesRules = [
  // shared:
  {
    from: { type: 'src_ts' },
    allow: { to: [{ type: '_controller' }] },
  },
  {
    from: { type: '_controller' },
    allow: { to: [{ type: '_service' }] },
  },
  {
    from: { type: '_service' },
    allow: { to: [{ type: '_repository' }] },
  },
  // local:
  {
    from: { type: 'controller' },
    allow: {
      to: [
        { type: 'service', captured: { entity: '{{ entity }}' } },
        { type: '_controller' },
      ],
    },
  },
  {
    from: { type: 'service' },
    allow: {
      to: [
        { type: 'repository', captured: { entity: '{{ entity }}' } },
        { type: '_service' },
      ],
    },
  },
]

const boundariesConfig = {
  files: ['**/*.ts'],
  plugins: { boundaries },
  settings: { 'boundaries/elements': boundariesSettings },
  rules: {
    // 'boundaries/entry-point': [2],
    // 'boundaries/external': [2],
    // 'boundaries/no-unknown-files': ['error'],
    'boundaries/no-unknown': ['error'],
    'boundaries/dependencies': [
      'warn',
      { default: 'disallow', rules: boundariesRules },
    ],
  },
}

export default defineConfig([
  js.configs.recommended,
  ignoreConfig,
  typescriptConfig,
  boundariesConfig,
  importConfig,
])
