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
    '10': 40,
    '11': 44,
    '12': 48,
    '13': 56,
  },
  borderRadii: {
    none: 0,
    rounded: 8,
    rounded12: 12,
    rounded16: 16,
    rounded20: 20,
    rounded24: 24,
  },
});

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
