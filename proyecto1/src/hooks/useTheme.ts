/**
 * src/hooks/useTheme.ts
 *
 * Facilita leer ThemeContext desde cualquier componente descendiente.
 * El error explica un uso incorrecto: el componente debe estar dentro de ThemeProvider.
 */
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
// Todas las pantallas leen la misma elección; no crean estados de tema independientes.
export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTheme requiere ThemeProvider");
  return theme;
}
