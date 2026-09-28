/**
 * src/app/_layout.tsx
 *
 * Configura la navegación general de Component Lab.
 * Stack administra portada, categoría y detalle, con historial para regresar; los proveedores comparten área segura y tema.
 */
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { ThemeToggle } from "../components/UI";
function Navigation() {
  const { colors, dark } = useTheme();
  // Stack administra el historial y el botón Atrás, incluyendo el gesto nativo.
  return (
    <>
      <StatusBar style={dark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerRight: () => <ThemeToggle />,
        }}
      >
        <Stack.Screen
          name="component/[id]"
          options={{ title: "COMPONENT LAB" }}
        />
        <Stack.Screen name="index" options={{ title: "COMPONENT LAB" }} />
        <Stack.Screen
          name="category/[id]"
          options={{ title: "COMPONENT LAB" }}
        />
      </Stack>
    </>
  );
}
export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
