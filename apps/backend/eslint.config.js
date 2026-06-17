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
    '**/*.d.ts',
    'out/**',
    'spec/**',
    'dist/**',
    'build/**',
    'types/**',
    'node_modules/**',
    'eslint.config.js',
  ],
}

const typescriptConfig = {
  files: ['**/*.ts'],
  extends: [...tseslint.configs.recommended],
  languageOptions: {
    parser: tsParser,
    parserOptions: { project: ts },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'lines-between-class-members': 'warn',
    'class-methods-use-this': 'warn',
    'no-console': 'warn',
    'no-plusplus': 'warn',
    'no-lonely-if': 'warn',
    'no-param-reassign': ['warn', { props: true }],
    // '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'VariableDeclarator[id.typeAnnotation][init]',
        message:
          'Запрещено вручную указывать тип при объявлении переменной. Полагайся на вывод типов (Type Inference).',
      },
    ],
    // '@typescript-eslint/no-unsafe-assignment': 'error',
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
    'import-x/no-named-as-default': 'error',
    'import-x/no-named-as-default-member': 'off',
    // 'import-x/no-nodejs-modules': 'warn',
  },
}

const boundariesSettings = [
  // shared:
  { type: '_di', pattern: 'src/_di.ts', mode: 'file' },
  { type: 'sharedDi', pattern: 'src/_pres/*Di.ts', mode: 'file' },
  { type: 'di', pattern: 'src/*/*Di.ts', mode: 'file', capture: ['entity'] },
  { type: 'src_ts', pattern: 'src/*.ts', mode: 'file' },
  { type: '_utils', pattern: 'src/_utils/**' },
  { type: '_domain', pattern: 'src/_domain/**' },
  { type: '_infra', pattern: 'src/_infra/**' },
  { type: '_pres', pattern: 'src/_pres/**' },
  // local:
  {
    type: 'domain',
    pattern: 'src/*/domain/**',
    capture: ['entity'],
  },
  {
    type: 'infra',
    pattern: 'src/*/infra/**',
    capture: ['entity'],
  },
  {
    type: 'pres',
    pattern: 'src/*/pres/**',
    capture: ['entity'],
  },
]

const boundariesRules = [
  // shared:
  {
    from: { type: 'src_ts' },
    allow: { to: [{ type: 'src_ts' }, { type: '_di' }, { type: '_utils' }] },
  },
  {
    from: { type: '_di' },
    allow: {
      to: [{ type: 'di' }, { type: 'sharedDi' }, { type: '_utils' }],
    },
  },
  {
    from: { type: 'di' },
    allow: {
      to: [
        { type: 'domain', captured: { entity: '{{ entity }}' } },
        { type: 'infra', captured: { entity: '{{ entity }}' } },
        { type: 'pres', captured: { entity: '{{ entity }}' } },
        { type: '_domain' },
        { type: '_pres' }, // ?
        { type: '_utils' },
      ],
    },
  },
  {
    from: { type: '_utils' },
    allow: { to: [{ type: '_domain' }] }, // ?
  },
  {
    from: { type: '_infra' },
    allow: { to: [{ type: '_domain' }] },
  },
  {
    from: { type: '_pres' },
    allow: { to: [{ type: '_domain' }] },
  },
  {
    from: { type: 'sharedDi' },
    allow: { to: [{ type: '_domain' }, { type: '_infra' }, { type: '_pres' }] },
  },
  // local:
  {
    from: { type: 'domain' },
    allow: {
      to: [{ type: '_domain' }],
    },
  },
  {
    from: { type: 'infra' },
    allow: {
      to: [
        { type: 'domain', captured: { entity: '{{ entity }}' } },
        { type: '_domain' },
        { type: '_utils' },
      ],
    },
  },
  {
    from: { type: 'pres' },
    allow: {
      to: [
        { type: 'domain', captured: { entity: '{{ entity }}' } },
        { type: '_domain' },
        { type: '_pres' },
        { type: '_utils' },
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
    'boundaries/no-unknown-files': ['error'],
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

// "rules": {
//   // 1. Запрещает вообще писать `: any` руками
//   "@typescript-eslint/no-explicit-any": "error",

//   // 2. Запрещает передавать any в функции, присваивать переменным и т.д.
//   "@typescript-eslint/no-unsafe-argument": "error",
//   "@typescript-eslint/no-unsafe-assignment": "error",
//   "@typescript-eslint/no-unsafe-call": "error",
//   "@typescript-eslint/no-unsafe-member-access": "error",
//   "@typescript-eslint/no-unsafe-return": "error"
// }
