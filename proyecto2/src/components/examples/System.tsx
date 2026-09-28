/**
 * src/components/examples/System.tsx
 *
 * Demuestra área segura y configuración de la barra de estado.
 * Los insets indican márgenes del dispositivo; StatusBar se monta sólo en su propia ficha.
 * El área segura usa la librería externa ya instalada; la barra de estado se observa en Android/iOS.
 */
import { useState } from "react";
import { StatusBar, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Label } from "../UI";
import { useTheme } from "../../context/ThemeContext";
// Las APIs del dispositivo se prueban por separado para no alterar otras fichas.
export function System({ id }: { id: string }) {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const [hidden, setHidden] = useState(false);
  // StatusBar se desmonta al salir: React Native restaura la configuración anterior.
  // No usamos backgroundColor ni translucent: Android moderno exige edge-to-edge.
  return (
    <>
      {id === "statusbar" && (
        <StatusBar
          hidden={hidden}
          barStyle={dark ? "light-content" : "dark-content"}
        />
      )}
      {id === "safeareaview" && (
        <View style={{ gap: 14 }}>
          <View
            style={{
              padding: 20,
              backgroundColor: colors.soft,
              borderRadius: 14,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: colors.accent,
            }}
          >
            <Label>Estás dentro del área segura.</Label>
            <Label>Margen superior: {Math.round(insets.top)} px</Label>
            <Label>Margen inferior: {Math.round(insets.bottom)} px</Label>
          </View>
        </View>
      )}
      {id === "statusbar" && (
        <View style={{ gap: 14 }}>
          <Label>Ocultar barra de estado</Label>
          <Switch
            accessibilityLabel="Ocultar barra de estado"
            value={hidden}
            onValueChange={setHidden}
            trackColor={{ false: colors.border, true: colors.accent }}
          />
          <Label>
            {hidden ? "Barra oculta" : "Barra visible"} · El efecto se observa
            en Android o iOS.
          </Label>
        </View>
      )}
    </>
  );
}
