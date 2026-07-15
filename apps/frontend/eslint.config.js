import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,

  stylistic: false,

  rules: {
    'node/prefer-global/process': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-named-imports': 'off',
  },
})
