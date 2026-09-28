/**
 * src/context/ThemeContext.tsx
 *
 * Comparte colores, estado dark y acción toggle en todas las pantallas.
 * Una elección manual reemplaza la del sistema; en web se intenta persistir en localStorage sin bloquear la app si falla.
 * useTheme comprueba que el componente esté dentro de ThemeProvider.
 */
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useColorScheme } from "react-native";
import { palettes, type Palette } from "../constants/colors";
// Una interface define el contrato del contexto y evita usar any.
interface ThemeValue {
  colors: Palette;
  dark: boolean;
  toggle: () => void;
}
const ThemeContext = createContext<ThemeValue | undefined>(undefined);
export function ThemeProvider({ children }: PropsWithChildren) {
  const system = useColorScheme();
  // null sigue al sistema hasta que la persona elige un tema manualmente.
  const [manual, setManual] = useState<boolean | null>(() => {
    // En web recupero la preferencia; en nativo sigo al sistema en cada nueva sesión.
    try {
      const saved =
        typeof window !== "undefined"
          ? window.localStorage?.getItem("component-lab-theme")
          : null;
      return saved === "dark" ? true : saved === "light" ? false : null;
    } catch {
      return null;
    }
  });
  const dark = manual ?? system === "dark";
  return (
    <ThemeContext.Provider
      value={{
        dark,
        colors: palettes[dark ? "dark" : "light"],
        toggle: () => {
          const next = !dark;
          setManual(next);
          try {
            if (typeof window !== "undefined")
              window.localStorage?.setItem(
                "component-lab-theme",
                next ? "dark" : "light",
              );
          } catch {
            /* El tema sigue funcionando si el navegador bloquea storage. */
          }
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
// Context comparte datos sin pasar props por todos los niveles del árbol.
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return value;
}
