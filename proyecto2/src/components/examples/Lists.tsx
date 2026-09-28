/**
 * src/components/examples/Lists.tsx
 *
 * Demuestra cuatro formas de mostrar datos desplazables.
 * El encabezado imprime el mismo array que luego recibe la lista; renderItem convierte cada dato en una fila.
 * FlatList usa datos planos, SectionList grupos, VirtualizedList accesores y ScrollView todos sus hijos.
 */
import { useRef, type ReactElement } from "react";
import {
  FlatList,
  SectionList,
  VirtualizedList,
  ScrollView,
  View,
} from "react-native";
import { ScrollControls, useScrollControls } from "../ScrollControls";
import { Label, styles } from "../UI";
import { useTheme } from "../../context/ThemeContext";
export const technologies = [
  "React Native",
  "Expo",
  "TypeScript",
  "JavaScript",
];
const lessons = Array.from({ length: 18 }, (_, i) => ({
  id: String(i + 1),
  title: "Práctica " + (i + 1),
}));
const sections = [
  { title: "Frameworks", data: technologies.slice(0, 2) },
  { title: "Lenguajes", data: technologies.slice(2) },
];
// La lista es el scroll principal de la pantalla; el encabezado contiene la explicación y los datos.
export function Lists({ id, header }: { id: string; header: ReactElement }) {
  const { colors } = useTheme();
  const controls = useScrollControls();
  const flat = useRef<FlatList<string>>(null);
  const section = useRef<SectionList<string>>(null);
  const virtual = useRef<VirtualizedList<{ id: string; title: string }>>(null);
  const scroll = useRef<ScrollView>(null);
  const data =
    id === "sectionlist"
      ? sections
      : id === "flatlist"
        ? technologies
        : lessons;
  const heading = (
    <View style={{ gap: 18, marginBottom: 20 }}>
      {header}
      <Label style={styles.heading}>Array inicial</Label>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.soft, borderColor: colors.border },
        ]}
      >
        <Label style={{ fontFamily: "monospace", fontSize: 13 }}>
          {JSON.stringify(data, null, 2)}
        </Label>
      </View>
      <Label style={styles.heading}>
        ↓{" "}
        {id === "flatlist"
          ? "FlatList"
          : id === "sectionlist"
            ? "SectionList"
            : id === "virtualizedlist"
              ? "VirtualizedList"
              : "ScrollView"}{" "}
        ↓
      </Label>
      <Label>Resultado renderizado · Deslizá para recorrer los datos.</Label>
    </View>
  );
  // Un renderItem convierte cada dato en una fila con una clave estable.
  const row = (title: string) => (
    <View
      style={[
        styles.card,
        {
          marginBottom: 12,
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Label>{title}</Label>
    </View>
  );
  // Uso la API correspondiente a cada tipo de lista para volver suavemente al inicio.
  function top() {
    flat.current?.scrollToOffset({ offset: 0, animated: true });
    virtual.current?.scrollToOffset({ offset: 0, animated: true });
    section.current?.getScrollResponder()?.scrollTo({ y: 0, animated: true });
    scroll.current?.scrollTo({ y: 0, animated: true });
  }
  const common = {
    style: { flex: 1 },
    onScroll: controls.onScroll,
    scrollEventThrottle: 32,
    contentContainerStyle: { paddingBottom: 80 },
  };
  return (
    <View style={{ flex: 1 }}>
      {id === "flatlist" ? (
        <FlatList
          {...common}
          ref={flat}
          data={technologies}
          keyExtractor={(item) => item}
          renderItem={({ item }) => row(item)}
          ListHeaderComponent={heading}
        />
      ) : id === "sectionlist" ? (
        <SectionList
          {...common}
          ref={section}
          sections={sections}
          keyExtractor={(item) => item}
          renderItem={({ item }) => row(item)}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: group }) => (
            <Label style={[styles.heading, { paddingVertical: 12 }]}>
              {group.title}
            </Label>
          )}
          ListHeaderComponent={heading}
        />
      ) : id === "virtualizedlist" ? (
        <VirtualizedList
          {...common}
          ref={virtual}
          data={lessons}
          getItem={(items: typeof lessons, index: number) => items[index]}
          getItemCount={(items: typeof lessons) => items.length}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => row(item.title)}
          ListHeaderComponent={heading}
        />
      ) : (
        <ScrollView {...common} ref={scroll}>
          {heading}
          {lessons.map((item) => (
            <View key={item.id}>{row(item.title)}</View>
          ))}
        </ScrollView>
      )}
      <ScrollControls {...controls} onUp={top} />
    </View>
  );
}
