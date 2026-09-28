/**
 * src/components/SectionHeader.tsx
 *
 * Encabezado reutilizable con etiqueta, título y descripción.
 * Sus props cambian el contenido; el ancho máximo limita la longitud de lectura y el tamaño se adapta al móvil.
 */
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useResponsive } from "../hooks/useResponsive";
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}
// El ancho del encabezado limita la longitud de lectura, no el ancho de la grilla.
export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  const { colors } = useTheme();
  const { mobile } = useResponsive();
  return (
    <View style={styles.header}>
      <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text>
      <Text
        accessibilityRole="header"
        style={{
          color: colors.text,
          fontSize: mobile ? 38 : 52,
          lineHeight: mobile ? 46 : 60,
          fontWeight: "800",
          letterSpacing: -1.5,
        }}
      >
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {description}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: { maxWidth: 720, gap: 12 },
  eyebrow: {
    fontSize: 11,
    lineHeight: 18,
    fontWeight: "700",
    letterSpacing: 2,
  },
  description: { fontSize: 16, lineHeight: 25 },
});
