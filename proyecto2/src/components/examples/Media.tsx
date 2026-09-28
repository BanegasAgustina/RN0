/**
 * src/components/examples/Media.tsx
 *
 * Demuestra Image e ImageBackground con el recurso local landscape.png.
 * Image muestra la ilustración; ImageBackground admite children, por eso el texto puede quedar encima.
 * resizeMode cover conserva la proporción y puede recortar bordes para cubrir el área disponible.
 */
import { Image, ImageBackground, View } from "react-native";
import { Label } from "../UI";
import { useTheme } from "../../context/ThemeContext";
// require se resuelve al compilar: estas imágenes locales también funcionan sin conexión.
const landscape = require("../../../assets/landscape.png");
export function Media({ id }: { id: string }) {
  const { colors } = useTheme();
  return (
    <>
      {id === "image" && (
        <View style={{ gap: 14 }}>
          {/* El contenedor calcula la proporción sin heredar el alto original del archivo en web. */}
          <View style={{ width: "100%", aspectRatio: 1.6 }}>
            <Image
              source={landscape}
              accessibilityLabel="Ilustración de montañas verdes bajo el sol"
              resizeMode="cover"
              style={{ width: "100%", height: "100%", borderRadius: 16 }}
            />
          </View>
        </View>
      )}
      {id === "imagebackground" && (
        <View style={{ gap: 14 }}>
          <Label style={{ color: colors.muted }}>
            La imagen ocupa el fondo; el texto es contenido superpuesto.
          </Label>
          <ImageBackground
            source={landscape}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            style={{
              width: "100%",
              minHeight: 340,
              overflow: "hidden",
              borderRadius: 16,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                padding: 22,
                margin: 18,
                borderRadius: 14,
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                gap: 8,
              }}
            >
              <Label
                style={{ color: colors.accent, fontSize: 12, letterSpacing: 2 }}
              >
                UNA PAUSA PARA CREAR
              </Label>
              <Label
                style={{ fontSize: 24, lineHeight: 32, fontWeight: "800" }}
              >
                Encontrá tu inspiración.
              </Label>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
}
