/**
 * src/components/examples/Interaction.tsx
 *
 * Demuestra Button, Pressable y las tres variantes Touchable.
 * Los estados count, presses, touches y saved cambian como respuesta a eventos reales.
 * El estado pressed sólo dura la pulsación; los contadores permanecen mientras la demo esté montada.
 */
import { useState } from "react";
import {
  View,
  Button,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Label, styles } from "../UI";
import { useTheme } from "../../context/ThemeContext";
// Cada tipo de zona táctil demuestra su comportamiento y actualiza un estado.
export function Interaction({ id }: { id: string }) {
  const { colors } = useTheme();
  // Los estados son independientes: cada demostración responde a su propia interacción.
  const [count, setCount] = useState(0);
  const [presses, setPresses] = useState(0);
  const [touches, setTouches] = useState(0);
  const [saved, setSaved] = useState(false);
  return (
    <>
      {id === "button" && (
        <View style={{ gap: 14 }}>
          <Button
            title="Sumar un punto"
            color={colors.accent}
            onPress={() => setCount((value) => value + 1)}
          />
          <Label accessibilityLiveRegion="polite">Puntos: {count}</Label>
        </View>
      )}
      {id === "pressable" && (
        <View style={{ gap: 14 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Mantené presionado para cambiar el aspecto"
            onPress={() => setPresses((value) => value + 1)}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? colors.accent : colors.soft,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            {({ pressed }) => (
              <Label
                style={{ color: pressed ? colors.onAccent : colors.accent }}
              >
                {pressed ? "¡Estás presionando!" : "Mantené presionado"}
              </Label>
            )}
          </Pressable>
          <Label accessibilityLiveRegion="polite">Pulsaciones: {presses}</Label>
        </View>
      )}
      {/* TouchableOpacity sigue disponible; para botones nuevos preferimos Pressable por su flexibilidad. */}
      {id === "touchableopacity" && (
        <View style={{ gap: 14 }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: saved }}
            activeOpacity={0.45}
            onPress={() => setSaved((value) => !value)}
            style={[styles.button, { backgroundColor: colors.soft }]}
          >
            <Label style={{ color: colors.accent }}>
              {saved ? "♥ Guardado" : "♡ Guardar ejemplo"}
            </Label>
          </TouchableOpacity>
        </View>
      )}
      {id === "touchablehighlight" && (
        <>
          <TouchableHighlight
            accessibilityRole="button"
            underlayColor={colors.accent}
            onPress={() => setTouches((value) => value + 1)}
            style={[styles.button, { backgroundColor: colors.soft }]}
          >
            <Label>Tocar con resaltado</Label>
          </TouchableHighlight>
          <Label>Toques: {touches}</Label>
        </>
      )}
      {id === "touchablewithoutfeedback" && (
        <>
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityLabel="Tocar sin efecto visual"
            onPress={() => setTouches((value) => value + 1)}
          >
            <View style={[styles.button, { backgroundColor: colors.soft }]}>
              <Label>Tocar sin efecto visual</Label>
            </View>
          </TouchableWithoutFeedback>
          <Label accessibilityLiveRegion="polite">Toques: {touches}</Label>
        </>
      )}
    </>
  );
}
