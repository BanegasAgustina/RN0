/**
 * src/components/examples/Feedback.tsx
 *
 * Demuestra un indicador de carga controlado y una ventana Modal.
 * loading inicia o detiene el indicador; open muestra u oculta la ventana; confirmed conserva el resultado de la confirmación.
 * onRequestClose permite cerrar el modal desde el botón Atrás de Android.
 */
import { useState } from "react";
import { ActivityIndicator, Modal, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton, Label, styles } from "../UI";
import { useTheme } from "../../context/ThemeContext";
// Modal y carga tienen estados independientes y feedback dentro de la aplicación.
export function Feedback({ id }: { id: string }) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ gap: 16 }}>
      {id === "activityindicator" ? (
        <>
          <AppButton
            title={loading ? "Detener carga" : "Activar carga"}
            onPress={() => setLoading((value) => !value)}
          />
          <ActivityIndicator
            accessibilityLabel="Indicador de carga"
            animating={loading}
            hidesWhenStopped
            size="large"
            color={colors.accent}
          />
          <Label accessibilityLiveRegion="polite">
            {loading
              ? "Indicador activo. Detenelo con el botón."
              : "Indicador detenido."}
          </Label>
        </>
      ) : (
        <>
          <AppButton title="Abrir Modal" onPress={() => setOpen(true)} />
          <Label accessibilityLiveRegion="polite">
            {confirmed ? "Práctica confirmada." : "Esperando tu confirmación."}
          </Label>
          <Modal
            visible={open}
            transparent
            animationType="fade"
            onRequestClose={() => setOpen(false)}
          >
            <SafeAreaView
              style={{ flex: 1, backgroundColor: colors.overlay, padding: 24 }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                <View
                  accessibilityViewIsModal
                  style={[
                    styles.card,
                    {
                      width: "100%",
                      maxWidth: 480,
                      alignSelf: "center",
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Label style={styles.heading}>
                    Un espacio para concentrarte
                  </Label>
                  <Label>¿Completaste la práctica?</Label>
                  <AppButton
                    title="Confirmar práctica"
                    onPress={() => {
                      setConfirmed(true);
                      setOpen(false);
                    }}
                  />
                  <AppButton
                    title="Cerrar Modal"
                    onPress={() => setOpen(false)}
                  />
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </>
      )}
    </View>
  );
}
