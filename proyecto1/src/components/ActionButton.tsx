/**
 * src/components/ActionButton.tsx
 *
 * Botón reutilizable para acciones como navegar o sumar al contador.
 * Recibe label y onPress por props; Pressable cambia opacidad y escala mientras se presiona.
 */
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";
interface ActionButtonProps {
  label: string;
  onPress: () => void;
}
// Compartimos el feedback de pulsación del CTA y del contador.
export function ActionButton({ label, onPress }: ActionButtonProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.primary,
          opacity: pressed ? 0.82 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <Text
        style={{
          color: colors.primaryContrast,
          fontSize: 15,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
