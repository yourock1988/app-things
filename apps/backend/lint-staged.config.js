export default {
  '*.ts': [
    'prettier --check',
    'eslint --max-warnings 0',
    () => 'npx tsc --noEmit',
  ],
}
