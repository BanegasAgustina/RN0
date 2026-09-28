/**
 * src/components/CounterCard.tsx
 *
 * Demuestra la relación entre evento, estado y renderizado.
 * onPress incrementa count con su valor anterior; React vuelve a mostrar el número actualizado.
 * El contador pertenece a esta tarjeta, no al contexto del tema.
 */
import { useState } from "react";
import { Text, View } from "react-native";
import { StyleCard } from "./StyleCard";
import { ActionButton } from "./ActionButton";
import { useTheme } from "../hooks/useTheme";
export function CounterCard() {
  const { colors } = useTheme();
  // Se conserva el contador original: cada evento actualiza su valor anterior.
  const [count, setCount] = useState(0);
  return (
    <StyleCard
      number="06"
      title="INTERACCIÓN"
      description="Un toque, un evento y una nueva respuesta en pantalla."
      accent
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          lineHeight: 28,
          fontWeight: "700",
        }}
      >
        Probá un evento real
      </Text>
      <View style={{ alignItems: "center", gap: 4, paddingVertical: 8 }}>
        <Text
          testID="counter-value"
          accessibilityLiveRegion="polite"
          accessibilityLabel={count + " interacciones"}
          style={{
            color: colors.primary,
            fontSize: 52,
            lineHeight: 58,
            fontWeight: "800",
            fontVariant: ["tabular-nums"],
          }}
        >
          {count}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
          interacciones
        </Text>
      </View>
      <ActionButton
        label="+ Sumar interacción"
        onPress={() => setCount((value) => value + 1)}
      />
    </StyleCard>
  );
}
