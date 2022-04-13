module.exports = {
  root: true,

  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },

  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],

};
