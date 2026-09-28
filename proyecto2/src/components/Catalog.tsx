/**
 * src/components/Catalog.tsx
 *
 * Contiene la grilla y las tarjetas navegables del catálogo.
 * CatalogCard recibe un componente o una categoría y abre su ruta con el id correspondiente.
 * Los nombres y cantidades de miembros de una categoría se calculan desde components.
 */
import { router } from "expo-router";
import { View, Pressable } from "react-native";
import type { PropsWithChildren } from "react";
import { Label, styles } from "./UI";
import { useTheme } from "../context/ThemeContext";
import { useResponsive } from "../hooks/useResponsive";
import { components, type ComponentInfo } from "../data/components";
import type { Category } from "../constants/categories";
// El ancho porcentual deja espacio para el gap, sin fijar píxeles por tarjeta.
export function Grid({ children }: PropsWithChildren) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 18 }}>
      {children}
    </View>
  );
}
export function CatalogCard({
  component,
  category,
}: {
  component?: ComponentInfo;
  category?: Category;
}) {
  const { colors } = useTheme();
  const { columns } = useResponsive();
  const width = columns === 1 ? "100%" : columns === 2 ? "48%" : "32%";
  const members = category
    ? components.filter((item) => item.category === category.id)
    : [];
  // Cada tarjeta conserva una ruta estable y lleva su id como parámetro.
  function open() {
    if (component)
      router.push({
        pathname: "/component/[id]",
        params: { id: component.id },
      });
    else if (category)
      router.push({ pathname: "/category/[id]", params: { id: category.id } });
  }
  return (
    <Pressable
      onPress={open}
      accessibilityRole="button"
      accessibilityLabel={"Explorar " + (component?.name ?? category?.title)}
      style={({ pressed }) => [
        styles.card,
        {
          width,
          minWidth: 0,
          gap: 14,
          backgroundColor: pressed ? colors.soft : colors.card,
          borderColor: colors.border,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      <Label style={{ color: colors.accent, fontSize: 13, fontWeight: "700" }}>
        {category
          ? category.number + " / " + category.symbol
          : "COMPONENTE · →"}
      </Label>
      <Label
        accessibilityRole="header"
        style={[
          styles.heading,
          {
            flexShrink: 1,
            fontSize: component && component.name.length > 20 ? 18 : 23,
          },
        ]}
      >
        {component?.name ?? category?.title}
      </Label>
      <Label style={{ color: colors.muted }}>
        {component?.description ?? members.map((item) => item.name).join(" · ")}
      </Label>
      <Label
        style={{ color: colors.accent, fontWeight: "700", marginTop: "auto" }}
      >
        {category ? members.length + " ejemplos  →" : "Probar ejemplo  →"}
      </Label>
    </Pressable>
  );
}
