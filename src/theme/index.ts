export * from './colors';
export * from './typography';
export * from './spacing';

import { darkColors, lightColors } from './colors';
import { typography } from './typography';
import { spacing, radius, shadow } from './spacing';

export const theme = {
  dark: {
    colors: darkColors,
    typography,
    spacing,
    radius,
    shadow,
  },
  light: {
    colors: lightColors,
    typography,
    spacing,
    radius,
    shadow,
  },
} as const;

export type Theme = typeof theme.dark;
export type ThemeMode = 'dark' | 'light' | 'system';
