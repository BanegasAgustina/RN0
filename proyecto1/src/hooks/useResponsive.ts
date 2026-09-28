/**
 * src/hooks/useResponsive.ts
 *
 * Traduce el ancho de ventana y la escala de texto en decisiones de diseño.
 * Devuelve mobile, desktop y columns; se recalcula al cambiar el tamaño o rotar el dispositivo.
 */
import { useWindowDimensions } from "react-native";
import { layout } from "../constants/theme";
// También responde al redimensionado de la ventana y a la rotación del dispositivo.
export function useResponsive() {
  const { width, fontScale } = useWindowDimensions();
  const mobile = width < layout.tablet;
  const desktop = width > layout.desktop;
  // Con texto ampliado damos más ancho a cada ejemplo para mantenerlo legible.
  const columns =
    mobile || fontScale > 1.5 ? 1 : width >= layout.threeColumns ? 3 : 2;
  return { mobile, desktop, columns };
}
