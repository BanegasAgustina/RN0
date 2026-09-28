/**
 * src/app/_layout.tsx
 *
 * Es la entrada compartida de las pantallas de Expo Router.
 * Envuelve Inicio y Estilos con los proveedores de área segura y tema, y configura las pestañas inferiores.
 * El tema de navegación y el fondo raíz usan los mismos colores para evitar franjas blancas.
 */
import {
  Tabs,
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemeProvider } from "../Context/ThemeContext";
import { useTheme } from "../hooks/useTheme";
import { useResponsive } from "../hooks/useResponsive";
// Reutilizamos los iconos locales de la plantilla, sin instalar una librería para dos tabs.
const icons = {
  index: require("../../assets/images/tabIcons/home.png"),
  estilos: require("../../assets/images/tabIcons/explore.png"),
};
function Navigation() {
  const { colors, dark } = useTheme();
  const { mobile } = useResponsive();
  const insets = useSafeAreaInsets();
  const base = dark ? DarkTheme : DefaultTheme;
  return (
    <NavigationThemeProvider
      value={{
        ...base,
        colors: {
          ...base.colors,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          primary: colors.primary,
          border: colors.border,
        },
      }}
    >
      {/* El fondo raíz cubre también el espacio alrededor de la barra de pestañas. */}
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar style={dark ? "light" : "dark"} />
        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarActiveBackgroundColor: colors.surfaceSecondary,
            tabBarLabelStyle: { fontSize: 13, fontWeight: "700" },
            tabBarLabelPosition: "beside-icon",
            tabBarItemStyle: {
              borderRadius: 16,
              marginHorizontal: 4,
              marginVertical: 8,
              minHeight: 48,
            },
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopWidth: 0,
              width: mobile ? "100%" : 460,
              maxWidth: "100%",
              alignSelf: "center",
              height: (mobile ? 64 : 76) + insets.bottom,
              borderRadius: mobile ? 0 : 24,
              marginBottom: mobile ? 0 : 12,
              paddingHorizontal: 8,
            },
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  borderBottomWidth: focused ? 2 : 0,
                  borderColor: colors.primary,
                  paddingBottom: 4,
                  paddingTop: 4,
                }}
              >
                <Image
                  accessible={false}
                  source={icons[route.name as keyof typeof icons]}
                  style={{ width: 21, height: 21, tintColor: color }}
                />
              </View>
            ),
          })}
        >
          <Tabs.Screen
            name="index"
            options={{ title: "Inicio", tabBarAccessibilityLabel: "Inicio" }}
          />
          <Tabs.Screen
            name="estilos"
            options={{ title: "Estilos", tabBarAccessibilityLabel: "Estilos" }}
          />
        </Tabs>
      </View>
    </NavigationThemeProvider>
  );
}
// El proveedor comparte el tema entre tabs; el contador pertenece a CounterCard y vive mientras esa pantalla siga montada.
export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
