/**
 * src/components/ScrollControls.tsx
 *
 * Contiene la flecha flotante para volver al inicio.
 * El hook observa la posición del scroll; el botón aparece después de 80 px y llama al onUp recibido.
 * La referencia al ScrollView vive en la pantalla: este botón no necesita conocer qué lista está controlando.
 */
import { useState } from "react";
import {
  Text,
  Pressable,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
// Muestro la flecha después de desplazarse y la oculto al regresar al inicio.
export function useScrollControls() {
  const [position, setPosition] = useState(0);
  return {
    canUp: position > 80,
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
      setPosition(event.nativeEvent.contentOffset.y),
  };
}
// El botón queda fijo fuera del contenido desplazable.
export function ScrollControls({
  canUp,
  onUp,
}: {
  canUp: boolean;
  onUp: () => void;
}) {
  const { colors } = useTheme();
  if (!canUp) return null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Volver arriba"
      hitSlop={6}
      onPress={onUp}
      style={({ pressed }) => ({
        position: "absolute",
        right: 16,
        bottom: 16,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={{ fontSize: 25, color: colors.primaryContrast }}>↑</Text>
    </Pressable>
  );
}
