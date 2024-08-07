// import globals from 'globals';

// import path from 'path';
// import { fileURLToPath } from 'url';
// import { FlatCompat } from '@eslint/eslintrc';
// import pluginJs from '@eslint/js';

// import eslintConfigPrettier from 'eslint-config-prettier';
// import stylisticJs from '@stylistic/eslint-plugin-js';

// // mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

// export default [
//   {
//     files: ['**/*.js', '**/*.mjs'],
//     languageOptions: {
//       parserOptions: {
//         ecmaVersion: 'latest',
//       },
//       globals: { ...globals.builtin, ...globals.browser, ...globals.node },
//     },
//     ignores: ['builds/'],
//     settings: {
//       'import/parsers': {
//         espree: ['.js', '.cjs', '.mjs', '.jsx'],
//       },
//     },
//   },
//   ...compat.extends('airbnb-base'),
//   {
//     plugins: {
//       '@stylistic/js': stylisticJs,
//     },
//     rules: {
//       'no-use-before-define': [
//         'error',
//         {
//           functions: true,
//           classes: true,
//           variables: false,
//         },
//       ],
//       'import/extensions': ['error', 'always', { ignorePackages: true }],
//       '@stylistic/js/padding-line-between-statements': [
//         'error',
//         { blankLine: 'always', prev: '*', next: 'function' },
//         { blankLine: 'always', prev: 'function', next: '*' },

//         // After directives (like 'use-strict'), except between directives
//         { blankLine: 'always', prev: 'directive', next: '*' },
//         { blankLine: 'any', prev: 'directive', next: 'directive' },

//         // After imports, except between imports
//         { blankLine: 'always', prev: 'import', next: '*' },
//         { blankLine: 'any', prev: 'import', next: 'import' },

//         // Before and after every sequence of variable declarations
//         { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
//         { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
//         { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },

//         // Before and after class declaration, if, while, switch, try
//         { blankLine: 'always', prev: '*', next: ['class', 'while', 'switch', 'try'] },
//         { blankLine: 'always', prev: ['class', 'while', 'switch', 'try'], next: '*' },

//         { blankLine: 'always', prev: 'if', next: '*' },
//         { blankLine: 'always', prev: 'block-like', next: 'if' },
//         { blankLine: 'any', prev: 'if', next: 'if' },

//         { blankLine: 'always', prev: 'block-like', next: 'block-like' },
//         { blankLine: 'always', prev: 'multiline-expression', next: 'multiline-expression' },

//         // Before return statements
//         { blankLine: 'always', prev: '*', next: 'return' },
//       ],
//       'import/no-extraneous-dependencies': [
//         'error',
//         {
//           devDependencies: ['/*.config.*'],
//         },
//       ],
//       'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
//     },
//   },
//   eslintConfigPrettier,
// ];
