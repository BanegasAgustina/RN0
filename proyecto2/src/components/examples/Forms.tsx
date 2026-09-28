/**
 * src/components/examples/Forms.tsx
 *
 * Demuestra texto controlado, un interruptor y un formulario para probar el teclado.
 * value recibe el estado y onChangeText/onValueChange lo actualizan; submit valida el mensaje con trim.
 * Guardar significa mostrar el mensaje en el estado local de la pantalla: no se envía por red.
 */
import { useState } from "react";
import { View, Keyboard, Switch, TextInput } from "react-native";
import { AppButton, Label, styles } from "../UI";
import { useTheme } from "../../context/ThemeContext";
// Los inputs conservan sus valores en estado y validan antes de guardar.
export function Forms({ id }: { id: string }) {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
  ];
  function submit() {
    // trim descarta espacios. El error desaparece apenas la persona vuelve a escribir.
    if (!message.trim()) {
      setError("Escribí un mensaje antes de enviarlo.");
      setResult("");
      return;
    }
    setResult("Mensaje guardado localmente: " + message.trim());
    setError("");
    Keyboard.dismiss();
  }
  // La pantalla de detalle envuelve el formulario con KeyboardAvoidingView y su scroll.
  return (
    <View style={{ gap: 16 }}>
      {id === "textinput" && (
        <View style={{ gap: 14 }}>
          <Label>Tu nombre</Label>
          <TextInput
            accessibilityLabel="Tu nombre"
            value={name}
            onChangeText={setName}
            placeholder="Escribí tu nombre..."
            placeholderTextColor={colors.muted}
            style={inputStyle}
            autoCapitalize="words"
          />
          <Label accessibilityLiveRegion="polite">
            {name.trim() ? "Hola, " + name : "Tu saludo aparecerá acá."}
          </Label>
        </View>
      )}
      {id === "switch" && (
        <View style={{ gap: 14 }}>
          <Label>Recordatorios de estudio</Label>
          <Switch
            accessibilityLabel="Recordatorios de estudio"
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ false: colors.border, true: colors.accent }}
          />
          <Label>Estado: {enabled ? "activado" : "desactivado"}</Label>
        </View>
      )}
      {id === "keyboardavoidingview" && (
        <View style={{ gap: 14 }}>
          <Label>Mensaje</Label>
          <TextInput
            accessibilityLabel="Mensaje"
            value={message}
            onChangeText={(text) => {
              setMessage(text);
              setError("");
              setResult("");
            }}
            placeholder="¿Qué aprendiste hoy?"
            placeholderTextColor={colors.muted}
            style={inputStyle}
            returnKeyType="send"
            onSubmitEditing={submit}
          />
          {error ? (
            <Label accessibilityRole="alert" style={{ color: colors.error }}>
              {error}
            </Label>
          ) : null}
          <AppButton title="Enviar mensaje" onPress={submit} />
          {result ? (
            <Label accessibilityLiveRegion="polite">{result}</Label>
          ) : null}
        </View>
      )}
    </View>
  );
}
