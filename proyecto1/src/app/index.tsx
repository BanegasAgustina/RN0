/**
 * src/app/index.tsx
 *
 * Construye la pantalla Inicio.
 * Combina Screen y Hero y convierte el array concepts en tres bloques mediante map.
 */
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { Hero } from "../components/Hero";
import { useTheme } from "../hooks/useTheme";
import { useResponsive } from "../hooks/useResponsive";
// Inicio conserva el saludo y la introducción; el hero resuelve su composición adaptable.
export default function Home() {
  const { colors } = useTheme();
  const { mobile } = useResponsive();
  const concepts = [
    {
      number: "01",
      title: "Componentes",
      text: "Pequeñas piezas que forman una interfaz.",
    },
    {
      number: "02",
      title: "Estilos",
      text: "Color, tipografía y espacio con intención.",
    },
    {
      number: "03",
      title: "Navegación",
      text: "Dos pantallas conectadas por una idea.",
    },
  ];
  return (
    <Screen>
      <Hero />
      <View
        style={[
          styles.concepts,
          {
            borderTopColor: colors.border,
            flexDirection: mobile ? "column" : "row",
          },
        ]}
      >
        {concepts.map((item) => (
          <View key={item.number} style={{ flex: 1, gap: 8 }}>
            <Text
              style={{ color: colors.primary, fontSize: 12, fontWeight: "700" }}
            >
              {item.number} / {item.title.toUpperCase()}
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                lineHeight: 23,
                maxWidth: 320,
              }}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  concepts: { borderTopWidth: 1, paddingTop: 28, paddingBottom: 8, gap: 24 },
});
