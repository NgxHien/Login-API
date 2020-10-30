module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'prettier/prettier': 'warn'
  }
}