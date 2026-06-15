export default {
  '*.ts': [
    'prettier --check',
    'eslint --max-warnings 0 --no-warn-ignored',
    () => 'tsc --noEmit',
    () => 'vitest',
  ],
}
