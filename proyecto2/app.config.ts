/**
 * app.config.ts
 *
 * Configura la aplicación que Expo va a iniciar.
 * Define nombre, identificador, esquema de enlaces y plugins; no dibuja la interfaz.
 */
// Cada proyecto tiene sus dependencias y servidor: ejecutar npm install y npm start en esta carpeta.
// Los archivos JSON no admiten comentarios: package.json define scripts y tsconfig.json verifica tipos.
import type { ExpoConfig } from "expo/config";
const config: ExpoConfig = {
  name: "React Native Components",
  slug: "rn-components",
  scheme: "rncomponents",
  version: "1.0.0",
  userInterfaceStyle: "automatic",
  plugins: ["expo-router"],
};
export default config;
