module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  ignorePatterns: ['/landing/', '**/*.json'],
  rules: {
    // Enforce parentheses for multiline functions and cleaner diffs
    'arrow-parens': [2, "as-needed"],
    // make this a warning rather than the default error
    'arrow-body-style': ['warn', 'as-needed'],
    // All dependencies should be in `dependencies` rather than `devDependencies`
    // except for tests & stories
    "import/no-extraneous-dependencies": [
      "error", {"devDependencies": ["**/*.test.*", "**/*.stories.*", "**/storybook/*.*"]}
    ],
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 0,
    // We don't use ASI so we felt it was ok to allow this
    'no-plusplus': 0,
    'prefer-destructuring': ['warn', {
      AssignmentExpression: {
        array: false,
        object: false,
      },
      VariableDeclarator: {
        array: false,
        object: true,
      },
    }],
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': [0],
    // can we find a ruleset that includes tsx by default?
    'react/jsx-filename-extension': [1, { 'extensions': ['.jsx', '.tsx'] }],
    // We use it too widely to turn off, and typescript will force us to define all expected props,
    // i.e. passing in props that don't belong
    'react/jsx-props-no-spreading': 0,
    // Only applies to class components. Leaving as is to prevent churn
    'react/sort-comp': ['warn', {
      order: [
        'static-variables',
        'static-methods',
        'state',
        'instance-variables',
        'constructor',
        'lifecycle',
        'everything-else',
        'render',
      ],
    }],
    // Only applies to class components. Leaving as is to prevent churn
    'react/state-in-constructor': [0],
    // Only applies to class components. Leaving as is to prevent churn
    'react/static-property-placement': [1, 'static public field'],
    // JSX fragment shorthand is unintuitive
    'react/jsx-fragments': [1, 'element'],
    // Remove the need for odd formatting when adding text within an element
    'react/jsx-one-expression-per-line': [0],
    // Ensure interface names begin with I
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'custom': {
          'regex': '^I[A-Z]',
          'match': true,
        },
      },
    ],
    // can we find a ruleset that includes tsx by default?
    '@typescript-eslint/type-annotation-spacing': ['error', {}],
  },
  overrides: [
    // PropTypes not required for typescript files
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'react/prop-types': 0,
        'react/require-default-props': 0,
      },
    },
    {
      // We use a library called Immer that specifically uses assignment to keys
      // of an arg as its whole return mechanism, so this rule needs needs to be
      // partially disabled for files that use it
      files: ['**/*.model.js', '**/*.model.ts'],
      rules: {
        'no-param-reassign': ['warn', {
          'ignorePropertyModificationsFor': ['state', 'mutableState'],
        }],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jquery: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    angular: true,
    fbq: true,
    newrelic: true,
    inject: true, // used in jasmine tests, provided by angular-mocks
    FileTransfer: true, // supplied by `cordova-plugin-file-transfer`
    FileUploadOptions: true, // supplied by `cordova-plugin-file-transfer`
    isNaN: true, // because Number.isNaN is not the same thing
  },
};
