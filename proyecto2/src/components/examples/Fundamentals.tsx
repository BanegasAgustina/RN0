/**
 * src/components/examples/Fundamentals.tsx
 *
 * Demuestra View y Text según el id recibido.
 * View organiza bloques con Flexbox; Text muestra jerarquía y permite anidar énfasis dentro de una frase.
 */
import { View } from "react-native";
import { Label } from "../UI";
import { useTheme } from "../../context/ThemeContext";
// View agrupa elementos; Flexbox define su distribución, alineación y separación.
export function Fundamentals({ id }: { id: string }) {
  const { colors } = useTheme();
  return (
    <>
      {id === "view" && (
        <View style={{ gap: 14 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {["Diseñar", "Crear", "Aprender"].map((text) => (
              <View
                key={text}
                style={{
                  flex: 1,
                  minWidth: 90,
                  padding: 18,
                  borderRadius: 14,
                  backgroundColor: colors.soft,
                }}
              >
                <Label style={{ textAlign: "center", color: colors.accent }}>
                  {text}
                </Label>
              </View>
            ))}
          </View>
        </View>
      )}
      {id === "text" && (
        <View style={{ gap: 14 }}>
          <Label style={{ fontSize: 30, lineHeight: 38, fontWeight: "800" }}>
            Una idea comienza acá.
          </Label>
          <Label>
            Podés combinar{" "}
            <Label style={{ fontWeight: "800", color: colors.accent }}>
              énfasis
            </Label>{" "}
            dentro del mismo texto.
          </Label>
          <Label style={{ color: colors.muted, fontSize: 13 }}>
            Un detalle pequeño también comunica.
          </Label>
        </View>
      )}
    </>
  );
}
