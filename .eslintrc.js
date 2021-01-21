const gitIgnorePatterns = require('./tools/utils/git-ignore-patterns');

const commonJSAndTSRules = {
  'array-bracket-newline': ['error', 'consistent'],
  'array-element-newline': ['error', 'consistent'],
  'function-paren-newline': ['error', 'multiline-arguments'],
  'global-require': 'off',
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  'import/order': ['error', {
    alphabetize: { order: 'asc' },
    'newlines-between': 'always',
  }],
  'import/prefer-default-export': 'off',
  'object-curly-newline': ['error', { consistent: true }],
};

const defaultTSRules = {
  '@typescript-eslint/explicit-function-return-type': 'error',
  'max-len': ['error', 120, 2, {
    ignoreUrls: true,
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
  }],
  'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
};

const defaultTSExtends = [
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'airbnb-typescript/base',
];

const baseTSConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    project: 'tsconfig.eslint.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
    },
  },
};

module.exports = {
  ignorePatterns: [
    ...gitIgnorePatterns,
  ],
  overrides: [
    // Javascript
    {
      files: [
        '*.js',
      ],
      extends: [
        'airbnb-base',
      ],
      rules: {
        ...commonJSAndTSRules,
      },
    },
    // TypeScript
    {
      files: [
        '*.ts',
      ],
      extends: [
        ...defaultTSExtends,
      ],
      ...baseTSConfig,
      rules: {
        ...commonJSAndTSRules,
        ...defaultTSRules,
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: ['function', 'variable'],
            format: ['camelCase', 'UPPER_CASE'],
            modifiers: ['global'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
        'no-underscore-dangle': 'off',
      },
    },
    // Unit test files
    {
      files: [
        './src/**/*.test.ts',
        './tests/**/*.ts',
      ],
      extends: [
        ...defaultTSExtends,
        'plugin:jest/recommended',
      ],
      ...baseTSConfig,
      plugins: [
        'jest',
      ],
      rules: {
        ...commonJSAndTSRules,
        ...defaultTSRules,
      },
    },
  ],
};
