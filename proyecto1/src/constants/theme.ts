/**
 * src/constants/theme.ts
 *
 * Centraliza las paletas y medidas compartidas del diseño.
 * Los nombres de colores describen su función; layout reúne puntos de corte, separaciones y ancho máximo.
 * Los tipos ThemeName y ThemeColors se derivan de estos datos para mantenerlos sincronizados.
 */
// Los nombres describen el uso de cada color, no un tono concreto.
export const themes = {
  light: {
    background: "#F3F6F1",
    surface: "#FFFFFF",
    surfaceSecondary: "#E7EFE5",
    text: "#18392C",
    textSecondary: "#52685B",
    primary: "#246B4A",
    primaryContrast: "#FFFFFF",
    border: "#D7E2D7",
    shadow: "#163B2420",
  },
  dark: {
    background: "#0E1D17",
    surface: "#172C22",
    surfaceSecondary: "#233D2E",
    text: "#EDF5EB",
    textSecondary: "#AEC3B4",
    primary: "#B3E4BD",
    primaryContrast: "#123421",
    border: "#345041",
    shadow: "#00000040",
  },
};
export type ThemeName = keyof typeof themes;
export type ThemeColors = typeof themes.light;
// Una escala compartida evita espaciados y puntos de corte distintos entre pantallas.
export const layout = {
  tablet: 768,
  desktop: 1100,
  threeColumns: 1280,
  maxWidth: 1600,
  gutter: 20,
  gap: 24,
  radius: 24,
};
