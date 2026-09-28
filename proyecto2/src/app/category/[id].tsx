/**
 * src/app/category/[id].tsx
 *
 * Pantalla dinámica de una categoría.
 * Lee id de la URL, busca sus metadatos y filtra el catálogo para dibujar sus tarjetas.
 */
import { useLocalSearchParams, router } from "expo-router";
import { Page, Label, styles, AppButton } from "../../components/UI";
import { Grid, CatalogCard } from "../../components/Catalog";
import { categories } from "../../constants/categories";
import { components } from "../../data/components";
// La categoría filtra el mismo catálogo que utiliza la portada.
export default function Category() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categories.find((item) => item.id === id);
  return (
    <Page>
      <AppButton
        title="← Todas las categorías"
        onPress={() => router.navigate("/")}
      />
      <Label accessibilityRole="header" style={styles.heading}>
        {category
          ? category.number + " / " + category.title
          : "Categoría no encontrada"}
      </Label>
      <Label>
        {category?.description ??
          "Volvé al inicio para elegir una categoría disponible."}
      </Label>
      <Grid>
        {components
          .filter((item) => item.category === id)
          .map((item) => (
            <CatalogCard key={item.id} component={item} />
          ))}
      </Grid>
    </Page>
  );
}
