/**
 * LaunchPilot RN — Typography System
 * Inter font scale — premium SaaS aesthetic
 */

export const typography = {
  // Display
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  // Headings
  h1: {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.1,
  },
  h4: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0,
  },
  // Body
  bodyLg: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0,
  },
  bodySm: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0,
  },
  // Utility
  caption: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.1,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.05,
  },
  overline: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  // Code
  mono: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular', // fallback until mono font added
    letterSpacing: -0.2,
  },
} as const;

export type TypographyKey = keyof typeof typography;
