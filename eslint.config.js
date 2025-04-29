import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  // Configuración base para JS/TS
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser, // Si es frontend
        ...globals.node, // Si es backend (Node.js)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      quotes: ['error', 'single'],
    },
  },

  // Configuración específica para TypeScript
  ...tseslint.configs.recommended,

  // Reglas personalizadas adicionales
  {
    rules: {
      // 'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
]
