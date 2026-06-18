import { useThemeStore } from '@/store/themeStore';
import { darkColors, lightColors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, shadow } from '@/theme/spacing';

export function useTheme() {
  const { mode, isDark, setMode, toggle } = useThemeStore();
  const colors = isDark ? darkColors : lightColors;

  return {
    mode,
    isDark,
    colors,
    typography,
    spacing,
    radius,
    shadow,
    setMode,
    toggle,
  };
}
