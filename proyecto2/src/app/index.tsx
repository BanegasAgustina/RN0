/**
 * src/app/index.tsx
 *
 * Portada del catálogo con búsqueda y filtros combinados.
 * query y selected son estados; los resultados se calculan desde components en cada renderizado.
 * Sin filtros muestra categorías; con filtros muestra fichas o un estado vacío que permite limpiar la selección.
 */
import { useState } from "react";
import { TextInput, View, Pressable } from "react-native";
import { Page, Label, styles, AppButton } from "../components/UI";
import { Grid, CatalogCard } from "../components/Catalog";
import { categories } from "../constants/categories";
import { components, filterComponents } from "../data/components";
import { useTheme } from "../context/ThemeContext";
import { useResponsive } from "../hooks/useResponsive";
// La portada combina búsqueda y categoría sin guardar resultados duplicados en estado.
export default function Home() {
  const { colors } = useTheme();
  const { mobile } = useResponsive();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("all");
  const results = filterComponents(query, selected);
  const filtering = query.trim() !== "" || selected !== "all";
  return (
    <Page>
      <View style={{ gap: 18, paddingVertical: mobile ? 12 : 28 }}>
        <Label
          style={{
            color: colors.accent,
            fontSize: 12,
            letterSpacing: 2,
            fontWeight: "700",
          }}
        >
          EXPLORÁ · TOCÁ · APRENDÉ
        </Label>
        <Label
          accessibilityRole="header"
          style={{
            fontSize: mobile ? 38 : 64,
            lineHeight: mobile ? 44 : 72,
            fontWeight: "800",
            letterSpacing: -1,
            maxWidth: 900,
          }}
        >
          React Native Components
        </Label>
        <Label
          style={{
            color: colors.muted,
            fontSize: 18,
            lineHeight: 28,
            maxWidth: 720,
          }}
        >
          Aprendé los componentes principales de React Native mediante ejemplos
          interactivos.
        </Label>
        <Label style={{ color: colors.accent, fontWeight: "700" }}>
          {components.length} componentes · {categories.length} categorías
        </Label>
      </View>
      <View style={{ gap: 12 }}>
        <Label style={{ fontWeight: "700" }}>Buscar componente</Label>
        <TextInput
          accessibilityLabel="Buscar componente"
          placeholder="Buscar por nombre..."
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={colors.muted}
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.input,
              borderColor: colors.border,
            },
          ]}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {[{ id: "all", title: "Todos" }, ...categories].map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityState={{ selected: selected === item.id }}
              onPress={() => setSelected(item.id)}
              style={({ pressed }) => ({
                minHeight: 44,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor:
                  selected === item.id ? colors.accent : colors.card,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Label
                style={{
                  color: selected === item.id ? colors.onAccent : colors.text,
                  fontSize: 14,
                }}
              >
                {item.title}
              </Label>
            </Pressable>
          ))}
        </View>
      </View>
      <Label accessibilityRole="header" style={styles.heading}>
        {filtering
          ? "Resultados (" + results.length + ")"
          : "Elegí dónde empezar"}
      </Label>
      {filtering ? (
        <Grid>
          {results.map((item) => (
            <CatalogCard key={item.id} component={item} />
          ))}
        </Grid>
      ) : (
        <Grid>
          {categories.map((item) => (
            <CatalogCard key={item.id} category={item} />
          ))}
        </Grid>
      )}
      {filtering && results.length === 0 && (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Label>No encontramos componentes con esa búsqueda.</Label>
          <AppButton
            title="Limpiar búsqueda y filtros"
            onPress={() => {
              setQuery("");
              setSelected("all");
            }}
          />
        </View>
      )}
      <Label style={{ color: colors.muted, fontSize: 13 }}>
        Laboratorio de componentes y APIs principales. SafeAreaView se demuestra
        con la alternativa externa indicada en su ficha.
      </Label>
    </Page>
  );
}
