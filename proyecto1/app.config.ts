/**
 * app.config.ts
 *
 * Configura la aplicación que Expo va a iniciar.
 * Define nombre, identificador, esquema de enlaces y plugins; no dibuja la interfaz.
 */
// Configuración de Expo: npm start inicia Metro; npm run android/ios/web abre cada plataforma.
// package.json declara dependencias y scripts; tsconfig.json activa TypeScript estricto.
import type { ExpoConfig } from "expo/config";
const config: ExpoConfig = {
  name: "Hola Mundo",
  slug: "hola-mundo",
  scheme: "holamundo",
  version: "1.0.0",
  userInterfaceStyle: "automatic",
  plugins: ["expo-router"],
};
export default config;
