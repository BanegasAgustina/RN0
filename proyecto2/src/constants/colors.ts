/**
 * src/constants/colors.ts
 *
 * Define el contrato Palette y los colores claros y oscuros.
 * palette agrega alias de nombres usados por las demos originales; todos apuntan a los mismos tokens semánticos.
 */
export interface Palette {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryContrast: string;
  border: string;
  input: string;
  danger: string;
  success: string;
  shadow: string;
  overlay: string;
  card: string;
  muted: string;
  accent: string;
  soft: string;
  onAccent: string;
  error: string;
}
// Los alias conservan los ejemplos originales mientras todos consumen los mismos tokens.
function palette(
  base: Omit<
    Palette,
    "card" | "muted" | "accent" | "soft" | "onAccent" | "error"
  >,
): Palette {
  return {
    ...base,
    card: base.surface,
    muted: base.textSecondary,
    accent: base.primary,
    soft: base.surfaceSecondary,
    onAccent: base.primaryContrast,
    error: base.danger,
  };
}
export const palettes = {
  light: palette({
    background: "#F5F4F0",
    surface: "#FFFFFF",
    surfaceSecondary: "#E7EFE7",
    text: "#202D28",
    textSecondary: "#59695F",
    primary: "#296747",
    primaryContrast: "#FFFFFF",
    border: "#D7DFD5",
    input: "#FAFBF8",
    danger: "#A72E39",
    success: "#296747",
    shadow: "#142A1914",
    overlay: "#00000099",
  }),
  dark: palette({
    background: "#121C17",
    surface: "#1E2B23",
    surfaceSecondary: "#2C4131",
    text: "#EFF4EA",
    textSecondary: "#BBCBBC",
    primary: "#B4D9AA",
    primaryContrast: "#142A19",
    border: "#405443",
    input: "#16221B",
    danger: "#FFADB3",
    success: "#B4D9AA",
    shadow: "#00000033",
    overlay: "#000000AA",
  }),
};
