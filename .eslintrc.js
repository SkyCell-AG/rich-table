module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: ['airbnb'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
    ],
    globals: {
        page: 'readonly',
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
        jest: 'readonly',
        it: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
    },
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: [
                    'node_modules',
                    'src/',
                ],
            },
        },
    },
    rules: {
        'import/no-extraneous-dependencies': [
            "error",
            {
                "peerDependencies": true,
            }
        ],
        'import/no-cycle': [
            2,
            {
                maxDepth: 1,
            },
        ],
        'no-console': 'warn',
        'dot-location': [
            'error',
            'property',
        ],
        'consistent-return': 'error',
        'object-curly-newline': [
            'error',
            {
                multiline: true, minProperties: 1,
            },
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'array-bracket-newline': [
            'error',
            {
                minItems: 2,
            },
        ],
        'no-useless-catch': 'error',
        'no-else-return': 'error',
        'prefer-arrow-callback': 'error',
        'array-element-newline': [
            'error',
            'always',
        ],
        'object-property-newline': 'error',
        'newline-after-var': [
            'error',
            'always',
        ],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: [
                    '.js',
                    '.jsx',
                ],
            },
        ],
        'react/jsx-props-no-spreading': 'off',
        semi: [
            'error',
            'never',
        ],
        indent: [
            'error',
            4,
        ],
        'jsx-a11y/no-static-element-interactions': [
            'off',
            'always',
        ],
        'jsx-a11y/anchor-is-valid': [
            'off',
            'always',
        ],
        'react/jsx-indent': [
            'error',
            4,
        ],
        'react/jsx-indent-props': [
            'error',
            4,
        ],
        'arrow-body-style': [
            'error',
            'always',
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'function-call-argument-newline': [
            'error',
            'consistent',
        ],
        'react/jsx-max-props-per-line': [
            1,
            {
                maximum: 1, when: 'always',
            },
        ],
        'prefer-destructuring': [
            'error',
            {
                array: true,
                object: true,
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
        'no-implicit-coercion': 'error',
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always', prev: '*', next: 'export',
            },
            {
                blankLine: 'any', prev: 'export', next: 'export',
            },
        ],
        'no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^_',
            },
        ],
    },
}
