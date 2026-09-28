/**
 * src/Context/ThemeContext.tsx
 *
 * Administra y comparte la elección de tema.
 * Si no hay elección manual usa el sistema; en web intenta recuperar y guardar la preferencia en localStorage.
 * ThemeProvider distribuye colores y toggleTheme a sus hijos; en nativo la elección manual dura la sesión.
 */
import { createContext, useState, type PropsWithChildren } from "react";
import { Platform, useColorScheme } from "react-native";
import { themes, type ThemeColors, type ThemeName } from "../constants/theme";
interface ThemeValue {
  colors: ThemeColors;
  dark: boolean;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeValue | undefined>(undefined);
const storageKey = "hola-mundo-theme";
// Mantiene una única elección de tema para todos sus descendientes.
export function ThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  // Leemos una sola vez. En nativo, la elección se conserva durante la sesión.
  const [selected, setSelected] = useState<ThemeName | null>(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return null;
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved === "light" || saved === "dark" ? saved : null;
    } catch {
      // Si el navegador bloquea el almacenamiento, seguimos el tema del dispositivo.
      return null;
    }
  });
  const name = selected ?? (systemTheme === "dark" ? "dark" : "light");
  // Invierte el tema activo y trata de guardar la elección cuando se ejecuta en web.
  function toggleTheme() {
    const next = name === "dark" ? "light" : "dark";
    setSelected(next);
    if (Platform.OS === "web") {
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        /* La persistencia es opcional. */
      }
    }
  }
  return (
    <ThemeContext.Provider
      value={{ colors: themes[name], dark: name === "dark", toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
