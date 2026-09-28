/**
 * src/components/StyleCard.tsx
 *
 * Marco compartido por todas las tarjetas de estilos.
 * Recibe número, título, descripción y children; accent permite destacar una tarjeta con otra superficie.
 */
import type { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { layout } from "../constants/theme";
interface StyleCardProps extends PropsWithChildren {
  number: string;
  title: string;
  description: string;
  accent?: boolean;
}
export function StyleCard({
  number,
  title,
  description,
  accent = false,
  children,
}: StyleCardProps) {
  const { colors } = useTheme();
  // flex: 1 iguala la altura de las cards de una misma fila sin recortar texto ampliado.
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: accent ? colors.surfaceSecondary : colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.heading}>
        <Text
          style={{ color: colors.primary, fontSize: 12, fontWeight: "700" }}
        >
          {number}
        </Text>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.text,
            fontSize: 13,
            lineHeight: 20,
            fontWeight: "700",
            letterSpacing: 0.8,
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={styles.example}>{children}</View>
      <Text
        style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 21 }}
      >
        {description}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 310,
    padding: 24,
    borderRadius: layout.radius,
    borderWidth: 1,
    gap: 22,
  },
  heading: { flexDirection: "row", gap: 12, alignItems: "center" },
  example: { flexGrow: 1, justifyContent: "center", gap: 12 },
});
