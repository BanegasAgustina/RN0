/**
 * src/data/components.ts
 *
 * Es la fuente de verdad de las fichas educativas.
 * ComponentInfo define su estructura; components contiene nombre, categoría, descripción, uso y conceptos.
 * normalize prepara el texto y filterComponents combina búsqueda y categoría; agregar una ficha también requiere implementar su demo.
 */
import { categories } from "../constants/categories";
export interface ComponentInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  usage: string;
  concepts: string[];
}
// Esta colección alimenta contadores, búsquedas, tarjetas y detalles.
export const components: ComponentInfo[] = [
  {
    id: "view",
    name: "View",
    category: "fundamentos",
    description: "Agrupa y distribuye otros componentes.",
    usage: "Construir contenedores, filas y columnas.",
    concepts: ["flexDirection", "flexWrap", "gap"],
  },
  {
    id: "text",
    name: "Text",
    category: "fundamentos",
    description: "Presenta texto con diferentes jerarquías.",
    usage: "Mostrar títulos, párrafos y énfasis dentro de una frase.",
    concepts: ["style", "fontSize", "Text anidado"],
  },
  {
    id: "button",
    name: "Button",
    category: "interaccion",
    description: "Un botón con apariencia propia de cada plataforma.",
    usage: "Ejecutar una acción sencilla; acá suma puntos.",
    concepts: ["title", "onPress", "color"],
  },
  {
    id: "pressable",
    name: "Pressable",
    category: "interaccion",
    description: "Detecta pulsaciones y expone el estado pressed.",
    usage: "Crear botones o tarjetas con feedback personalizado.",
    concepts: ["onPress", "pressed", "style"],
  },
  {
    id: "touchableopacity",
    name: "TouchableOpacity",
    category: "interaccion",
    description: "Reduce su opacidad al tocarlo.",
    usage: "Responder al toque mostrando un cambio de transparencia.",
    concepts: ["activeOpacity", "onPress"],
  },
  {
    id: "touchablehighlight",
    name: "TouchableHighlight",
    category: "interaccion",
    description: "Revela un color de fondo durante la pulsación.",
    usage: "Crear una zona táctil con subrayado visual de la acción.",
    concepts: ["underlayColor", "onPress", "un único hijo"],
  },
  {
    id: "touchablewithoutfeedback",
    name: "TouchableWithoutFeedback",
    category: "interaccion",
    description: "Detecta el toque sin cambiar su apariencia.",
    usage:
      "Disponible en React Native 0.86; React Native Web 0.21 lo marca deprecado y emite una advertencia. Se incluye para estudio: preferí Pressable con feedback visible en controles nuevos.",
    concepts: ["onPress", "children"],
  },
  {
    id: "textinput",
    name: "TextInput",
    category: "formularios",
    description: "Recibe texto editable.",
    usage: "Crear campos controlados por el estado de React.",
    concepts: ["value", "onChangeText", "placeholder"],
  },
  {
    id: "switch",
    name: "Switch",
    category: "formularios",
    description: "Activa o desactiva una opción.",
    usage: "Representar una preferencia booleana.",
    concepts: ["value", "onValueChange", "trackColor"],
  },
  {
    id: "scrollview",
    name: "ScrollView",
    category: "listas",
    description: "Desplaza todos sus elementos ya renderizados.",
    usage: "Mostrar contenido breve que no cabe en la pantalla.",
    concepts: ["children", "onScroll", "scrollTo"],
  },
  {
    id: "flatlist",
    name: "FlatList",
    category: "listas",
    description: "Renderiza un array como una lista virtualizada.",
    usage:
      "Trabajar con listas planas sin montar todos los elementos a la vez.",
    concepts: ["data", "renderItem", "keyExtractor"],
  },
  {
    id: "sectionlist",
    name: "SectionList",
    category: "listas",
    description: "Renderiza datos agrupados en secciones.",
    usage: "Presentar categorías con su encabezado y sus filas.",
    concepts: ["sections", "renderSectionHeader", "renderItem"],
  },
  {
    id: "virtualizedlist",
    name: "VirtualizedList",
    category: "listas",
    description: "Es la base de las listas virtualizadas.",
    usage:
      "Controlar cómo se accede a los datos; normalmente FlatList resulta más sencilla.",
    concepts: ["getItem", "getItemCount", "renderItem"],
  },
  {
    id: "image",
    name: "Image",
    category: "multimedia",
    description: "Muestra una imagen local.",
    usage: "Incorporar recursos visuales que funcionan sin conexión.",
    concepts: ["source", "resizeMode", "accessibilityLabel"],
  },
  {
    id: "imagebackground",
    name: "ImageBackground",
    category: "multimedia",
    description: "Ubica contenido sobre una imagen.",
    usage: "Crear una portada con texto superpuesto.",
    concepts: ["source", "imageStyle", "children"],
  },
  {
    id: "activityindicator",
    name: "ActivityIndicator",
    category: "feedback",
    description: "Indica que un estado de carga está activo.",
    usage: "Comunicar una espera; acá podés iniciar y detener el indicador.",
    concepts: ["animating", "size", "color"],
  },
  {
    id: "modal",
    name: "Modal",
    category: "feedback",
    description: "Presenta una ventana sobre la pantalla actual.",
    usage:
      "Mostrar información y confirmar una práctica sin salir de la pantalla.",
    concepts: ["visible", "transparent", "onRequestClose"],
  },
  {
    id: "refreshcontrol",
    name: "RefreshControl",
    category: "feedback",
    description: "Permite actualizar al tirar del contenido hacia abajo.",
    usage:
      "Renovar datos locales con un gesto nativo; en web se ofrece un botón equivalente.",
    concepts: ["refreshing", "onRefresh", "refreshControl"],
  },
  {
    id: "safeareaview",
    name: "SafeAreaView",
    category: "sistema",
    description: "Protege el contenido del notch y las barras del sistema.",
    usage:
      "El componente del núcleo está deprecado. Esta demo usa la alternativa EXTERNA react-native-safe-area-context, ya instalada.",
    concepts: ["SafeAreaProvider", "edges", "useSafeAreaInsets"],
  },
  {
    id: "keyboardavoidingview",
    name: "KeyboardAvoidingView",
    category: "sistema",
    description: "Ajusta el espacio cuando aparece el teclado.",
    usage: "Mantener accesible un formulario en un dispositivo móvil.",
    concepts: ["behavior", "keyboardVerticalOffset", "Keyboard.dismiss"],
  },
  {
    id: "statusbar",
    name: "StatusBar",
    category: "sistema",
    description: "Configura la barra de estado del dispositivo.",
    usage:
      "Cambiar visibilidad y contraste en Android/iOS; no produce una barra nativa en web.",
    concepts: ["hidden", "barStyle"],
  },
];
// Normalizo tildes y mayúsculas para que la búsqueda sea tolerante.
export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
// Combino ambas condiciones sobre los datos reales.
export function filterComponents(query: string, category: string) {
  const term = normalize(query);
  return components.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      normalize(
        [
          item.name,
          item.description,
          categories.find((group) => group.id === item.category)?.title,
        ].join(" "),
      ).includes(term),
  );
}
