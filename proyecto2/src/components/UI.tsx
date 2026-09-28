/**
 * src/components/UI.tsx
 *
 * Reúne piezas visuales pequeñas compartidas: Label, AppButton, ThemeToggle y Page.
 * Label aplica el color de texto; los botones tienen feedback; Page limita el ancho y administra el scroll y la flecha.
 * scroll=false permite que una lista tenga su propio desplazamiento sin anidarse dentro de otro scroll vertical.
 */
import { useRef, type PropsWithChildren } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextProps,
  type ScrollViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useResponsive } from "../hooks/useResponsive";
import { ScrollControls, useScrollControls } from "./ScrollControls";
import { spacing } from "../constants/spacing";
// Props son entradas de un componente; children representa los elementos que contiene.
export function Label({ style, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <Text {...props} style={[styles.text, { color: colors.text }, style]} />
  );
}
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}
// Ejecuta la acción recibida y evita pulsaciones cuando disabled es verdadero.
export function AppButton({ title, onPress, disabled = false }: ButtonProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.accent,
          opacity: disabled || pressed ? 0.6 : 1,
        },
      ]}
    >
      <Label
        style={{
          color: colors.onAccent,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {title}
      </Label>
    </Pressable>
  );
}
// Un botón mantiene una zona táctil cómoda en el encabezado.
export function ThemeToggle() {
  const { colors, dark, toggle } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      }
      hitSlop={8}
      onPress={toggle}
      style={({ pressed }) => ({
        minHeight: 44,
        paddingHorizontal: 14,
        marginRight: 12,
        borderRadius: 24,
        justifyContent: "center",
        backgroundColor: colors.soft,
        opacity: pressed ? 0.65 : 1,
      })}
    >
      <Label style={{ fontSize: 14, color: colors.accent }}>
        {dark ? "☾ Oscuro" : "☀ Claro"}
      </Label>
    </Pressable>
  );
}
// La SafeAreaView del núcleo está deprecada. Esta alternativa respeta notch y barras del sistema.
export function Page({
  children,
  scroll = true,
  refreshControl,
}: PropsWithChildren<{
  scroll?: boolean;
  refreshControl?: ScrollViewProps["refreshControl"];
}>) {
  const { colors } = useTheme();
  const { mobile } = useResponsive();
  const ref = useRef<ScrollView>(null);
  const controls = useScrollControls();
  const content = [
    styles.page,
    {
      width: mobile ? ("100%" as const) : ("90%" as const),
      paddingHorizontal: mobile ? 20 : 0,
    },
  ];
  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {scroll ? (
        <ScrollView
          ref={ref}
          refreshControl={refreshControl}
          alwaysBounceVertical
          keyboardShouldPersistTaps="handled"
          onScroll={controls.onScroll}
          scrollEventThrottle={32}
          contentContainerStyle={content}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[content, { flex: 1 }]}>{children}</View>
      )}
      {scroll && (
        <ScrollControls
          {...controls}
          onUp={() => ref.current?.scrollTo({ y: 0, animated: true })}
        />
      )}
    </SafeAreaView>
  );
}
// StyleSheet valida estilos; width + maxWidth permiten adaptar el contenido sin estirarlo de más.
export const styles = StyleSheet.create({
  page: {
    padding: spacing.large,
    paddingBottom: 88,
    gap: spacing.large,
    width: "100%",
    maxWidth: spacing.maxWidth,
    alignSelf: "center",
    flexGrow: 1,
  },
  text: { fontSize: 16, lineHeight: 24 },
  heading: { fontSize: 23, lineHeight: 30, fontWeight: "700" },
  card: { padding: 22, gap: 10, borderWidth: 1, borderRadius: spacing.radius },
  example: { gap: 14, marginTop: 8 },
  button: {
    minHeight: 48,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
});
