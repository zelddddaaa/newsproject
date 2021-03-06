module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //解决zh_cn类型的报错
    "camelcase": ["error", {"allow": ["aa_bb"]}]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
