/**
 * src/components/Screen.tsx
 *
 * Contenedor común para Inicio y Estilos.
 * Mantiene el encabezado, aplica área segura y coloca children dentro del ScrollView.
 * scrollRef permite que la flecha ejecute scrollTo sin modificar el contenido de la pantalla.
 */
import { useRef, type PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";
import { useResponsive } from "../hooks/useResponsive";
import { layout } from "../constants/theme";
import { ThemeButton } from "./ThemeButton";
import { ScrollControls, useScrollControls } from "./ScrollControls";
// Reutilizamos el contenedor original y ampliamos su ancho; los textos se limitan por separado.
export function Screen({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const controls = useScrollControls();
  const { mobile } = useResponsive();
  const width = mobile ? "100%" : "90%";
  const paddingHorizontal = mobile ? layout.gutter : 0;
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={[
          styles.header,
          { width, paddingHorizontal, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.brand}>
          <View style={[styles.monogram, { backgroundColor: colors.primary }]}>
            <Text
              style={{
                color: colors.primaryContrast,
                fontWeight: "800",
                fontSize: 16,
              }}
            >
              RN
            </Text>
          </View>
          <View>
            <Text
              style={{ color: colors.text, fontSize: 15, fontWeight: "700" }}
            >
              Primer proyecto
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
              React Native + Expo
            </Text>
          </View>
        </View>
        <ThemeButton />
      </View>
      <ScrollView
        ref={scrollRef}
        onScroll={controls.onScroll}
        scrollEventThrottle={32}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          testID="screen-content"
          style={[
            styles.content,
            { width, paddingHorizontal, paddingTop: mobile ? 28 : 36 },
          ]}
        >
          {children}
        </View>
      </ScrollView>
      <ScrollControls
        {...controls}
        onUp={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    maxWidth: layout.maxWidth,
    alignSelf: "center",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    borderBottomWidth: 1,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 12 },
  monogram: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    maxWidth: layout.maxWidth,
    alignSelf: "center",
    flexGrow: 1,
    paddingBottom: 88,
    gap: 28,
  },
});
