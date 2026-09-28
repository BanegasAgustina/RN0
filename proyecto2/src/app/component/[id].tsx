/**
 * src/app/component/[id].tsx
 *
 * Pantalla dinámica para estudiar y probar un componente.
 * Busca la ficha por id y elige la demo según su categoría; en escritorio separa explicación y ejemplo.
 * Las listas administran su propio scroll. RefreshControl y KeyboardAvoidingView necesitan contenedores específicos.
 */
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import { Page, Label, styles, AppButton } from "../../components/UI";
import { components } from "../../data/components";
import { useTheme } from "../../context/ThemeContext";
import { useResponsive } from "../../hooks/useResponsive";
import { useRefresh } from "../../hooks/useRefresh";
import { Fundamentals } from "../../components/examples/Fundamentals";
import { Interaction } from "../../components/examples/Interaction";
import { Forms } from "../../components/examples/Forms";
import { Lists } from "../../components/examples/Lists";
import { Media } from "../../components/examples/Media";
import { Feedback } from "../../components/examples/Feedback";
import { System } from "../../components/examples/System";
// El id elige una demo real; los textos se obtienen exclusivamente del catálogo.
export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = components.find((component) => component.id === id);
  const { colors } = useTheme();
  const { mobile, columns } = useResponsive();
  const refresh = useRefresh();
  if (!item)
    return (
      <Page>
        <Label>Este componente no existe.</Label>
        <AppButton
          title="Volver al inicio"
          onPress={() => router.navigate("/")}
        />
      </Page>
    );
  const heading = (
    <View style={{ gap: 20 }}>
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          router.navigate({
            pathname: "/category/[id]",
            params: { id: item.category },
          })
        }
        style={({ pressed }) => ({
          alignSelf: "flex-start",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 24,
          backgroundColor: colors.soft,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Label style={{ color: colors.accent, fontWeight: "700" }}>
          ← Volver a la categoría
        </Label>
      </Pressable>
      <Label
        accessibilityRole="header"
        style={{
          fontSize: mobile ? (item.name.length > 20 ? 22 : 28) : 44,
          lineHeight: mobile ? 36 : 54,
          fontWeight: "800",
        }}
      >
        {item.name}
      </Label>
      <Label style={{ color: colors.muted }}>{item.description}</Label>
      <Label style={styles.heading}>¿Para qué se usa?</Label>
      <Label style={{ maxWidth: 850 }}>{item.usage}</Label>
      <Label style={{ color: colors.accent, fontWeight: "700" }}>
        CONCEPTOS UTILIZADOS
      </Label>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {item.concepts.map((concept) => (
          <View
            key={concept}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 12,
              backgroundColor: colors.soft,
            }}
          >
            <Label style={{ color: colors.accent, fontSize: 13 }}>
              {concept}
            </Label>
          </View>
        ))}
      </View>
    </View>
  );
  if (item.category === "listas")
    return (
      <Page scroll={false}>
        <Lists id={id} header={heading} />
      </Page>
    );
  const demo =
    item.category === "fundamentos" ? (
      <Fundamentals id={id} />
    ) : item.category === "interaccion" ? (
      <Interaction id={id} />
    ) : item.category === "formularios" || id === "keyboardavoidingview" ? (
      <Forms id={id} />
    ) : item.category === "multimedia" ? (
      <Media id={id} />
    ) : item.category === "sistema" ? (
      <System id={id} />
    ) : id === "refreshcontrol" ? (
      <View style={{ gap: 16 }}>
        <Label>
          {Platform.OS === "web"
            ? "En web usá el botón. El gesto pull-to-refresh se prueba en Android/iOS."
            : "Tirá hacia abajo desde el inicio para agregar una lectura del reloj local."}
        </Label>
        <AppButton
          title="Actualizar datos locales"
          disabled={refresh.busy}
          onPress={refresh.refresh}
        />
        <Label accessibilityLiveRegion="polite">
          {refresh.busy
            ? "Actualizando…"
            : refresh.readings.length + " lecturas locales"}
        </Label>
        {refresh.readings.map((time, index) => (
          <Label key={index}>
            Lectura {refresh.readings.length - index}: {time}
          </Label>
        ))}
      </View>
    ) : (
      <Feedback id={id} />
    );
  const page = (
    <Page
      refreshControl={
        id === "refreshcontrol" ? (
          <RefreshControl
            refreshing={refresh.busy}
            onRefresh={refresh.refresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        ) : undefined
      }
    >
      <View
        style={{
          flexDirection: columns === 3 ? "row" : "column",
          gap: 32,
          alignItems: "stretch",
        }}
      >
        <View style={{ flex: columns === 3 ? 0.85 : undefined, minWidth: 0 }}>
          {heading}
        </View>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              flex: columns === 3 ? 1.15 : undefined,
              minWidth: 0,
              padding: mobile ? 18 : 30,
              gap: 24,
              alignSelf: "stretch",
            },
          ]}
        >
          <Label
            style={{
              color: colors.accent,
              fontSize: 12,
              fontWeight: "700",
              letterSpacing: 2,
            }}
          >
            LABORATORIO INTERACTIVO
          </Label>
          <Label style={styles.heading}>Ejemplo · Probalo</Label>
          {demo}
        </View>
      </View>
      {id === "keyboardavoidingview" && (
        <Label>
          En un teléfono, enfocá el campo: el contenedor se ajusta al teclado.
          En web no aparece un teclado nativo.
        </Label>
      )}
    </Page>
  );
  return id === "keyboardavoidingview" ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      {page}
    </KeyboardAvoidingView>
  ) : (
    page
  );
}
