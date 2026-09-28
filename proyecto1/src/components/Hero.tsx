/**
 * src/components/Hero.tsx
 *
 * Presenta el saludo Hola Mundo y una vista previa de JSX y su resultado.
 * El botón navega a Estilos. useResponsive decide cuándo colocar introducción y vista previa lado a lado.
 * El fragmento de código es texto ilustrativo: no se interpreta ni ejecuta como código ingresado.
 */
import { router } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useResponsive } from "../hooks/useResponsive";
import { ActionButton } from "./ActionButton";
import { layout } from "../constants/theme";
export function Hero() {
  const { colors } = useTheme();
  const { desktop, mobile } = useResponsive();
  return (
    <View
      testID="hero"
      style={[
        styles.hero,
        {
          flexDirection: desktop ? "row" : "column",
          gap: desktop ? 56 : 32,
          paddingVertical: desktop ? 36 : 8,
        },
      ]}
    >
      <View style={[styles.copy, desktop && { flex: 1.15 }]}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>
          MI PRIMER PROYECTO · 01
        </Text>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.text,
            fontSize: mobile ? 62 : desktop ? 88 : 76,
            lineHeight: mobile ? 66 : desktop ? 92 : 80,
            fontWeight: "800",
            letterSpacing: -3,
          }}
        >
          Hola{"\n"}Mundo<Text style={{ color: colors.primary }}>.</Text>
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Una primera idea.{"\n"}Una nueva forma de crear.
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Mi primera aplicación con Expo: componentes nativos, estilos y
          navegación en un mismo lugar.
        </Text>
        <View
          style={{ alignSelf: "flex-start", maxWidth: "100%", marginTop: 4 }}
        >
          <ActionButton
            label="Explorar estilos →"
            onPress={() => router.navigate("/estilos")}
          />
        </View>
      </View>
      {/* La vista previa conecta un fragmento de JSX con su resultado visual. */}
      <View
        testID="hero-preview"
        style={[
          styles.preview,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            padding: mobile ? 22 : 32,
          },
          desktop && { flex: 1 },
        ]}
      >
        <View style={styles.previewHeader}>
          <Text
            style={[
              styles.badge,
              {
                backgroundColor: colors.surfaceSecondary,
                color: colors.primary,
              },
            ]}
          >
            React Native + Expo
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            01 / INICIO
          </Text>
        </View>
        <Text
          style={{
            color: colors.text,
            fontSize: 24,
            lineHeight: 32,
            fontWeight: "700",
          }}
        >
          De una idea a la pantalla.
        </Text>
        <View
          style={[
            styles.code,
            { backgroundColor: colors.background, borderColor: colors.border },
          ]}
        >
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            Tu primer componente
          </Text>
          <Text
            style={{
              fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
              fontSize: mobile ? 14 : 17,
              lineHeight: 30,
              color: colors.primary,
            }}
          >
            {"<View>\n  <Text>Hola Mundo</Text>\n</View>"}
          </Text>
        </View>
        <View
          style={[styles.result, { backgroundColor: colors.surfaceSecondary }]}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 1.5,
            }}
          >
            RESULTADO
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 32,
              lineHeight: 42,
              fontWeight: "800",
            }}
          >
            Hola Mundo
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            Simple. Nativo. Hecho por vos.
          </Text>
        </View>
        <Text
          style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 20 }}
        >
          Un mismo proyecto para explorar diseño en distintas pantallas.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  hero: { alignItems: "stretch" },
  copy: { justifyContent: "center", gap: 22, minWidth: 0 },
  eyebrow: {
    fontSize: 11,
    lineHeight: 18,
    fontWeight: "700",
    letterSpacing: 2,
  },
  subtitle: { fontSize: 23, lineHeight: 33, maxWidth: 500 },
  description: { fontSize: 16, lineHeight: 26, maxWidth: 490 },
  preview: {
    minWidth: 0,
    borderWidth: 1,
    borderRadius: layout.radius,
    gap: 22,
    justifyContent: "center",
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  code: { padding: 20, borderWidth: 1, borderRadius: 16, gap: 12 },
  result: { padding: 22, borderRadius: 16, gap: 8 },
});
