module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    'import/parsers': {
      espree: ['.js', '.cjs', '.mjs', '.jsx'],
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // Попробуйте всегда разрешать типы
      },
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
      },
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './', // алиас '@' теперь указывает на корень проекта
          '~': './node_modules',
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
      },
    },
    vite: {
      configPath: './vite.config.ts',
    },
  },

  rules: {
    curly: ['error', 'multi-line'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'arrow-parens': ['error', 'always'],
    'generator-star-spacing': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: { max: 3 },
        multiline: { max: 1 },
      },
    ],
    'vue/v-slot-style': [
      'error',
      {
        atComponent: 'v-slot',
        default: 'v-slot',
        named: 'longform',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-mutating-props': 'error',
  },
}
