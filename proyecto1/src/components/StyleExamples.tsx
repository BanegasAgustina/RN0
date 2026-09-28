/**
 * src/components/StyleExamples.tsx
 *
 * Agrupa los ejemplos visuales de tipografía, alineación, colores, espaciado y sombras.
 * Cada función devuelve una StyleCard con componentes nativos; los arrays evitan repetir manualmente los bloques.
 * El contador interactivo está separado en CounterCard.tsx.
 */
import { Platform, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { StyleCard } from "./StyleCard";
import { useTheme } from "../hooks/useTheme";
// Compara tamaños y pesos para establecer una jerarquía de lectura.
export function TypographyCard() {
  const { colors } = useTheme();
  return (
    <StyleCard
      number="01"
      title="TIPOGRAFÍA"
      description="Tamaño, peso y contraste que guían la mirada."
    >
      <Text
        style={{
          color: colors.primary,
          fontSize: 11,
          letterSpacing: 2,
          fontWeight: "700",
        }}
      >
        MENOS ES MÁS
      </Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 34,
          lineHeight: 40,
          letterSpacing: -1,
          fontWeight: "800",
        }}
      >
        Cada palabra{"\n"}tiene su lugar.
      </Text>
      <Text
        style={{ color: colors.textSecondary, fontSize: 16, lineHeight: 24 }}
      >
        Una jerarquía clara.
      </Text>
      <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
        Y detalles que acompañan.
      </Text>
    </StyleCard>
  );
}
// Recorre tres valores de justifyContent para mostrar su efecto sobre los mismos bloques.
export function AlignmentCard() {
  const { colors } = useTheme();
  const positions: { label: string; alignment: ViewStyle["justifyContent"] }[] =
    [
      { label: "Inicio", alignment: "flex-start" },
      { label: "Centro", alignment: "center" },
      { label: "Final", alignment: "flex-end" },
    ];
  return (
    <StyleCard
      number="02"
      title="FLEXBOX Y ALINEACIÓN"
      description="El mismo espacio, tres maneras de distribuirlo."
    >
      {/* justifyContent alinea los bloques sobre el eje horizontal de cada fila. */}
      {positions.map(({ label, alignment }) => (
        <View key={label} style={styles.alignmentRow}>
          <Text
            style={{ color: colors.textSecondary, width: 46, fontSize: 12 }}
          >
            {label}
          </Text>
          <View
            style={[
              styles.track,
              { backgroundColor: colors.background, justifyContent: alignment },
            ]}
          >
            {[0, 1, 2].map((item) => (
              <View
                key={item}
                style={{
                  width: 18,
                  height: 24,
                  borderRadius: 5,
                  backgroundColor: item === 1 ? colors.primary : colors.border,
                }}
              />
            ))}
          </View>
        </View>
      ))}
    </StyleCard>
  );
}
// Convierte las muestras de la paleta en recuadros con diferentes radios.
export function ColorsCard() {
  const { colors } = useTheme();
  const swatches = [
    { label: "Principal", color: colors.primary, radius: 4 },
    { label: "Secundario", color: colors.surfaceSecondary, radius: 12 },
    { label: "Superficie", color: colors.surface, radius: 22 },
  ];
  return (
    <StyleCard
      number="03"
      title="COLORES Y BORDES"
      description="Una paleta coherente. Distintas formas de expresarla."
    >
      <View style={styles.swatches}>
        {swatches.map((swatch) => (
          <View key={swatch.label} style={styles.swatch}>
            <View
              style={{
                height: 76,
                backgroundColor: swatch.color,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: swatch.radius,
              }}
            />
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 11,
                textAlign: "center",
              }}
            >
              {swatch.label}
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 11,
                textAlign: "center",
              }}
            >
              {swatch.radius} px
            </Text>
          </View>
        ))}
      </View>
    </StyleCard>
  );
}
// Distingue el espacio exterior, interior y entre elementos con medidas reales.
export function SpacingCard() {
  const { colors } = useTheme();
  return (
    <StyleCard
      number="04"
      title="ESPACIADO"
      description="Aire por dentro, por fuera y entre elementos."
    >
      {/* Los espacios rotulados son reales: margin afuera, padding adentro y gap entre hijos. */}
      <View style={[styles.spacingFrame, { borderColor: colors.border }]}>
        <Text style={{ color: colors.textSecondary, fontSize: 11 }}>
          margin · 12
        </Text>
        <View
          style={{
            margin: 12,
            padding: 16,
            gap: 12,
            borderRadius: 12,
            backgroundColor: colors.surfaceSecondary,
          }}
        >
          <Text
            style={{ color: colors.primary, fontSize: 11, fontWeight: "700" }}
          >
            padding · 16
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {["A", "B", "C"].map((letter) => (
              <View
                key={letter}
                style={{
                  flex: 1,
                  padding: 10,
                  alignItems: "center",
                  backgroundColor: colors.surface,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: colors.text, fontSize: 12 }}>
                  {letter}
                </Text>
              </View>
            ))}
          </View>
          <Text style={{ color: colors.primary, fontSize: 11 }}>gap · 8</Text>
        </View>
      </View>
    </StyleCard>
  );
}
// Elige la propiedad de sombra según la plataforma y muestra una tarjeta elevada.
export function ShadowCard() {
  const { colors } = useTheme();
  // Android usa elevación; boxShadow cubre iOS y web sin las props de sombra deprecadas en web.
  const shadow: ViewStyle =
    Platform.OS === "android"
      ? { elevation: 6, shadowColor: colors.shadow }
      : { boxShadow: "0 8px 20px " + colors.shadow };
  return (
    <StyleCard
      number="05"
      title="SOMBRAS / ELEVACIÓN"
      description="Un poco de profundidad, sin competir con el contenido."
    >
      <View
        style={[styles.shadowStage, { backgroundColor: colors.background }]}
      >
        <View
          style={[
            styles.raised,
            { backgroundColor: colors.surface, borderColor: colors.border },
            shadow,
          ]}
        >
          <Text style={{ color: colors.primary, fontSize: 22 }}>↗</Text>
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: "700" }}>
            Un nivel más.
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            Sombra suave
          </Text>
        </View>
      </View>
    </StyleCard>
  );
}
const styles = StyleSheet.create({
  alignmentRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  track: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    padding: 10,
    borderRadius: 10,
  },
  swatches: { flexDirection: "row", gap: 12 },
  swatch: { flex: 1, minWidth: 0, gap: 8 },
  spacingFrame: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  shadowStage: { padding: 26, borderRadius: 16, alignItems: "center" },
  raised: {
    padding: 20,
    gap: 8,
    borderRadius: 14,
    borderWidth: 1,
    width: "100%",
    maxWidth: 230,
  },
});
