/**
 * src/hooks/useResponsive.ts
 *
 * Obtiene el ancho disponible con useWindowDimensions.
 * Devuelve mobile y columns para distribuir las tarjetas en una, dos o tres columnas.
 */
import { useWindowDimensions } from "react-native";
// Las columnas cambian con el viewport; los porcentajes respetan el ancho real del contenedor.
export function useResponsive() {
  const { width } = useWindowDimensions();
  return {
    mobile: width < 768,
    columns: width < 768 ? 1 : width <= 1100 ? 2 : 3,
  };
}
