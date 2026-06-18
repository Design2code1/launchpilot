/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // OLED Dark Design System — UI/UX Pro Max
        background: '#0F172A',
        surface: '#1E293B',
        'surface-2': '#272F42',
        border: '#475569',
        muted: '#64748B',
        foreground: '#F8FAFC',
        'foreground-muted': '#94A3B8',
        accent: '#22C55E',
        'accent-dark': '#16A34A',
        'accent-light': '#4ADE80',
        destructive: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        // Light mode overrides
        'light-background': '#FFFFFF',
        'light-surface': '#F8FAFC',
        'light-surface-2': '#F1F5F9',
        'light-border': '#E2E8F0',
        'light-foreground': '#0F172A',
        'light-foreground-muted': '#64748B',
      },
      fontFamily: {
        'inter-thin': ['Inter_100Thin'],
        'inter-light': ['Inter_300Light'],
        'inter': ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
        'inter-extrabold': ['Inter_800ExtraBold'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
    },
  },
  plugins: [],
};
