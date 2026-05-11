import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  globalIgnores(['**/dist/**', '**/vite.config.ts', '**/vitest.config.ts', '**/eslint.config.js']),
  {
    files: ['packages/**/*.{ts,tsx,js,mjs,cjs,mts,cts}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },

  // Frontend specific
  {
    files: ['packages/frontend/**/*.{ts,tsx}'],
    plugins: {
      react: (await import('eslint-plugin-react')).default,
      'react-hooks': (await import('eslint-plugin-react-hooks')).default,
      'react-refresh': (await import('eslint-plugin-react-refresh')).default,
      import: (await import('eslint-plugin-import')).default,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/jsx-no-target-blank': 'error',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',
      'no-restricted-imports': ['error', { patterns: ['../**/'] }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Backend specific
  {
    files: ['packages/backend/**/*.{ts,js,mjs,cjs,mts,cts}'],
    plugins: {
      'import-x': (await import('eslint-plugin-import-x')).default,
    },
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': 'warn',
      'no-console': 'off',
      'no-process-exit': 'error',
      'no-restricted-imports': ['error', { patterns: ['../**/'] }],
    },
  },
]);
