module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'comma-dangle': [
      'error',
      'never'
    ],
    'eol-last': [2, 'windows'],
    indent: ['error', 2, { "SwitchCase": 1 }],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'max-len': [
      'error',
      {
        code: 100
      }
    ],
    'no-trailing-spaces': 'error',
    "quotes": [
      'error',
      'single'
    ],
    semi: ['error', 'always'],
    'vue/html-indent': ['error', 2, {
      baseIndent: 1
    }],
    'vue/script-indent': [
      'error',
      2,
      { baseIndent: 1 }
    ]
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
};
