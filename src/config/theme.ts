import {
  createTheme,
  type DefaultMantineColor,
  type MantineColorsTuple,
} from "@mantine/core";

// Typesafety for custom colors
type ExtendedCustomColors =
  | "cinkoYellow"
  | "cinkoRed"
  | "cinkoBlue"
  | "cinkoGrey"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

// CINKO theme
export const theme = createTheme({
  fontFamily: "'Kumbh Sans', sans-serif",
  headings: {
    fontFamily: "'Space Grotesk', sans-serif",
  },
  // black: "#02040F",
  // white: "#E5DADA",
  colors: {
    cinkoYellow: [
      "#fff8e2",
      "#ffeecd",
      "#ffdc9c",
      "#ffc966",
      "#feb93a",
      "#feaf1e",
      "#ffa90f",
      "#e59500", // main yellow color
      "#ca8300",
      "#af7000",
    ],
    cinkoRed: [
      "#ffebed",
      "#fad2d7",
      "#f89faa",
      "#f86b7b",
      "#f84153",
      "#f92c3a",
      "#fa222e",
      "#df1922",
      "#c7101d",
      "#a30015", // main red color
    ],
    cinkoBlue: [
      "#ebeeff",
      "#d4d8fd",
      "#a7aef4",
      "#7781ed",
      "#4e5ae6",
      "#3542e2",
      "#1e2ede", // main blue color
      "#1929c9",
      "#1124b4",
      "#021ea0",
    ],
    cinkoGrey: [
      "#fdf1f1",
      "#e5dada", // main "white" color
      "#d3c5c5",
      "#bba6a6",
      "#a78a8a",
      "#9b7979",
      "#967070",
      "#835f5e",
      "#765353",
      "#6a4646",
    ],
  },
});
