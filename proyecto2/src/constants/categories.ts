/**
 * src/constants/categories.ts
 *
 * Define los metadatos de los grupos del catálogo.
 * Los id son estables para las rutas; los miembros no se duplican aquí: se obtienen filtrando components.
 */
export interface Category {
  id: string;
  number: string;
  title: string;
  description: string;
  symbol: string;
}
// Conservo los identificadores de las rutas originales.
export const categories: Category[] = [
  {
    id: "fundamentos",
    number: "01",
    title: "Fundamentos",
    description: "Contenedores y jerarquías para construir una pantalla.",
    symbol: "◈",
  },
  {
    id: "interaccion",
    number: "02",
    title: "Interacción",
    description: "Componentes para responder a acciones del usuario.",
    symbol: "↗",
  },
  {
    id: "formularios",
    number: "03",
    title: "Entradas",
    description: "Texto y opciones que se sincronizan con el estado.",
    symbol: "≡",
  },
  {
    id: "listas",
    number: "04",
    title: "Listas",
    description: "Datos reales que se convierten en contenido desplazable.",
    symbol: "☷",
  },
  {
    id: "multimedia",
    number: "05",
    title: "Multimedia",
    description: "Imágenes locales y contenido visual.",
    symbol: "▧",
  },
  {
    id: "feedback",
    number: "06",
    title: "Feedback",
    description: "Carga, actualización y ventanas que comunican estados.",
    symbol: "◎",
  },
  {
    id: "sistema",
    number: "07",
    title: "Utilidades",
    description: "Área segura, teclado y barra del dispositivo.",
    symbol: "⌘",
  },
];
