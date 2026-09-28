/**
 * src/components/ThemeButton.tsx
 *
 * Permite cambiar entre modo claro y oscuro.
 * Lee el contexto con useTheme y llama a toggleTheme; la etiqueta indica el tema al que se va a cambiar.
 */
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";
export function ThemeButton() {
  const { colors, dark, toggleTheme } = useTheme();
  const label = dark ? "Modo claro" : "Modo oscuro";
  // El icono anuncia el tema al que vamos a cambiar, igual que la etiqueta accesible.
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={"Cambiar a " + label.toLowerCase()}
      hitSlop={6}
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text accessible={false} style={{ color: colors.primary, fontSize: 23 }}>
        {dark ? "☀" : "☾"}
      </Text>
      <Text style={{ color: colors.text, fontWeight: "600", fontSize: 13 }}>
        {label}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
});
