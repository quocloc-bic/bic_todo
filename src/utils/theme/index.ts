import { textVariants } from './text-variants';
import { createBox, createText, createTheme } from '@shopify/restyle';
import { colors } from './colors';

const theme = createTheme({
  colors: colors,
  textVariants,
  spacing: {
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
  },
  borderRadii: {
    none: 0,
    rounded: 8,
  },
});

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
