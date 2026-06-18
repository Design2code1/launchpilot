/**
 * LaunchPilot RN — Design System Colors
 * OLED-first dark mode with Inter typography
 * Based on UI/UX Pro Max recommendations
 */

export const darkColors = {
  // Backgrounds (OLED optimized)
  background: '#0F172A',
  surface: '#1E293B',
  surface2: '#272F42',
  surfaceHover: '#334155',

  // Text
  foreground: '#F8FAFC',
  foregroundMuted: '#94A3B8',
  foregroundSubtle: '#64748B',

  // Accent (Electric Green — Linear-inspired)
  accent: '#22C55E',
  accentDark: '#16A34A',
  accentLight: '#4ADE80',
  accentForeground: '#052E16',

  // Borders
  border: '#475569',
  borderSubtle: '#334155',

  // Status
  success: '#22C55E',
  successBg: '#052E16',
  warning: '#F59E0B',
  warningBg: '#1C1700',
  destructive: '#EF4444',
  destructiveBg: '#2D0404',
  info: '#3B82F6',
  infoBg: '#0C1A3E',

  // UI
  card: '#1E293B',
  cardBorder: '#334155',
  input: '#1E293B',
  inputBorder: '#475569',
  inputFocus: '#22C55E',
  placeholder: '#64748B',

  // Tab bar
  tabBar: '#0F172A',
  tabBarBorder: '#1E293B',
  tabActive: '#22C55E',
  tabInactive: '#64748B',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',

  // Skeleton
  skeleton: '#1E293B',
  skeletonHighlight: '#334155',

  // Chart
  chartPrimary: '#22C55E',
  chartSecondary: '#3B82F6',
  chartTertiary: '#F59E0B',
  chartGrid: '#1E293B',
} as const;

export const lightColors = {
  background: '#FFFFFF',
  surface: '#F8FAFC',
  surface2: '#F1F5F9',
  surfaceHover: '#E2E8F0',

  foreground: '#0F172A',
  foregroundMuted: '#64748B',
  foregroundSubtle: '#94A3B8',

  accent: '#16A34A',
  accentDark: '#15803D',
  accentLight: '#22C55E',
  accentForeground: '#F0FDF4',

  border: '#E2E8F0',
  borderSubtle: '#F1F5F9',

  success: '#16A34A',
  successBg: '#F0FDF4',
  warning: '#D97706',
  warningBg: '#FFFBEB',
  destructive: '#DC2626',
  destructiveBg: '#FEF2F2',
  info: '#2563EB',
  infoBg: '#EFF6FF',

  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  input: '#FFFFFF',
  inputBorder: '#CBD5E1',
  inputFocus: '#16A34A',
  placeholder: '#94A3B8',

  tabBar: '#FFFFFF',
  tabBarBorder: '#E2E8F0',
  tabActive: '#16A34A',
  tabInactive: '#94A3B8',

  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',

  skeleton: '#F1F5F9',
  skeletonHighlight: '#E2E8F0',

  chartPrimary: '#16A34A',
  chartSecondary: '#2563EB',
  chartTertiary: '#D97706',
  chartGrid: '#F1F5F9',
} as const;

export type ColorScheme = typeof darkColors;
export type ColorKey = keyof ColorScheme;
