/**
 * src/app/estilos.tsx
 *
 * Construye la pantalla Estilos con seis ejemplos.
 * Mide el ancho real con onLayout y descuenta los espacios entre columnas para calcular el ancho de cada tarjeta.
 */
import { useState } from "react";
import { View } from "react-native";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { CounterCard } from "../components/CounterCard";
import {
  TypographyCard,
  AlignmentCard,
  ColorsCard,
  SpacingCard,
  ShadowCard,
} from "../components/StyleExamples";
import { useResponsive } from "../hooks/useResponsive";
import { layout } from "../constants/theme";
// Construye la grilla a partir de su medida real y del número de columnas disponibles.
export default function StylesScreen() {
  const { columns } = useResponsive();
  const [gridWidth, setGridWidth] = useState(0);
  // Medimos el contenedor real: también descuenta las áreas seguras y la barra de scroll.
  const cardWidth = gridWidth
    ? (gridWidth - layout.gap * (columns - 1)) / columns
    : "100%";
  const cards = [
    <TypographyCard key="type" />,
    <AlignmentCard key="flex" />,
    <ColorsCard key="colors" />,
    <SpacingCard key="space" />,
    <ShadowCard key="shadow" />,
    <CounterCard key="counter" />,
  ];
  return (
    <Screen>
      <SectionHeader
        eyebrow="LABORATORIO VISUAL · 02"
        title="Un estilo propio."
        description="Tamaños, formas y espacios que construyen una interfaz. Explorá seis maneras de darle vida."
      />
      <View
        testID="style-grid"
        onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)}
        style={{ flexDirection: "row", flexWrap: "wrap", gap: layout.gap }}
      >
        {cards.map((card) => (
          <View
            testID={"style-card-" + card.key}
            key={card.key}
            style={{ width: cardWidth }}
          >
            {card}
          </View>
        ))}
      </View>
    </Screen>
  );
}
