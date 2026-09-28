/**
 * eslint.config.js
 *
 * Configura el análisis de calidad del código.
 * Reutiliza reglas de Expo y excluye carpetas generadas; se ejecuta con npm run lint.
 */
// ESLint usa las reglas de Expo para detectar errores e imports sin utilizar.
const { defineConfig } = require('eslint/config');
const expo = require('eslint-config-expo/flat');
module.exports = defineConfig([expo, { ignores: ['dist/**', '.expo/**'] }]);
